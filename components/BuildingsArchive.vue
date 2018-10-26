<template>
    <div class="buildingsArchive">
        <SearchFilterBox show-search-form/>
        <div class="buildings">
            <div class="smallCardColumns flex flex-wrap">
                <div
                    v-for="building in buildings"
                    :key="building.id"
                    class="smallCardColumn flex"
                >
                    <SmallCard
                        :image="getImage(building.topSection.image)"
                        :imagealt="building.topSection.image.alt"
                        :heading="building.topSection.heading"
                        :content="building.topSection.preamble"
                        :link="building.post_link"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import buildings from '../static/json/buildings.json';
import SmallCard from './SmallCard.vue';
import SearchFilterBox from './SearchFilterBox.vue';

export default {
    components: {
        SmallCard,
        SearchFilterBox,
    },
    data: () => ({
        buildings,
    }),
    methods: {
        getImage(image) {
            if (!image) {
                return this.$store.getters.options.defaultImage.sizes.medium;
            }

            return image.sizes.medium;
        },
    },
};
</script>

<style lang="scss" scoped>
$columnGutter: 15px;

.columns {
    margin-left: -$columnGutter;
    margin-right: -$columnGutter;
}
.column {
    width: 50%;
    padding: 0 $columnGutter;
    margin-bottom: $columnGutter*2;
}
</style>
