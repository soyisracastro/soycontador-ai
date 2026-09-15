// @ts-check
import { defineConfig, envField } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://soycontador.ai',
  output: 'static',
  adapter: vercel(),
  integrations: [
    mdx(),
    // Phosphor, la misma familia que usa todoconta-apps. Se elige por trazo
    // fino y geométrico, que es el lenguaje de "libro mayor × terminal".
    // astro-icon inserta el SVG en tiempo de build: cero JavaScript en el
    // navegador y cero peticiones extra, solo los iconos que se usen.
    // Sin `include`: resuelve solo los iconos que se referencian. Listar la
    // familia entera con '*' empaquetaría los ~9,000 de Phosphor.
    icon(),
    sitemap({
      filter: (page) => !page.includes('/gracias') && !page.includes('/dentro'),
    }),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  redirects: {
    '/jueves-de-contadoria': '/jueves',
    '/talleres': '/capacitacion',
    // Los dos de abajo son alias que se dictan en cámara, no renombres: por eso
    // van en 302 y no en el 301 implícito de los de arriba. Si la guía cambia de
    // slug o el repo de nombre, un permanente ya estaría cacheado en el
    // navegador de todo el que lo abrió y no habría cómo repuntarlo.
    '/prompts': { status: 302, destination: '/audita' },
    '/repo': { status: 302, destination: 'https://github.com/soycontadorAI/jueves-de-contadoria' },
    // El curso lo imparte Pepe en su plataforma; yo doy los módulos 5 y 6. El
    // alias es mío a propósito: si el curso cambia de sede, de edición o deja
    // de existir, repunto esto y los videos ya publicados siguen sirviendo.
    '/claude': { status: 302, destination: 'https://www.fiscalistas.ai/cursos/claude-para-contadores/' },
    // El curso de crear webapps, también en Fiscalistas.AI. Dos grafías porque
    // se dicta en cámara y en el CTA de /recibos: con y sin guion. OJO: se
    // dicta en público hasta verificar que la página del curso ya existe.
    '/crearapp': { status: 302, destination: 'https://fiscalistas.ai/cursos/crea-una-webapp-sin-saber-programar/' },
    '/crear-app': { status: 302, destination: 'https://fiscalistas.ai/cursos/crea-una-webapp-sin-saber-programar/' },
  },
  env: {
    schema: {
      SENDY_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      SENDY_ACTION_URL: envField.string({ context: 'server', access: 'public', optional: true }),
      SENDY_LIST_ID: envField.string({ context: 'server', access: 'public', optional: true }),
      // Una lista por promesa, porque el autoresponder se cuelga de la lista.
      // Si alguna falta, el alta cae en SENDY_LIST_ID.
      SENDY_EBOOK_LIST_ID: envField.string({ context: 'server', access: 'public', optional: true }),
      SENDY_LIVE_LIST_ID: envField.string({ context: 'server', access: 'public', optional: true }),
      SENDY_FLUJOS_LIST_ID: envField.string({ context: 'server', access: 'public', optional: true }),
      SENDY_RECIBOS_LIST_ID: envField.string({ context: 'server', access: 'public', optional: true }),

      // Correo de acuse del lead (SES). El dominio ya está verificado con
      // SPF/DKIM, así que el remitente debe ser @soycontador.ai.
      SES_REGION: envField.string({ context: 'server', access: 'public', optional: true }),
      SES_ACCESS_KEY_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      SES_SECRET_ACCESS_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CORREO_REMITENTE: envField.string({ context: 'server', access: 'public', optional: true }),
      CORREO_COPIA: envField.string({ context: 'server', access: 'public', optional: true }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
