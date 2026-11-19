"use client";

import { useState, type ChangeEvent } from "react";

type Story = { id: number; quote: string; author: string; link: string; imageName: string; image: string; stars: number; order: number };
type NewsItem = { id: number; title: string; date: string; description: string; imageName: string; image: string; link: string; order: number };

const initialStories: Story[] = [
  { id: 1, quote: "The best decision for my child's future.", author: "Priya Sharma", link: "#parent-story-1", imageName: "", image: "", stars: 5, order: 1 },
  { id: 2, quote: "Amazing faculty and environment.", author: "Rajesh Kumar", link: "#parent-story-2", imageName: "", image: "", stars: 5, order: 2 },
  { id: 3, quote: "Happy with my child's development.", author: "Anita Desai", link: "#parent-story-3", imageName: "", image: "", stars: 5, order: 3 },
];
const initialNews: NewsItem[] = [
  { id: 1, title: "Annual Day Celebration 2024", date: "15 May 2024", description: "A spectacular celebration of talent, creativity and excellence.", imageName: "", image: "", link: "#annual-day", order: 1 },
  { id: 2, title: "Science Exhibition 2024", date: "10 May 2024", description: "Students showcase creative science projects and discoveries.", imageName: "", image: "", link: "#science-exhibition", order: 2 },
  { id: 3, title: "Sports Meet 2024", date: "05 May 2024", description: "A celebration of teamwork, sportsmanship, and achievement.", imageName: "", image: "", link: "#sports-meet", order: 3 },
  { id: 4, title: "Education Summit 2024", date: "28 April 2024", description: "Educators and students come together to explore new ideas.", imageName: "", image: "", link: "#education-summit", order: 4 },
];

export default function StoriesNewsEditorButton() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"stories" | "news">("stories");
  const [editingText, setEditingText] = useState(false);
  const [stories, setStories] = useState(initialStories);
  const [news, setNews] = useState(initialNews);
  const [storyText, setStoryText] = useState({ eyebrow: "PARENT STORIES", heading: "Voices That Inspire" });
  const [newsText, setNewsText] = useState({ eyebrow: "NEWS & EVENTS", heading: "Stay Updated With Our Latest Happenings", buttonText: "View All", buttonLink: "#news-events" });
  const [textDraft, setTextDraft] = useState({ storyText, newsText });
  const [storyDraft, setStoryDraft] = useState<Story | null>(null);
  const [newsDraft, setNewsDraft] = useState<NewsItem | null>(null);

  const close = () => { setOpen(false); setEditingText(false); setStoryDraft(null); setNewsDraft(null); };
  const editText = () => { setTextDraft({ storyText, newsText }); setEditingText(true); };
  const saveText = () => { setStoryText(textDraft.storyText); setNewsText(textDraft.newsText); setEditingText(false); };
  const setStoryImage = (event: ChangeEvent<HTMLInputElement>) => { const file = event.currentTarget.files?.[0]; if (file && storyDraft) setStoryDraft({ ...storyDraft, imageName: file.name, image: URL.createObjectURL(file) }); };
  const setNewsImage = (event: ChangeEvent<HTMLInputElement>) => { const file = event.currentTarget.files?.[0]; if (file && newsDraft) setNewsDraft({ ...newsDraft, imageName: file.name, image: URL.createObjectURL(file) }); };
  const saveStory = () => { if (!storyDraft) return; setStories((current) => [...current.filter((item) => item.id !== storyDraft.id), storyDraft].sort((a, b) => a.order - b.order)); setStoryDraft(null); };
  const saveNews = () => { if (!newsDraft) return; setNews((current) => [...current.filter((item) => item.id !== newsDraft.id), newsDraft].sort((a, b) => a.order - b.order)); setNewsDraft(null); };

  return <>
    <button className="edit-button" type="button" onClick={() => setOpen(true)}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5 4 4M4 20l4-.8L20 7a2.1 2.1 0 0 0-3-3L5 16z"/><path d="M13 20h8"/></svg><span>Edit</span></button>
    {open && <div className="banner-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section className="banner-modal" role="dialog" aria-modal="true" aria-labelledby="stories-news-title">
      <header className="banner-modal-header"><div><p className="banner-modal-eyebrow">HOMEPAGE CONTENT</p><h2 id="stories-news-title">Parent Stories & News Events</h2><p className="banner-modal-description">Manage testimonial and news panels displayed on the homepage.</p></div><button className="banner-modal-close" type="button" aria-label="Close editor" onClick={close}>×</button></header>
      <div className="stories-news-tabs"><button type="button" className={tab === "stories" ? "is-active" : ""} onClick={() => { setTab("stories"); setStoryDraft(null); setNewsDraft(null); }}>Parent stories</button><button type="button" className={tab === "news" ? "is-active" : ""} onClick={() => { setTab("news"); setStoryDraft(null); setNewsDraft(null); }}>News & events</button></div>
      <div className="banner-editor-list global-standards-editor">
        <div className="banner-modal-toolbar global-standards-toolbar"><strong>{tab === "stories" ? "Testimonials" : "News & events"}</strong><div className="banner-table-actions"><button type="button" className="banner-update-button" onClick={editText}>Edit section text</button><button type="button" className="banner-new-button" onClick={() => tab === "stories" ? setStoryDraft({ id: Date.now(), quote: "", author: "", link: "", imageName: "", image: "", stars: 5, order: stories.length + 1 }) : setNewsDraft({ id: Date.now(), title: "", date: "", description: "", imageName: "", image: "", link: "", order: news.length + 1 })}><span aria-hidden="true">+</span> {tab === "stories" ? "New story" : "New event"}</button></div></div>
        {editingText && <article className="banner-editor-card"><div className="banner-form-grid">
          <label className="banner-field"><span>Stories sub heading</span><input value={textDraft.storyText.eyebrow} onChange={(event) => setTextDraft((current) => ({ ...current, storyText: { ...current.storyText, eyebrow: event.target.value } }))}/></label>
          <label className="banner-field"><span>Stories main heading</span><input value={textDraft.storyText.heading} onChange={(event) => setTextDraft((current) => ({ ...current, storyText: { ...current.storyText, heading: event.target.value } }))}/></label>
          <label className="banner-field"><span>News sub heading</span><input value={textDraft.newsText.eyebrow} onChange={(event) => setTextDraft((current) => ({ ...current, newsText: { ...current.newsText, eyebrow: event.target.value } }))}/></label>
          <label className="banner-field"><span>News main heading</span><input value={textDraft.newsText.heading} onChange={(event) => setTextDraft((current) => ({ ...current, newsText: { ...current.newsText, heading: event.target.value } }))}/></label>
          <label className="banner-field"><span>View All button text</span><input value={textDraft.newsText.buttonText} onChange={(event) => setTextDraft((current) => ({ ...current, newsText: { ...current.newsText, buttonText: event.target.value } }))}/></label>
          <label className="banner-field"><span>View All button link</span><input value={textDraft.newsText.buttonLink} onChange={(event) => setTextDraft((current) => ({ ...current, newsText: { ...current.newsText, buttonLink: event.target.value } }))}/></label>
        </div><div className="global-standards-draft-actions"><button className="banner-cancel-button" type="button" onClick={() => setEditingText(false)}>Cancel</button><button className="banner-save-button" type="button" onClick={saveText}>Save section text</button></div></article>}
        {tab === "stories" && storyDraft && <article className="banner-editor-card"><div className="banner-form-grid">
          <label className="banner-field"><span>Quote</span><textarea rows={2} value={storyDraft.quote} onChange={(event) => setStoryDraft({ ...storyDraft, quote: event.target.value })}/></label>
          <label className="banner-field"><span>Parent name</span><input value={storyDraft.author} onChange={(event) => setStoryDraft({ ...storyDraft, author: event.target.value })}/></label>
          <label className="banner-field"><span>Rating</span><select value={storyDraft.stars} onChange={(event) => setStoryDraft({ ...storyDraft, stars: Number(event.target.value) })}><option value={5}>5 stars</option><option value={4}>4 stars</option><option value={3}>3 stars</option><option value={2}>2 stars</option><option value={1}>1 star</option></select></label>
          <label className="banner-field"><span>Order</span><input type="number" min="1" value={storyDraft.order} onChange={(event) => setStoryDraft({ ...storyDraft, order: Number(event.target.value) })}/></label>
          <label className="banner-field"><span>Link</span><input value={storyDraft.link} onChange={(event) => setStoryDraft({ ...storyDraft, link: event.target.value })} placeholder="https://..."/></label>
          <label className="banner-field banner-image-field"><span>Parent image</span><div className="banner-upload-control"><div className="banner-image-preview" style={storyDraft.image ? { backgroundImage: `url("${storyDraft.image}")` } : undefined}/><span className="banner-upload-copy"><strong>{storyDraft.imageName || "Choose parent image"}</strong><small>PNG, JPG or WebP</small></span><span className="banner-browse-button">Browse</span><input type="file" accept="image/*" onChange={setStoryImage}/></div></label>
        </div><div className="global-standards-draft-actions"><button className="banner-cancel-button" type="button" onClick={() => setStoryDraft(null)}>Cancel</button><button className="banner-save-button" type="button" onClick={saveStory}>Save story</button></div></article>}
        {tab === "news" && newsDraft && <article className="banner-editor-card"><div className="banner-form-grid">
          <label className="banner-field"><span>Event title</span><input value={newsDraft.title} onChange={(event) => setNewsDraft({ ...newsDraft, title: event.target.value })}/></label>
          <label className="banner-field"><span>Date</span><input value={newsDraft.date} onChange={(event) => setNewsDraft({ ...newsDraft, date: event.target.value })} placeholder="15 May 2024"/></label>
          <label className="banner-field banner-subtext-field"><span>Description</span><textarea rows={2} value={newsDraft.description} onChange={(event) => setNewsDraft({ ...newsDraft, description: event.target.value })}/></label>
          <label className="banner-field"><span>Link</span><input value={newsDraft.link} onChange={(event) => setNewsDraft({ ...newsDraft, link: event.target.value })}/></label>
          <label className="banner-field"><span>Order</span><input type="number" min="1" value={newsDraft.order} onChange={(event) => setNewsDraft({ ...newsDraft, order: Number(event.target.value) })}/></label>
          <label className="banner-field banner-image-field"><span>Event image</span><div className="banner-upload-control"><div className="banner-image-preview" style={newsDraft.image ? { backgroundImage: `url("${newsDraft.image}")` } : undefined}/><span className="banner-upload-copy"><strong>{newsDraft.imageName || "Choose event image"}</strong><small>PNG, JPG or WebP</small></span><span className="banner-browse-button">Browse</span><input type="file" accept="image/*" onChange={setNewsImage}/></div></label>
        </div><div className="global-standards-draft-actions"><button className="banner-cancel-button" type="button" onClick={() => setNewsDraft(null)}>Cancel</button><button className="banner-save-button" type="button" onClick={saveNews}>Save event</button></div></article>}
        {tab === "stories" ? <div className="global-standards-card-list">{stories.map((story, index) => <article className="global-standards-card-row media-content-row" key={story.id}><div className="media-content-thumb" style={story.image ? { backgroundImage: `url("${story.image}")` } : undefined}> {!story.image && <span>Photo</span>}</div><div className="global-standards-card-copy"><small>Story {index + 1} · Order {story.order} · {"★".repeat(story.stars)}</small><strong>“{story.quote}”</strong><p>{story.author || "Parent name"}</p><code>{story.link}</code></div><div className="banner-table-actions"><button type="button" className="banner-update-button" onClick={() => setStoryDraft({ ...story })}>Update</button><button type="button" className="banner-delete-button" onClick={() => setStories((current) => current.filter((item) => item.id !== story.id))}>Delete</button></div></article>)}</div> : <div className="global-standards-card-list">{news.map((item, index) => <article className="global-standards-card-row media-content-row" key={item.id}><div className="media-content-thumb" style={item.image ? { backgroundImage: `url("${item.image}")` } : undefined}>{!item.image && <span>Image</span>}</div><div className="global-standards-card-copy"><small>Event {index + 1} · {item.date} · Order {item.order}</small><strong>{item.title}</strong><p>{item.description}</p><code>{item.link}</code></div><div className="banner-table-actions"><button type="button" className="banner-update-button" onClick={() => setNewsDraft({ ...item })}>Update</button><button type="button" className="banner-delete-button" onClick={() => setNews((current) => current.filter((entry) => entry.id !== item.id))}>Delete</button></div></article>)}</div>}
      </div>
      <footer className="banner-modal-footer"><button type="button" className="banner-cancel-button" onClick={close}>Close</button></footer>
    </section></div>}
  </>;
}
