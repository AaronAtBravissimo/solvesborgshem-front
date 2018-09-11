<template>
    <div class="app">
        <TheHeader/>
        <main class="app__inner">
            <nuxt/>
        </main>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';

export default {
    components: {
        TheHeader,
    },
    mounted() {
        this.$store.dispatch('nuxtServerInit');
    },
};
</script>

<style lang="scss" scoped>
</style>
