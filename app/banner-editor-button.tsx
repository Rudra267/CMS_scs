"use client";

import { useEffect, useState, type ChangeEvent } from "react";

type Banner = {
  id: number;
  imageName: string;
  imagePreview: string;
  heading: string;
  subText: string;
  buttonText: string;
  cmsPage: string;
  order: number;
  active: boolean;
  branchName: string;
};

const initialBanner: Banner = {
  id: 1,
  imageName: "",
  imagePreview: "",
  heading: "EDUCATION FOR THE NEXT GENERATION",
  subText: "Empowering Future Innovators, Leaders & Global Citizens",
  buttonText: "Explore Campus",
  cmsPage: "HOME",
  order: 1,
  active: true,
  branchName: "Corporate",
};

const emptyBanner = (id: number, order: number): Banner => ({
  id,
  imageName: "",
  imagePreview: "",
  heading: "",
  subText: "",
  buttonText: "",
  cmsPage: "HOME",
  order,
  active: true,
  branchName: "",
});

export default function BannerEditorButton() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"list" | "edit">("list");
  const [banners, setBanners] = useState<Banner[]>([initialBanner]);
  const [draft, setDraft] = useState<Banner | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (view === "edit") setView("list");
        else setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, view]);

  const startUpdate = (banner: Banner) => {
    setDraft({ ...banner });
    setIsNew(false);
    setView("edit");
  };

  const startNew = () => {
    setDraft(emptyBanner(Date.now(), banners.length + 1));
    setIsNew(true);
    setView("edit");
  };

  const updateDraft = (updates: Partial<Banner>) => {
    setDraft((current) => current ? { ...current, ...updates } : current);
  };

  const selectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    updateDraft({ imageName: file.name, imagePreview: URL.createObjectURL(file) });
  };

  const saveDraft = () => {
    if (!draft) return;
    setBanners((current) => isNew
      ? [...current, draft].sort((a, b) => a.order - b.order)
      : current.map((banner) => banner.id === draft.id ? draft : banner).sort((a, b) => a.order - b.order));
    setView("list");
    setDraft(null);
  };

  const deleteBanner = (id: number) => {
    setBanners((current) => current.filter((banner) => banner.id !== id));
  };

  const closeModal = () => {
    setOpen(false);
    setView("list");
    setDraft(null);
  };

  return (
    <>
      <button className="edit-button" type="button" onClick={() => { setView("list"); setOpen(true); }}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5 4 4M4 20l4-.8L20 7a2.1 2.1 0 0 0-3-3L5 16z"/><path d="M13 20h8"/></svg>
        <span>Edit</span>
      </button>
      {open && (
        <div className="banner-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
          <section className="banner-modal" role="dialog" aria-modal="true" aria-labelledby="banner-modal-title">
            <header className="banner-modal-header">
              {view === "list" ? <div><p className="banner-modal-eyebrow">HOMEPAGE CONTENT</p><h2 id="banner-modal-title">Manage banners</h2><p className="banner-modal-description">Review and update the slides shown on the corporate homepage.</p></div> : <div><button type="button" className="banner-back-button" onClick={() => setView("list")}>‹ &nbsp; All banners</button><h2 id="banner-modal-title">{isNew ? "Create banner" : "Update banner"}</h2><p className="banner-modal-description">Edit the banner content, placement, and visibility.</p></div>}
              <button className="banner-modal-close" type="button" aria-label="Close banner editor" onClick={closeModal}>×</button>
            </header>

            {view === "list" ? (
              <>
                <div className="banner-modal-toolbar"><span>{banners.length} {banners.length === 1 ? "banner" : "banners"}</span><button type="button" className="banner-new-button" onClick={startNew}><span aria-hidden="true">+</span> New banner</button></div>
                <div className="banner-table-wrap">
                  {banners.length ? <table className="banner-table">
                    <thead><tr><th>#</th><th>Branch name</th><th>CMS page</th><th>Banner</th><th>Banner order</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>{banners.map((banner, index) => <tr key={banner.id}>
                      <td>{index + 1}</td>
                      <td>{banner.branchName || "—"}</td>
                      <td>{banner.cmsPage || "—"}</td>
                      <td><div className="banner-table-image" style={banner.imagePreview ? { backgroundImage: `url("${banner.imagePreview}")` } : undefined}>{!banner.imagePreview && <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>}</div><span className="banner-table-heading">{banner.heading || "Untitled banner"}</span></td>
                      <td>{banner.order}</td>
                      <td><span className={`banner-table-status ${banner.active ? "is-active" : "is-inactive"}`}><i/>{banner.active ? "Active" : "Inactive"}</span></td>
                      <td><div className="banner-table-actions"><button type="button" className="banner-update-button" onClick={() => startUpdate(banner)}>Update</button><button type="button" className="banner-delete-button" onClick={() => deleteBanner(banner.id)}>Delete</button></div></td>
                    </tr>)}</tbody>
                  </table> : <div className="banner-empty-state"><strong>No banners yet</strong><span>Create a banner to add a slide to the homepage.</span></div>}
                </div>
                <footer className="banner-modal-footer"><button type="button" className="banner-cancel-button" onClick={closeModal}>Close</button></footer>
              </>
            ) : draft && (
              <>
                <div className="banner-editor-list">
                  <article className="banner-editor-card">
                    <div className="banner-editor-card-heading"><div><span className="banner-order-badge">{String(draft.order).padStart(2, "0")}</span><strong>{draft.heading || "New banner details"}</strong></div><button type="button" className={`banner-status ${draft.active ? "is-active" : "is-inactive"}`} onClick={() => updateDraft({ active: !draft.active })}><i/>{draft.active ? "Active" : "Inactive"}</button></div>
                    <div className="banner-form-grid">
                      <label className="banner-field banner-image-field"><span>Image</span><div className="banner-upload-control">
                        <div className="banner-image-preview" style={draft.imagePreview ? { backgroundImage: `url("${draft.imagePreview}")` } : undefined}>{!draft.imagePreview && <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>}</div>
                        <span className="banner-upload-copy"><strong>{draft.imageName || "Choose banner image"}</strong><small>PNG, JPG or WebP</small></span><span className="banner-browse-button">Browse</span>
                        <input type="file" accept="image/*" aria-label="Upload banner image" onChange={selectImage} />
                      </div></label>
                      <label className="banner-field"><span>Heading text</span><input value={draft.heading} onChange={(event) => updateDraft({ heading: event.target.value })} placeholder="Add a heading" /></label>
                      <label className="banner-field"><span>Button text</span><input value={draft.buttonText} onChange={(event) => updateDraft({ buttonText: event.target.value })} placeholder="e.g. Explore Campus" /></label>
                      <label className="banner-field banner-subtext-field"><span>Subtext</span><textarea value={draft.subText} onChange={(event) => updateDraft({ subText: event.target.value })} placeholder="Add supporting text" rows={2} /></label>
                      <label className="banner-field"><span>Branch name</span><input value={draft.branchName} onChange={(event) => updateDraft({ branchName: event.target.value })} placeholder="e.g. Corporate" /></label>
                      <label className="banner-field"><span>CMS page</span><input value={draft.cmsPage} onChange={(event) => updateDraft({ cmsPage: event.target.value })} placeholder="e.g. HOME" /></label>
                      <label className="banner-field"><span>Banner order</span><input type="number" min="1" value={draft.order} onChange={(event) => updateDraft({ order: Number(event.target.value) })} /></label>
                    </div>
                  </article>
                </div>
                <footer className="banner-modal-footer"><button type="button" className="banner-cancel-button" onClick={() => setView("list")}>Cancel</button><button type="button" className="banner-save-button" onClick={saveDraft}>{isNew ? "Create banner" : "Update banner"}</button></footer>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
