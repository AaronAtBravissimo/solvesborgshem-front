<template>
    <div class="homePage">
        <Shortcuts
            v-if="page.shortcuts"
            :shortcuts="page.shortcuts"
        />
        <StayWithUs/>
    </div>
</template>

<script>
import { getMeta } from '../utils/helpers';
import Shortcuts from '../components/Shortcuts.vue';
import StayWithUs from '../components/StayWithUs.vue';

export default {
    components: {
        Shortcuts,
        StayWithUs,
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
.homePage {
    .shortcuts {
        margin-bottom: 50px;
    }
}
</style>
