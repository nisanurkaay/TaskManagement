import { useEffect, useState } from "react";
import { getSummary, SummaryResponse } from "../api/SummaryApi";

export const useSummary = (
  type: "task" | "habit",
  scope: "daily" | "weekly" | "monthly",
  category?: string
) => {
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getSummary(type, scope, category);
        setData(res);
      } catch (err) {
        console.error("Summary getirilemedi:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [type, scope, category]);

  return { data, loading };
};
