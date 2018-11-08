<template>
    <div class="app">
        <div
            ref="wrapper"
            :class="{'menuOpen': menuOpen}"
            class="wrapper"
            tabindex="-1"
        >
            <div class="app__inner">
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
    watch: {
        $route() {
            this.$store.commit('closeSearch');
            this.$refs.wrapper.focus();
        },
    },
    created() {
        if (process.client) {
            document.body.addEventListener('mousedown', () => {
                document.body.classList.add('using-mouse');
            });
            document.body.addEventListener('keydown', () => {
                document.body.classList.remove('using-mouse');
            });
        }
    },
    mounted() {
        if (process.client) {
            this.$store.dispatch('refreshData');
        }
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
    outline: 0 !important;
    &.menuOpen {
        transform: translateX(-300px);
        box-shadow: -10px 0 20px 10px rgba(0, 0, 0, 0.3);
        @media ($mobile) {
            transform: translateX(-260px);
        }
    }
}
.app__inner {
    padding: $frameSize;
    position: relative;
    @media ($smallDesktop) {
        padding: $frameSizeSmallDesktop;
    }
    @media ($tablet) {
        padding: $frameSizeTablet;
    }
    @media ($mobile) {
        padding: $frameSizeMobile;
    }
}
.wrapper__inner {
    background-color: #f4f8fa;
    padding: 0 $frameSize 120px;
    @media ($smallDesktop) {
        padding: 0 $frameSizeSmallDesktop 90px;
    }
    @media ($tablet) {
        padding: 0 $frameSizeSmallDesktop 70px;
    }
    @media ($smallTablet) {
        padding: 0 $frameSizeSmallDesktop 50px;
    }
    @media ($mobile) {
        padding: 0 15px 30px;
    }
}
</style>
