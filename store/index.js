/* eslint-disable no-param-reassign, import/no-extraneous-dependencies */
import Vuex from 'vuex';
import axios from 'axios';
import { apiUrl } from '../utils/config';

const createStore = () => new Vuex.Store({
    state: {
        menu: {},
        options: [],
        expandedMenuOpen: true,
    },
    getters: {
        menu: state => state.menu,
        options: state => state.options,
        expandedMenuOpen: state => state.expandedMenuOpen,
    },
    mutations: {
        setMenu(state, { menu }) {
            state.menu = menu;
        },
        setOptions(state, { options }) {
            state.options = options;
        },
        toggleMenu(state) {
            state.expandedMenuOpen = !state.expandedMenuOpen;
            document.body.classList.toggle('overflow-hidden');
        },
        closeMenu(state) {
            state.expandedMenuOpen = false;
            document.body.classList.remove('overflow-hidden');
        },
        openMenu(state) {
            state.expandedMenuOpen = true;
            document.body.classList.add('overflow-hidden');
        },
    },
    actions: {
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
                dispatch('loadMenu'),
                dispatch('loadOptions'),
            ]);
        },
    },
});

export default createStore;
