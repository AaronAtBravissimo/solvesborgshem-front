<template>
    <div class="app">
        <div class="wrapper">
            <AboveHeader/>
            <TheHeader/>
            <main class="inner">
                <nuxt/>
            </main>
        </div>
    </div>
</template>

<script>
import AboveHeader from '../components/AboveHeader.vue';
import TheHeader from '../components/TheHeader.vue';

export default {
    components: {
        AboveHeader,
        TheHeader,
    },
    mounted() {
        this.$store.dispatch('nuxtServerInit');
    },
};
</script>

<style lang="scss" scoped>
.app {
    padding: 50px;
}
.wrapper {
    background-color: #f4f8fa;
}
</style>
