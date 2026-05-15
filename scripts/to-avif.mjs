#!/usr/bin/env node
// Converts images from public/original-images/ → public/images/<name>/<width>.avif
//
// Usage:
//   npm run to-avif                                  # process all originals
//   npm run to-avif -- hero.jpg                      # single file by name
//   npm run to-avif -- --widths 400,800,1600         # custom widths

import sharp from "sharp";
import { readdir, mkdir, stat } from "fs/promises";
import { join, extname, basename } from "path";

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const QUALITY = 65;
const DEFAULT_WIDTHS = [640, 1024, 1512];

const IN_DIR  = "public/original-images";
const OUT_DIR = "public/images";

function fmt(bytes) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function parseCLI() {
  const args = process.argv.slice(2);
  const fileArg = args.find((a) => !a.startsWith("--"));

  let widths = DEFAULT_WIDTHS;
  const eqFlag = args.find((a) => a.startsWith("--widths="));
  const widthsIdx = args.indexOf("--widths");

  if (eqFlag) {
    widths = eqFlag.replace("--widths=", "").split(",").map(Number).filter(Boolean);
  } else if (widthsIdx !== -1 && args[widthsIdx + 1] && !args[widthsIdx + 1].startsWith("--")) {
    widths = args[widthsIdx + 1].split(",").map(Number).filter(Boolean);
  }

  return { fileArg, widths };
}

async function convertFile(inputPath, widths) {
  const ext = extname(inputPath).toLowerCase();
  if (!SUPPORTED.has(ext)) return;

  const name = basename(inputPath, ext);
  const outFolder = join(OUT_DIR, name);
  await mkdir(outFolder, { recursive: true });

  const meta = await sharp(inputPath).metadata();
  const originalWidth = meta.width ?? Infinity;

  const sizes = widths.filter((w) => w < originalWidth).sort((a, b) => a - b);
  const srcsetParts = [];

  for (const w of sizes) {
    const outPath = join(outFolder, `${w}.avif`);
    const before = await stat(inputPath);
    await sharp(inputPath).resize(w).avif({ quality: QUALITY }).toFile(outPath);
    const after = await stat(outPath);
    const pct = ((1 - after.size / before.size) * 100).toFixed(1);
    console.log(`  ${String(w).padStart(4)}px  ${fmt(before.size).padStart(8)} → ${fmt(after.size).padStart(8)}  (-${pct}%)`);
    srcsetParts.push(`/images/${name}/${w}.avif ${w}w`);
  }

  // Always generate the original-size AVIF (plain src or srcset fallback)
  const fullPath = join(outFolder, `${originalWidth}.avif`);
  const before = await stat(inputPath);
  await sharp(inputPath).avif({ quality: QUALITY }).toFile(fullPath);
  const after = await stat(fullPath);
  const pct = ((1 - after.size / before.size) * 100).toFixed(1);
  console.log(`  ${String(originalWidth).padStart(4)}px  ${fmt(before.size).padStart(8)} → ${fmt(after.size).padStart(8)}  (-${pct}%)  [original size]`);
  srcsetParts.push(`/images/${name}/${originalWidth}.avif ${originalWidth}w`);

  if (srcsetParts.length > 1) {
    console.log(`\n  srcset ready to copy:`);
    console.log(`  srcset="${srcsetParts.join(", ")}"`);
    console.log(`  sizes="(max-width: 768px) 640px, (max-width: 1280px) 1024px, 1512px"\n`);
  } else {
    console.log(`\n  src ready to copy:`);
    console.log(`  src="/images/${name}/${originalWidth}.avif"\n`);
  }
}

async function run() {
  const { fileArg, widths } = parseCLI();

  console.log(`Input:   ${IN_DIR}/`);
  console.log(`Output:  ${OUT_DIR}/<name>/<width>.avif`);
  console.log(`Widths:  ${widths.join(", ")}px`);
  console.log(`Quality: ${QUALITY}\n`);

  if (fileArg) {
    const inputPath = join(IN_DIR, fileArg);
    const info = await stat(inputPath).catch(() => null);
    if (!info) { console.error(`Not found: ${inputPath}`); process.exit(1); }
    console.log(`▸ ${fileArg}`);
    await convertFile(inputPath, widths);
  } else {
    const files = (await readdir(IN_DIR).catch(() => []))
      .filter((f) => SUPPORTED.has(extname(f).toLowerCase()))
      .sort();

    if (files.length === 0) {
      console.log(`No supported images found in ${IN_DIR}/`);
      return;
    }
    for (const f of files) {
      console.log(`▸ ${f}`);
      await convertFile(join(IN_DIR, f), widths);
    }
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
