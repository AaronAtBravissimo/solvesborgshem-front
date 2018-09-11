/* eslint-disable no-param-reassign, import/no-extraneous-dependencies */
import Vuex from 'vuex';
import axios from 'axios';
import { apiUrl } from '../utils/config';

const createStore = () => new Vuex.Store({
    state: {
        menu: {},
        pages: [],
        options: [],
    },
    getters: {
        menu: state => state.menu,
        pages: state => state.pages,
        options: state => state.options,
    },
    mutations: {
        setMenu(state, { menu }) {
            state.menu = menu;
        },
        setPages(state, { pages }) {
            state.pages = pages;
        },
        setOptions(state, { options }) {
            state.options = options;
        },
    },
    actions: {
        async loadPages({ commit }) {
            const res = await axios.get(
                `${apiUrl}/wp/v2/pages?timestamp=${new Date().getTime()}`,
            );
            commit('setPages', { pages: res.data });
        },
        async loadMenu({ commit }) {
            const res = await axios.get(
                `${apiUrl}/menus/v1/menus/primary?timestamp=${new Date().getTime()}`,
            );
            commit('setMenu', { menu: res.data });
        },
        async loadOptions({ commit }) {
            const res = await axios.get(
                `${apiUrl}/acf/v3/options/options?timestamp=${new Date().getTime()}`,
            );
            commit('setOptions', { options: res.data.acf });
        },
        async nuxtServerInit({ dispatch }) {
            return Promise.all([
                dispatch('loadPages'),
                dispatch('loadMenu'),
                dispatch('loadOptions'),
            ]);
        },
    },
});

export default createStore;
