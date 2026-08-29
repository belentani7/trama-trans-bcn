"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  languages,
  messages,
  resources,
  type Language,
  type ResourceCategory,
} from "./content";

const WEATHER_EXIT =
  "https://www.aemet.es/es/eltiempo/prediccion/municipios/barcelona-id08019";

const filterOptions: ReadonlyArray<"all" | ResourceCategory> = [
  "all",
  "urgent",
  "health",
  "rights",
  "support",
];

function TramaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;
    const pointer = { x: 0.68, y: 0.38 };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const columns = width < 680 ? 5 : 8;
      const rows = width < 680 ? 7 : 6;
      const nodes: Array<{ x: number; y: number }> = [];

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const seed = row * columns + column;
          const baseX = (column / (columns - 1)) * width;
          const baseY = (row / (rows - 1)) * height;
          const drift = reduced ? 0 : Math.sin(frame * 0.009 + seed * 0.83) * 8;
          const pointerPull =
            Math.max(
              0,
              1 -
                Math.hypot(
                  baseX / width - pointer.x,
                  baseY / height - pointer.y,
                ) *
                  3,
            ) * 18;
          nodes.push({
            x: baseX + Math.sin(seed * 2.17) * 24 + drift + pointerPull,
            y: baseY + Math.cos(seed * 1.63) * 20 + drift * 0.55,
          });
        }
      }

      context.lineWidth = 1;
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const index = row * columns + column;
          const node = nodes[index];
          const links = [index + 1, index + columns, index + columns + 1];
          for (const targetIndex of links) {
            const target = nodes[targetIndex];
            if (
              !target ||
              (targetIndex === index + 1 && column === columns - 1)
            )
              continue;
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(target.x, target.y);
            context.strokeStyle =
              (row + column) % 3 === 0
                ? "rgba(239, 255, 76, .34)"
                : "rgba(238, 240, 255, .16)";
            context.stroke();
          }
        }
      }

      for (let index = 0; index < nodes.length; index += 1) {
        const node = nodes[index];
        context.beginPath();
        context.arc(
          node.x,
          node.y,
          index % 5 === 0 ? 3.5 : 1.7,
          0,
          Math.PI * 2,
        );
        context.fillStyle =
          index % 5 === 0 ? "#efff4c" : "rgba(255,255,255,.7)";
        context.fill();
      }

      if (!reduced) {
        frame += 1;
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / Math.max(bounds.width, 1);
      pointer.y = (event.clientY - bounds.top) / Math.max(bounds.height, 1);
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    resize();
    draw();

    return () => {
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="trama-canvas" aria-hidden="true" />;
}

export function TramaSite() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<Language>("es");
  const [filter, setFilter] = useState<"all" | ResourceCategory>("all");
  const copy = messages[language];
  const visibleResources = useMemo(
    () =>
      filter === "all"
        ? resources
        : resources.filter((resource) => resource.category === filter),
    [filter],
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === "Escape") {
        event.preventDefault();
        window.location.replace(WEATHER_EXIT);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create("tramaEase", "M0,0 C0.16,1 0.3,1 1,1");
    const lenis = new Lenis({
      anchors: true,
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);

    const animationContext = gsap.context(() => {
      const heroWords = gsap.utils.toArray<HTMLElement>(".hero-word");
      gsap.fromTo(
        heroWords,
        { yPercent: 110, rotate: 2 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.15,
          stagger: 0.08,
          ease: "tramaEase",
        },
      );
      gsap.fromTo(
        ".hero-copy > *",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.08,
          delay: 0.35,
          ease: "tramaEase",
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 44, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "tramaEase",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });
      gsap.to(".memory-signal", {
        xPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: "#memoria",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, root);

    ScrollTrigger.refresh();
    return () => {
      animationContext.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      delete document.documentElement.dataset.motion;
    };
  }, []);

  useEffect(() => {
    if (document.documentElement.dataset.motion !== "full") return;
    const refreshFrame = window.requestAnimationFrame(() =>
      ScrollTrigger.refresh(),
    );
    return () => window.cancelAnimationFrame(refreshFrame);
  }, [visibleResources.length]);

  const quickExit = () => window.location.replace(WEATHER_EXIT);

  return (
    <div ref={rootRef} className="site-shell">
      <a className="skip-link" href="#contenido">
        {copy.skip}
      </a>

      <aside className="crisis-strip" aria-label="Ayuda urgente">
        <div className="crisis-main">
          <strong>{copy.crisis}</strong>
          <a href="tel:112">{copy.crisisAction}</a>
          <a href="tel:061">{copy.healthAction}</a>
          <a href="tel:024">{copy.suicideAction}</a>
        </div>
        <button
          className="quick-exit"
          type="button"
          onClick={quickExit}
          title={copy.exitTitle}
          aria-describedby="quick-exit-hint"
        >
          <span>{copy.exit}</span>
          <kbd>Shift + Esc</kbd>
        </button>
        <span id="quick-exit-hint" className="sr-only">
          {copy.exitHint}
        </span>
      </aside>

      <header className="site-header">
        <a
          className="wordmark"
          href="#inicio"
          aria-label="TRAMA TRANS BCN, inicio"
        >
          <span>TRAMA</span>
          <small>TRANS BCN</small>
        </a>
        <nav className="primary-nav" aria-label="Navegación principal">
          <a href="#recursos">{copy.navResources}</a>
          <a href="#memoria">{copy.navMemory}</a>
          <a href="#metodo">{copy.navMethod}</a>
          <a href="#participar">{copy.navParticipate}</a>
        </nav>
        <div
          className="language-switcher"
          role="group"
          aria-label={copy.language}
        >
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => setLanguage(item.code)}
              aria-pressed={language === item.code}
              lang={item.code}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <main id="contenido">
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <TramaCanvas />
          <div className="hero-grid">
            <div className="hero-title-wrap">
              <p className="eyebrow light">{copy.kicker}</p>
              <h1
                id="hero-title"
                className="hero-title"
                aria-label="TRAMA TRANS BCN"
              >
                <span className="word-clip">
                  <span className="hero-word">TRA</span>
                </span>
                <span className="word-clip indented">
                  <span className="hero-word acid">MA</span>
                </span>
                <span className="word-clip compact">
                  <span className="hero-word outline">TRANS BCN</span>
                </span>
              </h1>
            </div>
            <div className="hero-copy">
              <p className="hero-lead">{copy.heroLead}</p>
              <p className="hero-body">{copy.heroBody}</p>
              <div className="hero-actions">
                <a className="action-primary" href="#recursos">
                  {copy.findHelp}
                </a>
                <a className="action-secondary" href="#metodo">
                  {copy.knowMethod}
                </a>
              </div>
              <p className="local-status">
                <span aria-hidden="true" /> {copy.status}
              </p>
            </div>
          </div>
          <div className="hero-ticker" aria-hidden="true">
            <span>CUIDADO · DERECHOS · SALUD · MEMORIA · BARRIO ·</span>
            <span>CUIDADO · DERECHOS · SALUD · MEMORIA · BARRIO ·</span>
          </div>
        </section>

        <section
          className="manifesto section-pad"
          aria-labelledby="manifesto-title"
        >
          <div className="manifesto-index" aria-hidden="true">
            01
          </div>
          <div data-reveal>
            <p className="eyebrow">{copy.introKicker}</p>
            <h2 id="manifesto-title">{copy.introTitle}</h2>
          </div>
          <div className="manifesto-body" data-reveal>
            <p>{copy.introBody}</p>
            <dl className="proof-line">
              <div>
                <dt>10</dt>
                <dd>puertas públicas revisadas</dd>
              </div>
              <div>
                <dt>0</dt>
                <dd>formularios o perfiles</dd>
              </div>
              <div>
                <dt>1</dt>
                <dd>fecha visible por fuente</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          id="recursos"
          className="resources-section section-pad"
          aria-labelledby="resources-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">{copy.resourcesKicker}</p>
              <h2 id="resources-title">{copy.resourcesTitle}</h2>
            </div>
            <p>{copy.resourcesBody}</p>
          </div>

          <div className="filter-bar" data-reveal>
            <div className="filters" role="group" aria-label={copy.filterLabel}>
              {filterOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  aria-pressed={filter === option}
                >
                  {copy[option]}
                </button>
              ))}
            </div>
            <p className="result-count" aria-live="polite" aria-atomic="true">
              <strong>{visibleResources.length}</strong> {copy.results}
            </p>
          </div>

          <div className="resource-list">
            {visibleResources.map((resource, index) => (
              <article
                className="resource-row"
                key={resource.id}
                data-category={resource.category}
              >
                <div className="resource-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="resource-main">
                  <p className="resource-category">{copy[resource.category]}</p>
                  <h3>{resource.name}</h3>
                  <p>{resource.summary}</p>
                  {resource.location ? (
                    <address>{resource.location}</address>
                  ) : null}
                  <p className="availability">{resource.availability}</p>
                  {resource.caution ? (
                    <p className="resource-caution">Nota: {resource.caution}</p>
                  ) : null}
                </div>
                <div className="resource-contact">
                  {resource.contact && resource.contactHref ? (
                    <a href={resource.contactHref}>
                      <span>{copy.call}</span>
                      <strong>{resource.contact}</strong>
                    </a>
                  ) : null}
                  {resource.secondary && resource.secondaryHref ? (
                    <a href={resource.secondaryHref}>
                      <span>{copy.write}</span>
                      <strong>{resource.secondary}</strong>
                    </a>
                  ) : null}
                </div>
                <div className="resource-proof">
                  <a href={resource.sourceUrl} target="_blank" rel="noreferrer">
                    {copy.officialSource}: {resource.source}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                  <span>
                    {copy.reviewed}:{" "}
                    <time dateTime={resource.reviewedAt}>13.08.2026</time>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="memoria"
          className="memory-section"
          aria-labelledby="memory-title"
        >
          <div className="memory-signal" aria-hidden="true">
            NO SOMOS UN DATASET · NO SOMOS UN DATASET · NO SOMOS UN DATASET ·
          </div>
          <div className="memory-grid section-pad">
            <div data-reveal>
              <p className="eyebrow light">{copy.memoryKicker}</p>
              <h2 id="memory-title">{copy.memoryTitle}</h2>
            </div>
            <div className="memory-copy" data-reveal>
              <p className="memory-lead">
                Una memoria pública no necesita exponer nombres, diagnósticos ni
                documentos personales para ser útil.
              </p>
              <p>
                Este prototipo distingue información institucional, relato
                personal y decisión editorial. La ruta de historias está cerrada
                hasta que una persona pueda consentir, revisar, retirar y
                decidir cómo se la nombra.
              </p>
              <blockquote>
                Guardar memoria no es acumular: es conservar contexto, autoría,
                límites y posibilidad de retirada.
              </blockquote>
            </div>
          </div>
        </section>

        <section
          id="metodo"
          className="method-section section-pad"
          aria-labelledby="method-title"
        >
          <div className="method-intro" data-reveal>
            <p className="eyebrow">{copy.methodKicker}</p>
            <h2 id="method-title">{copy.methodTitle}</h2>
            <p>
              TRAMA no puntúa servicios ni promete resultados. Señala el camino
              oficial, conserva la procedencia y vuelve a revisar.
            </p>
          </div>
          <ol className="method-steps">
            <li data-reveal>
              <span>01</span>
              <div>
                <h3>Fuente primaria</h3>
                <p>
                  Administración, sistema sanitario o entidad responsable del
                  servicio. Sin agregadores como prueba.
                </p>
              </div>
            </li>
            <li data-reveal>
              <span>02</span>
              <div>
                <h3>Dato mínimo</h3>
                <p>
                  Finalidad, acceso, contacto y límites. No añadimos identidades
                  ni inferencias innecesarias.
                </p>
              </div>
            </li>
            <li data-reveal>
              <span>03</span>
              <div>
                <h3>Fecha y duda</h3>
                <p>
                  Cada entrada lleva revisión. Si dos fuentes discrepan, se
                  muestra la incertidumbre y se pide confirmar.
                </p>
              </div>
            </li>
            <li data-reveal>
              <span>04</span>
              <div>
                <h3>Revisión humana</h3>
                <p>
                  Antes de publicar cambios sensibles: doble lectura, control de
                  enlaces y lenguaje no estigmatizante.
                </p>
              </div>
            </li>
          </ol>
          <div className="method-note" data-reveal>
            <strong>Alcance</strong>
            <p>
              Directorio informativo, no asesoramiento médico, jurídico ni de
              emergencia. Última revisión editorial: 13 de agosto de 2026.
            </p>
          </div>
        </section>

        <section
          id="participar"
          className="participation-section section-pad"
          aria-labelledby="participation-title"
        >
          <div className="lock-mark" aria-hidden="true">
            <span />
          </div>
          <div data-reveal>
            <p className="eyebrow light">{copy.participateKicker}</p>
            <h2 id="participation-title">{copy.participateTitle}</h2>
          </div>
          <div className="participation-copy" data-reveal>
            <p>{copy.participateBody}</p>
            <div className="participation-state" role="status">
              <span aria-hidden="true">●</span>
              Sin formulario · sin base de datos · sin invitaciones
              administrativas
            </div>
            <a href="#metodo">Leer el protocolo editorial actual</a>
          </div>
        </section>

        <section
          className="privacy-section section-pad"
          aria-labelledby="privacy-title"
        >
          <h2 id="privacy-title" data-reveal>
            {copy.privacyTitle}
          </h2>
          <div className="privacy-columns" data-reveal>
            <p>
              <strong>
                Esta versión no instala analítica, píxeles ni cookies.
              </strong>{" "}
              El selector de idioma y los filtros viven sólo en la memoria de
              esta pestaña.
            </p>
            <p>
              La salida rápida sustituye la página actual por la previsión de
              AEMET. No borra el historial completo, descargas, caché ni rastros
              del dispositivo.
            </p>
            <p>
              Para mayor privacidad, usa navegación privada, revisa el historial
              y cierra la sesión del dispositivo compartido.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>{copy.footer}</p>
        <p>Fuentes públicas · revisión visible · sin publicación externa</p>
        <a href="#inicio">Volver arriba</a>
      </footer>
    </div>
  );
}
