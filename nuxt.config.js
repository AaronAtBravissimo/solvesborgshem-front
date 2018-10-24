import generateJsonFiles from './modules/generate';

const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');
const axios = require('axios');

const siteConfig = require('./utils/config');

const { baseUrl, apiUrl } = siteConfig;

function getRoutes() {
    const pages = axios
        .get(`${apiUrl}/api/page`)
        .then(res => res.data.map(item => item.post_link.replace(baseUrl, '')));

    const buildings = axios
        .get(`${apiUrl}/api/building`)
        .then(res => res.data.map(item => item.post_link.replace(baseUrl, '')));

    return Promise.all([pages, buildings]).then(values => values.join().split(','));
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
        htmlAttrs: {
            lang: 'sv',
        },
        title: 'Sölvesborgshem',
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
    loading: { color: '#3aa2d2' },

    /*
    ** Global CSS
    */
    css: ['@/assets/css/tailwind.css', '@/assets/scss/main.scss'],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: '~/plugins/vue2-google-maps', ssr: false},
        { src: '~/plugins/polyfills', ssr: false },
        '~/plugins/app-link',
        '~/plugins/portal-vue',
    ],

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
                id: 'GTM-xxx',
            },
        ],
        '@/modules/generate',
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
        apiCacheDir: 'static/json/',
        routes() {
            return getRoutes();
        },
    },

    router: {
        extendRoutes(routes, resolve) {
            routes.push({
                name: 'page',
                path: '*',
                component: resolve(__dirname, 'pages/_slug.vue'),
            });
            routes.push({
                name: 'buildingSingle',
                path: '/bostader/:slug',
                component: resolve(__dirname, 'pages/building.vue'),
            });
            routes.push({
                name: 'searchEmpty',
                path: '/sok',
                component: resolve(__dirname, 'pages/sok.vue'),
            });
            routes.push({
                name: 'search',
                path: '/sok/:keyword',
                component: resolve(__dirname, 'pages/sok.vue'),
            });
        },
    },

    /*
    ** Build configuration
    */
    build: {
        extractCSS: true,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.(css|vue)$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        extend(config, { isDev, isClient }) {
            if (isDev) {
                generateJsonFiles('static/json/');
            }
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
                        whitelistPatterns: [/^pswp/],
                        whitelist: [
                            'html',
                            'body',
                            'nuxt-progress',
                            'vue-map',
                            'page-enter-active',
                            'page-leave-active',
                            'page-enter',
                            'page-leave-to',
                            'fade-in-enter-active',
                            'fade-in-leave-active',
                            'fade-in-enter',
                            'nuxt-link-active',
                            'nuxt-link-exact-active',
                            'overflow-hidden',
                            'vue-map',
                        ],
                    }),
                );
            }
            if (!isClient) {
                // This instructs Webpack to include `vue2-google-maps`'s Vue files
                // for server-side rendering
                config.externals = config.externals || [];
                config.externals.splice(0, 0, (context, request, callback) => {
                    if (/^vue2-google-maps($|\/)/.test(request)) {
                        callback(null, false);
                    } else {
                        callback();
                    }
                });
            }
        },
    },
};
