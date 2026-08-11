import { useState } from "react";
import AdminResourceTable from "../../components/admin/AdminResourceTable.jsx";

const BOOKS = [
  { value: "satyanusaran", label: "সত্যানুসরণ" },
  { value: "narir_niti", label: "নারীর নীতি" }
];

// Scriptures are per-book (order is auto-assigned server-side by upload
// sequence — see scripture.controller.js), so this page filters by book
// via a tab, then reuses the generic table scoped to that book's endpoint.
const ScripturesAdmin = () => {
  const [book, setBook] = useState("satyanusaran");

  return (
    <div>
      <div className="d-flex gap-2 mb-4">
        {BOOKS.map((b) => (
          <button
            key={b.value}
            className={`btn ${book === b.value ? "btn-marigold" : "btn-outline-maroon"}`}
            onClick={() => setBook(b.value)}
          >
            {b.label}
          </button>
        ))}
      </div>

      <AdminResourceTable
        key={book}
        title={BOOKS.find((b) => b.value === book).label}
        endpoint={`/scriptures/${book}`}
        createEndpoint="/scriptures"
        getUpdateEndpoint={(id) => `/scriptures/paragraph/${id}`}
        getDeleteEndpoint={(id) => `/scriptures/paragraph/${id}`}
        columns={[
          { key: "number", label: "নম্বর", render: (row) => row.number ?? "—" },
          { key: "title", label: "শিরোনাম" },
          { key: "content", label: "অনুচ্ছেদ", render: (row) => (row.content || "").slice(0, 60) + "..." }
        ]}
        fields={[
          { name: "number", label: "অনুচ্ছেদ নম্বর (নারীর নীতির জন্য)", type: "number", half: true },
          { name: "title", label: "শিরোনাম", type: "text", half: true },
          { name: "content", label: "অনুচ্ছেদ", type: "textarea", rows: 6, required: true }
        ]}
        buildPayload={(v) => ({
          book,
          number: v.number === "" ? undefined : Number(v.number),
          title: v.title,
          content: v.content
        })}
      />
    </div>
  );
};

export default ScripturesAdmin;
