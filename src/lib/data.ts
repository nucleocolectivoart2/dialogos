/**
 * @fileOverview Datos maestros para el ecosistema MEDULAR.
 * Incluye información de proyectos, videos, blog (bitácora), simuladores y recursos.
 */

export const PROJECTS = [
  {
    id: 'planeta-sostenible',
    xpReward: 200,
    media: {
      hero_image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
      video: true,
      externalUrl: 'https://www.youtube.com/@nucleo_colectivo'
    }
  },
  {
    id: 'criaturas-imposibles',
    xpReward: 200,
    media: {
      hero_image: 'https://images.unsplash.com/photo-1500829243541-74b677fecc30?auto=format&fit=crop&q=80&w=1200',
      video: true,
      externalUrl: '#'
    }
  }
];

export const VIDEOS_DATA = [
  {
    id: 'o67dlCRr3S0',
    title: 'Diálogos de Regeneración 01',
    description: 'Exploración inicial de la infraestructura biótica.',
    xpReward: 100,
    media: {
      hero_image: 'https://img.youtube.com/vi/o67dlCRr3S0/maxresdefault.jpg',
      externalUrl: 'https://www.youtube.com/watch?v=o67dlCRr3S0'
    }
  },
  {
    id: 'CkFxEKauv_8',
    title: 'Restauración del Territorio',
    description: 'Procesos de recuperación de suelos y comunidades.',
    xpReward: 100,
    media: {
      hero_image: 'https://img.youtube.com/vi/CkFxEKauv_8/maxresdefault.jpg',
      externalUrl: 'https://www.youtube.com/watch?v=CkFxEKauv_8'
    }
  }
];

export const BLOG_POSTS = [
  {
    id: 'post-01',
    title: '¿De qué hablamos cuando no hablamos de datos?',
    excerpt: '¿Por qué nos cuesta tanto admitir que un KPI no se cumplió? Exploramos la brecha entre la métrica y la realidad territorial.',
    author: 'Ángela Gómez',
    date: '18 de Febrero de 2025',
    readTime: '12 min',
    xpReward: 50,
    category: 'REFLEXIÓN',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'post-02',
    title: 'Narrativas para el Suelo Vivo',
    excerpt: 'Cómo el storytelling puede acelerar la restauración de la microbiología del suelo.',
    author: 'Manuel Palacio',
    date: '12 de Febrero de 2025',
    readTime: '8 min',
    xpReward: 50,
    category: 'TÉCNICO',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'post-03',
    title: 'La Ética de la IA Regenerativa',
    excerpt: 'Modelos de lenguaje aplicados a la gobernanza comunitaria y la biótica.',
    author: 'Núcleo Lab',
    date: '05 de Febrero de 2025',
    readTime: '15 min',
    xpReward: 50,
    category: 'IA',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    featured: false
  }
];

export const RESOURCES_DATA = [
  {
    id: 'paper-regen-01',
    title: 'Infraestructura de la Regeneración',
    description: 'Paper técnico sobre modelos de gobernanza biótica en el piedemonte.',
    type: 'PDF',
    size: '4.2 MB',
    xpReward: 150,
    category: 'Investigación',
    version: 'V2.1'
  },
  {
    id: 'pres-esg-2024',
    title: 'Presentación Estratégica ESG',
    description: 'Criterios de sostenibilidad profunda para organizaciones en transición.',
    type: 'PPT',
    size: '12.8 MB',
    xpReward: 150,
    category: 'Estrategia',
    version: '2024'
  },
  {
    id: 'manual-suelo-vivo',
    title: 'Manual de Restauración del Suelo',
    description: 'Guía práctica para la activación de microbiología en terrenos degradados.',
    type: 'DOC',
    size: '2.5 MB',
    xpReward: 150,
    category: 'Guía Técnica',
    version: 'V1.0'
  },
  {
    id: 'audio-bitacora-tecnica',
    title: 'Cápsula Técnica: Bio-Resiliencia',
    description: 'Análisis en audio sobre los indicadores de salud ecosistémica.',
    type: 'AUDIO',
    size: '15.4 MB',
    xpReward: 150,
    category: 'Memoria',
    version: 'Podcast Clip'
  }
];
