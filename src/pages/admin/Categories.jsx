import AdminResourceTable from "../../components/admin/AdminResourceTable.jsx";

const Categories = () => (
  <AdminResourceTable
    title="ক্যাটাগরি"
    endpoint="/categories"
    columns={[
      { key: "name", label: "নাম" },
      { key: "description", label: "বিবরণ" }
    ]}
    fields={[
      { name: "name", label: "নাম", type: "text", required: true },
      { name: "description", label: "বিবরণ", type: "textarea" }
    ]}
  />
);

export default Categories;
