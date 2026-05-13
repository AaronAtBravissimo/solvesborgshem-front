<template>
    <div
        v-if="page"
        class="homePage"
    >
        <TheHeroSection
            :hero-section="page.heroSection"
        />
        <NewsArchive />
        <Shortcuts
            v-if="page.shortcuts"
            :shortcuts="page.shortcuts"
        />
        <StayWithUs/>
    </div>
</template>

<script>
import page from '../static/json/-_-.json';
import TheHeroSection from '../components/heroSection/TheHeroSection.vue';
import Shortcuts from '../components/Shortcuts.vue';
import StayWithUs from '../components/StayWithUs.vue';
import NewsArchive from '../components/NewsArchive.vue';
import { getMeta, updatePage } from '../utils/helpers';

export default {
    components: {
        TheHeroSection,
        Shortcuts,
        StayWithUs,
        NewsArchive,
    },
    head() {
        return getMeta(this.page.yoast);
    },
    data: () => ({
        page,
    }),
    async mounted() {
        const res = await updatePage('hem');
        if (res) {
            this.page = res;
        }
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
