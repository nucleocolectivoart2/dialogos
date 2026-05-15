export type Episode = {
  id: string;
  title: string;
  snippet: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
  date: string;
  duration: string;
  guests: string[];
  themes: string[];
  territories: string[];
};

export const MOCK_EPISODES: Episode[] = [
  {
    id: '71708969',
    title: 'El pensamiento, la empresa y la sostenibilidad',
    snippet: 'Exploramos la intersección entre la gestión estratégica y los ciclos naturales.',
    description: 'En este diálogo con Ángela Gómez, analizamos cómo las organizaciones pueden transitar de un modelo de impacto cero a uno de regeneración activa.',
    audioUrl: 'https://widget.spreaker.com/player?episode_id=71708969',
    imageUrl: 'https://picsum.photos/seed/pod1/800/600',
    date: 'Enero 2024',
    duration: '24:15',
    guests: ['Ángela Gómez'],
    themes: ['Organizaciones', 'Liderazgo'],
    territories: ['Bogotá', 'Global'],
  },
  {
    id: '71492005',
    title: 'Recuperar ecosistemas y transformar comunidades',
    snippet: 'Procesos territoriales de restauración biótica en Colombia.',
    description: 'Un análisis profundo sobre cómo la recuperación del suelo es el primer paso para la reparación del tejido social en áreas rurales.',
    audioUrl: 'https://widget.spreaker.com/player?episode_id=71492005',
    imageUrl: 'https://picsum.photos/seed/pod2/800/600',
    date: 'Diciembre 2023',
    duration: '22:40',
    guests: ['Invitado Especial'],
    themes: ['Regeneración', 'Territorio'],
    territories: ['Meta', 'Piedemonte'],
  },
  {
    id: '71237808',
    title: '¿Desarrollar sin destruir biodiversidad?',
    snippet: 'Tensiones entre el progreso económico y la preservación de la vida.',
    description: 'Debatimos sobre los modelos de desarrollo actuales y las alternativas basadas en la bioeconomía y el respeto a la biodiversidad local.',
    audioUrl: 'https://widget.spreaker.com/player?episode_id=71237808',
    imageUrl: 'https://picsum.photos/seed/pod3/800/600',
    date: 'Noviembre 2023',
    duration: '25:10',
    guests: ['Biodiversidad'],
    themes: ['Economía', 'Naturaleza'],
    territories: ['Pacífico', 'Antioquia'],
  },
  {
    id: '70936390',
    title: 'Pilas con el ambiente: Residuos como soluciones',
    snippet: 'Economía circular aplicada a la gestión de residuos complejos.',
    description: 'Conversación técnica sobre la responsabilidad extendida del productor y cómo transformar pasivos ambientales en activos para el territorio.',
    audioUrl: 'https://widget.spreaker.com/player?episode_id=70936390',
    imageUrl: 'https://picsum.photos/seed/pod4/800/600',
    date: 'Octubre 2023',
    duration: '21:55',
    guests: ['Pacto Global'],
    themes: ['Circularidad', 'Tecnología'],
    territories: ['Nacional'],
  },
  {
    id: '70933767',
    title: 'La sostenibilidad se construye desde la cultura',
    snippet: 'El papel del arte y la identidad en la transición ecológica.',
    description: 'Ángela Gómez nos explica por qué sin un cambio cultural profundo, las soluciones técnicas para la sostenibilidad son insuficientes.',
    audioUrl: 'https://widget.spreaker.com/player?episode_id=70933767',
    imageUrl: 'https://picsum.photos/seed/pod5/800/600',
    date: 'Septiembre 2023',
    duration: '23:30',
    guests: ['Ángela Gómez'],
    themes: ['Cultura', 'Educación'],
    territories: ['Latinoamérica'],
  },
  {
    id: '70850994',
    title: '¿Reto técnico o de liderazgo?',
    snippet: 'La crisis climática como una crisis de toma de decisiones.',
    description: 'Analizamos las barreras psicológicas e institucionales que impiden que los líderes adopten prácticas verdaderamente regenerativas.',
    audioUrl: 'https://widget.spreaker.com/player?episode_id=70850994',
    imageUrl: 'https://picsum.photos/seed/pod6/800/600',
    date: 'Agosto 2023',
    duration: '20:45',
    guests: ['Liderazgo'],
    themes: ['Organizaciones', 'Ética'],
    territories: ['Global'],
  }
];
