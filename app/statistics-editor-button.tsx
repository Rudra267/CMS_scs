"use client";

import { useState } from "react";

type Statistic = { id: number; icon: string; value: string; suffix: string; label: string; color: string; order: number };

const initialStatistics: Statistic[] = [
  { id: 1, icon: "trophy", value: "25", suffix: "+", label: "Years of Experience", color: "#164be9", order: 1 },
  { id: 2, icon: "people", value: "150", suffix: "k+", label: "Successful Alumni", color: "#efb400", order: 2 },
  { id: 3, icon: "cap", value: "100", suffix: "%", label: "Academic Success Rate", color: "#08b982", order: 3 },
];

const emptyStatistic = (order: number): Statistic => ({ id: Date.now(), icon: "trophy", value: "", suffix: "", label: "", color: "#164be9", order });

function StatisticIcon({ name }: { name: string }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  if (name === "people") return <svg {...common}><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1m2-15a3 3 0 0 1 0 6m1 3a5 5 0 0 1 3 5v1"/></svg>;
  if (name === "cap") return <svg {...common}><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v6c4 3 8 3 12 0v-6m4-2v7"/></svg>;
  return <svg {...common}><path d="M8 21h8m-4-4v4M7 4h10v6a5 5 0 0 1-10 0zM7 7H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"/></svg>;
}

export default function StatisticsEditorButton() {
  const [open, setOpen] = useState(false);
  const [subheading, setSubheading] = useState("ACHIEVEMENTS");
  const [heading, setHeading] = useState("A Legacy of Excellence");
  const [description, setDescription] = useState("Decades of commitment to shaping brilliant minds and achieving extraordinary outcomes globally.");
  const [sectionDraft, setSectionDraft] = useState({ subheading, heading, description });
  const [editingSection, setEditingSection] = useState(false);
  const [statistics, setStatistics] = useState(initialStatistics);
  const [draft, setDraft] = useState<Statistic | null>(null);

  const close = () => { setOpen(false); setDraft(null); setEditingSection(false); };
  const editSection = () => { setSectionDraft({ subheading, heading, description }); setEditingSection(true); };
  const saveSection = () => { setSubheading(sectionDraft.subheading); setHeading(sectionDraft.heading); setDescription(sectionDraft.description); setEditingSection(false); };
  const saveStatistic = () => {
    if (!draft) return;
    setStatistics((current) => [...current.filter((item) => item.id !== draft.id), draft].sort((a, b) => a.order - b.order));
    setDraft(null);
  };

  return <>
    <button className="edit-button" type="button" onClick={() => setOpen(true)}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5 4 4M4 20l4-.8L20 7a2.1 2.1 0 0 0-3-3L5 16z"/><path d="M13 20h8"/></svg><span>Edit</span></button>
    {open && <div className="banner-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section className="banner-modal" role="dialog" aria-modal="true" aria-labelledby="statistics-modal-title">
      <header className="banner-modal-header"><div><p className="banner-modal-eyebrow">HOMEPAGE CONTENT</p><h2 id="statistics-modal-title">Schools Statistics</h2><p className="banner-modal-description">Manage the achievements heading and statistics shown on the homepage.</p></div><button className="banner-modal-close" type="button" aria-label="Close editor" onClick={close}>×</button></header>
      <div className="banner-editor-list global-standards-editor">
        <div className="banner-modal-toolbar global-standards-toolbar"><strong>Achievement statistics</strong><div className="banner-table-actions"><button className="banner-update-button" type="button" onClick={editSection}>Edit section text</button><button className="banner-new-button" type="button" onClick={() => setDraft(emptyStatistic(statistics.length + 1))}><span aria-hidden="true">+</span> New statistic</button></div></div>
        {editingSection && <article className="banner-editor-card"><div className="banner-form-grid">
          <label className="banner-field"><span>Sub heading</span><input value={sectionDraft.subheading} onChange={(event) => setSectionDraft((current) => ({ ...current, subheading: event.target.value }))}/></label>
          <label className="banner-field"><span>Main heading</span><input value={sectionDraft.heading} onChange={(event) => setSectionDraft((current) => ({ ...current, heading: event.target.value }))}/></label>
          <label className="banner-field banner-subtext-field"><span>Description</span><textarea rows={3} value={sectionDraft.description} onChange={(event) => setSectionDraft((current) => ({ ...current, description: event.target.value }))}/></label>
        </div><div className="global-standards-draft-actions"><button className="banner-cancel-button" type="button" onClick={() => setEditingSection(false)}>Cancel</button><button className="banner-save-button" type="button" onClick={saveSection}>Save section text</button></div></article>}
        {draft && <article className="banner-editor-card"><div className="banner-form-grid">
          <label className="banner-field"><span>Statistic value</span><input value={draft.value} onChange={(event) => setDraft({ ...draft, value: event.target.value })} placeholder="25"/></label>
          <label className="banner-field"><span>Suffix</span><input value={draft.suffix} onChange={(event) => setDraft({ ...draft, suffix: event.target.value })} placeholder="+, %, k+"/></label>
          <label className="banner-field"><span>Label</span><input value={draft.label} onChange={(event) => setDraft({ ...draft, label: event.target.value })} placeholder="Years of Experience"/></label>
          <label className="banner-field"><span>Icon</span><select value={draft.icon} onChange={(event) => setDraft({ ...draft, icon: event.target.value })}><option value="trophy">Trophy</option><option value="people">People</option><option value="cap">Graduation cap</option></select></label>
          <label className="banner-field"><span>Color</span><input type="color" value={draft.color} onChange={(event) => setDraft({ ...draft, color: event.target.value })}/></label>
          <label className="banner-field"><span>Order</span><input type="number" min="1" value={draft.order} onChange={(event) => setDraft({ ...draft, order: Number(event.target.value) })}/></label>
        </div><div className="global-standards-draft-actions"><button className="banner-cancel-button" type="button" onClick={() => setDraft(null)}>Cancel</button><button className="banner-save-button" type="button" onClick={saveStatistic}>Save statistic</button></div></article>}
        <div className="statistics-card-list">{statistics.map((statistic, index) => <article className="statistics-card-row" key={statistic.id}><span className="statistics-icon" style={{ color: statistic.color, backgroundColor: `${statistic.color}18` }}><StatisticIcon name={statistic.icon}/></span><div className="global-standards-card-copy"><small>Statistic {index + 1} · Order {statistic.order}</small><strong>{statistic.value}<em style={{ color: statistic.color }}>{statistic.suffix}</em> {statistic.label}</strong></div><div className="banner-table-actions"><button className="banner-update-button" type="button" onClick={() => setDraft({ ...statistic })}>Update</button><button className="banner-delete-button" type="button" onClick={() => setStatistics((current) => current.filter((item) => item.id !== statistic.id))}>Delete</button></div></article>)}</div>
      </div>
      <footer className="banner-modal-footer"><button type="button" className="banner-cancel-button" onClick={close}>Close</button></footer>
    </section></div>}
  </>;
}
