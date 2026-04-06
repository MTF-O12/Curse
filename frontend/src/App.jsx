import { useEffect, useRef } from 'react';
import './style.css';
import Vacancies from './Vacancies';

export default function App() {

  useEffect(() => {
    // Появление разделов при прокрутке
    const sections = document.querySelectorAll('section');
    const revealObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.08 }
    );
    sections.forEach(s => revealObs.observe(s));

    // Анимация полосок навыков
    const barObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.w + '%';
          });
          barObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('[data-bars]').forEach(g => barObs.observe(g));

    // Очистка при размонтировании
    return () => {
      revealObs.disconnect();
      barObs.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── НАВИГАЦИЯ ── */}
      <nav>
        <div className="nav-inner">
          <a href="#about">О себе</a>
          <a href="#skills">Навыки</a>
          <a href="#education">Образование</a>
          <a href="#languages">Языки</a>
          <a href="#interests">Интересы</a>
          <a href="#vacancies">Вакансии</a>
        </div>
      </nav>

      <div className="page">

        {/* ── ШАПКА ── */}
        <header>
          <div>
            <p className="hero-label">Начинающий разработчик игр</p>
            <h1 className="hero-name">Мират<br /><em>Алимбетов</em></h1>
            <p className="hero-title">Студент · Разработчик · Геймер — превращаю страсть в код.</p>
          </div>
          <div className="hero-contact">
            <div><span className="location-flag">🇰🇿</span> Астана, Казахстан</div>
            <div>18 лет</div>
            <div><a href="#">github.com/mirat</a></div>
            <div><a href="#">linkedin.com/in/mirat</a></div>
          </div>
        </header>

        {/* ── О СЕБЕ ── */}
        <section id="about">
          <div className="section-header">
            <span className="section-label">О себе</span>
            <div className="section-line"></div>
            <span className="section-num">01</span>
          </div>
          <p className="about-text">
            Меня зовут <strong>Мират Алимбетов</strong> — мне 18 лет, я студент факультета
            информационных технологий в <strong>AITU</strong>, Астана, Казахстан. Всю жизнь
            я увлекаюсь <strong>видеоиграми</strong> — и теперь учусь их создавать. Осваиваю
            Java, Python, React и веб-технологии, стремясь стать{' '}
            <strong>разработчиком игр</strong>, который создаёт миры, в которых хочется потеряться.
          </p>
          <div className="about-badges">
            <span className="badge">Студент</span>
            <span className="badge">Открыт к стажировкам</span>
            <span className="badge">Энтузиаст геймдева</span>
          </div>
        </section>

        {/* ── НАВЫКИ ── */}
        <section id="skills">
          <div className="section-header">
            <span className="section-label">Навыки</span>
            <div className="section-line"></div>
            <span className="section-num">02</span>
          </div>
          <div className="skills-grid">

            <div className="skill-group">
              <div className="skill-group-title">Программирование</div>
              <div className="skill-bar-wrap" data-bars="">
                <div className="skill-bar-row">
                  <div className="skill-bar-name">Java</div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" data-w="72"></div>
                  </div>
                </div>
                <div className="skill-bar-row">
                  <div className="skill-bar-name">Python</div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" data-w="65"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="skill-group">
              <div className="skill-group-title">Веб</div>
              <div className="skill-bar-wrap" data-bars="">
                <div className="skill-bar-row">
                  <div className="skill-bar-name">HTML</div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" data-w="80"></div>
                  </div>
                </div>
                <div className="skill-bar-row">
                  <div className="skill-bar-name">CSS</div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" data-w="75"></div>
                  </div>
                </div>
                <div className="skill-bar-row">
                  <div className="skill-bar-name">React</div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" data-w="58"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="skill-group">
              <div className="skill-group-title">Инструменты геймдева</div>
              <div className="skill-tags">
                <span className="tag">Unity</span>
                <span className="tag">LibGDX</span>
                <span className="tag">LWJGL</span>
                <span className="tag">Tiled</span>
                <span className="tag">Git</span>
              </div>
            </div>

            <div className="skill-group">
              <div className="skill-group-title">Изучаю далее</div>
              <div className="skill-tags">
                <span className="tag">C#</span>
                <span className="tag">OpenGL</span>
                <span className="tag">Blender</span>
                <span className="tag">C++</span>
              </div>
            </div>

          </div>
        </section>

        {/* ── ОБРАЗОВАНИЕ ── */}
        <section id="education">
          <div className="section-header">
            <span className="section-label">Образование</span>
            <div className="section-line"></div>
            <span className="section-num">03</span>
          </div>
          <div className="edu-card">
            <div className="edu-school-name">Astana IT University</div>
            <div className="edu-degree">
              Бакалавриат · Информационные технологии &nbsp;·&nbsp; AITU
            </div>
            <div className="edu-meta">
              <div className="edu-meta-item">Период <span>2024 — 2028</span></div>
              <div className="edu-meta-item">Город <span>Астана, Казахстан</span></div>
              <div className="edu-meta-item">Статус <span>1-й курс · Обучаюсь</span></div>
              <div className="edu-meta-item">Направление <span>Разработка ПО</span></div>
            </div>
          </div>
        </section>

        {/* ── ЯЗЫКИ ── */}
        <section id="languages">
          <div className="section-header">
            <span className="section-label">Языки</span>
            <div className="section-line"></div>
            <span className="section-num">04</span>
          </div>
          <div className="lang-grid">
            <div className="lang-card">
              <div className="lang-name">Русский</div>
              <div className="lang-level">Родной</div>
            </div>
            <div className="lang-card">
              <div className="lang-name">Английский</div>
              <div className="lang-level">Свободно</div>
            </div>
          </div>
        </section>

        {/* ── ИНТЕРЕСЫ ── */}
        <section id="interests">
          <div className="section-header">
            <span className="section-label">Интересы</span>
            <div className="section-line"></div>
            <span className="section-num">05</span>
          </div>
          <div className="interests-row">
            <div className="interest-pill"><span className="interest-icon">🎮</span> Видеоигры</div>
            <div className="interest-pill"><span className="interest-icon">🕹️</span> Геймдизайн</div>
            <div className="interest-pill"><span className="interest-icon">⚙️</span> Игровые движки</div>
            <div className="interest-pill"><span className="interest-icon">🤖</span> ИИ в играх</div>
            <div className="interest-pill"><span className="interest-icon">🎨</span> Пиксель-арт</div>
            <div className="interest-pill"><span className="interest-icon">📖</span> Открытый код</div>
          </div>
        </section>

        {/* ── ВАКАНСИИ ── */}
        <Vacancies />

        {/* ── ПОДВАЛ ── */}
        <footer>
          <div className="footer-name">МИРАТ АЛИМБЕТОВ — 2025</div>
          <div className="footer-links">
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#">Связаться</a>
          </div>
        </footer>

      </div>
    </>
  );
}
