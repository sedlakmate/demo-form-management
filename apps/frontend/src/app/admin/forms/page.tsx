"use client";
import { useEffect, useState } from "react";

interface Form {
  id: string;
  title: string;
  description?: string;
  createdAt?: string;
}

export default function AdminFormsPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchForms() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("admin-token");
        const res = await fetch("/api/admin/forms", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch forms");
        }
        const data = await res.json();
        setForms(data.forms || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch forms");
      } finally {
        setLoading(false);
      }
    }
    fetchForms();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Form Management</h1>
      {loading && <div>Loading forms...</div>}
      {error && <div className="text-error mb-4">{error}</div>}
      {!loading && !error && (
        <ul className="space-y-4">
          {forms.length === 0 && <li>No forms found.</li>}
          {forms.map((form) => (
            <li key={form.id} className="p-4 bg-base-100 rounded shadow">
              <div className="font-semibold text-lg">{form.title}</div>
              {form.createdAt && (
                <div className="text-xs text-gray-400 mb-1">
                  Created: {new Date(form.createdAt).toLocaleString()}
                </div>
              )}
              {form.description && (
                <div className="text-sm text-gray-500">{form.description}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
