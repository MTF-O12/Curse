import { useState, useEffect, useRef } from 'react';
import './vacancies.css';

const API = 'http://localhost:5000/api/vacancies';

export default function Vacancies() {
  const [vacancies, setVacancies] = useState([]);
  const [company, setCompany]     = useState('');
  const [message, setMessage]     = useState('');
  const [status, setStatus]       = useState(null);
  const [loading, setLoading]     = useState(false);
  const [fetching, setFetching]   = useState(true);
  const sectionRef = useRef(null);

  // Появление секции при скролле
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Загрузить вакансии
  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => setVacancies(Array.isArray(data) ? data : []))
      .catch(() => setVacancies([]))
      .finally(() => setFetching(false));
  }, []);

  const handleSubmit = async () => {
    if (!company.trim() || !message.trim()) {
      setStatus('error-empty');
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: company.trim(), message: message.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setVacancies(prev => [data.vacancy, ...prev]);
        setCompany('');
        setMessage('');
        setStatus('success');
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      setVacancies(prev => prev.filter(v => v._id !== id));
    } catch {
      // тихая ошибка
    }
  };

  return (
    <section id="vacancies" className="vac-section" ref={sectionRef}>

      <div className="section-header">
        <span className="section-label">Вакансии</span>
        <div className="section-line"></div>
        <span className="section-num">07</span>
      </div>

      {/* ── ФОРМА ── */}
      <div className="vac-form">
        <div className="vac-form-title">Отправить предложение</div>

        <div className="vac-field">
          <label className="vac-label">Название компании</label>
          <input
            className="vac-input"
            type="text"
            placeholder="например, Wargaming"
            value={company}
            onChange={e => setCompany(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="vac-field">
          <label className="vac-label">Сообщение</label>
          <textarea
            className="vac-textarea"
            placeholder="Опишите вакансию или предложение..."
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>

        {status === 'success' && (
          <div className="vac-status vac-status--ok">
            ✓ Вакансия отправлена и сохранена в MongoDB
          </div>
        )}
        {(status === 'error' || status === 'error-empty') && (
          <div className="vac-status vac-status--err">
            {status === 'error-empty'
              ? '⚠ Заполните все поля'
              : '✕ Ошибка. Проверьте соединение с сервером'}
          </div>
        )}

        <button
          className="vac-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Отправка...' : 'Отправить →'}
        </button>
      </div>

      {/* ── СПИСОК ── */}
      <div className="vac-list-title">
        Полученные предложения
        <span className="vac-count">{vacancies.length}</span>
      </div>

      {fetching ? (
        <div className="vac-empty">Загрузка...</div>
      ) : vacancies.length === 0 ? (
        <div className="vac-empty">Пока нет вакансий</div>
      ) : (
        <div className="vac-list">
          {vacancies.map(v => (
            <div key={v._id} className="vac-card">
              <div className="vac-card-header">
                <span className="vac-company">{v.company}</span>
                <span className="vac-date">
                  {new Date(v.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
              <p className="vac-message">{v.message}</p>
              <button
                className="vac-delete"
                onClick={() => handleDelete(v._id)}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}


// import { useState, useEffect, useRef } from 'react';
// import './vacancies.css';

// const API = 'http://localhost:5000/api/vacancies'; // убедись, что сервер слушает именно 5000

// export default function Vacancies() {
//   const [vacancies, setVacancies] = useState([]);
//   const [company, setCompany]     = useState('');
//   const [message, setMessage]     = useState('');
//   const [status, setStatus]       = useState(null);
//   const [loading, setLoading]     = useState(false);
//   const [fetching, setFetching]   = useState(true);
//   const sectionRef = useRef(null);

//   // Появление секции при скролле
//   useEffect(() => {
//     const el = sectionRef.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
//       { threshold: 0.08 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   // Загрузить вакансии
//   useEffect(() => {
//     fetch(API)
//       .then(r => {
//         if (!r.ok) throw new Error('Ошибка загрузки');
//         return r.json();
//       })
//       .then(data => setVacancies(Array.isArray(data) ? data : []))
//       .catch(() => setVacancies([]))
//       .finally(() => setFetching(false));
//   }, []);

//   const handleSubmit = async () => {
//     if (!company.trim() || !message.trim()) {
//       setStatus('error-empty');
//       return;
//     }
//     setLoading(true);
//     setStatus(null);
//     try {
//       const res = await fetch(API, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ company: company.trim(), message: message.trim() }),
//       });
//       const data = await res.json();
//       if (res.ok && data.vacancy) {
//         setVacancies(prev => [data.vacancy, ...prev]);
//         setCompany('');
//         setMessage('');
//         setStatus('success');
//         setTimeout(() => setStatus(null), 3000);
//       } else {
//         setStatus('error');
//       }
//     } catch (err) {
//       console.error(err);
//       setStatus('error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
//       if (res.ok) {
//         setVacancies(prev => prev.filter(v => v._id !== id));
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
// //     <section id="vacancies" className="vac-section" ref={sectionRef}>

// //       <div className="section-header">
// //         <span className="section-label">Вакансии</span>
// //         <div className="section-line"></div>
// //         <span className="section-num">07</span>
// //       </div>

// //       {/* ── ФОРМА ── */}
// //       <div className="vac-form">
// //         <div className="vac-form-title">Отправить предложение</div>

// //         <div className="vac-field">
// //           <label className="vac-label">Название компании</label>
// //           <input
// //             className="vac-input"
// //             type="text"
// //             placeholder="например, Wargaming"
// //             value={company}
// //             onChange={e => setCompany(e.target.value)}
// //             autoComplete="off"
// //           />
// //         </div>

// //         <div className="vac-field">
// //           <label className="vac-label">Сообщение</label>
// //           <textarea
// //             className="vac-textarea"
// //             placeholder="Опишите вакансию или предложение..."
// //             rows={4}
// //             value={message}
// //             onChange={e => setMessage(e.target.value)}
// //           />
// //         </div>

// //         {status === 'success' && (
// //           <div className="vac-status vac-status--ok">
// //             ✓ Вакансия отправлена и сохранена в MongoDB
// //           </div>
// //         )}
// //         {(status === 'error' || status === 'error-empty') && (
// //           <div className="vac-status vac-status--err">
// //             {status === 'error-empty'
// //               ? '⚠ Заполните все поля'
// //               : '✕ Ошибка. Проверьте соединение с сервером'}
// //           </div>
// //         )}

// //         <button
// //           className="vac-btn"
// //           onClick={handleSubmit}
// //           disabled={loading}
// //         >
// //           {loading ? 'Отправка...' : 'Отправить →'}
// //         </button>
// //       </div>

// //       {/* ── СПИСОК ── */}
// //       <div className="vac-list-title">
// //         Полученные предложения
// //         <span className="vac-count">{vacancies.length}</span>
// //       </div>

// //       {fetching ? (
// //         <div className="vac-empty">Загрузка...</div>
// //       ) : vacancies.length === 0 ? (
// //         <div className="vac-empty">Пока нет вакансий</div>
// //       ) : (
// //         <div className="vac-list">
// //           {vacancies.map(v => (
// //             <div key={v._id} className="vac-card">
// //               <div className="vac-card-header">
// //                 <span className="vac-company">{v.company}</span>
// //                 <span className="vac-date">
// //                   {new Date(v.createdAt).toLocaleDateString('ru-RU')}
// //                 </span>
// //               </div>
// //               <p className="vac-message">{v.message}</p>
// //               <button
// //                 className="vac-delete"
// //                 onClick={() => handleDelete(v._id)}
// //               >
// //                 Удалить
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //     </section>
//   );
// }
