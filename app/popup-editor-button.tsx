"use client";

import { useEffect, useState, type ChangeEvent } from "react";

type Popup = {
  id: number;
  branchName: string;
  heading: string;
  backgroundImageName: string;
  backgroundImagePreview: string;
  bannerImageName: string;
  bannerImagePreview: string;
  info: string;
  link: string;
  active: boolean;
};

const initialPopups: Popup[] = [
  { id: 1, branchName: "Corporate", heading: "", backgroundImageName: "", backgroundImagePreview: "", bannerImageName: "", bannerImagePreview: "", info: "", link: "https://srichaitanyaschool.net/online-fee-payment", active: true },
  { id: 2, branchName: "Corporate", heading: "", backgroundImageName: "", backgroundImagePreview: "", bannerImageName: "", bannerImagePreview: "", info: "", link: "", active: false },
];

const emptyPopup = (id: number): Popup => ({ id, branchName: "", heading: "", backgroundImageName: "", backgroundImagePreview: "", bannerImageName: "", bannerImagePreview: "", info: "", link: "", active: true });

function ImageCell({ preview, label }: { preview: string; label: string }) {
  return <div className="popup-table-image" style={preview ? { backgroundImage: `url("${preview}")` } : undefined} aria-label={label}>{!preview && <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>}</div>;
}

export default function PopupEditorButton() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"list" | "edit">("list");
  const [popups, setPopups] = useState<Popup[]>(initialPopups);
  const [draft, setDraft] = useState<Popup | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") view === "edit" ? setView("list") : closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const closeModal = () => { setOpen(false); setView("list"); setDraft(null); };
  const updateDraft = (updates: Partial<Popup>) => setDraft((current) => current ? { ...current, ...updates } : current);
  const startUpdate = (popup: Popup) => { setDraft({ ...popup }); setIsNew(false); setView("edit"); };
  const startNew = () => { setDraft(emptyPopup(Date.now())); setIsNew(true); setView("edit"); };
  const selectImage = (key: "background" | "banner", event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    updateDraft(key === "background" ? { backgroundImageName: file.name, backgroundImagePreview: URL.createObjectURL(file) } : { bannerImageName: file.name, bannerImagePreview: URL.createObjectURL(file) });
  };
  const saveDraft = () => {
    if (!draft) return;
    setPopups((current) => isNew ? [...current, draft] : current.map((popup) => popup.id === draft.id ? draft : popup));
    setDraft(null);
    setView("list");
  };

  return <>
    <button className="edit-button" type="button" onClick={() => { setView("list"); setOpen(true); }}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5 4 4M4 20l4-.8L20 7a2.1 2.1 0 0 0-3-3L5 16z"/><path d="M13 20h8"/></svg><span>Edit</span></button>
    {open && <div className="banner-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
      <section className="banner-modal popup-modal" role="dialog" aria-modal="true" aria-labelledby="popup-modal-title">
        <header className="banner-modal-header">
          {view === "list" ? <div><p className="banner-modal-eyebrow">HOMEPAGE CONTENT</p><h2 id="popup-modal-title">Manage popup content</h2><p className="banner-modal-description">Review and update announcements shown on the homepage.</p></div> : <div><button type="button" className="banner-back-button" onClick={() => setView("list")}>‹ &nbsp; All popups</button><h2 id="popup-modal-title">{isNew ? "Create popup" : "Update popup"}</h2><p className="banner-modal-description">Edit the popup content, link, images, and visibility.</p></div>}
          <button className="banner-modal-close" type="button" aria-label="Close popup editor" onClick={closeModal}>×</button>
        </header>
        {view === "list" ? <>
          <div className="banner-modal-toolbar"><span>{popups.length} {popups.length === 1 ? "popup" : "popups"}</span><button type="button" className="banner-new-button" onClick={startNew}><span aria-hidden="true">+</span> New popup</button></div>
          <div className="banner-table-wrap"><table className="banner-table popup-table"><thead><tr><th>#</th><th>Branch name</th><th>Heading</th><th>Background image</th><th>Banner image</th><th>Info</th><th>Link</th><th>Status</th><th>Actions</th></tr></thead><tbody>
            {popups.map((popup, index) => <tr key={popup.id}><td>{index + 1}</td><td>{popup.branchName || "—"}</td><td>{popup.heading || "(not set)"}</td><td><ImageCell preview={popup.backgroundImagePreview} label="Background image" /></td><td><ImageCell preview={popup.bannerImagePreview} label="Banner image" /></td><td className="popup-info-cell">{popup.info || "(not set)"}</td><td className="popup-link-cell">{popup.link || "(not set)"}</td><td><span className={`banner-table-status ${popup.active ? "is-active" : "is-inactive"}`}><i/>{popup.active ? "Active" : "Inactive"}</span></td><td><div className="banner-table-actions"><button type="button" className="banner-update-button" onClick={() => startUpdate(popup)}>Update</button><button type="button" className="banner-delete-button" onClick={() => setPopups((current) => current.filter((item) => item.id !== popup.id))}>Delete</button></div></td></tr>)}
          </tbody></table></div>
          <footer className="banner-modal-footer"><button type="button" className="banner-cancel-button" onClick={closeModal}>Close</button></footer>
        </> : draft && <>
          <div className="banner-editor-list"><article className="banner-editor-card"><div className="banner-editor-card-heading"><div><span className="banner-order-badge">{isNew ? "NEW" : "EDIT"}</span><strong>{draft.heading || "Popup details"}</strong></div><button type="button" className={`banner-status ${draft.active ? "is-active" : "is-inactive"}`} onClick={() => updateDraft({ active: !draft.active })}><i/>{draft.active ? "Active" : "Inactive"}</button></div>
            <div className="banner-form-grid">
              <label className="banner-field"><span>Branch name</span><input value={draft.branchName} onChange={(event) => updateDraft({ branchName: event.target.value })} placeholder="e.g. Corporate" /></label>
              <label className="banner-field"><span>Heading</span><input value={draft.heading} onChange={(event) => updateDraft({ heading: event.target.value })} placeholder="Add a heading" /></label>
              <label className="banner-field banner-image-field"><span>Background image</span><div className="banner-upload-control"><ImageCell preview={draft.backgroundImagePreview} label="Background image preview"/><span className="banner-upload-copy"><strong>{draft.backgroundImageName || "Choose background image"}</strong><small>PNG, JPG or WebP</small></span><span className="banner-browse-button">Browse</span><input type="file" accept="image/*" onChange={(event) => selectImage("background", event)} /></div></label>
              <label className="banner-field banner-image-field"><span>Banner image</span><div className="banner-upload-control"><ImageCell preview={draft.bannerImagePreview} label="Banner image preview"/><span className="banner-upload-copy"><strong>{draft.bannerImageName || "Choose banner image"}</strong><small>PNG, JPG or WebP</small></span><span className="banner-browse-button">Browse</span><input type="file" accept="image/*" onChange={(event) => selectImage("banner", event)} /></div></label>
              <label className="banner-field banner-subtext-field"><span>Info</span><textarea value={draft.info} onChange={(event) => updateDraft({ info: event.target.value })} placeholder="Add popup information" rows={3} /></label>
              <label className="banner-field banner-subtext-field"><span>Link</span><input type="url" value={draft.link} onChange={(event) => updateDraft({ link: event.target.value })} placeholder="https://example.com" /></label>
            </div>
          </article></div>
          <footer className="banner-modal-footer"><button type="button" className="banner-cancel-button" onClick={() => setView("list")}>Cancel</button><button type="button" className="banner-save-button" onClick={saveDraft}>{isNew ? "Create popup" : "Update popup"}</button></footer>
        </>}
      </section>
    </div>}
  </>;
}
