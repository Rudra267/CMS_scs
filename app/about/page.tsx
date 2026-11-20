"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type ChangeEvent } from "react";
import MenuScrollHint from "../menu-scroll-hint";

const navigationGroups = [
  { title: "Corporate", items: ["Home", "About Us", "Pre-Primary", "Primary", "High School", "Diversity", "Student Life", "Achievements", "Facilities", "Uniforms", "Gallery", "Admissions", "News & Events", "Magazine", "FAQs", "Admission Enquiry Section", "Privacy Policy", "Terms & Conditions", "Careers"] },
  { title: "Branch", items: ["Home", "About Us", "Pre-Primary", "Primary", "High School", "Student Life", "Achievements", "Facilities", "Uniforms", "Gallery", "Admissions", "News & Events", "Magazine", "FAQs", "Admission Enquiry Section", "Privacy Policy", "Terms & Conditions", "Careers"] },
  { title: "Careers Application", items: ["Applications"] },
];
const aboutSections = ["Banner", "Who We Are", "Vision & Mission", "Management", "Our Journey", "Diversity"] as const;
type AboutSection = string;
type SectionContent = { eyebrow: string; heading: string; highlight: string; description: string; body: string; vision: string; values: string; growth: string; imageName: string; image: string; barLinks?: { label: string; url: string }[] };

const initialContent: Record<string, SectionContent> = {
  Banner: { eyebrow: "ABOUT SRI CHAITANYA", heading: "ABOUT", highlight: "US", description: "A future-ready academic ecosystem built on vision, discipline, leadership, and opportunity.", body: "", vision: "Vision", values: "Values", growth: "Growth", imageName: "", image: "", barLinks: ["Who We Are", "Vision & Mission", "Management", "Our Journey", "Diversity"].map((label) => ({ label: label.toUpperCase(), url: `#${label.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")}` })) },
  "Who We Are": { eyebrow: "WHO WE ARE", heading: "A legacy of learning", highlight: "", description: "Learn about Sri Chaitanya and the people who make our school community special.", body: "Add the Who We Are content here.", vision: "", values: "", growth: "", imageName: "", image: "" },
  "Vision & Mission": { eyebrow: "OUR PURPOSE", heading: "Vision & Mission", highlight: "", description: "Share the vision and mission that guide our school.", body: "Add your vision and mission details here.", vision: "", values: "", growth: "", imageName: "", image: "" },
  Management: { eyebrow: "LEADERSHIP", heading: "Our Management", highlight: "", description: "Meet the leadership team guiding Sri Chaitanya Schools.", body: "Add management information here.", vision: "", values: "", growth: "", imageName: "", image: "" },
  "Our Journey": { eyebrow: "OUR JOURNEY", heading: "A journey of excellence", highlight: "", description: "Share the milestones that have shaped the school over the years.", body: "Add your school history and milestones here.", vision: "", values: "", growth: "", imageName: "", image: "" },
  Diversity: { eyebrow: "OUR COMMUNITY", heading: "Diversity & inclusion", highlight: "", description: "Celebrate the backgrounds and perspectives that make our community stronger.", body: "Add diversity and inclusion content here.", vision: "", values: "", growth: "", imageName: "", image: "" },
};

function MenuIcon({ label }: { label: string }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  if (label === "Home") return <svg {...common}><path d="m3 10 9-7 9 7M5 9v11h14V9m-9 11v-7h4v7"/></svg>;
  if (label === "About Us" || label === "FAQs" || label.startsWith("Privacy") || label.startsWith("Terms")) return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></svg>;
  if (label === "High School") return <svg {...common}><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v6c4 3 8 3 12 0v-6m4-2v7"/></svg>;
  if (label === "Student Life") return <svg {...common}><path d="M20 4C10 4 5 8 5 15c0 3 2 5 5 5 7 0 10-6 10-16Z"/><path d="M3 21 14 10"/></svg>;
  if (label === "Admissions") return <svg {...common}><rect x="4" y="4" width="16" height="17" rx="2"/><path d="M9 4V2h6v2m-8 6 2 2 4-4m-4 8h7"/></svg>;
  if (label.includes("Facilities")) return <svg {...common}><path d="M4 21V6l8-3 8 3v15M2 21h20M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01"/></svg>;
  if (label.includes("Gallery")) return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>;
  if (label.includes("Events")) return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>;
  if (label.includes("Achievements")) return <svg {...common}><path d="M8 21h8m-4-4v4M7 4h10v6a5 5 0 0 1-10 0zM7 7H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"/></svg>;
  if (label === "Pre-Primary" || label.includes("Student") || label.includes("Careers") || label.includes("Enquiry") || label === "Diversity" || label === "Applications") return <svg {...common}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20v-1a6 6 0 0 1 12 0v1m2-6a5 5 0 0 1 4 5v1"/></svg>;
  if (label.includes("Uniform")) return <svg {...common}><path d="m8 4 4 2 4-2 5 4-3 4-2-1v9H8v-9l-2 1-3-4z"/></svg>;
  return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22zM4 5.5V22m5-14h7m-7 4h7"/></svg>;
}

export default function AboutContentPage() {
  const [sections, setSections] = useState<string[]>([...aboutSections]);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [content, setContent] = useState<Record<string, SectionContent>>(initialContent);
  const [sectionDraft, setSectionDraft] = useState<SectionContent | null>(null);
  const [contentHeading, setContentHeading] = useState("Content");
  const [contentDescription, setContentDescription] = useState("Manage the About Us content sections.");
  const startEdit = (section: string) => { setIsCreatingCard(false); setEditingSection(section); setSectionDraft({ ...content[section] }); };
  const createContentCard = () => { const draft = { eyebrow: "", heading: "", highlight: "", description: "", body: "", vision: "", values: "", growth: "", imageName: "", image: "" }; setIsCreatingCard(true); setEditingSection(`Content card ${sections.length}`); setSectionDraft(draft); };
  const updateBarLink = (index: number, field: "label" | "url", value: string) => setSectionDraft((current) => current ? { ...current, barLinks: (current.barLinks ?? []).map((link, linkIndex) => linkIndex === index ? { ...link, [field]: value } : link) } : current);
  const closeEditor = () => { setEditingSection(null); setSectionDraft(null); setIsCreatingCard(false); };
  const saveContent = () => { if (!editingSection || !sectionDraft) return; const cardTitle = sectionDraft.heading.trim() || "New content card"; let key = isCreatingCard ? cardTitle : editingSection; if (isCreatingCard && sections.includes(key)) { let suffix = 2; while (sections.includes(`${key} ${suffix}`)) suffix += 1; key = `${key} ${suffix}`; } setContent((current) => ({ ...current, [key]: sectionDraft })); if (isCreatingCard) setSections((current) => [...current, key]); closeEditor(); };
  const selectSectionImage = (event: ChangeEvent<HTMLInputElement>) => { const file = event.currentTarget.files?.[0]; if (file) setSectionDraft((current) => current ? { ...current, imageName: file.name, image: URL.createObjectURL(file) } : current); };

  return <div className="cms-shell">
    <aside className="sidebar">
      <Link className="brand" href="/" aria-label="Sri Chaitanya Schools home"><Image className="brand-logo" src="/logo_chaitanya.png" alt="Sri Chaitanya logo" width={44} height={44} preload unoptimized/><span className="brand-copy"><strong>Sri Chaitanya</strong><b style={{ color: "#fff" }}>Schools</b></span></Link>
      <nav className="side-nav" aria-label="CMS sections">{navigationGroups.map((group) => <div className="nav-group" key={group.title}><div className="nav-label"><span>{group.title.toUpperCase()}</span><i/></div>{group.items.map((label, index) => <Link key={`${group.title}-${label}-${index}`} className={`nav-item${group.title === "Corporate" && label === "About Us" ? " active" : ""}`} href={label === "Home" ? "/" : label === "About Us" ? "/about" : `/#${label.toLowerCase().replaceAll(" ", "-")}`}><MenuIcon label={label}/><span>{label}</span></Link>)}</div>)}</nav>
      <MenuScrollHint />
    </aside>
    <main className="main-area about-content-page">
    <header className="topbar"><div className="breadcrumbs"><Link href="/">CMS</Link><b>/</b><span>Corporate</span><b>/</b><strong>About Us</strong></div><Link className="view-button" href="/">Back to homepage</Link></header>
    <section className="page-heading"><div><p className="eyebrow">CORPORATE WEBSITE</p><h1>About Us content</h1><p className="subtitle">Manage what visitors see on the About Us page.</p></div></section>
    <section className="sections-card" aria-labelledby="about-sections-title">
      <div className="card-heading"><div><p className="eyebrow">CONTENT MANAGEMENT</p><h2 id="about-sections-title">About Us sections</h2></div></div>
      <div className="section-list">{aboutSections.slice(0, 1).map((section) => <article className="section-row" key={section}><div className="section-icon violet"><AboutSectionIcon section={section}/></div><div className="section-copy"><h3>Banner</h3><p>Manage the banner heading, description, and highlight labels.</p></div><button className="edit-button" type="button" onClick={() => startEdit(section)}><EditIcon/><span>Edit</span></button></article>)}</div>
      <div className="about-content-group-heading"><div className="group-label">{contentHeading}</div><div className="about-content-group-actions"><button type="button" className="about-content-action primary" onClick={createContentCard}><span aria-hidden="true">＋</span><span>Create content card</span></button></div></div>
      {contentDescription && <p className="about-content-description">{contentDescription}</p>}
      <div className="section-list">{sections.slice(1).map((section, index) => <article className="section-row" key={`${section}-${index}`}><div className={`section-icon ${["blue", "indigo", "pink", "violet", "blue"][index % 5]}`}><AboutSectionIcon section={section}/></div><div className="section-copy"><h3>{section}</h3><p>{content[section].description}</p></div><button className="edit-button" type="button" onClick={() => startEdit(section)}><EditIcon/><span>Edit</span></button></article>)}</div>
      <div className="card-footer"><span>About Us page content</span><Link href="/">Back to homepage <span aria-hidden="true">→</span></Link></div>
    </section>
    <footer className="page-footer"><span>© 2025 Sri Chaitanya Schools</span><span>CMS <i/> Corporate</span></footer>
    {editingSection && sectionDraft && <div className="banner-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeEditor(); }}><section className="banner-modal" role="dialog" aria-modal="true" aria-labelledby="about-section-edit-title">
      <header className="banner-modal-header"><div><p className="banner-modal-eyebrow">ABOUT US CONTENT</p><h2 id="about-section-edit-title">{isCreatingCard ? "Create content card" : editingSection === "Banner" ? "About Us banner" : editingSection}</h2><p className="banner-modal-description">Update the text and details for this section.</p></div><button type="button" className="banner-modal-close" aria-label="Close editor" onClick={closeEditor}>×</button></header>
      <div className="banner-editor-list"><article className="banner-editor-card"><div className="banner-form-grid">
        <label className="banner-field"><span>Sub heading / badge text</span><input value={sectionDraft.eyebrow} onChange={(event) => setSectionDraft({ ...sectionDraft, eyebrow: event.target.value })}/></label>
        <label className="banner-field"><span>Main heading</span><input value={sectionDraft.heading} onChange={(event) => setSectionDraft({ ...sectionDraft, heading: event.target.value })}/></label>
        {!isCreatingCard && editingSection === "Banner" && <label className="banner-field"><span>Highlighted heading</span><input value={sectionDraft.highlight} onChange={(event) => setSectionDraft({ ...sectionDraft, highlight: event.target.value })}/></label>}
        <label className="banner-field banner-subtext-field"><span>Section description</span><textarea rows={3} value={sectionDraft.description} onChange={(event) => setSectionDraft({ ...sectionDraft, description: event.target.value })}/></label>
        {(isCreatingCard || editingSection !== "Banner") && <label className="banner-field banner-subtext-field"><span>Content</span><textarea rows={7} value={sectionDraft.body} onChange={(event) => setSectionDraft({ ...sectionDraft, body: event.target.value })}/></label>}
        {!isCreatingCard && editingSection === "Banner" && <><label className="banner-field"><span>Vision label</span><input value={sectionDraft.vision} onChange={(event) => setSectionDraft({ ...sectionDraft, vision: event.target.value })}/></label><label className="banner-field"><span>Values label</span><input value={sectionDraft.values} onChange={(event) => setSectionDraft({ ...sectionDraft, values: event.target.value })}/></label><label className="banner-field"><span>Growth label</span><input value={sectionDraft.growth} onChange={(event) => setSectionDraft({ ...sectionDraft, growth: event.target.value })}/></label></>}
        {!isCreatingCard && editingSection === "Banner" && <div className="about-banner-links-field"><div className="about-banner-links-heading"><strong>Bar link options</strong><button type="button" className="about-content-action" onClick={() => setSectionDraft((current) => current ? { ...current, barLinks: [...(current.barLinks ?? []), { label: "", url: "" }] } : current)}>＋ Add link</button></div>{(sectionDraft.barLinks ?? []).map((link, index) => <div className="about-banner-link-row" key={`bar-link-${index}`}><label className="banner-field"><span>Link text</span><input value={link.label} onChange={(event) => updateBarLink(index, "label", event.target.value)}/></label><label className="banner-field"><span>Link URL</span><input value={link.url} onChange={(event) => updateBarLink(index, "url", event.target.value)}/></label><button type="button" className="about-banner-link-remove" aria-label={`Remove ${link.label || "link"}`} onClick={() => setSectionDraft((current) => current ? { ...current, barLinks: (current.barLinks ?? []).filter((_, linkIndex) => linkIndex !== index) } : current)}>×</button></div>)}</div>}
        <label className="banner-field banner-image-field"><span>{editingSection === "Banner" ? "Banner background image" : "Section image"}</span><div className="banner-upload-control"><div className="banner-image-preview" style={sectionDraft.image ? { backgroundImage: `url("${sectionDraft.image}")` } : undefined}>{!sectionDraft.image && <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>}</div><span className="banner-upload-copy"><strong>{sectionDraft.imageName || (editingSection === "Banner" ? "Choose banner image" : "Choose section image")}</strong><small>PNG, JPG or WebP</small></span><span className="banner-browse-button">Browse</span><input type="file" accept="image/*" onChange={selectSectionImage}/></div></label>
      </div></article></div>
      <footer className="banner-modal-footer"><button type="button" className="banner-cancel-button" onClick={closeEditor}>Cancel</button><button type="button" className="banner-save-button" onClick={saveContent}>{isCreatingCard ? "Create card" : "Save section"}</button></footer>
    </section></div>}
    </main>
  </div>;
}

function EditIcon() { return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5 4 4M4 20l4-.8L20 7a2.1 2.1 0 0 0-3-3L5 16z"/><path d="M13 20h8"/></svg>; }

function AboutSectionIcon({ section }: { section: AboutSection }) {
  if (section === "Banner") return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>;
  if (section === "Vision & Mission") return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>;
  if (section === "Management") return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20v-1a6 6 0 0 1 12 0v1m2-6a5 5 0 0 1 4 5v1"/></svg>;
  if (section === "Our Journey") return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12h5l3-8 4 16 3-8h3"/></svg>;
  if (section === "Diversity") return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>;
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22zM4 5.5V22m5-14h7m-7 4h7"/></svg>;
}
