<template>
    <div
        v-if="building"
        class="building"
    >
        <TopSection
            v-if="building.topSection"
            :top-section="building.topSection"
        />
        <section class="information">
            <div class="headingHolder">
                <h2>Bostadsinformation</h2>
            </div>
            <div class="columns flex">
                <div class="leftColumn">
                    <div class="imageGallery">

                    </div>
                    <div class="addressBox">

                    </div>
                    <BuildingWidget
                        :heading="areaInfo.heading"
                        :body="areaInfo.content"
                    />
                </div>
                <div class="rightColumn">
                    <div class="row">
                        <BuildingWidget
                            :table="building.propertyInformation"
                            heading="Fastighetsinformation"
                        />
                    </div>
                    <div class="row">
                        <BuildingWidget
                            :table="building.apartmentInformation"
                            heading="Lägenhetsinformation"
                        />
                    </div>
                    <div class="row">
                        <BuildingWidget
                            :table="building.features"
                            heading="Faciliteter"
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import TopSection from '../components/TopSection.vue';
import BuildingWidget from '../components/BuildingWidget.vue';
import { getMeta } from '../utils/helpers';

export default {
    components: {
        TopSection,
        BuildingWidget,
    },
    head() {
        return getMeta(this.building.yoast);
    },
    data: () => ({
        buildings: false,
    }),
    async asyncData() {
        const data = await import('../static/json/buildings.json');
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
        areaInfo() {
            if (!this.building || !this.building.taxonomies.area) {
                return false;
            }
            const area = this.building.taxonomies.area[0];

            return {
                heading: `Område ${area.name}`,
                content: area.description,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
$columnsGutter: 25px;

.information {
    background-color: #ffffff;
     box-shadow: 0 0 50px 0 rgba(13, 42, 56, 0.1);
     padding: 40px 50px;
}
.headingHolder {
    text-align: center;
    margin-top: 11px;
    margin-bottom: 67px;
    @media ($tablet) {
        margin-bottom: 30px;
    }
    @media ($smallTablet) {
        margin-bottom: 0;
    }
}
.columns {
    width: 1620px;
    max-width: 100%;
    margin: 0 -#{$columnsGutter};
    position: relative;
    &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        width: 1px;
        height: 100%;
        background-color: #d2dde1;
    }
}
.leftColumn,
.rightColumn {
    width: 50%;
    padding: 0 $columnsGutter;
}
.imageGallery {
    height: 520px;
    background-color: $primaryColor;
    margin-bottom: 30px;
}
.row {
    margin-bottom: 50px;
    padding-bottom: 50px;
    border-bottom: 1px solid #d2dde1;
    .rightColumn & {
        margin-left: -25px;
        padding-left: 50px;
    }
    &:last-child {
        padding-bottom: 0;
        border-bottom: 0;
    }
}
</style>
