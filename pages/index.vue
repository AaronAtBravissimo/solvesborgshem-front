<template>
    <div
        v-if="page"
        class="homePage"
    >
        <TheHeroSection
            :hero-section="page.heroSection"
        />
        <Shortcuts
            v-if="page.shortcuts"
            :shortcuts="page.shortcuts"
        />
        <StayWithUs/>
        <SocialPosts/>
    </div>
</template>

<script>
import TheHeroSection from '../components/TheHeroSection.vue';
import Shortcuts from '../components/Shortcuts.vue';
import StayWithUs from '../components/StayWithUs.vue';
import SocialPosts from '../components/SocialPosts.vue';
import { getMeta } from '../utils/helpers';

export default {
    components: {
        TheHeroSection,
        Shortcuts,
        StayWithUs,
        SocialPosts,
    },
    head() {
        return getMeta(this.page.yoast);
    },
    data: () => ({
        page: false,
    }),
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
