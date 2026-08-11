import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import AdminResourceTable from "../../components/admin/AdminResourceTable.jsx";

// Note: GET /songs (used for this admin list too) only ever returns
// isPublished: true songs — the backend has no admin override for that
// filter yet. Newly created songs default to published, so they'll show
// up here; if you later add an "unpublish" toggle, unpublished songs
// will disappear from this list too until that's addressed backend-side.
const SongsAdmin = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data.data)).catch(() => {});
  }, []);

  const categoryOptions = categories.map((c) => ({ value: c._id, label: c.name }));

  return (
    <AdminResourceTable
      title="গান"
      endpoint="/songs"
      columns={[
        { key: "title", label: "শিরোনাম" },
        { key: "category", label: "ক্যাটাগরি", render: (row) => row.category?.name || "—" },
        { key: "language", label: "ভাষা", render: (row) => row.language?.join(", ") }
      ]}
      fields={[
        { name: "title", label: "শিরোনাম", type: "text", required: true, half: true },
        { name: "category", label: "ক্যাটাগরি", type: "select", required: true, half: true,
          options: categoryOptions, getValue: (row) => row.category?._id || row.category || "" },
        { name: "lyricsBengali", label: "লিরিক্স (বাংলা)", type: "textarea", rows: 5, getValue: (row) => row.lyrics?.bengali || "" },
        { name: "lyricsHindi", label: "লিরিক্স (হিন্দি)", type: "textarea", rows: 3, getValue: (row) => row.lyrics?.hindi || "" },
        { name: "lyricsEnglish", label: "লিরিক্স (ইংরেজি)", type: "textarea", rows: 3, getValue: (row) => row.lyrics?.english || "" },
        { name: "isPublished", label: "প্রকাশিত", type: "checkbox", getValue: (row) => row.isPublished ?? true }
      ]}
      buildPayload={(v) => ({
        title: v.title,
        category: v.category,
        lyrics: { bengali: v.lyricsBengali, hindi: v.lyricsHindi, english: v.lyricsEnglish },
        isPublished: v.isPublished
      })}
    />
  );
};

export default SongsAdmin;
