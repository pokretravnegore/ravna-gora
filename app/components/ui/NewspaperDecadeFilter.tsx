"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CatalogCard } from "./CatalogCard";

const DECADES = ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];

const MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

function formatIssueDate(isoDate: string): string {
  const [year, month] = isoDate.split("-");
  return `${MONTHS[parseInt(month, 10) - 1]} ${year}`;
}

function issueDecade(isoDate: string): string {
  const year = parseInt(isoDate.split("-")[0], 10);
  return `${Math.floor(year / 10) * 10}s`;
}

export type NewsIssue = {
  number: number;
  date: string;
  imageUrl: string;
  slug: string;
};

export function NewspaperDecadeFilter({ issues, noIssuesLabel }: { issues: NewsIssue[]; noIssuesLabel: string }) {
  const t = useTranslations("newspaperCatalog");
  // Empty set = "All" selected
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(10);

  const isAll = selected.size === 0;

  function toggleDecade(d: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(d)) {
        next.delete(d);
      } else {
        next.add(d);
      }
      return next;
    });
    setVisibleCount(10);
  }

  function selectAll() {
    setSelected(new Set());
    setVisibleCount(10);
  }

  const filtered = isAll
    ? issues
    : issues.filter((i) => selected.has(issueDecade(i.date)));

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <>
      {/* Decade filter bar */}
      <div className="flex items-center gap-(--space-list-h) overflow-x-auto pb-1">
        <button
          onClick={selectAll}
          className={`type-large whitespace-nowrap shrink-0 px-(--btn-big-h) py-(--btn-big-v) ${isAll ? "bg-black text-white" : "border border-black text-black"}`}
        >
          {t("all")}
        </button>
        {DECADES.map((d) => {
          const active = selected.has(d);
          return (
            <button
              key={d}
              onClick={() => toggleDecade(d)}
              className={`type-large whitespace-nowrap shrink-0 flex items-center gap-2 px-(--btn-h) py-(--btn-v) ${active ? "bg-black text-white" : "border border-black text-black"}`}
            >
              {d}
              <span aria-hidden className={`leading-none ${active ? "" : "invisible"}`}>×</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-(--space-9) pb-(--space-8)">
        {visible.length === 0 ? (
          <p className="type-body text-gray-1 text-center py-(--space-8)">{noIssuesLabel}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-5 gap-y-(--space-card-v) w-full">
              {visible.map((issue) => (
                <CatalogCard
                  key={issue.slug}
                  subtitle={`#${issue.number}`}
                  title={formatIssueDate(issue.date)}
                  pictureUrl={issue.imageUrl}
                  href={`/newspaper/${issue.slug}`}
                />
              ))}
            </div>
            {hasMore && (
              <button
                onClick={() => setVisibleCount((c) => c + 10)}
                className="type-h4 text-black text-center w-full"
              >
                {t("loadMore")}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
