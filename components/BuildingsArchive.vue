<template>
    <div class="buildingsArchive">
        <SearchFilterBox
            :keyword="currentSearch"
            search-label="Sök efter bostad:"
            @search="searchChanged"
        >
            <template slot="filter">
                <div class="filterHolder flex items-center">
                    <p class="text">Sortera efter område:</p>
                    <Select
                        ref="filter"
                        :items="filters"
                        @changed="filterChanged"
                    />
                </div>
                <div class="mapFilter">
                    <AppButton
                        label="Kartfiltrering"
                        class="ml-8"
                        @clicked="showMap = !showMap"
                    />
                </div>
            </template>
        </SearchFilterBox>
        <BuildingsArchiveMap
            v-if="showMap"
            :areas="areas"
            @changed="filterChanged"
        />
        <div class="buildings">
            <div class="smallCardColumns flex flex-wrap">
                <div
                    v-for="building in buildingsOut"
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
import Fuse from 'fuse.js';
import buildings from '../static/json/buildings.json';
import Select from './Select.vue';
import SmallCard from './SmallCard.vue';
import SearchFilterBox from './SearchFilterBox.vue';
import BuildingsArchiveMap from './BuildingsArchiveMap.vue';
import AppButton from './AppButton.vue';

export default {
    components: {
        Select,
        SmallCard,
        SearchFilterBox,
        BuildingsArchiveMap,
        AppButton,
    },
    data: () => ({
        currentSearch: null,
        currentFilter: null,
        showMap: false,
        buildings,
    }),
    computed: {
        areas() {
            const areas = [];
            const added = [];

            for (let i = 0; i < this.buildings.length; i++) {
                const building = this.buildings[i];
                const areaId = this.getTermId(building);

                if (areaId && !added.includes(areaId)) {
                    added.push(areaId);
                    areas.push(building.taxonomies.area[0]);
                }
            }

            return areas.sort((a, b) => a.name.localeCompare(b.name));
        },
        filters() {
            return [{ label: 'Välj område', value: null }, ...this.areas.map(area => ({
                label: area.name,
                value: area.term_id,
            }))];
        },
        buildingsOut() {
            let allBuildnings = this.buildings;

            if (this.currentFilter) {
                allBuildnings = allBuildnings.filter(
                    building => this.getTermId(building) === this.currentFilter,
                );
            }

            if (this.currentSearch && this.currentSearch.length > 0) {
                const fuse = new Fuse(allBuildnings, {
                    threshold: 0.4,
                    shouldSort: true,
                    keys: [
                        {
                            name: ['post_title'],
                            weight: 1,
                        },
                    ],
                });

                allBuildnings = fuse.search(this.currentSearch);
            }

            return allBuildnings;
        },
    },
    methods: {
        getTermId(building) {
            if (!building.taxonomies.area) return false;

            return building.taxonomies.area[0].term_id;
        },
        getImage(image) {
            if (!image) {
                return this.$store.getters.options.defaultImage.sizes.medium;
            }

            return image.sizes.medium;
        },
        searchChanged(keyword) {
            this.currentSearch = keyword;
            this.currentFilter = null;
            this.$refs.filter.selected = null;
        },
        filterChanged(value, index = null) {
            this.currentFilter = value;
            this.currentSearch = null;
            if (index) {
                this.$refs.filter.selected = index;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
$columnGutter: 15px;

.buildingsArchive /deep/ .searchInput {
    @media ($largeTablet) {
        width: 400px;
    }
    @media ($tablet) {
        width: 300px;
    }
}
.buildingsArchive /deep/ .searchForm .text {
    @media ($tablet) {
        display: none;
    }
}
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
