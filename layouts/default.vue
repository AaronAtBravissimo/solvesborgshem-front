<template>
    <div class="app">

        <div
            :class="{'menuOpen': menuOpen}"
            class="wrapper"
        >
            <div

                class="app__inner"
            >
                <div class="wrapper__inner">
                    <ExpandedSearch/>
                    <AboveHeader/>
                    <HeaderNotice v-if="activeNotice"/>
                    <TheHeader/>
                    <main class="inner">
                        <nuxt/>
                    </main>
                </div>
            </div>
            <TheFooter/>
        </div>
        <ExpandedMenu/>
        <no-ssr>
            <CookieNotice/>
        </no-ssr>
        <portal-target name="endOfPage"/>
    </div>
</template>

<script>
import AboveHeader from '../components/AboveHeader.vue';
import CookieNotice from '../components/CookieNotice.vue';
import ExpandedMenu from '../components/ExpandedMenu.vue';
import ExpandedSearch from '../components/ExpandedSearch.vue';
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
import HeaderNotice from '../components/HeaderNotice.vue';

export default {
    components: {
        AboveHeader,
        CookieNotice,
        ExpandedMenu,
        ExpandedSearch,
        TheHeader,
        TheFooter,
        HeaderNotice,
    },
    computed: {
        activeNotice() {
            return this.$store.getters.options.notice.active;
        },
        menuOpen() {
            return this.$store.getters.expandedMenuOpen;
        },
    },
    mounted() {
        this.$store.dispatch('nuxtServerInit');
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    z-index: 50;
    transition: transform 0.35s;
    background-color: #ffffff;
    overflow: hidden;
    &.menuOpen {
        transform: translateX(-280px);
        box-shadow: -10px 0 20px 10px rgba(0, 0, 0, 0.3);
    }
}
.app__inner {
    padding: 50px;
    position: relative;

    @media ($smallDesktop) {
        padding: 30px;
    }
    @media ($tablet) {
        padding: 15px;
    }
    @media ($mobile) {
        padding: 0;
    }
}
.wrapper__inner {
    background-color: #f4f8fa;
    padding: 0 50px 120px;
    @media ($smallDesktop) {
        padding: 0 30px 90px;
    }
    @media ($mobile) {
        padding: 0 15px 90px;
    }
}
</style>
