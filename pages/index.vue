<template>
    <div class="page py-6">
        <div class="container">
            <h1 class="text-center mobile:text-left">{{ page.post_title }}</h1>
        </div>
    </div>
</template>

<script>
import { getMeta } from '../utils/helpers';

export default {
    head() {
        return getMeta(this.page.yoast, true);
    },
    async asyncData() {
        const data = await import('../static/json/-_-.json');
        return { page: data };
    },
};
</script>

<style lang="scss" scoped>
</style>
