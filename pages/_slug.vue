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
    head() {
        return getMeta(this.page.yoast);
    },
    async asyncData({ route }) {
        const { path } = route;
        const { data } = await axios.get(`${apiUrl}/api/page?path=${path}`);
        return { page: data };
    },
    components: {
        TopSection,
        Modules,
    },
};
</script>

<style lang="scss" scoped>
</style>
