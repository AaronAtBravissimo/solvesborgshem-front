<template>
    <div class="buildingsArchive">
        <SearchFilterBox
            :keyword="currentSearch"
            aria-label-for-search="Sök efter bostäder på webbplatsen"
            search-label="Sök efter bostad:"
            placeholder="Ange önskad adress..."
            @search="searchChanged"
        >
            <template slot="filter">
                <div class="filterHolder flex items-center">
                    <p class="text">Sortera efter område:</p>
                    <Select
                        ref="filter"
                        :items="filters"
                        name="areaFilter"
                        @changed="filterChanged"
                    />
                </div>
                <div class="mapFilter">
                    <AppButton
                        :aria-expanded="showMap.toString()"
                        aria-label="Öppnar sektion med karta"
                        label="Kartfiltrering"
                        class="mapFilterButton"
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
            <p
                v-if="searchResults < 1 && currentSearch !== null"
                class="noResultsText"
            >
                Inga bostäder kunde hittas.
            </p>
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
        searchResults: null,
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
            this.searchResults = this.buildingsOut.length;
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

.buildingsArchive /deep/ {
    .searchFilterBox {
        @media ($smallTablet) {
            flex-wrap: wrap;
        }
    }
    .searchForm {
        @media ($mediumTablet) {
            width: calc(100% - 185px);
        }
        @media ($smallTablet) {
            width: 100%;
            border-bottom: 1px solid #ddd;
            margin-bottom: 15px;
            padding-bottom: 15px;
        }
    }
    .searchForm .text {
        @media ($largeTablet) {
            display: none;
        }
    }
    .searchInput {
        @media ($largeDesktop) {
            width: 400px;
        }
        @media ($smallDesktop) {
            width: 350px;
        }
        @media ($largeTablet) {
            width: 300px;
        }
        @media ($tablet) {
            width: 200px;
        }
        @media ($mediumTablet) {
            width: 100%;
        }
    }
    .filterHolder {
        @media ($laptop) {
            width: auto;
            margin-left: 15px;
            margin-right: 15px;
        }
        @media ($mediumTablet) {
            margin-right: 0;
        }
        @media ($smallTablet) {
            margin-left: 0;
            width: 100%;
        }
    }
    .filterHolder .text {
        @media ($laptop) {
            display: none;
        }
    }
    .select {
        @media ($largeDesktop) {
            width: 250px;
        }
        @media ($smallDesktop) {
            width: 200px;
        }
        @media ($tablet) {
            width: 170px;
        }
        @media ($smallTablet) {
            width: 100%;
        }
    }
    .smallCard .inner {
        align-items: center;
    }
    .dropdownToggle {
        box-shadow: none;
        font-weight: 300;
        max-width: 100%;
        border-radius: 6px;
        padding: 12px 20px;
        border: solid 1px #cfcfcf;
        background-color: #fafafa;
        font-size: 16px;
        font-family: $secondaryFont;
        line-height: normal;
        color: $primaryTextColor;
        @media ($tablet) {
            font-size: 15px;
            padding: 12px 18px;
        }
        @media ($mobile) {
            font-size: 14px;
            padding: 12px 15px;
        }
        .activeItem {
            opacity: 0.5;
            z-index: -1;
        }
        &::after {
            right: 20px;
            @media ($tablet) {
                right: 18px;
            }
            @media ($mobile) {
                right: 15px;
            }
        }
    }
    .dropdown {
        border-width: 1px;
    }
    .isOpen .dropdownToggle,
    .dropdownToggle:focus {
        border-color: $primaryColor;
    }
    .isOpen .dropdownToggle .activeItem,
    .dropdownToggle:focus .activeItem {
        opacity: 1;
    }

}
.mapFilter {
    @media ($mediumTablet) {
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
