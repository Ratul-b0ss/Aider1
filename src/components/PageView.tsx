import React, { useEffect, useRef } from 'react';
import { pagesData } from '../data/pages';
import { Language } from '../hooks/useLanguage';
import { gradientFromClass, translateCategory } from '../utils/colors';

interface PageViewProps {
  slug: string;
  lang: Language;
  onBack: () => void;
  onNavigate: (slug: string) => void;
}

const PageView: React.FC<PageViewProps> = ({ slug, lang, onBack, onNavigate }) => {
  const page = pagesData.find(p => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!page) {
    return (
      <div className="main-content page-view">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3 className="empty-title">
            {lang === 'en' ? 'Page not found' : 'পৃষ্ঠা পাওয়া যায়নি'}
          </h3>
          <button
            className="back-btn"
            onClick={onBack}
            style={{ margin: '1.5rem auto 0', display: 'inline-flex' }}
          >
            ← {lang === 'en' ? 'Back to Home' : 'হোমে ফিরুন'}
          </button>
        </div>
      </div>
    );
  }

  const content = page[lang];
  const gradient = gradientFromClass(page.color);

  // Related pages: same category, different slug, max 3
  const related = pagesData
    .filter(p => p.category === page.category && p.slug !== page.slug)
    .slice(0, 3);

  const labels = lang === 'en'
    ? { back: '← Back to All Topics', related: 'Related Topics', readMore: 'Read More →' }
    : { back: '← সব বিষয়ে ফিরুন', related: 'সংশ্লিষ্ট বিষয়', readMore: 'আরও পড়ুন →' };

  return (
    <div className="main-content page-view" ref={containerRef}>

      {/* ── HEADER CARD ── */}
      <div className="page-view-header">
        <button className="back-btn" onClick={onBack}>{labels.back}</button>

        <div className="page-view-icon-wrap" style={{ background: gradient }}>
          {page.icon}
        </div>

        <div className="page-view-category">
          {translateCategory(page.category, lang)}
          {' · '}
          {lang === 'en' ? `Topic ${page.id} of 50` : `৫০ এর মধ্যে বিষয় ${page.id}`}
        </div>

        <h1 className="page-view-title">{content.title}</h1>
        <p className="page-view-subtitle">{content.subtitle}</p>

        <div className="page-view-tags">
          {content.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* ── BODY PARAGRAPHS ── */}
      <div className="page-view-body">
        {content.body.map((para, i) => (
          <div
            key={i}
            className="prose-block"
            style={{ animationDelay: `${0.08 + i * 0.08}s` }}
          >
            <p className="prose-paragraph">{para}</p>
          </div>
        ))}
      </div>

      {/* ── RELATED TOPICS ── */}
      {related.length > 0 && (
        <div style={{ marginTop: '2.5rem' }}>
          <h3 style={{
            fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)',
            marginBottom: '1.25rem', letterSpacing: '-0.02em'
          }}>
            {labels.related}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1rem'
          }}>
            {related.map(rel => {
              const rc = rel[lang];
              return (
                <button
                  key={rel.id}
                  onClick={() => onNavigate(rel.slug)}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.25s ease',
                    display: 'block',
                    width: '100%',
                    fontFamily: 'inherit',
                    backdropFilter: 'blur(12px)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = 'var(--shadow-card-hover)';
                    el.style.borderColor = 'rgba(99,102,241,0.3)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = '';
                    el.style.borderColor = '';
                  }}
                >
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: gradientFromClass(rel.color),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem', marginBottom: '0.75rem',
                  }}>
                    {rel.icon}
                  </div>
                  <div style={{
                    fontSize: '0.9rem', fontWeight: 700,
                    color: 'var(--text-primary)', marginBottom: '0.25rem'
                  }}>
                    {rc.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-1)', fontWeight: 600 }}>
                    {labels.readMore}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageView;
