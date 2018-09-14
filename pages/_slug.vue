<template>
    <div class="page">
        <TopSection
            v-if="page.acf.topSection"
            :top-section="page.acf.topSection"
        />
        <Modules
            v-if="page.acf.modules"
            :modules="page.acf.modules"
        />
    </div>
</template>

<script>
import { getMeta } from '../utils/helpers';
import TopSection from '../components/TopSection.vue';
import Modules from '../components/Modules.vue';

export default {
    head() {
        return getMeta(this.page.yoast);
    },
    components: {
        TopSection,
        Modules,
    },
    data() {
        return {
        };
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
