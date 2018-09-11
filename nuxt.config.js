const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');
const axios = require('axios');

const config = require('./utils/config');
const baseUrl = config.baseUrl;
const apiUrl = config.apiUrl;

function getRoutes() {
    const pages = axios
        .get(`${apiUrl}/wp/v2/pages`)
        .then(res => res.data.map(item => item.link.replace(baseUrl, '')));
    return Promise.all([pages]).then(values => values.join().split(','));
}

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-z0-9-:/]+/g) || [];
    }
}

module.exports = {
    mode: 'universal',

    /*
    ** Headers of the page
    */
    head: {
        title: 'Startmall',
        titleTemplate: '%s - Startmall',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: '',
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#FFFFFF' },

    /*
    ** Global CSS
    */
    css: ['@/assets/css/tailwind.css', '@/assets/scss/main.scss'],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [{ src: '~/plugins/polyfills', ssr: false }, '~/plugins/app-link'],

    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/sitemap',
        ['nuxt-sass-resources-loader', '@/assets/scss/global.scss'],
        [
            '@nuxtjs/google-analytics',
            {
                id: 'xxx',
            },
        ],
        [
            '@nuxtjs/google-tag-manager', 
            { 
                id: 'GTM-xxx' 
            }
        ],
    ],

    sitemap: {
        generate: true,
        hostname: baseUrl,
        routes() {
            return getRoutes();
        },
    },

    generate: {
        fallback: true,
        routes() {
            return getRoutes();
        },
    },

    /*
    ** Build configuration
    */
    build: {
        extractCSS: true,
        extend(config, { isDev, isClient }) {
            // Run ESLint on save
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                });
            }
            if (!isDev) {
                // Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
                // for more information about purgecss.
                config.plugins.push(
                    new PurgecssPlugin({
                        paths: glob.sync([
                            path.join(__dirname, './pages/**/*.vue'),
                            path.join(__dirname, './layouts/**/*.vue'),
                            path.join(__dirname, './components/**/*.vue'),
                        ]),
                        extractors: [
                            {
                                extractor: TailwindExtractor,
                                extensions: ['vue'],
                            },
                        ],
                        whitelist: ['html', 'body', 'nuxt-progress', 'vue-map'],
                    }),
                );
            }
        },
    },
};
