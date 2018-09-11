<template>
    <div class="page py-6">
        <div class="container">
            <h1 class="text-center mobile:text-left">{{ page.title.rendered }}</h1>
        </div>
    </div>
</template>

<script>
import { getMeta } from '../utils/helpers';

export default {
    head() {
        return getMeta(this.page.yoast, true);
    },
    computed: {
        page() {
            const { pages } = this.$store.getters;
            return pages.find(page => page.pageType === 'frontPage');
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
