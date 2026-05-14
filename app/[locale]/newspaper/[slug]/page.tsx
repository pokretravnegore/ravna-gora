"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "../../../../i18n/navigation";
import type { PDFDocumentProxy } from "pdfjs-dist";

const MIN_SCALE = 0.25;
const MAX_SCALE = 5;

export default function NewspaperViewer() {
  const { slug } = useParams<{ slug: string }>();
  const t = useTranslations("newspaper");

  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.25);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const pagesRef = useRef<Map<number, HTMLCanvasElement>>(new Map());
  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  const renderPage = useCallback(
    async (pdf: PDFDocumentProxy, pageNum: number, s: number) => {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: s });

      const canvas = document.createElement("canvas");
      canvas.dataset.pageNum = String(pageNum);
      canvas.draggable = false;
      canvas.style.display = "block";
      canvas.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)";
      canvas.style.background = "white";
      canvas.style.userSelect = "none";

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const ctx = canvas.getContext("2d")!;
      await page.render({
        canvasContext: ctx,
        viewport,
        transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
      }).promise;

      if (wrapperRef.current) {
        wrapperRef.current.appendChild(canvas);
      }
      pagesRef.current.set(pageNum, canvas);
    },
    []
  );

  const loadPdf = useCallback(async () => {
    setLoading(true);
    setError(false);
    pagesRef.current.clear();
    if (wrapperRef.current) wrapperRef.current.innerHTML = "";

    try {
      const pdfjsLib = await import("pdfjs-dist");
      // CDN worker avoids MIME-type issues with the local .mjs file in Next.js dev
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const pdf = await pdfjsLib
        .getDocument(`/api/newspaper/${slug}`)
        .promise;

      pdfRef.current = pdf;
      setNumPages(pdf.numPages);
      setCurrentPage(1);
      setLoading(false);

      for (let i = 1; i <= pdf.numPages; i++) {
        await renderPage(pdf, i, scaleRef.current);
      }
    } catch {
      setError(true);
      setLoading(false);
    }
  }, [slug, renderPage]);

  const rerenderAtScale = useCallback(async (s: number) => {
    const pdf = pdfRef.current;
    if (!pdf) return;
    pagesRef.current.clear();
    if (wrapperRef.current) wrapperRef.current.innerHTML = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      await renderPage(pdf, i, s);
    }
    const canvas = pagesRef.current.get(currentPage);
    canvas?.scrollIntoView({ block: "start" });
  }, [renderPage, currentPage]);

  useEffect(() => {
    loadPdf();
  }, [loadPdf]);

  // Detect current page from scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const mid = container.scrollTop + container.clientHeight / 2;
      for (const [num, canvas] of pagesRef.current) {
        const top = canvas.offsetTop;
        const bottom = top + canvas.offsetHeight;
        if (mid >= top && mid <= bottom) {
          setCurrentPage(num);
          break;
        }
      }
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [numPages]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "p")) {
        e.preventDefault();
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goToPage(currentPage - 1);
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goToPage(currentPage + 1);
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        applyZoom(scaleRef.current * 1.2);
      } else if (e.key === "-") {
        e.preventDefault();
        applyZoom(scaleRef.current / 1.2);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  function goToPage(n: number) {
    const clamped = Math.max(1, Math.min(numPages, n));
    const canvas = pagesRef.current.get(clamped);
    canvas?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentPage(clamped);
  }

  function applyZoom(s: number) {
    const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));
    setScale(next);
    scaleRef.current = next;
    rerenderAtScale(next);
  }

  function fitWidth() {
    const pdf = pdfRef.current;
    const container = containerRef.current;
    if (!pdf || !container) return;
    pdf.getPage(1).then((page) => {
      const vp = page.getViewport({ scale: 1 });
      applyZoom((container.clientWidth - 48) / vp.width);
    });
  }

  const blockContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#1a1a1a] text-[#e5e5e5] overflow-hidden">

      {/* Toolbar */}
      <div className="shrink-0 flex items-center gap-2 px-4 h-12 bg-[#262626] border-b border-[#333]">
        <Link
          href="/newspaper-catalog"
          className="text-sm text-[#888] hover:text-[#e5e5e5] transition-colors mr-2 whitespace-nowrap"
        >
          {t("backToCatalog")}
        </Link>

        <div className="w-px h-5 bg-[#333] shrink-0" />

        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1 || numPages === 0}
          className="px-3 py-1 text-sm rounded border border-transparent hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {t("prev")}
        </button>

        <div className="flex items-center gap-1 text-sm text-[#888] min-w-[90px] justify-center">
          <input
            type="number"
            min={1}
            max={numPages || 1}
            value={currentPage}
            disabled={numPages === 0}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10);
              if (!isNaN(n)) goToPage(n);
            }}
            className="w-10 bg-[#1a1a1a] border border-[#333] text-[#e5e5e5] text-center text-sm rounded px-1 py-0.5 disabled:opacity-40"
          />
          <span>/ {numPages || "–"}</span>
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= numPages || numPages === 0}
          className="px-3 py-1 text-sm rounded border border-transparent hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {t("next")}
        </button>

        <div className="flex-1" />

        <button
          onClick={() => applyZoom(scale / 1.2)}
          disabled={numPages === 0}
          className="px-3 py-1 text-sm rounded border border-transparent hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {t("zoomOut")}
        </button>
        <span className="text-sm text-[#888] min-w-[52px] text-center tabular-nums">
          {numPages > 0 ? `${Math.round(scale * 100)}%` : "–"}
        </span>
        <button
          onClick={() => applyZoom(scale * 1.2)}
          disabled={numPages === 0}
          className="px-3 py-1 text-sm rounded border border-transparent hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {t("zoomIn")}
        </button>
        <button
          onClick={fitWidth}
          disabled={numPages === 0}
          className="px-3 py-1 text-sm rounded border border-transparent hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {t("fit")}
        </button>
      </div>

      {/* Viewer */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-[#1a1a1a] relative"
        onContextMenu={blockContextMenu}
      >
        <div
          ref={wrapperRef}
          className="flex flex-col items-center py-5 gap-4 min-h-full"
        />

        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center text-[#888] text-sm">
            {t("loading")}
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-[#888] text-sm">
            {t("failedToLoad")}
          </div>
        )}
      </div>
    </div>
  );
}
