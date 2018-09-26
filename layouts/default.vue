<template>
    <div class="app">
        <div class="app__inner">
            <div class="wrapper">
                <AboveHeader/>
                <TheHeader/>
                <main class="inner">
                    <nuxt/>
                </main>
            </div>
        </div>
        <TheFooter/>
    </div>
</template>

<script>
import AboveHeader from '../components/AboveHeader.vue';
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';

export default {
    components: {
        AboveHeader,
        TheHeader,
        TheFooter,
    },
    mounted() {
        this.$store.dispatch('nuxtServerInit');
    },
};
</script>

<style lang="scss" scoped>
.app__inner {
    padding: 50px;
    @media ($smallDesktop) {
        padding: 30px;
    }
    @media ($mobile) {
        padding: 0;
    }
}
.wrapper {
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
