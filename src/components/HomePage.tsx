import React, { useState, useMemo } from 'react';
import { pagesData, categories } from '../data/pages';
import { Language } from '../hooks/useLanguage';
import Hero from './Hero';
import PageCard from './PageCard';

interface HomePageProps {
  lang: Language;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onNavigate: (slug: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ lang, searchQuery, setSearchQuery, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredPages = useMemo(() => {
    let pages = pagesData;

    // Filter by category
    if (activeCategory !== 'All') {
      pages = pages.filter(p => p.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      pages = pages.filter(p => {
        const c = p[lang];
        return (
          c.title.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q) ||
          c.tags.some(t => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q) ||
          c.body.some(b => b.toLowerCase().includes(q))
        );
      });
    }

    return pages;
  }, [searchQuery, activeCategory, lang]);

  const allCategories = ['All', ...categories];

  const ui = {
    en: {
      filterLabel: 'Filter:',
      showing: 'Showing',
      of: 'of',
      results: 'topics',
      clearSearch: '✕ Clear search',
      noResults: 'No topics found',
      noResultsSub: `No results for "${searchQuery}" — try a different keyword`,
      allCount: `All ${pagesData.length}`,
    },
    bn: {
      filterLabel: 'ফিল্টার:',
      showing: 'দেখানো হচ্ছে',
      of: 'এর মধ্যে',
      results: 'বিষয়',
      clearSearch: '✕ অনুসন্ধান মুছুন',
      noResults: 'কোনো বিষয় পাওয়া যায়নি',
      noResultsSub: `"${searchQuery}" এর জন্য কোনো ফলাফল নেই — ভিন্ন কীওয়ার্ড চেষ্টা করুন`,
      allCount: `সব ${pagesData.length}`,
    }
  }[lang];

  const categoryLabels: Record<string, string> = lang === 'en' ? {
    All: `All ${pagesData.length}`, Technology: 'Technology', Environment: 'Environment',
    Science: 'Science', Health: 'Health', Finance: 'Finance',
    Society: 'Society', Philosophy: 'Philosophy', Arts: 'Arts', History: 'History',
  } : {
    All: `সব ${pagesData.length}`, Technology: 'প্রযুক্তি', Environment: 'পরিবেশ',
    Science: 'বিজ্ঞান', Health: 'স্বাস্থ্য', Finance: 'অর্থ',
    Society: 'সমাজ', Philosophy: 'দর্শন', Arts: 'শিল্পকলা', History: 'ইতিহাস',
  };

  return (
    <>
      <Hero lang={lang} totalPages={pagesData.length} totalCategories={categories.length} />

      <main className="main-content">
        {/* Category Filter Bar */}
        <div className="filter-bar">
          <span className="filter-label">{ui.filterLabel}</span>
          {allCategories.map(cat => (
            <button
              key={cat}
              className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Results info */}
        <div className="results-info">
          <p className="results-count">
            {ui.showing} <span>{filteredPages.length}</span> {ui.of} {pagesData.length} {ui.results}
          </p>
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>
              {ui.clearSearch}
            </button>
          )}
        </div>

        {/* Grid */}
        {filteredPages.length > 0 ? (
          <div className="card-grid">
            {filteredPages.map((page, index) => (
              <PageCard
                key={page.id}
                page={page}
                lang={lang}
                onClick={onNavigate}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">{ui.noResults}</h3>
            <p className="empty-subtitle">{ui.noResultsSub}</p>
          </div>
        )}
      </main>
    </>
  );
};

export default HomePage;
