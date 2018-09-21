<template>
    <div class="page">
        <Shortcuts
            v-if="page.shortcuts"
            :shortcuts="page.shortcuts"
        />
    </div>
</template>

<script>
import { getMeta } from '../utils/helpers';
import Shortcuts from '../components/Shortcuts.vue';

export default {
    components: {
        Shortcuts,
    },
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
