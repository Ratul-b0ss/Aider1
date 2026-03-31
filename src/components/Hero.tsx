import React from 'react';
import { Language } from '../hooks/useLanguage';

interface HeroProps {
  lang: Language;
  totalPages: number;
  totalCategories: number;
}

const Hero: React.FC<HeroProps> = ({ lang, totalPages, totalCategories }) => {
  const content = {
    en: {
      badge: '✦ 50 Knowledge Sections',
      h1a: 'Explore the',
      h1b: 'World\'s Knowledge',
      h1c: 'In One Place',
      subtitle: 'Dive deep into 50 curated topics spanning science, technology, philosophy, health, society, and the arts — with seamless English & Bengali support.',
      stat1: String(totalPages),
      stat1l: 'Topics',
      stat2: String(totalCategories),
      stat2l: 'Categories',
      stat3: '2',
      stat3l: 'Languages',
    },
    bn: {
      badge: '✦ ৫০টি জ্ঞান বিভাগ',
      h1a: 'একটি জায়গায়',
      h1b: 'বিশ্বের জ্ঞান',
      h1c: 'অন্বেষণ করুন',
      subtitle: 'বিজ্ঞান, প্রযুক্তি, দর্শন, স্বাস্থ্য, সমাজ এবং শিল্পকলা জুড়ে ৫০টি নির্বাচিত বিষয়ে গভীরভাবে ডুব দিন — বাংলা ও ইংরেজি সমর্থন সহ।',
      stat1: String(totalPages),
      stat1l: 'বিষয়',
      stat2: String(totalCategories),
      stat2l: 'বিভাগ',
      stat3: '২',
      stat3l: 'ভাষা',
    }
  }[lang];

  return (
    <section className="hero">
      <div className="hero-badge">{content.badge}</div>
      <h1>
        {content.h1a}{' '}
        <span className="gradient-text">{content.h1b}</span>{' '}
        {content.h1c}
      </h1>
      <p className="hero-subtitle">{content.subtitle}</p>
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-number">{content.stat1}</div>
          <div className="hero-stat-label">{content.stat1l}</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-number">{content.stat2}</div>
          <div className="hero-stat-label">{content.stat2l}</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-number">{content.stat3}</div>
          <div className="hero-stat-label">{content.stat3l}</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
