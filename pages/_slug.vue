<template>
    <div class="page py-6">
        <div class="container">
            <h1 class="text-center">{{ page.title.rendered }}</h1>
        </div>
    </div>
</template>

<script>
import { getMeta } from '../utils/helpers';

export default {
    head() {
        return getMeta(this.page.yoast);
    },
    computed: {
        page() {
            const { slug } = this.$route.params;
            const { pages } = this.$store.getters;
            return pages.find(page => page.slug === slug);
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
