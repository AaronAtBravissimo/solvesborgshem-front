<template>
    <div
        v-if="building"
        class="building"
    >
        <TopSection
            v-if="building.topSection"
            :top-section="building.topSection"
        />
    </div>
</template>

<script>
import TopSection from '../../components/TopSection.vue';
import { getMeta } from '../../utils/helpers';

export default {
    components: {
        TopSection,
    },
    head() {
        return getMeta(this.building.yoast);
    },
    data: () => ({
        buildings: false,
    }),
    async asyncData() {
        const data = await import('../../static/json/buildings.json');
        return { buildings: data };
    },
    computed: {
        slug() {
            return this.$route.params.slug;
        },
        building() {
            if (!this.buildings) return false;

            const buildings = Object.values(this.buildings);

            for (let i = 0; i < buildings.length; i++) {
                const building = buildings[i];
                if (building.post_slug === this.slug) {
                    return building;
                }
            }

            return false;
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
