import { useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { BODY_CLASSES, PAGE_SCRIPTS } from './pages/manifest.js';
import homeHtml from './pages/home.html?raw';
import teamHtml from './pages/team.html?raw';
import featuresHtml from './pages/our-features.html?raw';
import areasHtml from './pages/areas-of-practice.html?raw';
import blogHtml from './pages/blog.html?raw';
import newsHtml from './pages/news.html?raw';
import contactsHtml from './pages/contacts.html?raw';
import julissaHtml from './pages/team/julissa-diaz.html?raw';
import ricardoHtml from './pages/team/ricardo-soto.html?raw';

const PAGES = {
  home: homeHtml,
  team: teamHtml,
  'our-features': featuresHtml,
  'areas-of-practice': areasHtml,
  blog: blogHtml,
  news: newsHtml,
  contacts: contactsHtml,
  'team/julissa-diaz': julissaHtml,
  'team/ricardo-soto': ricardoHtml,
};

const loadedScripts = new Set();

function loadScript(src) {
  if (loadedScripts.has(src)) return;
  loadedScripts.add(src);
  const s = document.createElement('script');
  s.src = src;
  document.body.appendChild(s);
}

function Page({ slug }) {
  useEffect(() => {
    document.body.className = BODY_CLASSES[slug] || '';
    window.scrollTo(0, 0);
    loadScript('/vendor/inline.js');
    if (PAGE_SCRIPTS[slug]) loadScript(PAGE_SCRIPTS[slug]);
  }, [slug]);

  if (!PAGES[slug]) return <NotFound />;
  return <div id="colbs-page" dangerouslySetInnerHTML={{ __html: PAGES[slug] }} />;
}

function TeamMember() {
  const { member } = useParams();
  return <Page slug={`team/${member}`} />;
}

function NotFound() {
  useEffect(() => { document.body.className = ''; }, []);
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Work Sans, sans-serif' }}>
      <h1 style={{ color: '#1A2E4A', fontSize: 64, margin: 0 }}>404</h1>
      <p style={{ color: '#64748b' }}>Página no encontrada</p>
      <a href="/" style={{ color: '#FF6C0E' }}>Volver al inicio</a>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navegación SPA sin recargar la página
    const onClick = (e) => {
      if (e.defaultPrevented) return; // un script de la página ya manejó el click (p.ej. modal de team)
      // Tarjeta de equipo: foto/CTA abren el mismo popup que el nombre
      const card = e.target.closest('.colbsx-card');
      if (card && !e.target.closest('.colbsx-name')) {
        const nameLink = card.querySelector('.colbsx-name a');
        if (nameLink) {
          e.preventDefault();
          nameLink.click();
          return;
        }
      }
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || a.target === '_blank' || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;
      e.preventDefault();
      if (href !== '#' && href !== '#!') navigate(href);
    };
    // Formulario de contacto (era Contact Form 7 / WordPress): fallback a mailto
    const onSubmit = (e) => {
      const form = e.target.closest('form');
      if (!form) return;
      e.preventDefault();
      const data = new FormData(form);
      const lines = [...data.entries()].map(([k, v]) => `${k}: ${v}`);
      const subject = encodeURIComponent('Contacto desde colbs.cr');
      const body = encodeURIComponent(lines.join('\n'));
      window.location.href = `mailto:info@colbs.cr?subject=${subject}&body=${body}`;
    };
    document.addEventListener('click', onClick);
    document.addEventListener('submit', onSubmit);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('submit', onSubmit);
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Page slug="home" />} />
      <Route path="/team" element={<Page slug="team" />} />
      <Route path="/team/:member" element={<TeamMember />} />
      <Route path="/our-features" element={<Page slug="our-features" />} />
      <Route path="/areas-of-practice" element={<Page slug="areas-of-practice" />} />
      <Route path="/blog" element={<Page slug="blog" />} />
      <Route path="/news" element={<Page slug="news" />} />
      <Route path="/contacts" element={<Page slug="contacts" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
