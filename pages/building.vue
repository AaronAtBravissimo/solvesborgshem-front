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
            <div class="headingHolder w-full">
                <h2>Bostadsinformation</h2>
            </div>
            <div class="columns flex">
                <div class="leftColumn">
                    <div
                        v-if="building.imageGallery"
                        class="imageGallery relative"
                    >
                        <img
                            :src="building.imageGallery[0].sizes.large"
                            :alt="building.imageGallery[0].alt"
                            class="objectFitCover w-full h-full"
                        >
                        <AppButton
                            v-if="building.imageGallery.length > 1"
                            :icon="expandIcon"
                            :label="`Se alla ${building.imageGallery.length} bilder`"
                            class="triggerGallery"
                            @clicked="openLightbox()"
                        />
                    </div>
                    <AddressBox
                        :map="mapInfo"
                        :address="fullAddress"
                    />
                    <BuildingWidget
                        :icon="areaIcon"
                        :heading="areaInfo.heading"
                        :body="areaInfo.content"
                    />
                </div>
                <div class="rightColumn">
                    <div class="row">
                        <BuildingWidget
                            :icon="propertyIcon"
                            :table="building.propertyInformation"
                            heading="Fastighetsinformation"
                        />
                    </div>
                    <div class="row">
                        <BuildingWidget
                            :icon="apartmentIcon"
                            :table="building.apartmentInformation"
                            heading="Lägenhetsinformation"
                        />
                    </div>
                    <div class="row">
                        <BuildingWidget
                            :icon="featuresIcon"
                            :table="building.features"
                            heading="Faciliteter"
                        />
                    </div>
                </div>
            </div>
            <div class="buttonHolder">
                <AppButton
                    label="Se alla bostäder"
                    url="/bostader/"
                />
            </div>
        </section>
        <portal to="endOfPage">
            <Photoswipe/>
        </portal>
    </div>
</template>

<script>
import TopSection from '../components/TopSection.vue';
import BuildingWidget from '../components/BuildingWidget.vue';
import AppButton from '../components/AppButton.vue';
import AddressBox from '../components/AddressBox.vue';
import { getMeta } from '../utils/helpers';
import expandIcon from '../assets/images/icon-expand.svg';
import Photoswipe from '../components/Photoswipe.vue';
import apartmentIcon from '../assets/images/icon-building-apartment.svg';
import areaIcon from '../assets/images/icon-building-area.svg';
import featuresIcon from '../assets/images/icon-building-features.svg';
import propertyIcon from '../assets/images/icon-building-property.svg';

const PhotoSwipe = require('photoswipe/dist/photoswipe.js');
const PhotoSwipeUIDefault = require('photoswipe/dist/photoswipe-ui-default.js');

export default {
    components: {
        TopSection,
        BuildingWidget,
        AppButton,
        AddressBox,
        Photoswipe,
    },
    head() {
        return getMeta(this.building.yoast);
    },
    data: () => ({
        buildings: false,
        expandIcon,
        apartmentIcon,
        areaIcon,
        featuresIcon,
        propertyIcon,
        lightboxOptions: {
            index: 0,
            history: false,
            shareEl: false,
            bgOpacity: 0.8,
            showHideOpacity: true,
            timeToIdle: false,
        },
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
            if (!this.building || !this.building.taxonomies || !this.building.taxonomies.area) {
                return false;
            }
            const area = this.building.taxonomies.area[0];

            return {
                heading: `Område ${area.name}`,
                content: area.description,
            };
        },
        mapInfo() {
            if (!this.building || !this.building.map) {
                return false;
            }

            return this.building.map;
        },
        fullAddress() {
            return `
                ${this.building.address}<br>
                ${this.building.city}<br>
                ${this.building.zipCode}
            `;
        },
        images() {
            return this.building.imageGallery;
        },
    },
    methods: {
        openLightbox() {
            const el = document.querySelector('.pswp');
            const items = [];

            for (let i = 0; i < this.images.length; i++) {
                items.push({
                    src: this.images[i].sizes.large,
                    w: this.images[i].sizes['large-width'],
                    h: this.images[i].sizes['large-height'],
                });
            }

            const gallery = new PhotoSwipe(el, PhotoSwipeUIDefault, items, this.lightboxOptions);
            gallery.init();
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
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     @media ($largeDesktop) {
         padding: 40px 30px;
     }
     @media ($smallerTablet) {
         padding: 30px 15px;
     }
}
.headingHolder {
    text-align: center;
    margin-top: 11px;
    margin-bottom: 67px;
    @media ($tablet) {
        margin-bottom: 30px;
    }
}
.heading {
    @media ($smallerTablet) {
        word-break: break-all;
        letter-spacing: 2px;
        font-size: 22px;
    }
    @media ($smallerMobile) {
        letter-spacing: 1px;
        font-size: 20px;
    }
}
.columns {
    width: 1620px;
    margin: 0 -#{$columnsGutter} 50px;
    position: relative;
    @media ($largeTablet) {
        flex-wrap: wrap;
    }
    @media ($largeTablet) {
        margin: 0;
        max-width: 100%;
    }
    &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        width: 1px;
        height: 100%;
        background-color: #d2dde1;
        @media ($largeTablet) {
            display: none;
        }
    }
}
.leftColumn,
.rightColumn {
    width: 50%;
    padding: 0 $columnsGutter;
    @media ($largeTablet) {
        width: 100%;
        padding: 0;
    }
}
.rightColumn {
    @media ($largeTablet) {
        border-top: 1px solid #d2dde1;
        margin-top: 35px;
        padding-top: 35px;
    }
}
.imageGallery {
    height: 520px;
    background-color: $primaryColor;
    margin-bottom: 30px;
    @media ($largeDesktop) {
        height: 480px;
    }
    @media ($smallDesktop) {
        height: 420px;
    }
    @media ($laptop) {
        height: 380px;
    }
    @media ($smallTablet) {
        height: 320px;
    }
    @media ($smallerTablet) {
        height: 260px;
        margin-bottom: 20px;
    }
    @media ($smallerMobile) {
        height: 200px;
    }
}
.triggerGallery {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #232323;
    border-radius: 0;
    min-width: 0;
    padding: 10px 20px;
    /deep/ .label {
        font-family: $secondaryFont;
        font-size: 15px;
        color: #fff;
        letter-spacing: 0;
        font-weight: 400;
        text-transform: none;
        @media ($mobile) {
            font-size: 14px;
        }
    }
    @media ($laptop) {
        padding: 10px 15px;
    }
    @media ($smallerTablet) {
        padding: 10px 15px;
        width: 100%;
    }
    @media ($mobile) {
        padding: 8px 14px;
    }

}
.row {
    margin-bottom: 50px;
    padding-bottom: 50px;
    border-bottom: 1px solid #d2dde1;
    @media ($laptop) {
        margin-bottom: 35px;
        padding-bottom: 35px;
    }
    @media ($smallerTablet) {
        margin-bottom: 20px;
        padding-bottom: 20px;
    }
    .rightColumn & {
        margin-left: -25px;
        padding-left: 50px;
        @media ($largeDesktop) {
            padding-left: 30px;
        }
        @media ($largeTablet) {
            margin-left: 0;
            padding-left: 0;
        }
    }
    &:last-child {
        padding-bottom: 0;
        border-bottom: 0;
    }
}
</style>
