"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useRouter } from "../../../i18n/navigation";
import { supabase } from "../../../lib/supabase";

// NOTE: This component is a UX-only gate. The real security boundary is
// Supabase RLS — even if someone bypasses this client check, the database
// will reject INSERTs/UPDATEs because is_admin() returns false for them.
type GateStatus = "loading" | "not_admin" | "ok";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<GateStatus>("loading");

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (error || !data || data.role !== "admin") {
          setStatus("not_admin");
        } else {
          setStatus("ok");
        }
      });
  }, [user, authLoading, router]);

  if (status === "loading") {
    return <div className="type-body text-gray-2 py-10">Checking permissions…</div>;
  }

  if (status === "not_admin") {
    return (
      <div className="flex flex-col gap-3 py-10">
        <h2 className="type-h3 text-black">Not Authorized</h2>
        <p className="type-body text-gray-2">
          Admin access is required to view this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
