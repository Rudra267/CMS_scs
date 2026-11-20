"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuScrollHint from "./menu-scroll-hint";

const navigationGroups = [
  { title: "Corporate", items: [["Home", "home"], ["About Us", "info"], ["Pre-Primary", "people"], ["Primary", "book"], ["High School", "cap"], ["Diversity", "group"], ["Student Life", "leaf"], ["Achievements", "trophy"], ["Facilities", "building"], ["Uniforms", "shirt"], ["Gallery", "image"], ["Admissions", "check"], ["News & Events", "calendar"], ["Magazine", "book"], ["FAQs", "info"], ["Admission Enquiry Section", "people"], ["Privacy Policy", "info"], ["Terms & Conditions", "book"], ["Careers", "people"]] },
  { title: "Branch", items: [["Home", "home"], ["About Us", "info"], ["Pre-Primary", "people"], ["Primary", "book"], ["High School", "cap"], ["Student Life", "leaf"], ["Achievements", "trophy"], ["Facilities", "building"], ["Uniforms", "shirt"], ["Gallery", "image"], ["Admissions", "check"], ["News & Events", "calendar"], ["Magazine", "book"], ["FAQs", "info"], ["Admission Enquiry Section", "people"], ["Privacy Policy", "info"], ["Terms & Conditions", "book"], ["Careers", "people"]] },
  { title: "Careers Application", items: [["Applications", "people"]] },
] as const;

const iconPaths: Record<string, React.ReactNode> = {
  home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-7h6v7"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></>,
  people: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1m2-15a3 3 0 0 1 0 6m1 3a5 5 0 0 1 3 5v1"/></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z"/><path d="M4 5.5V22m5-14h7m-7 4h7"/></>,
  cap: <><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v6c4 3 8 3 12 0v-6m4-2v7"/></>,
  group: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20v-1a6 6 0 0 1 12 0v1m2-6a5 5 0 0 1 4 5v1"/></>,
  leaf: <><path d="M20 4C10 4 5 8 5 15c0 3 2 5 5 5 7 0 10-6 10-16Z"/><path d="M3 21 14 10"/></>,
  trophy: <><path d="M8 21h8m-4-4v4M7 4h10v6a5 5 0 0 1-10 0zM7 7H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"/></>,
  building: <><path d="M3 21V7l9-4 9 4v14M3 21h18M8 10h2m4 0h2m-8 4h2m4 0h2m-7 7v-4h4v4"/></>,
  shirt: <path d="m8 4 4 2 4-2 5 4-3 4-2-1v9H8v-9l-2 1-3-4z"/>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></>,
  check: <><rect x="4" y="4" width="16" height="17" rx="2"/><path d="M9 4V2h6v2m-8 6 2 2 4-4m-4 8h7"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
};

function Icon({ name }: { name: string }) {
  return <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name] ?? iconPaths.book}</svg>;
}

export default function Sidebar() {
  const pathname = usePathname();
  return <aside className="sidebar">
    <Link className="brand" href="/" aria-label="Sri Chaitanya Schools home"><Image className="brand-logo" src="/logo_chaitanya.png" alt="Sri Chaitanya logo" width={44} height={44} preload unoptimized/><span className="brand-copy"><strong>Sri Chaitanya</strong><b>Schools</b></span></Link>
    <nav className="side-nav" id="side-nav" aria-label="CMS sections">{navigationGroups.map((group) => <div className="nav-group" key={group.title}><div className="nav-label"><span>{group.title.toUpperCase()}</span><i/></div>{group.items.map(([label, icon], index) => {
      const active = group.title === "Corporate" && ((label === "Home" && pathname === "/") || (label === "About Us" && pathname === "/about"));
      const href = label === "Home" ? "/" : label === "About Us" ? "/about" : `/#${label.toLowerCase().replaceAll(" ", "-")}`;
      return <Link key={`${group.title}-${label}-${index}`} className={`nav-item${active ? " active" : ""}`} href={href}><Icon name={icon}/><span>{label}</span></Link>;
    })}</div>)}</nav>
    <MenuScrollHint />
  </aside>;
}
