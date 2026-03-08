// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

/** @type {import('astro/config').AstroUserConfig} */
export default defineConfig({
  // Domena główna ALNAIR OU
  site: 'https://www.alnair.eu',

  integrations: [
    mdx(),
    // Zaawansowana konfiguracja mapy witryny dla 10 rynków
    sitemap({
      i18n: {
        defaultLocale: 'pl',
        locales: {
          pl: 'pl',
          en: 'en',
          et: 'et',
          de: 'de',
          he: 'he',
          ru: 'ru',
          ua: 'ua',
          ko: 'ko',
          ja: 'ja',
          'zh-tw': 'zh-tw'
        }
      },
      // Dodaje tag x-default kierujący na wersję angielską dla nieznanych regionów
      serialize(item) {
        if (item.url.includes('/en/')) {
          item.changefreq = 'daily';
          item.priority = 1.0;
        }
        return item;
      },
    })
  ],

  // Konfiguracja wielojęzyczności (i18n) - Global Intelligence & Lobbying Strategy
  i18n: {
    defaultLocale: 'pl',
    locales: [
      'pl',    // Polska - Rynek docelowy / Lobbying
      'en',    // Global - Biznes / Defence (USA)
      'et',    // Estonia - Siedziba / NATO Hub
      'de',    // Niemcy - Kapitał EU
      'he',    // Izrael - Cyber / Security (RTL)
      'ru',    // Region - Analiza ryzyka
      'ua',    // Ukraina - Odbudowa / Defence
      'ko',    // Korea Płd. - Technologie zbrojeniowe
      'ja',    // Japonia - Inwestycje strategiczne
      'zh-tw'  // Tajwan - Technologia / Wywiad
    ],
    routing: {
      prefixDefaultLocale: false, // PL na domenie głównej, reszta w podfolderach
      fallback: {
        // Jeśli brakuje tłumaczenia w danym języku, serwuj wersję angielską
        'ko': 'en',
        'ja': 'en',
        'zh-tw': 'en',
        'he': 'en'
      }
    }
  },

  // Konfiguracja obrazów i bezpieczeństwa danych
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    },
    // Ograniczenie domen dla obrazów zewnętrznych (Defence Standard)
    domains: ['alnair.eu']
  },

  // Optymalizacja budowania pod roboty monitorujące
  build: {
    format: 'directory'
  }
});
