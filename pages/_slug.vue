<template>
    <div class="page">
        <TopSection
            v-if="page.acf.topSection"
            :top-section="page.acf.topSection"
        />
        <div
            v-if="page.acf.modules"
            class="modules"
        >
            <div
                v-if="page.acf.modules[0].acf_fc_layout === 'shortcuts'"
                class="shortcuts"
            >
                Genväg
            </div>
        </div>
    </div>
</template>

<script>
import { getMeta } from '../utils/helpers';
import TopSection from '../components/TopSection.vue';

export default {
    head() {
        return getMeta(this.page.yoast);
    },
    components: {
        TopSection,
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
