#!/usr/bin/env node
// Finds PDFs in a folder, moves each into its own numbered sub-folder,
// and extracts a cover PNG from the first page.
//
// Usage:
//   npm run pdf-organise -- <folder>
//   node scripts/pdf-organise.mjs <folder>
//
// Requires one of (checked in order):
//   - sips        macOS built-in, no install needed
//   - pdftoppm    brew install poppler
//   - gs          brew install ghostscript

import { readdir, mkdir, rename } from "fs/promises";
import { join, extname } from "path";
import { execFileSync, execFile } from "child_process";
import { promisify } from "util";
import { existsSync } from "fs";

const execFileAsync = promisify(execFile);

function which(bin) {
  try {
    execFileSync("which", [bin], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function detectRenderer() {
  if (which("sips"))      return "sips";
  if (which("pdftoppm")) return "pdftoppm";
  if (which("gs"))        return "gs";
  return null;
}

async function renderCover(pdfPath, outPng, renderer) {
  if (renderer === "sips") {
    await execFileAsync("sips", ["-s", "format", "png", pdfPath, "--out", outPng]);
  } else if (renderer === "pdftoppm") {
    const prefix = outPng.replace(/\.png$/, "");
    await execFileAsync("pdftoppm", ["-png", "-f", "1", "-l", "1", "-r", "150", pdfPath, prefix]);
    // pdftoppm appends -1, -01, or -001 depending on page count
    const candidates = [`${prefix}-1.png`, `${prefix}-01.png`, `${prefix}-001.png`];
    const produced = candidates.find((c) => existsSync(c));
    if (!produced) throw new Error("pdftoppm produced no output");
    await rename(produced, outPng);
  } else if (renderer === "gs") {
    await execFileAsync("gs", [
      "-dNOPAUSE", "-dBATCH",
      "-dFirstPage=1", "-dLastPage=1",
      "-sDEVICE=png16m", "-r150",
      `-sOutputFile=${outPng}`,
      pdfPath,
    ]);
  }
}

async function run() {
  const folder = process.argv[2];
  if (!folder) {
    console.error("Usage: node scripts/pdf-organise.mjs <folder>");
    process.exit(1);
  }

  const renderer = detectRenderer();
  if (!renderer) {
    console.error(
      "No PDF renderer found.\n" +
      "Install one of:\n" +
      "  brew install poppler      (provides pdftoppm)\n" +
      "  brew install ghostscript  (provides gs)"
    );
    process.exit(1);
  }

  const entries = await readdir(folder).catch(() => {
    console.error(`Cannot read folder: ${folder}`);
    process.exit(1);
  });

  const pdfs = entries
    .filter((f) => extname(f).toLowerCase() === ".pdf")
    .sort();

  if (pdfs.length === 0) {
    console.log(`No PDFs found in ${folder}`);
    return;
  }

  console.log(`Renderer: ${renderer}`);
  console.log(`Found ${pdfs.length} PDF(s) in ${folder}\n`);

  for (let i = 0; i < pdfs.length; i++) {
    const num = i + 1;
    const file = pdfs[i];
    const srcPdf  = join(folder, file);
    const destDir = join(folder, String(num));
    const destPdf = join(destDir, file);
    const destPng = join(destDir, "cover.png");

    await mkdir(destDir, { recursive: true });
    await rename(srcPdf, destPdf);
    process.stdout.write(`▸ [${num}] ${file}\n`);
    process.stdout.write(`  moved  → ${destDir}/\n`);

    try {
      await renderCover(destPdf, destPng, renderer);
      process.stdout.write(`  cover  → cover.png\n`);
    } catch (err) {
      process.stdout.write(`  cover  FAILED: ${err.message}\n`);
    }
  }

  console.log("\nDone.");
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
