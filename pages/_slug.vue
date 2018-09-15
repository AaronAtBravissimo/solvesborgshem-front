<template>
    <div class="page">
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
import axios from 'axios';
import TopSection from '../components/TopSection.vue';
import Modules from '../components/Modules.vue';
import { apiUrl } from '../utils/config';
import { getMeta } from '../utils/helpers';

export default {
    components: {
        TopSection,
        Modules,
    },
    head() {
        return getMeta(this.page.yoast);
    },
    async asyncData({ route }) {
        let { path } = route;

        if (process.client) {
            path = path.replace(/\//g, '-_-');
            path = path.replace(/\\/g, '-_-');
            const { data } = await axios.get(`/json/${path}.json`);
            return { page: data };
        }

        const { data } = await axios.get(`${apiUrl}/api/page?path=${path}`);
        return { page: data };
    },
};
</script>

<style lang="scss" scoped>
</style>
