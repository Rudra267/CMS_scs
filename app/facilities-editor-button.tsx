"use client";

import { useState, type ChangeEvent } from "react";

type Facility = { id: number; title: string; description: string; icon: string; imageName: string; imagePreview: string; order: number };

const initialFacilities: Facility[] = [
  { id: 1, title: "Advanced Laboratories", description: "State-of-the-art equipment for physics, chemistry, and biology.", icon: "fa-flask", imageName: "", imagePreview: "", order: 1 },
  { id: 2, title: "Sports Complex", description: "Dedicated spaces and facilities for sports, fitness, and team activities.", icon: "fa-trophy", imageName: "", imagePreview: "", order: 2 },
  { id: 3, title: "Digital Library", description: "A rich collection of books and digital learning resources.", icon: "fa-book-open", imageName: "", imagePreview: "", order: 3 },
  { id: 4, title: "Premium Hostels", description: "Comfortable, supervised accommodation for students.", icon: "fa-building", imageName: "", imagePreview: "", order: 4 },
  { id: 5, title: "Safe Transport", description: "Reliable transportation with student safety as a priority.", icon: "fa-bus", imageName: "", imagePreview: "", order: 5 },
];

const emptyFacility = (order: number): Facility => ({ id: Date.now(), title: "", description: "", icon: "fa-star", imageName: "", imagePreview: "", order });

function FacilityIcon({ name }: { name: string }) {
  const icon = name.toLowerCase();
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  if (icon.includes("trophy")) return <svg {...common}><path d="M8 21h8m-4-4v4M7 4h10v6a5 5 0 0 1-10 0zM7 7H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"/></svg>;
  if (icon.includes("book")) return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22zM4 5.5V22m5-14h7m-7 4h7"/></svg>;
  if (icon.includes("building")) return <svg {...common}><path d="M4 21V5l8-3 8 3v16M2 21h20M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01M10 21v-5h4v5"/></svg>;
  if (icon.includes("bus")) return <svg {...common}><path d="M5 17h14l1-3V6c0-2-3.6-3-8-3S4 4 4 6v8zm-1 0v2h2v-2m14 0v2h-2v-2M5 9h14M7 13h.01M17 13h.01"/></svg>;
  if (icon.includes("flask")) return <svg {...common}><path d="M9 3h6m-5 0v6L4 19a1.5 1.5 0 0 0 1.3 2h13.4a1.5 1.5 0 0 0 1.3-2L14 9V3m-7 12h10"/></svg>;
  return <svg {...common}><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>;
}

export default function FacilitiesEditorButton() {
  const [open, setOpen] = useState(false);
  const [eyebrow, setEyebrow] = useState("WORLD CLASS FACILITIES");
  const [heading, setHeading] = useState("Nurturing Growth Beyond Academics");
  const [buttonText, setButtonText] = useState("Explore All Facilities");
  const [buttonLink, setButtonLink] = useState("#facilities");
  const [sectionDraft, setSectionDraft] = useState({ eyebrow, heading, buttonText, buttonLink });
  const [editingSection, setEditingSection] = useState(false);
  const [facilities, setFacilities] = useState(initialFacilities);
  const [draft, setDraft] = useState<Facility | null>(null);

  const close = () => { setOpen(false); setDraft(null); setEditingSection(false); };
  const editSection = () => { setSectionDraft({ eyebrow, heading, buttonText, buttonLink }); setEditingSection(true); };
  const saveSection = () => { setEyebrow(sectionDraft.eyebrow); setHeading(sectionDraft.heading); setButtonText(sectionDraft.buttonText); setButtonLink(sectionDraft.buttonLink); setEditingSection(false); };
  const updateImage = (event: ChangeEvent<HTMLInputElement>) => { const file = event.currentTarget.files?.[0]; if (file && draft) setDraft({ ...draft, imageName: file.name, imagePreview: URL.createObjectURL(file) }); };
  const saveFacility = () => {
    if (!draft) return;
    setFacilities((current) => [...current.filter((item) => item.id !== draft.id), draft].sort((a, b) => a.order - b.order));
    setDraft(null);
  };

  return <>
    <button className="edit-button" type="button" onClick={() => setOpen(true)}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5 4 4M4 20l4-.8L20 7a2.1 2.1 0 0 0-3-3L5 16z"/><path d="M13 20h8"/></svg><span>Edit</span></button>
    {open && <div className="banner-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section className="banner-modal" role="dialog" aria-modal="true" aria-labelledby="facilities-modal-title">
      <header className="banner-modal-header"><div><p className="banner-modal-eyebrow">HOMEPAGE CONTENT</p><h2 id="facilities-modal-title">Facilities</h2><p className="banner-modal-description">Manage the section text and facility cards shown on the homepage.</p></div><button className="banner-modal-close" type="button" aria-label="Close editor" onClick={close}>×</button></header>
      <div className="banner-editor-list global-standards-editor">
        <div className="banner-modal-toolbar global-standards-toolbar"><strong>Facility cards</strong><div className="banner-table-actions"><button className="banner-update-button" type="button" onClick={editSection}>Edit section text</button><button className="banner-new-button" type="button" onClick={() => setDraft(emptyFacility(facilities.length + 1))}><span aria-hidden="true">+</span> New facility</button></div></div>
        {editingSection && <article className="banner-editor-card"><div className="banner-form-grid">
          <label className="banner-field"><span>Sub heading</span><input value={sectionDraft.eyebrow} onChange={(event) => setSectionDraft((current) => ({ ...current, eyebrow: event.target.value }))}/></label>
          <label className="banner-field"><span>Main heading</span><input value={sectionDraft.heading} onChange={(event) => setSectionDraft((current) => ({ ...current, heading: event.target.value }))}/></label>
          <label className="banner-field"><span>Button text</span><input value={sectionDraft.buttonText} onChange={(event) => setSectionDraft((current) => ({ ...current, buttonText: event.target.value }))}/></label>
          <label className="banner-field"><span>Button link</span><input value={sectionDraft.buttonLink} onChange={(event) => setSectionDraft((current) => ({ ...current, buttonLink: event.target.value }))}/></label>
        </div><div className="global-standards-draft-actions"><button className="banner-cancel-button" type="button" onClick={() => setEditingSection(false)}>Cancel</button><button className="banner-save-button" type="button" onClick={saveSection}>Save section text</button></div></article>}
        {draft && <article className="banner-editor-card"><div className="banner-form-grid">
          <label className="banner-field"><span>Facility title</span><input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })}/></label>
          <label className="banner-field"><span>Order</span><input type="number" min="1" value={draft.order} onChange={(event) => setDraft({ ...draft, order: Number(event.target.value) })}/></label>
          <label className="banner-field"><span>Icon HTML / class</span><input value={draft.icon} onChange={(event) => setDraft({ ...draft, icon: event.target.value })} placeholder="fa-flask"/></label>
          <label className="banner-field"><span>Facility description</span><textarea rows={2} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })}/></label>
          <label className="banner-field banner-image-field"><span>Background image</span><div className="banner-upload-control"><div className="banner-image-preview" style={draft.imagePreview ? { backgroundImage: `url("${draft.imagePreview}")` } : undefined}>{!draft.imagePreview && <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>}</div><span className="banner-upload-copy"><strong>{draft.imageName || "Choose facility image"}</strong><small>PNG, JPG or WebP</small></span><span className="banner-browse-button">Browse</span><input type="file" accept="image/*" onChange={updateImage}/></div></label>
        </div><div className="global-standards-draft-actions"><button className="banner-cancel-button" type="button" onClick={() => setDraft(null)}>Cancel</button><button className="banner-save-button" type="button" onClick={saveFacility}>Save facility</button></div></article>}
        <div className="global-standards-card-list">{facilities.map((facility, index) => <article className="global-standards-card-row facility-row" key={facility.id}><div className="facility-card-image" style={facility.imagePreview ? { backgroundImage: `url("${facility.imagePreview}")` } : undefined}><FacilityIcon name={facility.icon}/></div><div className="global-standards-card-copy"><small>Facility {index + 1} · Order {facility.order}</small><strong>{facility.title}</strong><p>{facility.description}</p><code>{facility.icon || "No icon set"}</code></div><div className="banner-table-actions"><button className="banner-update-button" type="button" onClick={() => setDraft({ ...facility })}>Update</button><button className="banner-delete-button" type="button" onClick={() => setFacilities((current) => current.filter((item) => item.id !== facility.id))}>Delete</button></div></article>)}</div>
      </div>
      <footer className="banner-modal-footer"><button type="button" className="banner-cancel-button" onClick={close}>Close</button></footer>
    </section></div>}
  </>;
}
