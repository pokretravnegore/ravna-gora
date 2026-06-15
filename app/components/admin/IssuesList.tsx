"use client";

import { useState, useEffect, useCallback } from "react";
import { Link } from "../../../i18n/navigation";
import { supabase } from "../../../lib/supabase";
import type { Issue } from "../../../lib/types";

export function IssuesList() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  const fetchIssues = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("issues")
      .select("*")
      .order("issue_number", { ascending: false });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    setIssues((data as Issue[]) ?? []);
  }, []);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  async function togglePublished(issue: Issue) {
    setToggling(issue.id);
    const { error: err } = await supabase
      .from("issues")
      .update({ published: !issue.published })
      .eq("id", issue.id);
    setToggling(null);
    if (err) {
      setError(err.message);
      return;
    }
    setIssues((prev) =>
      prev.map((i) =>
        i.id === issue.id ? { ...i, published: !issue.published } : i
      )
    );
  }

  if (loading) {
    return <p className="type-body text-gray-3">Loading issues…</p>;
  }

  if (error) {
    return (
      <div className="flex flex-col gap-2">
        <p className="type-caption text-red-600">{error}</p>
        <button
          onClick={fetchIssues}
          className="type-caption text-blue-2 hover:underline self-start"
        >
          Retry
        </button>
      </div>
    );
  }

  if (issues.length === 0) {
    return <p className="type-body text-gray-3">No issues yet.</p>;
  }

  return (
    <div className="flex flex-col divide-y divide-black/10 border border-black/10">
      {issues.map((issue) => {
        const busy = toggling === issue.id;
        return (
          <div key={issue.id} className="flex items-center gap-4 px-4 py-3 flex-wrap">
            {/* Clickable area: number + title/date */}
            <Link
              href={`/admin/issues/${issue.slug}`}
              className="flex items-center gap-4 flex-1 min-w-0 hover:opacity-70 transition-opacity"
            >
              <span className="type-ui-medium text-black w-10 shrink-0 text-right">
                #{issue.issue_number}
              </span>
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="type-ui-medium text-black truncate">
                  {issue.title ?? issue.slug}
                </p>
                <p className="type-caption text-gray-3">{issue.issue_date}</p>
              </div>
            </Link>

            {/* Status badge */}
            <span
              className={`type-caption px-2 py-0.5 shrink-0 ${
                issue.published
                  ? "bg-green-100 text-green-800"
                  : "bg-black/5 text-gray-2"
              }`}
            >
              {issue.published ? "Published" : "Draft"}
            </span>

            {/* Toggle button */}
            <button
              onClick={() => togglePublished(issue)}
              disabled={busy}
              className="cursor-pointer border border-black/20 type-caption text-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors disabled:opacity-50 shrink-0"
            >
              {busy ? "Saving…" : issue.published ? "Unpublish" : "Publish"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
