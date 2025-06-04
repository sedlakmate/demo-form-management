"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Field = {
  id: string;
  label: string;
  type: string;
  required: boolean;
  order: number;
  default?: string;
};

type Section = {
  id: string;
  title: string;
  order: number;
  fields: Field[];
};

type Form = {
  id: string;
  title: string;
  description?: string;
  sections: Section[];
};

type ResponseData = Record<string, string>;

export default function PublicFormPage() {
  const { token } = useParams<{ token: string }>();
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [responses, setResponses] = useState<ResponseData>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  useEffect(() => {
    async function fetchForm() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/public/form/${token}`);
        if (!res.ok) throw new Error("Form not found or expired.");
        const data = await res.json();
        setForm(data);
      } catch (err: any) {
        setError(err.message || "Failed to load form.");
      } finally {
        setLoading(false);
      }
    }

    if (token) fetchForm();
  }, [token]);

  if (loading) return <div className="p-8">Loading form...</div>;
  if (error) return <div className="p-8 text-error">{error}</div>;
  if (!form) return null;

  const section = form.sections[sectionIdx];
  if (!section) return <div className="p-8 text-error">Section not found.</div>;

  function handleFieldChange(fieldId: string, value: string) {
    setResponses((prev) => ({ ...prev, [fieldId]: value }));
  }

  function handleNext() {
    setSectionIdx((idx) => idx + 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitMsg("");
    try {
      const res = await fetch(`/api/public/form/${token}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: responses }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitMsg("Thank you for your submission!");
      } else {
        setSubmitMsg(data.error || "Submission failed.");
      }
    } catch (err: any) {
      setSubmitMsg(err.message || "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
      {form.description && (
        <div className="mb-4 text-gray-500">{form.description}</div>
      )}
      <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (sectionIdx === form.sections.length - 1) handleSubmit();
          else handleNext();
        }}
      >
        {section.fields.map((field) => (
          <div className="mb-4" key={field.id}>
            <label className="block mb-1 font-semibold">
              {field.label}
              {field.required && " *"}
            </label>
            <input
              className="input input-bordered w-full"
              type={field.type === "TEXT" ? "text" : field.type.toLowerCase()}
              required={field.required}
              value={responses[field.id] || ""}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
          </div>
        ))}
        <div className="flex gap-2 mt-6">
          {sectionIdx > 0 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSectionIdx((idx) => idx - 1)}
              disabled={submitting}
            >
              Previous
            </button>
          )}
          <button
            className="btn btn-primary"
            type="submit"
            disabled={submitting}
          >
            {sectionIdx === form.sections.length - 1
              ? submitting
                ? "Submitting..."
                : "Submit"
              : "Next"}
          </button>
        </div>
      </form>
      {submitMsg && <div className="mt-6 text-success">{submitMsg}</div>}
    </div>
  );
}
