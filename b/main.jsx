import React, { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import books from '../shared/books.json';
import './style.css';

const covers = import.meta.glob('../shared/covers/*.svg', { eager: true, query: '?url', import: 'default' });
const cover = book => covers[`../shared/${book.image}`];
function App() {
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [values, setValues] = useState({ name: '', email: '', format: '', consent: false });
  const [attempted, setAttempted] = useState(false);
  const [success, setSuccess] = useState(false);
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const opener = useRef(null);
  const fields = useRef({});
  const errors = {
    name: values.name.trim() ? '' : 'Vinsamlegast sláðu inn nafn.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) ? '' : 'Vinsamlegast sláðu inn gilt netfang.',
    format: values.format ? '' : 'Vinsamlegast veldu lestrarsnið.',
    consent: values.consent ? '' : 'Þú þarft að samþykkja þátttöku.'
  };
  const results = books.filter(book => `${book.title} ${book.author} ${book.genre}`.toLocaleLowerCase('is').includes(query.trim().toLocaleLowerCase('is')));
  function openBook(book, event) {
    opener.current = event.currentTarget;
    flushSync(() => setSelected(book));
    dialog.current.showModal();
    closeButton.current.focus();
  }
  // Native dialog gerir bakgrunninn óvirkan. Þetta heldur Tab-röðinni
  // inni í glugganum, líka þegar Close er eina stjórntækið.
  function keepDialogFocus(event) {
    if (event.key !== 'Tab') return;
    const controls = [...event.currentTarget.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter(element => element.tabIndex >= 0 && element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  // Ljúkum lokun og fókusendurkomu saman. Seinn close-viðburður
  // má ekki stela fókus þegar notandi er þegar kominn á næsta hnapp.
  function closeBook() {
    dialog.current.close();
    opener.current?.focus();
  }
  function cancelBook(event) {
    event.preventDefault();
    closeBook();
  }
  function toggleSave(id) {
    setSaved(previous => { const next = new Set(previous); next.has(id) ? next.delete(id) : next.add(id); return next; });
  }
  function update(key, value) { setValues(previous => ({ ...previous, [key]: value })); setSuccess(false); }
  function submit(event) {
    event.preventDefault();
    flushSync(() => setAttempted(true));
    const first = Object.keys(errors).find(key => errors[key]);
    if (first) { setSuccess(false); fields.current[first].focus(); }
    else setSuccess(true);
  }
  function attributes(key) {
    return { id: key, name: key, required: true, ref: element => { fields.current[key] = element; }, 'aria-invalid': attempted && !!errors[key], 'aria-describedby': [key === 'email' ? 'privacy-note' : '', attempted && errors[key] ? `${key}-error` : ''].filter(Boolean).join(' ') || undefined };
  }
  const error = key => attempted && errors[key] ? <p className="error" id={`${key}-error`}>{errors[key]}</p> : null;
  return <>
    <header>
      <a className="skip-link" href="#main-content" onClick={() => document.getElementById('main-content').focus()}>Fara beint í efni</a>
      <div className="header-inner"><p className="brand">Bókaklúbburinn</p><nav aria-label="Aðalvalmynd"><a href="#search">Bækurnar</a><a href="#details">Um bækurnar</a><a href="#signup">Vertu með</a></nav></div>
    </header>
    <main id="main-content" tabIndex="-1">
      <div className="intro"><p className="eyebrow">Góð bók. Góður félagsskapur.</p><h1>Lestrarhornið</h1><p>Finndu sögu sem grípur þig og deildu lestrargleðinni með okkur.</p></div>
      <section id="search" aria-labelledby="search-heading"><h2 id="search-heading">Finndu næstu bók</h2><div className="search-box"><label htmlFor="book-search" lang="en">Search</label><input id="book-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Leitaðu að heiti, höfundi eða tegund" /></div><p id="results-count" role="status" aria-live="polite" aria-atomic="true">{results.length === 1 ? '1 bók fannst' : `${results.length} bækur fundust`}</p>
        {results.length ? <div className="books">{results.map(book => <article key={book.id}><img className="cover" src={cover(book)} alt="" /><div className="book-content"><p className="genre">{book.genre}</p><h3><button className="book-title" onClick={event => openBook(book, event)}>{book.title}</button></h3><p className="author">{book.author}</p><div className="save-row"><button className="save-button" lang="en" aria-label={`Save ${book.title}`} aria-pressed={saved.has(book.id)} onClick={() => toggleSave(book.id)}><svg aria-hidden="true" viewBox="0 0 24 24" fill={saved.has(book.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8"><path d="M6 3h12v18l-6-4-6 4z" /></svg></button><span>{saved.has(book.id) ? 'Vistað' : 'Óvistað'}</span></div></div></article>)}</div> : <p className="empty">Engar bækur fundust. Prófaðu annað leitarorð.</p>}
      </section>
      <section id="details" className="details" aria-labelledby="details-heading"><h2 id="details-heading">Meira um bækurnar</h2><p>Ævintýri, ljóð eða hugljúf saga? Veldu bókarheiti til að lesa meira um söguna. Vistaðu þær bækur sem þig langar að lesa næst.</p></section>
      <section id="signup" aria-labelledby="signup-heading"><h2 id="signup-heading">Vertu með í klúbbnum</h2><p>Sögur verða enn betri þegar við deilum þeim.</p><form noValidate onSubmit={submit}>
        <div className="field"><label htmlFor="name" lang="en">Name</label><input {...attributes('name')} type="text" autoComplete="name" value={values.name} onChange={event => update('name', event.target.value)} />{error('name')}</div>
        <div className="field"><label htmlFor="email" lang="en">Email</label><input {...attributes('email')} type="email" autoComplete="email" value={values.email} onChange={event => update('email', event.target.value)} /><p className="help" id="privacy-note">Sýniform: engar persónuupplýsingar eru sendar eða vistaðar.</p>{error('email')}</div>
        <div className="field"><label htmlFor="format" lang="en">Reading format</label><select {...attributes('format')} value={values.format} onChange={event => update('format', event.target.value)}><option value="">Veldu snið</option><option value="printed">Prentuð bók</option><option value="audio">Hljóðbók</option><option value="ebook">Rafbók</option></select>{error('format')}</div>
        <div className="field"><label className="checkbox-label" htmlFor="consent"><input {...attributes('consent')} type="checkbox" checked={values.consent} onChange={event => update('consent', event.target.checked)} /><span lang="en">I agree to join the reading club</span></label>{error('consent')}</div>
        <button className="primary" type="submit">Skrá mig</button><p role="status" aria-live="polite" aria-atomic="true" className="confirmation">{success ? 'Takk fyrir! Þetta er sýnidæmi og engin raunveruleg skráning hefur farið fram.' : ''}</p>
      </form></section>
    </main>
    <footer><p>Lestrarhornið · Sýniverkefni með ímynduðum bókum og höfundum.</p></footer>
    <dialog ref={dialog} onKeyDown={keepDialogFocus} aria-labelledby="dialog-title" onCancel={cancelBook}><button ref={closeButton} className="close" lang="en" onClick={closeBook}>Close</button>{selected && <div className="dialog-content"><img src={cover(selected)} alt="" /><div><p>{selected.genre}</p><h2 id="dialog-title">{selected.title}</h2><p>{selected.author}</p><p>{selected.description}</p></div></div>}</dialog>
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
