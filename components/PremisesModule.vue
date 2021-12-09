<template>
    <section class="premises">
        <div class="premises__inner">
            <div
                v-for="(premise, index) in premises"
                :key="index"
                class="premise"
            >
                <div class="columns flex">
                    <div class="leftColumn">
                        <div
                            v-if="premise.images"
                            class="imageGallery relative"
                        >
                            <AppImage
                                :image="premise.images[0].sizes.large"
                                :alt="premise.images[0].alt"
                                class="w-full h-full"
                            />
                            <AppButton
                                v-if="premise.images.length > 1"
                                :icon="expandIcon"
                                :label="`Se alla ${premise.images.length} bilder`"
                                class="triggerGallery"
                                @clicked="openLightbox(premise.images)"
                            />
                        </div>

                        <AddressBox
                            v-if="premise.googleMap"
                            :cords="premise.googleMap"
                            :address="premise.address"
                        />
                    </div>

                    <div class="rightColumn">
                        <BuildingWidget
                            :icon="propertyIcon"
                            :heading="premise.heading"
                            :body="premise.text"
                            :body-inside-div="true"
                        />
                    </div>
                </div>
            </div>
        </div>

        <portal to="endOfPage">
            <Photoswipe/>
        </portal>
    </section>
</template>

<script>
import AddressBox from './AddressBox.vue';
import BuildingWidget from './BuildingWidget.vue';
import AppButton from './AppButton.vue';
import Photoswipe from './Photoswipe.vue';
import AppImage from './AppImage.vue';
import expandIcon from '../assets/images/icon-expand.svg';
import propertyIcon from '../assets/images/icon-building-property.svg';

const PhotoSwipe = require('photoswipe/dist/photoswipe.js');
const PhotoSwipeUIDefault = require('photoswipe/dist/photoswipe-ui-default.js');

export default {
    components: {
        AddressBox,
        BuildingWidget,
        AppButton,
        Photoswipe,
        AppImage,
    },

    props: {
        premises: {
            type: Array,
            required: true,
        },
    },

    data: () => ({
        expandIcon,
        propertyIcon,
    }),

    methods: {
        openLightbox(images) {
            const el = document.querySelector('.pswp');
            const items = [];

            for (let i = 0; i < images.length; i++) {
                items.push({
                    src: images[i].sizes.large,
                    w: images[i].sizes['large-width'],
                    h: images[i].sizes['large-height'],
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

.premises {
    background-color: #ffffff;
    box-shadow: $primaryShadow;
    padding: 40px 50px;
    @media ($largeDesktop) {
        padding: 40px 30px;
    }
    @media ($smallerTablet) {
        padding: 30px 15px;
    }
}

.premise {
    margin-bottom: 60px;
    padding-bottom: 60px;
    border-bottom: 1px solid #d2dde1;
    @media ($laptop) {
        margin-bottom: 40px;
        padding-bottom: 40px;
    }
    @media ($smallerTablet) {
        margin-bottom: 30px;
        padding-bottom: 30px;
    }
    &:last-child {
        padding-bottom: 0;
        border-bottom: 0;
        margin-bottom: 0;
    }
}

.columns {
    width: 1620px;
    margin: 0 auto;
    max-width: 100%;
    position: relative;
    @media ($largeTablet) {
        flex-wrap: wrap;
    }
    @media ($largeTablet) {
        margin: 0;
        max-width: 100%;
    }
    &::after {
        content: "";
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
    @media ($smallerTablet) {
        margin-top: 20px;
        padding-top: 20px;
    }
}
.imageGallery {
    height: 380px;
    background-color: $primaryColor;
    margin-bottom: 30px;
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
    background-color: $primaryBackgroundColor;
    border-radius: 0;
    min-width: 0;
    padding: 10px 20px;
    &:hover {
        background-color: $primaryColor;
    }
    &:focus {
        outline-color: $primaryTextColor;
        background-color: $primaryColor;
    }
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
</style>
