import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import api from "../../api/axios.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

const emptyForm = {
  deity: "",
  titleBengali: "", titleHindi: "", titleEnglish: "",
  contentBengali: "", contentHindi: "", contentEnglish: ""
};

const StoriesAdmin = () => {
  const { t, pickContent } = useLanguage();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingImages, setEditingImages] = useState([]); // existing images when editing
  const [form, setForm] = useState(emptyForm);
  const [newFiles, setNewFiles] = useState([]); // File[] picked for this save
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.get("/stories")
      .then((res) => setRows(res.data.data))
      .catch(() => setError(t("songs.loadError")))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditingId(null);
    setEditingImages([]);
    setForm(emptyForm);
    setNewFiles([]);
    setShowForm(true);
  };

  const openEdit = (row) => {
    setEditingId(row._id);
    setEditingImages(row.images || []);
    setForm({
      deity: row.deity || "",
      titleBengali: row.title?.bengali || "", titleHindi: row.title?.hindi || "", titleEnglish: row.title?.english || "",
      contentBengali: row.content?.bengali || "", contentHindi: row.content?.hindi || "", contentEnglish: row.content?.english || ""
    });
    setNewFiles([]);
    setShowForm(true);
  };

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const buildFormData = () => {
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    newFiles.forEach((file) => data.append("images", file));
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && newFiles.length === 0) {
      setError(t("admin.storiesAtLeastOneImage"));
      return;
    }

    setSaving(true);
    setError("");
    try {
      const data = buildFormData();
      if (editingId) {
        await api.patch(`/stories/${editingId}`, data, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await api.post("/stories", data, { headers: { "Content-Type": "multipart/form-data" } });
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || t("admin.storiesSaveFailed"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t("admin.storiesDeleteConfirm"))) return;
    try {
      await api.delete(`/stories/${id}`);
      load();
    } catch {
      setError(t("admin.storiesDeleteFailed"));
    }
  };

  // Removes one image from an already-saved story immediately (separate
  // from the main save, so a partial edit never accidentally wipes the
  // rest of the gallery — matches the backend's deleteStoryImage endpoint).
  const handleRemoveExistingImage = async (publicId) => {
    if (!editingId) return;
    if (!window.confirm(t("admin.storiesDeleteConfirm"))) return;
    try {
      const res = await api.delete(`/stories/${editingId}/images/${encodeURIComponent(publicId)}`);
      setEditingImages(res.data.data.images);
      load();
    } catch {
      setError(t("admin.storiesDeleteFailed"));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0" style={{ color: "var(--color-maroon-dark)" }}>{t("admin.stories")}</h2>
        <button className="btn btn-marigold d-inline-flex align-items-center gap-2" onClick={openCreate}>
          <FaPlus /> {t("admin.storiesCreate")}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="card-devotional p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{editingId ? t("admin.storiesEdit") : t("admin.storiesCreate")}</h5>
            <button type="button" className="btn btn-sm btn-light" onClick={() => setShowForm(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label">{t("admin.storiesDeity")}</label>
              <input
                className="form-control"
                required
                value={form.deity}
                onChange={(e) => handleChange("deity", e.target.value)}
                placeholder="Krishna, Radha, Anukul Thakur..."
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">{t("admin.storiesImages")}</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="form-control"
                onChange={(e) => setNewFiles(Array.from(e.target.files))}
              />
            </div>

            {editingImages.length > 0 && (
              <div className="col-12">
                <div className="d-flex gap-2 flex-wrap">
                  {editingImages.map((img) => (
                    <div key={img.publicId} style={{ position: "relative" }}>
                      <img src={img.url} alt="" style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8 }} />
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        style={{ position: "absolute", top: -8, right: -8, padding: "2px 6px", borderRadius: "50%" }}
                        onClick={() => handleRemoveExistingImage(img.publicId)}
                        title={t("admin.storiesRemoveImage")}
                      >
                        <FaTrash size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="col-12 col-md-4">
              <label className="form-label">{t("admin.storiesTitleBengali")}</label>
              <input className="form-control" value={form.titleBengali} onChange={(e) => handleChange("titleBengali", e.target.value)} />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label">{t("admin.storiesTitleHindi")}</label>
              <input className="form-control" value={form.titleHindi} onChange={(e) => handleChange("titleHindi", e.target.value)} />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label">{t("admin.storiesTitleEnglish")}</label>
              <input className="form-control" value={form.titleEnglish} onChange={(e) => handleChange("titleEnglish", e.target.value)} />
            </div>

            <div className="col-12">
              <label className="form-label">{t("admin.storiesContentBengali")}</label>
              <textarea className="form-control" rows={6} value={form.contentBengali} onChange={(e) => handleChange("contentBengali", e.target.value)} />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">{t("admin.storiesContentHindi")}</label>
              <textarea className="form-control" rows={4} value={form.contentHindi} onChange={(e) => handleChange("contentHindi", e.target.value)} />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">{t("admin.storiesContentEnglish")}</label>
              <textarea className="form-control" rows={4} value={form.contentEnglish} onChange={(e) => handleChange("contentEnglish", e.target.value)} />
            </div>
          </div>

          <button type="submit" className="btn btn-marigold mt-4" disabled={saving}>
            {saving ? t("common.loading") : t("common.save")}
          </button>
        </form>
      )}

      {loading ? (
        <p>{t("common.loading")}</p>
      ) : (
        <div className="table-responsive card-devotional p-3">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th></th>
                <th>{t("admin.storiesDeity")}</th>
                <th>{t("stories.title")}</th>
                <th style={{ width: 100 }}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row._id}>
                  <td style={{ width: 56 }}>
                    {row.images?.[0]?.url && (
                      <img src={row.images[0].url} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 6 }} />
                    )}
                  </td>
                  <td>{row.deity}</td>
                  <td>{pickContent(row.title) || pickContent(row.content).slice(0, 50)}</td>
                  <td className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-maroon" onClick={() => openEdit(row)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(row._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <p className="text-secondary text-center py-3 mb-0">{t("stories.empty")}</p>}
        </div>
      )}
    </div>
  );
};

export default StoriesAdmin;
