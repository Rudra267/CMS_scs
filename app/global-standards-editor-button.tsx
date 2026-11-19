"use client";

import { useState } from "react";

type StandardCard = { id: number; icon: string; title: string; description: string; color: string; order: number };
const initialCards: StandardCard[] = [
  { id: 1, icon: "<i class=\"fa-light fa-globe\"></i>", title: "International Curriculum", description: "Benchmarked against the best educational systems worldwide, fostering global competitiveness.", color: "#3886ff", order: 1 },
  { id: 2, icon: "<i class=\"fa-light fa-lightbulb\"></i>", title: "Innovative Pedagogy", description: "Moving beyond rote learning to foster critical thinking and practical application.", color: "#ffc400", order: 2 },
  { id: 3, icon: "<i class=\"fa-light fa-shield-check\"></i>", title: "Safe & Secure Campus", description: "State-of-the-art security measures ensure a safe environment for every student.", color: "#00ce9b", order: 3 },
  { id: 4, icon: "<i class=\"fa-light fa-microchip\"></i>", title: "Tech-Enabled Classrooms", description: "Smart boards, digital libraries, and AI-enabled learning tools prepare students for tomorrow.", color: "#9b5cff", order: 4 },
];

const emptyCard = (order: number): StandardCard => ({ id: Date.now(), icon: "", title: "", description: "", color: "#3886ff", order });

function StandardIcon({ value }: { value: string }) {
  const name = value.toLowerCase();
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  if (name.includes("lightbulb")) return <svg {...common}><path d="M9 18h6m-5 3h4m-5-6.5a6 6 0 1 1 6 0c-.8.6-1 1.3-1 2.5h-4c0-1.2-.2-1.9-1-2.5Z"/></svg>;
  if (name.includes("shield") || name.includes("check")) return <svg {...common}><path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>;
  if (name.includes("microchip") || name.includes("cpu")) return <svg {...common}><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 9h6v6H9zM9 2v4m6-4v4m-6 12v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/></svg>;
  if (name.includes("trophy")) return <svg {...common}><path d="M8 21h8m-4-4v4M7 4h10v6a5 5 0 0 1-10 0zM7 7H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"/></svg>;
  if (name.includes("face") || name.includes("smile")) return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>;
  if (name.includes("book") || name.includes("graduation")) return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22zM4 5.5V22m5-14h7m-7 4h7"/></svg>;
  if (name.includes("users") || name.includes("people")) return <svg {...common}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20v-1a6 6 0 0 1 12 0v1m2-6a5 5 0 0 1 4 5v1"/></svg>;
  if (name.includes("globe")) return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>;
  return <svg {...common}><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z"/></svg>;
}

export default function GlobalStandardsEditorButton() {
  const [open, setOpen] = useState(false);
  const [subheading, setSubheading] = useState("WORLD CLASS");
  const [heading, setHeading] = useState("Global Standards of");
  const [description, setDescription] = useState("We blend international pedagogies with advanced technological infrastructure to provide a truly global learning experience.");
  const [cards, setCards] = useState(initialCards);
  const [draft, setDraft] = useState<StandardCard | null>(null);
  const [editingSectionText, setEditingSectionText] = useState(false);
  const [sectionTextDraft, setSectionTextDraft] = useState({ subheading, heading, description });

  const close = () => { setOpen(false); setDraft(null); };
  const editSectionText = () => { setSectionTextDraft({ subheading, heading, description }); setEditingSectionText(true); };
  const saveSectionText = () => { setSubheading(sectionTextDraft.subheading); setHeading(sectionTextDraft.heading); setDescription(sectionTextDraft.description); setEditingSectionText(false); };
  const saveCard = () => {
    if (!draft) return;
    setCards((current) => [...current.filter((card) => card.id !== draft.id), draft].sort((a, b) => a.order - b.order));
    setDraft(null);
  };

  return <>
    <button className="edit-button" type="button" onClick={() => setOpen(true)}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5 4 4M4 20l4-.8L20 7a2.1 2.1 0 0 0-3-3L5 16z"/><path d="M13 20h8"/></svg><span>Edit</span></button>
    {open && <div className="banner-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section className="banner-modal" role="dialog" aria-modal="true" aria-labelledby="global-standards-title">
      <header className="banner-modal-header"><div><p className="banner-modal-eyebrow">HOMEPAGE CONTENT</p><h2 id="global-standards-title">Global Standards</h2><p className="banner-modal-description">Update the section heading, description, and content cards.</p></div><button className="banner-modal-close" type="button" aria-label="Close editor" onClick={close}>×</button></header>
      <div className="banner-editor-list global-standards-editor">
        <div className="banner-modal-toolbar global-standards-toolbar"><strong>Content cards</strong><div className="banner-table-actions"><button className="banner-update-button" type="button" onClick={editSectionText}>Edit section text</button><button className="banner-new-button" type="button" onClick={() => setDraft(emptyCard(cards.length + 1))}><span aria-hidden="true">+</span> New card</button></div></div>
        {editingSectionText && <article className="banner-editor-card"><div className="banner-form-grid">
          <label className="banner-field"><span>Sub heading</span><input value={sectionTextDraft.subheading} onChange={(event) => setSectionTextDraft((current) => ({ ...current, subheading: event.target.value }))} /></label>
          <label className="banner-field"><span>Main heading</span><input value={sectionTextDraft.heading} onChange={(event) => setSectionTextDraft((current) => ({ ...current, heading: event.target.value }))} /></label>
          <label className="banner-field banner-subtext-field"><span>Description</span><textarea rows={3} value={sectionTextDraft.description} onChange={(event) => setSectionTextDraft((current) => ({ ...current, description: event.target.value }))} /></label>
        </div><div className="global-standards-draft-actions"><button className="banner-cancel-button" type="button" onClick={() => setEditingSectionText(false)}>Cancel</button><button className="banner-save-button" type="button" onClick={saveSectionText}>Save section text</button></div></article>}
        {draft && <article className="banner-editor-card"><div className="banner-form-grid">
          <label className="banner-field"><span>Order</span><input type="number" min="1" value={draft.order} onChange={(event) => setDraft({ ...draft, order: Number(event.target.value) })} /></label>
          <label className="banner-field"><span>Icon HTML</span><input value={draft.icon} onChange={(event) => setDraft({ ...draft, icon: event.target.value })} placeholder={'<i class="fa-light fa-globe"></i>'} /></label>
          <label className="banner-field"><span>Card title</span><input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label>
          <label className="banner-field"><span>Icon color</span><input type="color" value={draft.color} onChange={(event) => setDraft({ ...draft, color: event.target.value })} /></label>
          <label className="banner-field banner-subtext-field"><span>Card description</span><textarea rows={2} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></label>
        </div><div className="global-standards-draft-actions"><button className="banner-cancel-button" type="button" onClick={() => setDraft(null)}>Cancel</button><button className="banner-save-button" type="button" onClick={saveCard}>Save card</button></div></article>}
        <div className="global-standards-card-list">{cards.map((card, index) => <article className="global-standards-card-row" key={card.id}><span className="feature-theme-icon" style={{ color: card.color }}><StandardIcon value={card.icon}/></span><div className="global-standards-card-copy"><small>Card {index + 1} · Order {card.order}</small><strong>{card.title}</strong><p>{card.description}</p><code>{card.icon || "No icon HTML"}</code></div><div className="banner-table-actions"><button className="banner-update-button" type="button" onClick={() => setDraft({ ...card })}>Update</button><button className="banner-delete-button" type="button" onClick={() => setCards((current) => current.filter((item) => item.id !== card.id))}>Delete</button></div></article>)}</div>
      </div>
      <footer className="banner-modal-footer"><button type="button" className="banner-cancel-button" onClick={close}>Close</button></footer>
    </section></div>}
  </>;
}
