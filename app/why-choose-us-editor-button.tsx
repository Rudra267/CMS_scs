"use client";

import { useEffect, useState, type ChangeEvent } from "react";

type Feature = { id: number; title: string; description: string; order: number; color: string; themeIcon: string; iconHtml: string; imageName: string; imagePreview: string };

const initialFeatures: Feature[] = [
  { id: 1, title: "Academic Excellence", description: "Curriculum designed for global standards", order: 1, color: "#1F55F5", themeIcon: "book", iconHtml: "", imageName: "", imagePreview: "" },
  { id: 2, title: "Vibrant Campus Life", description: "Nurturing talent beyond the classroom", order: 2, color: "#FF5D4D", themeIcon: "people", iconHtml: "", imageName: "", imagePreview: "" },
  { id: 3, title: "Sports Arena", description: "World class facilities for champions", order: 3, color: "#A348F2", themeIcon: "trophy", iconHtml: "", imageName: "", imagePreview: "" },
  { id: 4, title: "Global Learning", description: "Global exposure with international mindset", order: 4, color: "#305DB7", themeIcon: "globe", iconHtml: "", imageName: "", imagePreview: "" },
  { id: 5, title: "Smart Classes", description: "Smart classrooms for smarter learning", order: 5, color: "#F8BE13", themeIcon: "laptop", iconHtml: "", imageName: "", imagePreview: "" },
  { id: 6, title: "Holistic Development", description: "Mental and physical well-being", order: 6, color: "#FF6252", themeIcon: "people", iconHtml: "", imageName: "", imagePreview: "" },
];

const emptyFeature = (id: number, order: number): Feature => ({ id, title: "", description: "", order, color: "#1F55F5", themeIcon: "book", iconHtml: "", imageName: "", imagePreview: "" });

function ThemeIcon({ icon }: { icon: string }) {
  const common = { viewBox: "0 0 24 24", fill: "none", "aria-hidden": true as const };
  if (icon === "people") return <svg {...common}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20v-1a6 6 0 0 1 12 0v1m2-6a5 5 0 0 1 4 5v1"/></svg>;
  if (icon === "trophy") return <svg {...common}><path d="M8 21h8m-4-4v4M7 4h10v6a5 5 0 0 1-10 0zM7 7H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"/></svg>;
  if (icon === "globe") return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>;
  if (icon === "laptop") return <svg {...common}><rect x="5" y="5" width="14" height="10" rx="1"/><path d="M3 19h18"/></svg>;
  return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z"/><path d="M4 5.5V22m5-14h7m-7 4h7"/></svg>;
}

function FeatureIcon({ feature }: { feature: Feature }) {
  if (feature.iconHtml) return <span className="feature-html-icon" title={feature.iconHtml}>{"</>"}</span>;
  return <ThemeIcon icon={feature.themeIcon}/>;
}

function Preview({ feature }: { feature: Feature }) {
  return <div className="feature-preview" style={{ backgroundColor: feature.color, ...(feature.imagePreview ? { backgroundImage: `linear-gradient(135deg, ${feature.color}e8, ${feature.color}88), url("${feature.imagePreview}")` } : {}) }}><span>{feature.title || "Feature card"}</span></div>;
}

export default function WhyChooseUsEditorButton() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"list" | "edit">("list");
  const [features, setFeatures] = useState<Feature[]>(initialFeatures);
  const [sectionEyebrow, setSectionEyebrow] = useState("WHY PARENTS");
  const [sectionHeading, setSectionHeading] = useState("CHOOSE US");
  const [sectionTextDraft, setSectionTextDraft] = useState({ eyebrow: sectionEyebrow, heading: sectionHeading });
  const [editingSectionText, setEditingSectionText] = useState(false);
  const [draft, setDraft] = useState<Feature | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") view === "edit" ? setView("list") : close(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const close = () => { setOpen(false); setView("list"); setDraft(null); };
  const startUpdate = (feature: Feature) => { setDraft({ ...feature }); setIsNew(false); setView("edit"); };
  const startNew = () => { setDraft(emptyFeature(Date.now(), features.length + 1)); setIsNew(true); setView("edit"); };
  const startSectionTextEdit = () => { setSectionTextDraft({ eyebrow: sectionEyebrow, heading: sectionHeading }); setEditingSectionText(true); };
  const saveSectionText = () => { setSectionEyebrow(sectionTextDraft.eyebrow); setSectionHeading(sectionTextDraft.heading); setEditingSectionText(false); };
  const updateDraft = (updates: Partial<Feature>) => setDraft((current) => current ? { ...current, ...updates } : current);
  const selectImage = (event: ChangeEvent<HTMLInputElement>) => { const file = event.currentTarget.files?.[0]; if (file) updateDraft({ imageName: file.name, imagePreview: URL.createObjectURL(file) }); };
  const saveDraft = () => {
    if (!draft) return;
    setFeatures((current) => (isNew ? [...current, draft] : current.map((feature) => feature.id === draft.id ? draft : feature)).sort((a, b) => a.order - b.order));
    setDraft(null); setView("list");
  };

  return <>
    <button className="edit-button" type="button" onClick={() => { setView("list"); setOpen(true); }}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5 4 4M4 20l4-.8L20 7a2.1 2.1 0 0 0-3-3L5 16z"/><path d="M13 20h8"/></svg><span>Edit</span></button>
    {open && <div className="banner-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section className="banner-modal" role="dialog" aria-modal="true" aria-labelledby="why-choose-us-modal-title">
      <header className="banner-modal-header">
        {view === "list" ? <div><p className="banner-modal-eyebrow">HOMEPAGE CONTENT</p><h2 id="why-choose-us-modal-title">Why parents choose us</h2><p className="banner-modal-description">Manage the section heading and feature cards displayed on the homepage.</p></div> : <div><button type="button" className="banner-back-button" onClick={() => setView("list")}>‹ &nbsp; All feature cards</button><h2 id="why-choose-us-modal-title">{isNew ? "Create feature card" : "Update feature card"}</h2><p className="banner-modal-description">Update the card text, order, image, and background color.</p></div>}
        <button className="banner-modal-close" type="button" aria-label="Close feature card editor" onClick={close}>×</button>
      </header>
      {view === "list" ? <>
        <div className="banner-modal-toolbar"><span>{features.length} feature cards</span><div className="banner-table-actions"><button type="button" className="banner-update-button" onClick={startSectionTextEdit}>Edit section text</button><button type="button" className="banner-new-button" onClick={startNew}><span aria-hidden="true">+</span> New card</button></div></div>
        {editingSectionText && <article className="banner-editor-card feature-section-text-form"><div className="banner-form-grid">
          <label className="banner-field"><span>Sub heading</span><input value={sectionTextDraft.eyebrow} onChange={(event) => setSectionTextDraft((current) => ({ ...current, eyebrow: event.target.value }))} placeholder="WHY PARENTS" /></label>
          <label className="banner-field"><span>Main heading</span><input value={sectionTextDraft.heading} onChange={(event) => setSectionTextDraft((current) => ({ ...current, heading: event.target.value }))} placeholder="CHOOSE US" /></label>
        </div><div className="global-standards-draft-actions"><button type="button" className="banner-cancel-button" onClick={() => setEditingSectionText(false)}>Cancel</button><button type="button" className="banner-save-button" onClick={saveSectionText}>Save section text</button></div></article>}
        <div className="banner-table-wrap"><table className="banner-table feature-table"><thead><tr><th>#</th><th>Theme icon</th><th>Background image</th><th>Title</th><th>Description</th><th>Color</th><th>Order</th><th>Actions</th></tr></thead><tbody>{features.map((feature, index) => <tr key={feature.id}><td>{index + 1}</td><td><span className="feature-theme-icon" style={{ color: feature.color }}><FeatureIcon feature={feature}/></span></td><td><div className="feature-background-image" style={feature.imagePreview ? { backgroundImage: `url("${feature.imagePreview}")` } : undefined}>{!feature.imagePreview && <span>No image</span>}</div></td><td>{feature.title || "(not set)"}</td><td className="feature-description-cell">{feature.description || "(not set)"}</td><td><span className="feature-color-chip" style={{ backgroundColor: feature.color }}/><code>{feature.color}</code></td><td>{feature.order}</td><td><div className="banner-table-actions"><button type="button" className="banner-update-button" onClick={() => startUpdate(feature)}>Update</button><button type="button" className="banner-delete-button" onClick={() => setFeatures((current) => current.filter((item) => item.id !== feature.id))}>Delete</button></div></td></tr>)}</tbody></table></div>
        <footer className="banner-modal-footer"><button type="button" className="banner-cancel-button" onClick={close}>Close</button></footer>
      </> : draft && <>
        <div className="banner-editor-list"><article className="banner-editor-card"><div className="banner-editor-card-heading"><div><span className="banner-order-badge">{String(draft.order).padStart(2, "0")}</span><strong>{draft.title || "Feature card details"}</strong></div></div><div className="feature-edit-layout"><Preview feature={draft}/><div className="banner-form-grid">
          <label className="banner-field"><span>Card title</span><input value={draft.title} onChange={(event) => updateDraft({ title: event.target.value })} placeholder="e.g. Academic Excellence" /></label>
          <label className="banner-field"><span>Order</span><input type="number" min="1" value={draft.order} onChange={(event) => updateDraft({ order: Number(event.target.value) })} /></label>
          <label className="banner-field banner-image-field"><span>HTML icon</span><textarea value={draft.iconHtml} onChange={(event) => updateDraft({ iconHtml: event.target.value })} placeholder={'<i class="fa-light fa-face-smile"></i>'} rows={3}/><small className="feature-html-help">Paste the icon HTML used by the website, such as a Font Awesome or inline SVG icon.</small></label>
          <label className="banner-field banner-subtext-field"><span>Description</span><textarea value={draft.description} onChange={(event) => updateDraft({ description: event.target.value })} placeholder="Add supporting text" rows={3} /></label>
          <label className="banner-field banner-image-field"><span>Background image</span><div className="banner-upload-control"><div className="banner-image-preview" style={draft.imagePreview ? { backgroundImage: `url("${draft.imagePreview}")` } : undefined}>{!draft.imagePreview && <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>}</div><span className="banner-upload-copy"><strong>{draft.imageName || "Choose background image"}</strong><small>PNG, JPG or WebP</small></span><span className="banner-browse-button">Browse</span><input type="file" accept="image/*" onChange={selectImage}/></div></label>
          <label className="banner-field feature-color-field"><span>Card color</span><span className="feature-color-input"><input type="color" value={draft.color} onChange={(event) => updateDraft({ color: event.target.value })}/><input value={draft.color} onChange={(event) => updateDraft({ color: event.target.value })} pattern="#[0-9A-Fa-f]{6}" /></span></label>
        </div></div></article></div>
        <footer className="banner-modal-footer"><button type="button" className="banner-cancel-button" onClick={() => setView("list")}>Cancel</button><button type="button" className="banner-save-button" onClick={saveDraft}>{isNew ? "Create card" : "Update card"}</button></footer>
      </>}
    </section></div>}
  </>;
}
