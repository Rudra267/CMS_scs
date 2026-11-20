import BannerEditorButton from "./banner-editor-button";
import PopupEditorButton from "./popup-editor-button";
import WhyChooseUsEditorButton from "./why-choose-us-editor-button";
import GlobalStandardsEditorButton from "./global-standards-editor-button";
import FacilitiesEditorButton from "./facilities-editor-button";
import StatisticsEditorButton from "./statistics-editor-button";
import StoriesNewsEditorButton from "./stories-news-editor-button";
import AdmissionsCtaEditorButton from "./admissions-cta-editor-button";

function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-7h6v7"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></>,
    people: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1m2-15a3 3 0 0 1 0 6m1 3a5 5 0 0 1 3 5v1"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z"/><path d="M4 5.5V22m5-14h7m-7 4h7"/></>,
    cap: <><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v6c4 3 8 3 12 0v-6m4-2v7"/></>,
    group: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20v-1a6 6 0 0 1 12 0v1m2-6a5 5 0 0 1 4 5v1"/></>,
    leaf: <><path d="M20 4C10 4 5 8 5 15c0 3 2 5 5 5 7 0 10-6 10-16Z"/><path d="M3 21 14 10"/></>,
    trophy: <><path d="M8 21h8m-4-4v4M7 4h10v6a5 5 0 0 1-10 0zM7 7H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"/></>,
    building: <><path d="M3 21V7l9-4 9 4v14M3 21h18M8 10h2m4 0h2m-8 4h2m4 0h2m-7 7v-4h4v4"/></>,
    shirt: <><path d="m8 4 4 2 4-2 5 4-3 4-2-1v9H8v-9l-2 1-3-4z"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></>,
    check: <><rect x="4" y="4" width="16" height="17" rx="2"/><path d="M9 4V2h6v2m-8 6 2 2 4-4m-4 8h7"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-13 4h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/></>,
    edit: <><path d="m15 5 4 4M4 20l4-.8L20 7a2.1 2.1 0 0 0-3-3L5 16z"/><path d="M13 20h8"/></>,
    external: <><path d="M14 4h6v6m-11 5L20 4"/><path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></>,
    chevron: <path d="m7 10 5 5 5-5"/>,
  };
  return <svg {...common}>{paths[name] || paths.info}</svg>;
}

const sections = [
  { title: "Banner", description: "Manage the homepage banner slides, images, and navigation links.", icon: "image", tone: "violet" },
  { title: "Popup Content", description: "Create and manage homepage popups for announcements, notices, or special updates.", icon: "window", tone: "pink" },
  { title: "Schools Statistics", description: "Update the key school statistics section displayed on the homepage.", icon: "chart", tone: "blue" },
  { title: "Why Parents Choose Us", description: "Manage the feature cards for Academic Excellence, Campus Life, Sports, and more.", icon: "features", tone: "indigo" },
  { title: "Global Standards", description: "Manage the global standards heading, description, and content cards.", icon: "features", tone: "blue" },
  { title: "Facilities", description: "Manage the facilities heading, call-to-action, images, and cards.", icon: "facilities", tone: "violet" },
  { title: "Parent Stories & News Events", description: "Manage parent testimonials and the latest school news and events.", icon: "stories", tone: "pink" },
  { title: "Admissions Call to Action", description: "Manage the admissions banner message, background, and links.", icon: "image", tone: "violet" },
];

function SectionIcon({ name }: { name: string }) {
  if (name === "image") return <Icon name="image" size={32} />;
  if (name === "window") return <svg width="32" height="32" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><rect x="4" y="7" width="30" height="25" rx="4"/><path d="M4 14h30M10 10.5h.1m4 0h.1m4 0h.1" strokeLinecap="round"/></svg>;
  if (name === "features") return <svg width="32" height="32" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="6" width="12" height="12" rx="2"/><rect x="21" y="6" width="12" height="12" rx="2"/><rect x="5" y="22" width="12" height="12" rx="2"/><rect x="21" y="22" width="12" height="12" rx="2"/></svg>;
  if (name === "facilities") return <svg width="32" height="32" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 32V10l14-6 14 6v22M3 32h32M12 14h.1m7-.1h.1m7 .1h.1M12 20h.1m7-.1h.1m7 .1h.1M16 32v-7h6v7"/></svg>;
  if (name === "stories") return <svg width="32" height="32" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 8h24v18H18l-8 6v-6H7z"/><path d="M12 14h14m-14 6h9"/></svg>;
  return <svg width="32" height="32" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 31V23h6v8m4 0V15h6v16m4 0V7h6v24M4 32h30"/></svg>;
}

export default function Home() {
  return (
      <main className="main-area" id="home">
        <header className="topbar">
          <div className="breadcrumbs"><span>CMS</span><b>/</b><span>Corporate</span><b>/</b><strong>Home</strong></div>
        </header>
        <section className="page-heading">
          <div><p className="eyebrow">CORPORATE WEBSITE</p><h1>Homepage content</h1><p className="subtitle">Manage what visitors see on the school homepage.</p></div>
          <a className="view-button" href="https://srichaitanyaschool.net/" target="_blank" rel="noreferrer"><Icon name="external" size={20}/>View website</a>
        </section>
        <section className="sections-card" aria-labelledby="sections-title">
          <div className="card-heading"><div><p className="eyebrow">CONTENT MANAGEMENT</p><h2 id="sections-title">Homepage sections</h2></div></div>
          <div className="section-list">
            {sections.slice(0, 2).map((section) => (
              <article className="section-row" key={section.title}>
                <div className={`section-icon ${section.tone}`}><SectionIcon name={section.icon}/></div>
                <div className="section-copy"><h3>{section.title}</h3><p>{section.description}</p></div>
                {section.title === "Banner" ? <BannerEditorButton /> : section.title === "Popup Content" ? <PopupEditorButton /> : section.title === "Why Parents Choose Us" ? <WhyChooseUsEditorButton /> : <a className="edit-button" href={`#edit-${section.title.toLowerCase().replaceAll(" ", "-")}`}><Icon name="edit" size={19}/><span>Edit</span></a>}
              </article>
            ))}
          </div>
          <div className="group-label">Content</div>
          <div className="section-list">
            {sections.slice(2).map((section) => (
              <article className="section-row" key={section.title}>
                <div className={`section-icon ${section.tone}`}><SectionIcon name={section.icon}/></div>
                <div className="section-copy"><h3>{section.title}</h3><p>{section.description}</p></div>
                {section.title === "Schools Statistics" ? <StatisticsEditorButton /> : section.title === "Why Parents Choose Us" ? <WhyChooseUsEditorButton /> : section.title === "Global Standards" ? <GlobalStandardsEditorButton /> : section.title === "Facilities" ? <FacilitiesEditorButton /> : section.title === "Parent Stories & News Events" ? <StoriesNewsEditorButton /> : section.title === "Admissions Call to Action" ? <AdmissionsCtaEditorButton /> : <a className="edit-button" href={`#edit-${section.title.toLowerCase().replaceAll(" ", "-")}`}><Icon name="edit" size={19}/><span>Edit</span></a>}
              </article>
            ))}
          </div>
          <div className="card-footer"><span>Last updated <strong>Today, 10:42 AM</strong></span><a href="#activity">View activity <span aria-hidden="true">→</span></a></div>
        </section>
        <footer className="page-footer"><span>© 2026 Sri Chaitanya Schools</span><span>CMS <i/> Corporate</span></footer>
      </main>
  );
}
