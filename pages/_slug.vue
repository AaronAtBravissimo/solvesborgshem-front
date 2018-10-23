<template>
    <div
        v-if="page"
        class="page"
    >
        <TopSection
            v-if="page.topSection"
            :top-section="page.topSection"
        />
        <Modules
            v-if="page.modules"
            :modules="page.modules"
        />
    </div>
</template>

<script>
import TopSection from '../components/TopSection.vue';
import Modules from '../components/Modules.vue';
import { getMeta } from '../utils/helpers';

export default {
    components: {
        TopSection,
        Modules,
    },
    head() {
        return getMeta(this.page.yoast);
    },
    data: () => ({
        page: false,
    }),
    async asyncData({ route }) {
        let { path } = route;

        if (path.includes('.')) return false;

        path = path.replace(/\//g, '-_-');
        path = path.replace(/\\/g, '-_-');
        const data = await import(`../static/json/${path}.json`);
        return { page: data };
    },
};
</script>

<style lang="scss" scoped>
</style>
