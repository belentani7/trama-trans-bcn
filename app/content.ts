export type Language = "es" | "ca" | "pt" | "en";
export type ResourceCategory = "urgent" | "health" | "rights" | "support";

export const languages: ReadonlyArray<{ code: Language; label: string }> = [
  { code: "es", label: "ES" },
  { code: "ca", label: "CA" },
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
];

export const messages = {
  es: {
    language: "Idioma",
    skip: "Saltar al contenido",
    crisis: "¿Peligro inmediato?",
    crisisAction: "Llama al 112",
    healthAction: "Salud: 061",
    suicideAction: "Crisis suicida: 024",
    exit: "Salida rápida",
    exitHint: "Oculta esta pantalla; no borra el historial.",
    exitTitle:
      "Abre la previsión meteorológica y sustituye esta página. No elimina el historial del navegador.",
    navResources: "Apoyo ahora",
    navMemory: "Memoria",
    navMethod: "Método",
    navParticipate: "Participar",
    kicker: "Barcelona · red pública de cuidado",
    heroLead:
      "Una trama para encontrar apoyo, guardar memoria y decidir en común.",
    heroBody:
      "Información pública, trazable y revisada para personas trans, no binarias y quienes las acompañan en Barcelona. Sin perfiles, sin rastreo, sin pedirte que te expliques.",
    findHelp: "Encontrar apoyo",
    knowMethod: "Cómo verificamos",
    status: "Edición local · no publicada",
    introKicker: "No estás a solas frente al mapa",
    introTitle: "La ciudad se vuelve habitable cuando la información circula.",
    introBody:
      "TRAMA conecta puertas de entrada oficiales sin convertir vidas en datos. Cada recurso muestra su fuente y su última revisión. Cuando un dato no está claro, lo decimos.",
    resourcesKicker: "Directorio vivo",
    resourcesTitle: "Apoyo ahora",
    resourcesBody:
      "Filtra por necesidad. En una urgencia, usa primero 112 o 061. Confirma horarios antes de desplazarte.",
    filterLabel: "Filtrar recursos por necesidad",
    all: "Todo",
    urgent: "Urgente",
    health: "Salud",
    rights: "Derechos",
    support: "Cuidados y vivienda",
    results: "recursos visibles",
    officialSource: "Fuente oficial",
    reviewed: "Revisado",
    call: "Llamar",
    write: "Escribir",
    open: "Abrir fuente",
    memoryKicker: "Memoria sin extracción",
    memoryTitle: "Recordar también es infraestructura.",
    methodKicker: "Cómo se sostiene",
    methodTitle: "Publicar menos. Verificar mejor.",
    participateKicker: "Participación con consentimiento",
    participateTitle: "El buzón está cerrado a propósito.",
    participateBody:
      "Antes de recibir historias o datos de contacto, necesitamos identidad administrativa verificada, protocolo de consentimiento, retirada y tiempos de respuesta. Hoy no se recoge nada.",
    privacyTitle: "Privacidad por diseño",
    footer: "TRAMA TRANS BCN · prototipo local de interés público",
  },
  ca: {
    language: "Idioma",
    skip: "Ves al contingut",
    crisis: "Perill immediat?",
    crisisAction: "Truca al 112",
    healthAction: "Salut: 061",
    suicideAction: "Crisi suïcida: 024",
    exit: "Sortida ràpida",
    exitHint: "Oculta aquesta pantalla; no esborra l’historial.",
    exitTitle:
      "Obre la previsió meteorològica i substitueix aquesta pàgina. No elimina l’historial del navegador.",
    navResources: "Suport ara",
    navMemory: "Memòria",
    navMethod: "Mètode",
    navParticipate: "Participar",
    kicker: "Barcelona · xarxa pública de cura",
    heroLead: "Una trama per trobar suport, guardar memòria i decidir en comú.",
    heroBody:
      "Informació pública, traçable i revisada per a persones trans, no-binàries i qui les acompanya a Barcelona. Sense perfils, sense rastreig, sense haver-te d’explicar.",
    findHelp: "Trobar suport",
    knowMethod: "Com verifiquem",
    status: "Edició local · no publicada",
    introKicker: "No estàs a soles davant del mapa",
    introTitle: "La ciutat es torna habitable quan la informació circula.",
    introBody:
      "TRAMA connecta portes d’entrada oficials sense convertir vides en dades. Cada recurs mostra la font i l’última revisió. Quan una dada no és clara, ho diem.",
    resourcesKicker: "Directori viu",
    resourcesTitle: "Suport ara",
    resourcesBody:
      "Filtra per necessitat. En una urgència, utilitza primer el 112 o el 061. Confirma els horaris abans d’anar-hi.",
    filterLabel: "Filtra recursos per necessitat",
    all: "Tot",
    urgent: "Urgent",
    health: "Salut",
    rights: "Drets",
    support: "Cures i habitatge",
    results: "recursos visibles",
    officialSource: "Font oficial",
    reviewed: "Revisat",
    call: "Trucar",
    write: "Escriure",
    open: "Obrir font",
    memoryKicker: "Memòria sense extracció",
    memoryTitle: "Recordar també és infraestructura.",
    methodKicker: "Com se sosté",
    methodTitle: "Publicar menys. Verificar millor.",
    participateKicker: "Participació amb consentiment",
    participateTitle: "La bústia està tancada a propòsit.",
    participateBody:
      "Abans de rebre històries o contactes, cal identitat administrativa verificada, consentiment, retirada i temps de resposta. Avui no recollim res.",
    privacyTitle: "Privacitat des del disseny",
    footer: "TRAMA TRANS BCN · prototip local d’interès públic",
  },
  pt: {
    language: "Idioma",
    skip: "Ir para o conteúdo",
    crisis: "Perigo imediato?",
    crisisAction: "Ligue 112",
    healthAction: "Saúde: 061",
    suicideAction: "Crise suicida: 024",
    exit: "Saída rápida",
    exitHint: "Oculta esta tela; não apaga o histórico.",
    exitTitle:
      "Abre a previsão do tempo e substitui esta página. Não apaga o histórico do navegador.",
    navResources: "Apoio agora",
    navMemory: "Memória",
    navMethod: "Método",
    navParticipate: "Participar",
    kicker: "Barcelona · rede pública de cuidado",
    heroLead:
      "Uma trama para encontrar apoio, guardar memória e decidir em conjunto.",
    heroBody:
      "Informação pública, rastreável e revisada para pessoas trans, não binárias e quem as acompanha em Barcelona. Sem perfis, sem rastreamento, sem exigir explicações.",
    findHelp: "Encontrar apoio",
    knowMethod: "Como verificamos",
    status: "Edição local · não publicada",
    introKicker: "Você não está só diante do mapa",
    introTitle: "A cidade se torna habitável quando a informação circula.",
    introBody:
      "TRAMA conecta portas oficiais sem transformar vidas em dados. Cada recurso mostra sua fonte e última revisão. Quando algo não está claro, dizemos.",
    resourcesKicker: "Diretório vivo",
    resourcesTitle: "Apoio agora",
    resourcesBody:
      "Filtre por necessidade. Numa urgência, use primeiro 112 ou 061. Confirme os horários antes de ir.",
    filterLabel: "Filtrar recursos por necessidade",
    all: "Tudo",
    urgent: "Urgente",
    health: "Saúde",
    rights: "Direitos",
    support: "Cuidado e moradia",
    results: "recursos visíveis",
    officialSource: "Fonte oficial",
    reviewed: "Revisado",
    call: "Ligar",
    write: "Escrever",
    open: "Abrir fonte",
    memoryKicker: "Memória sem extração",
    memoryTitle: "Lembrar também é infraestrutura.",
    methodKicker: "Como se sustenta",
    methodTitle: "Publicar menos. Verificar melhor.",
    participateKicker: "Participação com consentimento",
    participateTitle: "A caixa de entrada está fechada de propósito.",
    participateBody:
      "Antes de receber histórias ou contatos, precisamos de identidade administrativa verificada, consentimento, retirada e tempos de resposta. Hoje nada é recolhido.",
    privacyTitle: "Privacidade desde o design",
    footer: "TRAMA TRANS BCN · protótipo local de interesse público",
  },
  en: {
    language: "Language",
    skip: "Skip to content",
    crisis: "Immediate danger?",
    crisisAction: "Call 112",
    healthAction: "Health: 061",
    suicideAction: "Suicide crisis: 024",
    exit: "Quick exit",
    exitHint: "Hides this screen; it does not clear history.",
    exitTitle:
      "Opens the weather forecast and replaces this page. It does not clear browser history.",
    navResources: "Support now",
    navMemory: "Memory",
    navMethod: "Method",
    navParticipate: "Take part",
    kicker: "Barcelona · public care network",
    heroLead:
      "A weave for finding support, holding memory and deciding together.",
    heroBody:
      "Public, traceable and reviewed information for trans and non-binary people, and those supporting them in Barcelona. No profiles, no tracking, no demand to explain yourself.",
    findHelp: "Find support",
    knowMethod: "How we verify",
    status: "Local edition · not published",
    introKicker: "You are not alone with the map",
    introTitle: "A city becomes liveable when information can move.",
    introBody:
      "TRAMA connects official entry points without turning lives into data. Every resource shows its source and review date. When a detail is unclear, we say so.",
    resourcesKicker: "Living directory",
    resourcesTitle: "Support now",
    resourcesBody:
      "Filter by need. In an emergency, use 112 or 061 first. Confirm opening times before travelling.",
    filterLabel: "Filter resources by need",
    all: "All",
    urgent: "Urgent",
    health: "Health",
    rights: "Rights",
    support: "Care and housing",
    results: "resources shown",
    officialSource: "Official source",
    reviewed: "Reviewed",
    call: "Call",
    write: "Email",
    open: "Open source",
    memoryKicker: "Memory without extraction",
    memoryTitle: "Remembering is infrastructure too.",
    methodKicker: "How it holds",
    methodTitle: "Publish less. Verify better.",
    participateKicker: "Participation with consent",
    participateTitle: "The inbox is closed on purpose.",
    participateBody:
      "Before receiving stories or contact details, we need verified administration, consent and withdrawal protocols, and response times. Nothing is collected today.",
    privacyTitle: "Privacy by design",
    footer: "TRAMA TRANS BCN · local public-interest prototype",
  },
} as const;

export type Resource = {
  id: string;
  category: ResourceCategory;
  name: string;
  summary: string;
  contact?: string;
  contactHref?: string;
  secondary?: string;
  secondaryHref?: string;
  location?: string;
  availability: string;
  caution?: string;
  source: string;
  sourceUrl: string;
  reviewedAt: "2026-08-13";
};

export const resources: ReadonlyArray<Resource> = [
  {
    id: "112",
    category: "urgent",
    name: "112 Catalunya",
    summary:
      "Emergencias inmediatas: policía, emergencias médicas, bomberos y protección civil.",
    contact: "112",
    contactHref: "tel:112",
    availability: "Gratuito · 24 horas · 365 días",
    source: "Generalitat de Catalunya",
    sourceUrl: "https://112.gencat.cat/ca/el-112/que-es-el-112/",
    reviewedAt: "2026-08-13",
  },
  {
    id: "061",
    category: "urgent",
    name: "061 Salut Respon",
    summary:
      "Orientación de salud, urgencia sanitaria y atención ante crisis de salud mental o ideación suicida.",
    contact: "061",
    contactHref: "tel:061",
    availability: "24 horas · 365 días",
    caution: "La fuente no confirma que la llamada telefónica sea gratuita.",
    source: "CatSalut",
    sourceUrl:
      "https://catsalut.gencat.cat/ca/coneix-catsalut/acces-sistema-salut/guiadus/canals/061-salut-respon/index.html",
    reviewedAt: "2026-08-13",
  },
  {
    id: "024",
    category: "urgent",
    name: "Línea 024",
    summary:
      "Contención y apoyo ante conducta o ideación suicida, también para familiares y personas cercanas. Emergencia inminente: 112.",
    contact: "024",
    contactHref: "tel:024",
    availability: "Gratuita · confidencial · 24 horas · 365 días",
    source: "Ministerio de Sanidad",
    sourceUrl: "https://www.sanidad.gob.es/linea024/home.htm",
    reviewedAt: "2026-08-13",
  },
  {
    id: "centre-lgtbi",
    category: "support",
    name: "Centre LGTBI de Barcelona",
    summary:
      "Acogida y atención gratuita psicológica y jurídica, migración y asilo, y acompañamiento trans y no binario.",
    contact: "93 880 51 11",
    contactHref: "tel:+34938805111",
    secondary: "info@centrelgtbibcn.org",
    secondaryHref: "mailto:info@centrelgtbibcn.org",
    location: "Comte Borrell, 22 · Barcelona",
    availability: "Atención presencial y remota",
    caution: "Confirma el horario antes de desplazarte.",
    source: "Ajuntament de Barcelona",
    sourceUrl:
      "https://ajuntament.barcelona.cat/lgtbi/en/noticia/request-the-free-services-provided-by-the-barcelona-lgtbi-centre_1406064",
    reviewedAt: "2026-08-13",
  },
  {
    id: "ond",
    category: "rights",
    name: "Oficina per la No Discriminació",
    summary:
      "Atención municipal ante discriminación o vulneración de derechos, incluida identidad o expresión de género y orientación sexual.",
    contact: "93 413 20 00",
    contactHref: "tel:+34934132000",
    secondary: "ond@bcn.cat",
    secondaryHref: "mailto:ond@bcn.cat",
    location: "Ferran, 32 · Barcelona",
    availability: "Atención con consulta o cita",
    caution:
      "Las fuentes municipales publican horarios distintos; confirma cita.",
    source: "Ajuntament de Barcelona",
    sourceUrl:
      "https://ajuntament.barcelona.cat/oficina-no-discriminacio/es/noticia/2025-nueva-ond",
    reviewedAt: "2026-08-13",
  },
  {
    id: "sai",
    category: "rights",
    name: "Xarxa SAI LGBTI · Barcelona",
    summary:
      "Información, acompañamiento y respuesta ante discriminación o violencia LGBTI.",
    contact: "93 516 64 24",
    contactHref: "tel:+34935166424",
    secondary: "arealgbti.igualtat@gencat.cat",
    secondaryHref: "mailto:arealgbti.igualtat@gencat.cat",
    location: "Carrer del Foc, 57 · Edifici A · Barcelona",
    availability: "Cita por el 012, de lunes a viernes laborables, 8–22 h",
    source: "Generalitat de Catalunya",
    sourceUrl:
      "https://igualtat.gencat.cat/ca/ambits-dactuacio/lgbti/xarxa-sai/",
    reviewedAt: "2026-08-13",
  },
  {
    id: "transit",
    category: "health",
    name: "Trànsit Barcelona · CatSalut",
    summary:
      "Atención biopsicosocial a personas trans y coordinación con otros servicios sanitarios.",
    secondary: "transit.bcn.ics@gencat.cat",
    secondaryHref: "mailto:transit.bcn.ics@gencat.cat",
    location: "CAP Numància · Numància, 23, 1.ª planta · Barcelona",
    availability: "Contacto por correo; teléfono y horario no publicados",
    source: "CatSalut",
    sourceUrl:
      "https://catsalut.gencat.cat/ca/serveis-sanitaris/altres-serveis/model-atencio-salut-persones-trans/",
    reviewedAt: "2026-08-13",
  },
  {
    id: "cuesb",
    category: "support",
    name: "CUESB · Urgencias sociales",
    summary:
      "Urgencias y emergencias sociales, incluida pérdida inminente o reciente de alojamiento.",
    contact: "900 703 030",
    contactHref: "tel:+34900703030",
    location: "Llacuna, 25 · Barcelona",
    availability: "Gratuito · 24 horas · 365 días",
    source: "Ajuntament de Barcelona",
    sourceUrl:
      "https://ajuntament.barcelona.cat/dretssocials/sites/default/files/arxius-documents/cuesb-ca.pdf",
    reviewedAt: "2026-08-13",
  },
  {
    id: "sara",
    category: "support",
    name: "SARA",
    summary:
      "Atención, recuperación, protección y acogida municipal ante violencia machista.",
    contact: "900 922 357",
    contactHref: "tel:+34900922357",
    location: "Marie Curie, 16 · Barcelona",
    availability: "Teléfono gratuito; atención presencial con cita",
    caution:
      "Confirma acceso y horario. La fuente no especifica por separado todos los criterios para personas trans.",
    source: "Ajuntament de Barcelona",
    sourceUrl:
      "https://ajuntament.barcelona.cat/dones/sites/default/files/documents/244623_diptic_a5_sara_2024_ajunt_1.pdf",
    reviewedAt: "2026-08-13",
  },
  {
    id: "900-violencia",
    category: "support",
    name: "Línia 900 900 120",
    summary:
      "Información, atención psicológica inicial, asesoramiento jurídico y derivación ante violencia machista.",
    contact: "900 900 120",
    contactHref: "tel:+34900900120",
    secondary: "same@gencat.cat",
    secondaryHref: "mailto:same@gencat.cat",
    availability: "Gratuita · confidencial · 24 horas · 365 días",
    caution:
      "La fuente se dirige a mujeres; confirma directamente la cobertura adecuada a tu situación.",
    source: "Generalitat de Catalunya",
    sourceUrl:
      "https://igualtat.gencat.cat/ca/ambits-dactuacio/violencies-masclistes/linia-datencio-contra-la-violencia-masclista-900-900-120-/",
    reviewedAt: "2026-08-13",
  },
];
