"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Form {
  id: string;
  title: string;
  token: string;
  createdAt: string;
}

export default function AdminFormsPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let attempts = 0;
    function checkTokenAndFetch() {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("admin-token")
          : null;
      if (!token) {
        if (attempts < 10) {
          attempts++;
          timeout = setTimeout(checkTokenAndFetch, 100);
          return;
        } else {
          router.replace("/admin/login");
          return;
        }
      }
      async function fetchForms() {
        setLoading(true);
        setError("");
        try {
          const res = await fetch("/api/admin/forms", {
            headers: { Authorization: `Bearer ${token}` },
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
    }
    checkTokenAndFetch();
    return () => clearTimeout(timeout);
  }, [router]);

  async function handleDelete(formToken: string) {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("admin-token")
        : null;
    if (!token) {
      alert("Not authenticated");
      return;
    }
    if (!confirm("Are you sure you want to delete this form?")) return;
    try {
      const res = await fetch(`/api/admin/forms/${formToken}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete form");
      }
      setForms(forms.filter((f) => f.token !== formToken));
    } catch (err: any) {
      alert(err.message || "Failed to delete form");
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Form Management</h1>
      <div className="flex items-center gap-4 mb-6">
        <button
          className="btn btn-primary"
          onClick={() => router.push("/admin/forms/new")}
          type="button"
        >
          New form
        </button>
      </div>
      {loading && <div>Loading forms...</div>}
      {error && <div className="text-error mb-4">{error}</div>}
      {!loading && !error && (
        <ul className="space-y-4">
          {forms.length === 0 && <li>No forms found.</li>}
          {forms.map((form) => (
            <li
              key={form.id}
              className="p-4 bg-base-100 rounded shadow flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-lg">
                  <a
                    href={`/form/${form.token}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-primary"
                  >
                    {form.title}
                  </a>
                </div>
                {form.createdAt && (
                  <div className="text-xs text-gray-400 mb-1">
                    Created: {new Date(form.createdAt).toLocaleString()}
                  </div>
                )}
              </div>
              <button
                className="btn btn-ghost btn-sm text-error ml-4"
                title="Delete form"
                onClick={() => handleDelete(form.token)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
