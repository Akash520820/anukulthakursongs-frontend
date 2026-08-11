import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import api from "../../api/axios.js";

/*
 * Generic admin CRUD table — reused for Categories, PrayerTimes,
 * PrayerSongs, and Scriptures, instead of writing near-identical
 * list/create/edit/delete pages five times.
 *
 * props:
 *  - title: heading text
 *  - endpoint: base API path, e.g. "/categories"
 *  - columns: [{ key, label, render?(row) }]  — what shows in the table
 *  - fields:  [{ name, label, type: "text"|"textarea"|"number"|"select"|"checkbox",
 *               options?: [{value,label}], required? }] — the create/edit form
 *  - idField: defaults to "_id"
 *  - buildPayload(values): optional — override how form values become the
 *    request body, needed when the API expects a nested shape (e.g.
 *    { lyrics: { bengali, hindi, english } } instead of flat fields)
 *  - createEndpoint: defaults to `endpoint` — override when list/create
 *    live at different paths (e.g. scriptures: list is /scriptures/:book,
 *    create is /scriptures)
 *  - getUpdateEndpoint(id) / getDeleteEndpoint(id): default to
 *    `${endpoint}/${id}` — override when item routes live elsewhere
 *  - editUsesPost: true when there's no PATCH-by-id route and "editing"
 *    really means re-POSTing an upsert (e.g. prayer times, keyed by month)
 *  - allowDelete: false hides the delete button when no DELETE route exists
 */
const AdminResourceTable = ({
  title, endpoint, columns, fields, idField = "_id", buildPayload,
  createEndpoint, getUpdateEndpoint, getDeleteEndpoint,
  editUsesPost = false, allowDelete = true
}) => {
  const resolvedCreateEndpoint = createEndpoint || endpoint;
  const resolvedUpdateEndpoint = getUpdateEndpoint || ((id) => `${endpoint}/${id}`);
  const resolvedDeleteEndpoint = getDeleteEndpoint || ((id) => `${endpoint}/${id}`);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [saving, setSaving] = useState(false);

  const emptyForm = () =>
    fields.reduce((acc, f) => ({ ...acc, [f.name]: f.type === "checkbox" ? false : "" }), {});

  const load = () => {
    setLoading(true);
    api.get(endpoint)
      .then((res) => setRows(res.data.data))
      .catch(() => setError("তালিকা লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  };

  useEffect(load, [endpoint]);

  const openCreate = () => {
    setEditingId(null);
    setFormValues(emptyForm());
    setShowForm(true);
  };

  const openEdit = (row) => {
    setEditingId(row[idField]);
    const values = {};
    fields.forEach((f) => {
      values[f.name] = f.getValue ? f.getValue(row) : (row[f.name] ?? (f.type === "checkbox" ? false : ""));
    });
    setFormValues(values);
    setShowForm(true);
  };

  const handleChange = (field, value) => setFormValues((v) => ({ ...v, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = buildPayload
        ? buildPayload(formValues)
        : fields.reduce((acc, f) => {
            acc[f.name] = f.parse ? f.parse(formValues[f.name]) : formValues[f.name];
            return acc;
          }, {});

      if (editingId && !editUsesPost) {
        await api.patch(resolvedUpdateEndpoint(editingId), payload);
      } else {
        await api.post(resolvedCreateEndpoint, payload);
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "সংরক্ষণ ব্যর্থ হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("আপনি কি নিশ্চিত মুছে ফেলতে চান?")) return;
    try {
      await api.delete(resolvedDeleteEndpoint(id));
      load();
    } catch {
      setError("মুছে ফেলা যায়নি।");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0" style={{ color: "var(--color-maroon-dark)" }}>{title}</h2>
        <button className="btn btn-marigold d-inline-flex align-items-center gap-2" onClick={openCreate}>
          <FaPlus /> নতুন যোগ করুন
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="card-devotional p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{editingId ? "সম্পাদনা করুন" : "নতুন যোগ করুন"}</h5>
            <button type="button" className="btn btn-sm btn-light" onClick={() => setShowForm(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="row g-3">
            {fields.map((f) => (
              <div className={`col-12 ${f.half ? "col-md-6" : ""}`} key={f.name}>
                <label className="form-label">{f.label}</label>

                {f.type === "textarea" && (
                  <textarea
                    className="form-control"
                    rows={f.rows || 3}
                    required={f.required}
                    value={formValues[f.name] ?? ""}
                    onChange={(e) => handleChange(f.name, e.target.value)}
                  />
                )}

                {f.type === "select" && (
                  <select
                    className="form-select"
                    required={f.required}
                    value={formValues[f.name] ?? ""}
                    onChange={(e) => handleChange(f.name, e.target.value)}
                  >
                    <option value="">নির্বাচন করুন</option>
                    {f.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                )}

                {f.type === "checkbox" && (
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={!!formValues[f.name]}
                      onChange={(e) => handleChange(f.name, e.target.checked)}
                    />
                  </div>
                )}

                {(!f.type || f.type === "text" || f.type === "number") && (
                  <input
                    type={f.type === "number" ? "number" : "text"}
                    className="form-control"
                    required={f.required}
                    value={formValues[f.name] ?? ""}
                    onChange={(e) => handleChange(f.name, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-marigold mt-4" disabled={saving}>
            {saving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
          </button>
        </form>
      )}

      {loading ? (
        <p>লোড হচ্ছে...</p>
      ) : (
        <div className="table-responsive card-devotional p-3">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                {columns.map((c) => <th key={c.key}>{c.label}</th>)}
                <th style={{ width: 100 }}>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[idField]}>
                  {columns.map((c) => (
                    <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>
                  ))}
                  <td className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-maroon" onClick={() => openEdit(row)}>
                      <FaEdit />
                    </button>
                    {allowDelete && (
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(row[idField])}>
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <p className="text-secondary text-center py-3 mb-0">কোনো তথ্য নেই।</p>}
        </div>
      )}
    </div>
  );
};

export default AdminResourceTable;
