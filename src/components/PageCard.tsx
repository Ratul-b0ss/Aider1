import React from 'react';
import { PageContent } from '../data/pages';
import { Language } from '../hooks/useLanguage';
import { gradientColorsFromClass, translateCategory } from '../utils/colors';

interface PageCardProps {
  page: PageContent;
  lang: Language;
  onClick: (slug: string) => void;
  index: number;
}

const PageCard: React.FC<PageCardProps> = ({ page, lang, onClick, index }) => {
  const content = page[lang];
  const readLabel = lang === 'en' ? 'Read More' : 'আরও পড়ুন';

  return (
    <article
      className="page-card"
      onClick={() => onClick(page.slug)}
      style={{ animationDelay: `${Math.min(index * 0.03, 0.25)}s` }}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(page.slug)}
      aria-label={`Read ${content.title}`}
    >
      <div className="card-header">
        {/* Icon with gradient background */}
        <div
          className="card-icon-wrap"
          style={{ background: `linear-gradient(135deg, ${gradientColorsFromClass(page.color)})` }}
        >
          {page.icon}
        </div>

        {/* Meta */}
        <div className="card-meta">
          <div className="card-category">
            {translateCategory(page.category, lang)}
          </div>
          <div className="card-id">
            <span className="page-num-badge">{page.id}</span>
          </div>
        </div>
      </div>

      <div className="card-body">
        <h2 className="card-title">{content.title}</h2>
        <p className="card-subtitle">{content.subtitle}</p>
        <div className="card-tags">
          {content.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <span className="card-read-btn">
          {readLabel} <span>→</span>
        </span>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          {lang === 'en' ? '3 min read' : '৩ মিনিট পড়া'}
        </span>
      </div>
    </article>
  );
};

export default PageCard;
