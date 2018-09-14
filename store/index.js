/* eslint-disable no-param-reassign, import/no-extraneous-dependencies */
import Vuex from 'vuex';
import axios from 'axios';
import { apiUrl } from '../utils/config';

const createStore = () => new Vuex.Store({
    state: {
        menu: {},
        options: [],
    },
    getters: {
        menu: state => state.menu,
        options: state => state.options,
    },
    mutations: {
        setMenu(state, { menu }) {
            state.menu = menu;
        },
        setOptions(state, { options }) {
            state.options = options;
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
