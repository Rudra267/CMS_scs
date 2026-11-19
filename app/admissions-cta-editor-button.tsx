"use client";

import { useState, type ChangeEvent } from "react";

export default function AdmissionsCtaEditorButton() {
  const [open, setOpen] = useState(false);
  const [subheading, setSubheading] = useState("READY TO SHAPE");
  const [heading, setHeading] = useState("YOUR CHILD'S FUTURE?");
  const [description, setDescription] = useState("Admissions Open for Academic Year 2024-25. Join a community dedicated to academic excellence and holistic growth.");
  const [buttonText, setButtonText] = useState("Apply Now");
  const [buttonLink, setButtonLink] = useState("#admissions");
  const [badgeTitle, setBadgeTitle] = useState("ADMISSIONS");
  const [badgeYear, setBadgeYear] = useState("2024 - 2025");
  const [badgeLink, setBadgeLink] = useState("#admissions");
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [draft, setDraft] = useState({ subheading, heading, description, buttonText, buttonLink, badgeTitle, badgeYear, badgeLink, imageName, imagePreview });
  const [editingSectionText, setEditingSectionText] = useState(false);

  const edit = () => { setDraft({ subheading, heading, description, buttonText, buttonLink, badgeTitle, badgeYear, badgeLink, imageName, imagePreview }); setEditingSectionText(false); setOpen(true); };
  const close = () => { setOpen(false); setEditingSectionText(false); };
  const saveSectionText = () => { setSubheading(draft.subheading); setHeading(draft.heading); setDescription(draft.description); setEditingSectionText(false); };
  const cancelSectionText = () => { setDraft((current) => ({ ...current, subheading, heading, description })); setEditingSectionText(false); };
  const save = () => { setSubheading(draft.subheading); setHeading(draft.heading); setDescription(draft.description); setButtonText(draft.buttonText); setButtonLink(draft.buttonLink); setBadgeTitle(draft.badgeTitle); setBadgeYear(draft.badgeYear); setBadgeLink(draft.badgeLink); setImageName(draft.imageName); setImagePreview(draft.imagePreview); close(); };
  const chooseImage = (event: ChangeEvent<HTMLInputElement>) => { const file = event.currentTarget.files?.[0]; if (file) setDraft((current) => ({ ...current, imageName: file.name, imagePreview: URL.createObjectURL(file) })); };

  return <>
    <button className="edit-button" type="button" onClick={edit}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5 4 4M4 20l4-.8L20 7a2.1 2.1 0 0 0-3-3L5 16z"/><path d="M13 20h8"/></svg><span>Edit</span></button>
    {open && <div className="banner-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section className="banner-modal" role="dialog" aria-modal="true" aria-labelledby="admissions-cta-title">
      <header className="banner-modal-header"><div><p className="banner-modal-eyebrow">HOMEPAGE CONTENT</p><h2 id="admissions-cta-title">Admissions call to action</h2><p className="banner-modal-description">Manage the admissions banner text, image, and links.</p></div><button className="banner-modal-close" type="button" aria-label="Close editor" onClick={close}>×</button></header>
      <div className="banner-editor-list global-standards-editor"><div className="banner-modal-toolbar global-standards-toolbar"><strong>Banner content</strong><button className="banner-update-button" type="button" onClick={() => setEditingSectionText(true)}>Edit section text</button></div>
        {editingSectionText && <article className="banner-editor-card"><div className="banner-form-grid">
          <label className="banner-field"><span>Sub heading</span><input value={draft.subheading} onChange={(event) => setDraft({ ...draft, subheading: event.target.value })}/></label>
          <label className="banner-field"><span>Main heading</span><input value={draft.heading} onChange={(event) => setDraft({ ...draft, heading: event.target.value })}/></label>
          <label className="banner-field banner-subtext-field"><span>Description</span><textarea rows={3} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })}/></label>
        </div><div className="global-standards-draft-actions"><button className="banner-cancel-button" type="button" onClick={cancelSectionText}>Cancel</button><button className="banner-save-button" type="button" onClick={saveSectionText}>Save section text</button></div></article>}
        <article className="banner-editor-card"><div className="banner-form-grid">
        <label className="banner-field"><span>Primary button text</span><input value={draft.buttonText} onChange={(event) => setDraft({ ...draft, buttonText: event.target.value })}/></label>
        <label className="banner-field"><span>Primary button link</span><input value={draft.buttonLink} onChange={(event) => setDraft({ ...draft, buttonLink: event.target.value })}/></label>
        <label className="banner-field"><span>Badge label</span><input value={draft.badgeTitle} onChange={(event) => setDraft({ ...draft, badgeTitle: event.target.value })}/></label>
        <label className="banner-field"><span>Admissions year</span><input value={draft.badgeYear} onChange={(event) => setDraft({ ...draft, badgeYear: event.target.value })}/></label>
        <label className="banner-field"><span>Badge link</span><input value={draft.badgeLink} onChange={(event) => setDraft({ ...draft, badgeLink: event.target.value })}/></label>
        <label className="banner-field banner-image-field"><span>Background image</span><div className="banner-upload-control"><div className="banner-image-preview" style={draft.imagePreview ? { backgroundImage: `url("${draft.imagePreview}")` } : undefined}>{!draft.imagePreview && <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>}</div><span className="banner-upload-copy"><strong>{draft.imageName || "Choose banner image"}</strong><small>PNG, JPG or WebP</small></span><span className="banner-browse-button">Browse</span><input type="file" accept="image/*" onChange={chooseImage}/></div></label>
      </div></article></div>
      <footer className="banner-modal-footer"><button type="button" className="banner-cancel-button" onClick={close}>Cancel</button><button type="button" className="banner-save-button" onClick={save}>Save content</button></footer>
    </section></div>}
  </>;
}
