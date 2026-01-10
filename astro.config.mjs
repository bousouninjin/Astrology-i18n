import astroExpressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import pagefind from 'astro-pagefind';
import { defineConfig } from 'astro/config';
import { remarkModifiedTime } from './src/utils/remark-modified-time.mjs';

export default defineConfig({
  site: 'https://relately-news.asymmetry.life',
  trailingSlash: 'ignore',

  prefetch: {
    defaultStrategy: 'viewport',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en', 'zh', 'fr', 'es', 'ru', 'ko', 'pt', 'de', 'id'],
    routing: 'manual',
  },

  image: {
    responsiveStyles: true,
    layout: 'constrained',
    remotePatterns: [{ protocol: 'https', hostname: '*.unsplash.com' }],
  },

  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },
  integrations: [
    astroExpressiveCode({
      themes: ['github-dark', 'github-light'],
      themeCssSelector: (theme) => (theme.type === 'dark' ? '.dark' : ''),
    }),
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: {
          ja: 'ja-JP',
          en: 'en-US',
          zh: 'zh-CN',
          fr: 'fr-FR',
          es: 'es-ES',
          ru: 'ru-RU',
          ko: 'ko-KR',
          pt: 'pt-PT',
          de: 'de-DE',
          id: 'id-ID',
        },
      },
    }),
    mdx(),
    pagefind(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    icon({
      include: {
        lucide: ['*'],
      },
    }),
  ],
});
