import AdminResourceTable from "../../components/admin/AdminResourceTable.jsx";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// prayers/times only supports GET (list) and POST (upsert by month) — there
// is no PATCH or DELETE by id. "Editing" a month really means re-submitting
// that month's POST, so editUsesPost=true, and deletion isn't offered
// because the backend has no route for it.
const PrayerTimesAdmin = () => (
  <AdminResourceTable
    title="প্রার্থনার সময়"
    endpoint="/prayers/times"
    editUsesPost
    allowDelete={false}
    columns={[
      { key: "month", label: "মাস" },
      { key: "morningTime", label: "প্রাতঃকাল" },
      { key: "eveningTime", label: "সন্ধ্যাকাল" }
    ]}
    fields={[
      { name: "month", label: "মাস", type: "select", required: true, options: MONTHS.map((m) => ({ value: m, label: m })) },
      { name: "morningTime", label: "প্রাতঃকালের সময়", type: "text", required: true, half: true },
      { name: "eveningTime", label: "সন্ধ্যাকালের সময়", type: "text", required: true, half: true }
    ]}
  />
);

export default PrayerTimesAdmin;
