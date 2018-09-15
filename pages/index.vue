<template>
    <div class="page py-6">
        <div class="container">
            <h1 class="text-center mobile:text-left">{{ page.post_title }}</h1>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { apiUrl } from '../utils/config';
import { getMeta } from '../utils/helpers';

export default {
    head() {
        return getMeta(this.page.yoast, true);
    },
    async asyncData() {
        if (process.client) {
            const { data } = await axios.get('/json/-_-.json');
            return { page: data };
        }

        const { data } = await axios.get(`${apiUrl}/api/page?frontpage=true`);
        return { page: data };
    },
};
</script>

<style lang="scss" scoped>
</style>
