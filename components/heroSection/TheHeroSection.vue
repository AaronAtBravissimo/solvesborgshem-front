<template>
    <section
        :class="{'isLoaded': loaded}"
        class="heroSection"
    >
        <div class="inner flex items-center">
            <div class="left">
                <TheHeroSlider :slides="heroSection.slider.ordinaryImages"/>
            </div>
            <div class="middle">
                <ImageElement :image-elements="heroSection.slider.transparentImages"/>
            </div>
            <div class="right flex flex-no-shrink justify-center">
                <div class="rightInner">
                    <div class="textHolder">
                        <h1 class="heading">
                            <span class="firstRow block">{{ heroSection.heading.firstRow }}</span>
                            <span class="secondRow block">{{ heroSection.heading.secondRow }}</span>
                        </h1>
                        <p
                            class="preamble"
                            v-html="heroSection.preamble"
                        >
                        </p>
                    </div>
                    <div class="linkSelect">
                        <Select
                            :items="linkSelect"
                            :show-first-item="false"
                            :is-menu="true"
                            name="heroSelect"
                            @changed="linkSelectChanged"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Select from '../Select.vue';
import TheHeroSlider from './TheHeroSlider.vue';
import ImageElement from './ImageElement.vue';
import { baseUrl } from '../../utils/config';
import { makeUrlRelative } from '../../utils/helpers';

export default {
    components: {
        Select,
        TheHeroSlider,
        ImageElement,
    },
    props: {
        heroSection: {
            type: Object,
            default: null,
        },
    },
    data: () => ({
        loaded: false,
    }),
    computed: {
        linkSelect() {
            const initial = [
                {
                    label: 'Vad kan vi hjälpa dig med?',
                    value: null,
                },
            ];
            const items = this.heroSection.linkList
                .map(item => ({
                    label: item.link.title,
                    value: item.link.url,
                }));

            return [...initial, ...items];
        },
    },
    mounted() {
        if (process.client) {
            this.loaded = true;
        }
    },
    methods: {
        linkSelectChanged(value) {
            if (!value) return;

            if (value.indexOf(baseUrl) !== -1) {
                const url = makeUrlRelative(value);
                this.$router.push(url);
            } else {
                window.location.href = value;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.heroSection {
    position: relative;
    overflow: hidden;
    padding-bottom: 160px;
    @media (max-width: 1900px) {
        padding-bottom: 100px;
    }
    @media ($largeDesktop) {
        padding-bottom: 140px;
    }
    @media ($largeTablet) {
        padding-bottom: 160px;
    }
    @media ($tablet) {
        overflow: visible;
        padding-bottom: 50px;
    }
}
.inner {
    display: flex;
    justify-content: space-between;
    position: relative;
    @media ($tablet) {
        flex-wrap: wrap;
    }
}
.left {
    width: 50%;
    @media ($tablet) {
        width: 100%;
        padding-bottom: 50px;
    }
    @media ($smallTablet) {
        padding-bottom: 80px;
    }
    @media ($mobile) {
        padding-bottom: 60px;
    }
}
.middle {
    position: absolute;
    left: 50%;
    top: 80px;
    width: 710px;
    margin-left: -355px;
    @media (max-width: 1900px) {
        width: 600px;
        margin-left: -300px;
    }
    @media ($largeDesktop) {
        top: 120px;
    }
    @media ($smallDesktop) {
        width: 550px;
        margin-left: -275px;
    }
    @media ($laptop) {
        width: 500px;
        margin-left: -300px;
    }
    @media ($largeTablet) {
        width: 475px;
        margin-left: -350px;
    }
    @media ($tablet) {
        width: 425px;
        left: auto;
        right: -50px;
        margin-left: 0;
        top: 80px;
    }
    @media ($smallTablet) {
        width: 350px;
        top: 140px;
    }
    @media ($mobile) {
        width: 250px;
        top: 20px;
        right: -30px;
    }
}
.right {
    width: 50%;
    margin-top: -#{$gutterHeroSlider * 2};
    padding-left: 177.5px;
    @media (max-width: 1900px) {
        padding-left: 200px;
    }
    @media ($smallDesktop) {
        padding-left: 0;
        justify-content: flex-end;
    }
    @media ($laptop) {
        margin-top: -#{$gutterHeroSliderLaptop * 2};
    }
    @media ($tablet) {
        width: 100%;
        margin-top: 0;
        justify-content: center;
    }
}
.rightInner {
    @media ($tablet) {
        width: 100%;
    }
}
.textHolder {
    width: 550px;
    max-width: 100%;
    margin-bottom: 47px;
    @media ($largeDesktop) {
        width: 500px;
    }
    @media ($smallDesktop) {
        width: 460px;
    }
    @media ($laptop) {
        width: 460px;
        margin-bottom: 35px;
    }
    @media ($largeTablet) {
        width: 380px;
    }
    @media ($tablet) {
        width: 500px;
        max-width: 100%;
        margin: 0 auto 35px;
    }
}
.heading {
    line-height: 1.2;
    margin-bottom: 27px;
    padding-left: 30px;
    padding-right: 20px;
    @media ($smallDesktop) {
        font-size: 36px;
    }
    @media ($largeTablet) {
        font-size: 40px;
    }
    @media ($tablet) {
        font-size: 38px;
        width: 400px;
        margin: 0 auto 25px;
    }
    @media ($smallTablet) {
        font-size: 32px;
        width: 350px;
    }
    @media ($mobile) {
        font-size: 28px;
        width: 280px;
        margin-bottom: 15px;
    }
}
.firstRow {
    transition: 0.5s 1.5s ease;
    transform: translateX(-150px);
    opacity: 0;
    .isLoaded & {
        transform: translateX(0);
        opacity: 1;
    }
}
.secondRow {
    transition: 0.5s 1.8s ease;
    transform: translateX(150px);
    opacity: 0;
    text-align: right;
    .isLoaded & {
        transform: translateX(0);
        opacity: 1;
    }
}
.preamble {
    text-align: center;
    opacity: 0;
    transition: 0.5s 1.8s ease;
    .isLoaded & {
        opacity: 1;
    }
    @media ($largeDesktop) {
        font-size: 18px;
    }
    @media ($smallDesktop) {
        font-size: 17px;
    }
    @media ($tablet) {
        font-size: 18px;
    }
    @media ($smallTablet) {
        font-size: 17px;
    }
    @media ($mobile) {
        font-size: 15px;
        padding: 0 15px;
    }
}
.linkSelect {
    width: 330px;
    margin: 0 auto;
    transition: 0.5s 1.9s ease;
    transform: scale(0);
    .isLoaded & {
        transform: scale(1);
    }
    @media ($smallDesktop) {
        width: 300px;
    }
    @media ($mobile) {
        width: 260px;
    }
}
</style>
