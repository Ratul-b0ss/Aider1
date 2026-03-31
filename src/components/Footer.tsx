import React from 'react';
import { Language } from '../hooks/useLanguage';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const content = lang === 'en' ? {
    tagline: 'A modern knowledge hub featuring 50 curated topics.',
    built: 'Built with',
    and: 'and',
    rights: '© 2025 KnowledgeHub. All rights reserved.',
    desc: 'Crafted for learners everywhere — in English & বাংলা',
  } : {
    tagline: '৫০টি নির্বাচিত বিষয় সমন্বিত একটি আধুনিক জ্ঞানকেন্দ্র।',
    built: 'নির্মিত',
    and: 'এবং',
    rights: '© ২০২৫ জ্ঞানকেন্দ্র। সকল অধিকার সংরক্ষিত।',
    desc: 'সর্বত্র শিক্ষার্থীদের জন্য তৈরি — ইংরেজি ও বাংলায়',
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', color: 'white'
          }}>✦</div>
          <span style={{
            fontWeight: 800, fontSize: '1rem',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>
            {lang === 'en' ? 'KnowledgeHub' : 'জ্ঞানকেন্দ্র'}
          </span>
        </div>
        <p className="footer-text" style={{ marginBottom: '0.4rem' }}>{content.tagline}</p>
        <p className="footer-text">
          {content.built} <strong>React</strong> {content.and} <strong>Tailwind CSS</strong> · {content.desc}
        </p>
        <p className="footer-text" style={{ marginTop: '0.75rem', opacity: 0.7 }}>
          {content.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
