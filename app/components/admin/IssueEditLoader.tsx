"use client";

import { useState, useEffect } from "react";
import { IssueEditForm } from "./IssueEditForm";
import { supabase } from "../../../lib/supabase";
import type { Issue } from "../../../lib/types";

interface Props {
  slug: string;
}

export function IssueEditLoader({ slug }: Props) {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    supabase
      .from("issues")
      .select("*")
      .eq("slug", slug)
      .single()
      .then(({ data, error }) => {
        setLoading(false);
        if (error || !data) setNotFound(true);
        else setIssue(data as Issue);
      });
  }, [slug]);

  if (loading) return <p className="type-body text-gray-3">Loading…</p>;
  if (notFound)
    return (
      <p className="type-body text-gray-3">
        No issue found with slug <code>{slug}</code>.
      </p>
    );
  if (issue) return <IssueEditForm issue={issue} />;
  return null;
}
