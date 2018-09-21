<template>
    <div class="homePage">
        <Shortcuts
            v-if="page.shortcuts"
            :shortcuts="page.shortcuts"
        />
        <StayWithUs/>
        <SocialPosts/>
    </div>
</template>

<script>
import { getMeta } from '../utils/helpers';
import Shortcuts from '../components/Shortcuts.vue';
import StayWithUs from '../components/StayWithUs.vue';
import SocialPosts from '../components/SocialPosts.vue';

export default {
    components: {
        Shortcuts,
        StayWithUs,
        SocialPosts,
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
