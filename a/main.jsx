import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import books from '../shared/books.json';
import './style.css';

const covers = import.meta.glob('../shared/covers/*.svg', { eager: true, query: '?url', import: 'default' });
const cover = book => covers[`../shared/${book.image}`];
function App() {
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const opener = useRef(null);
  const [values, setValues] = useState({ name: '', email: '', format: '', agree: false });
  const [attempted, setAttempted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusRequest, setFocusRequest] = useState(0);
  const form = useRef(null);
  const errors = {
    name: values.name.trim() ? '' : 'Sláðu inn nafn.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) ? '' : 'Sláðu inn gilt netfang.',
    format: values.format ? '' : 'Veldu lestrarsnið.',
    agree: values.agree ? '' : 'Samþykktu þátttöku til að halda áfram.'
  };
  useEffect(() => {
    if (selected) { dialog.current.showModal(); closeButton.current.focus(); }
  }, [selected]);
  useEffect(() => {
    if (focusRequest) form.current.querySelector('[aria-invalid="true"]')?.focus();
  }, [focusRequest]);
  const filtered = books.filter(book => `${book.title} ${book.author} ${book.genre}`.toLocaleLowerCase('is').includes(query.trim().toLocaleLowerCase('is')));
  function update(event) {
    const { name, value, checked, type } = event.target;
    setValues(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setSuccess(false);
  }
  function submit(event) {
    event.preventDefault();
    setAttempted(true);
    if (Object.values(errors).some(Boolean)) { setSuccess(false); setFocusRequest(n => n + 1); }
    else { setSuccess(true); }
  }
  const invalid = key => attempted && Boolean(errors[key]);
  const error = key => invalid(key) ? <p className="error" id={`${key}-error`}>{errors[key]}</p> : null;
  function finishDialog() { setSelected(null); opener.current?.focus(); }
  return <>
    <header>
      <a className="skip-link" href="#main-content" onClick={() => document.getElementById('main-content').focus()}>Fara beint í efni</a>
      <div className="header-inner"><span className="wordmark">Lestrarhornið<span className="wordmark-dot" aria-hidden="true"> ✦</span></span>
        <nav aria-label="Aðalvalmynd"><a href="#search">Bækurnar</a><a href="#details">Um bækurnar</a><a href="#signup">Klúbburinn</a></nav>
      </div>
    </header>
    <main id="main-content" tabIndex="-1">
      <div className="intro"><p className="eyebrow">Góð saga. Góður félagsskapur.</p><h1>Lestrarhornið</h1><p>Finndu sögu sem kveikir forvitni þína og deildu lestrargleðinni með okkur.</p></div>
      <section id="search" aria-labelledby="search-heading">
        <div className="section-heading"><h2 id="search-heading">Finndu næstu bók</h2><p>Átta sögur, ótal nýjar leiðir.</p></div>
        <div className="search-field"><label htmlFor="book-search" lang="en">Search</label><input id="book-search" type="search" value={query} onChange={event => setQuery(event.target.value)} aria-describedby="search-help"/><p id="search-help" className="hint">Leitaðu eftir heiti, höfundi eða tegund.</p></div>
        <p id="results-count" role="status" aria-live="polite" aria-atomic="true">{filtered.length === 1 ? '1 bók fannst' : `${filtered.length} bækur fundust`}</p>
        <div className="book-grid">{filtered.map(book => <article key={book.id}>
          <img src={cover(book)} alt="" width="320" height="420"/>
          <div className="book-info"><p className="genre">{book.genre}</p><h3><button className="book-title" onClick={event => { opener.current = event.currentTarget; setSelected(book); }}>{book.title}</button></h3><p className="author">{book.author}</p>
          <div className="save-row"><button className="save-button" lang="en" aria-label={`Save ${book.title}`} aria-pressed={saved.has(book.id)} onClick={() => setSaved(current => { const next = new Set(current); next.has(book.id) ? next.delete(book.id) : next.add(book.id); return next; })}><span aria-hidden="true">{saved.has(book.id) ? '♥' : '♡'}</span></button><span>{saved.has(book.id) ? 'Vistað' : 'Vista bók'}</span></div></div>
        </article>)}</div>
        {filtered.length === 0 && <p className="empty">Engin bók fannst. Prófaðu annað leitarorð.</p>}
      </section>
      <section id="details" className="about" aria-labelledby="details-heading"><p className="eyebrow">Sagan byrjar hér</p><h2 id="details-heading">Meira um bækurnar</h2><p>Ævintýri, ljóð eða hugljúf saga? Veldu bókarheiti til að lesa meira um söguna. Vistaðu þær bækur sem þig langar að lesa næst.</p></section>
      <section id="signup" aria-labelledby="signup-heading" className="signup"><div><p className="eyebrow">Pláss fyrir þig</p><h2 id="signup-heading">Vertu með í klúbbnum</h2><p>Góðar bækur verða enn betri þegar við tölum um þær.</p><p id="form-help" className="hint">Þetta er sýniform. Engin persónuupplýsing er send eða vistuð.</p></div>
        <form ref={form} noValidate onSubmit={submit} aria-describedby="form-help">
          <div className="field"><label htmlFor="name" lang="en">Name</label><input id="name" name="name" autoComplete="name" required value={values.name} onChange={update} aria-invalid={invalid('name')} aria-describedby={invalid('name') ? 'name-error' : undefined}/>{error('name')}</div>
          <div className="field"><label htmlFor="email" lang="en">Email</label><input id="email" name="email" type="email" autoComplete="email" required value={values.email} onChange={update} aria-invalid={invalid('email')} aria-describedby={invalid('email') ? 'email-error' : undefined}/>{error('email')}</div>
          <div className="field"><label htmlFor="format" lang="en">Reading format</label><select id="format" name="format" required value={values.format} onChange={update} aria-invalid={invalid('format')} aria-describedby={invalid('format') ? 'format-error' : undefined}><option value="">Veldu snið</option><option value="printed">Prentuð bók</option><option value="audio">Hljóðbók</option><option value="ebook">Rafbók</option></select>{error('format')}</div>
          <div className="field"><label className="checkbox-label" htmlFor="agree"><input id="agree" name="agree" type="checkbox" required checked={values.agree} onChange={update} aria-invalid={invalid('agree')} aria-describedby={invalid('agree') ? 'agree-error' : undefined}/><span lang="en">I agree to join the reading club</span></label>{error('agree')}</div>
          <button className="primary" type="submit">Skrá mig</button><p role="status" aria-live="polite" aria-atomic="true">{success ? 'Takk fyrir! Þetta er sýnidæmi; engin raunveruleg skráning hefur farið fram og engar persónuupplýsingar voru sendar eða vistaðar.' : ''}</p>
        </form>
      </section>
    </main>
    <footer><p>Lestrarhornið · Sýniverkefni með ímynduðum bókum og höfundum.</p></footer>
    <dialog ref={dialog} aria-labelledby="dialog-title" onClose={finishDialog}>
      {selected && <><div className="dialog-top"><button ref={closeButton} className="close-button" lang="en" onClick={() => dialog.current.close()}>Close</button></div><img src={cover(selected)} alt="" width="320" height="420"/><p className="genre">{selected.genre}</p><h2 id="dialog-title">{selected.title}</h2><p>{selected.author}</p><p>{selected.description}</p></>}
    </dialog>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
