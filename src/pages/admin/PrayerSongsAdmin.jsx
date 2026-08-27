import AdminResourceTable from "../../components/admin/AdminResourceTable.jsx";

// Manages the shared PrayerSong pool (POST /prayer-songs). Assigning which
// of these appear in morning/evening, and in what order, happens on the
// separate "প্রার্থনার ক্রম" (Prayer Order) page.
const PrayerSongsAdmin = () => (
  <AdminResourceTable
    title="প্রার্থনার গান"
    endpoint="/prayer-songs"
    columns={[
      { key: "title", label: "শিরোনাম" },
      { key: "language", label: "ভাষা", render: (row) => row.language?.join(", ") }
    ]}
    fields={[
      { name: "title", label: "শিরোনাম", type: "text", required: true },
      { name: "lyricsBengali", label: "লিরিক্স (বাংলা) — খালি রাখলে অন্য ভাষা থেকে auto-fill হবে", type: "textarea", rows: 5, getValue: (row) => row.lyrics?.bengali || "" },
      { name: "lyricsHindi", label: "লিরিক্স (হিন্দি)", type: "textarea", rows: 3, getValue: (row) => row.lyrics?.hindi || "" },
      { name: "lyricsEnglish", label: "লিরিক্স (ইংরেজি)", type: "textarea", rows: 3, getValue: (row) => row.lyrics?.english || "" }
    ]}
    buildPayload={(v) => ({
      title: v.title,
      lyrics: { bengali: v.lyricsBengali, hindi: v.lyricsHindi, english: v.lyricsEnglish }
    })}
  />
);

export default PrayerSongsAdmin;
