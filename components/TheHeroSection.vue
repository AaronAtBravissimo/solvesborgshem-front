<template>
    <section
        :class="{'isLoaded': loaded}"
        class="heroSection"
    >
        <div class="inner">
            <div class="left">
                <TheHeroSlider
                    :slides="heroSection.slider.ordinaryImages"
                    :image-elements="heroSection.slider.transparentImages"
                />
            </div>
            <div class="right">
                <div class="textHolder">
                    <h1 class="heading">
                        <div class="firstRow">{{ heroSection.heading.firstRow }}</div>
                        <div class="secondRow">{{ heroSection.heading.secondRow }}</div>
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
                        name="heroSelect"
                        @changed="linkSelectChanged"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Select from './Select.vue';
import TheHeroSlider from './TheHeroSlider.vue';
import { baseUrl } from '../utils/config';
import { makeUrlRelative } from '../utils/helpers';

export default {
    components: {
        Select,
        TheHeroSlider,
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
    margin-top: 46px;
    overflow: hidden;
    padding-bottom: 20px;
    @media ($tablet) {
        margin-top: 0;
        overflow: visible;
        padding-bottom: 50px;
    }
}
.inner {
    display: flex;
    justify-content: space-between;
    @media ($tablet) {
        flex-wrap: wrap;
    }
}
.left {
    flex-grow: 1;
    overflow: hidden;
    @media ($tablet) {
        padding-bottom: 50px;
    }
}
.right {
    padding-right: 75px;
    @media ($largeDesktop) {
        padding-right: 0;
    }
    @media ($tablet) {
        width: 100%;
    }
}
.textHolder {
    width: 550px;
    margin-top: 118px;
    margin-bottom: 47px;
    @media ($largeDesktop) {
        width: 500px;
    }
    @media ($smallDesktop) {
        width: 490px;
    }
    @media ($laptop) {
        width: 460px;
        margin-top: 55px;
        margin-bottom: 35px;
    }
    @media ($largeTablet) {
        width: 380px;
        margin-top: 40px;
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
        width: 300px;
    }
}
.firstRow {
    transition: 0.5s 0.9s ease;
    transform: translateX(-150px);
    opacity: 0;
    .isLoaded & {
        transform: translateX(0);
        opacity: 1;
    }
}
.secondRow {
    transition: 0.5s 1.2s ease;
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
    transition: 0.5s 1.5s ease;
    .isLoaded & {
        opacity: 1;
    }
    @media ($largeDesktop) {
        font-size: 18px;
    }
    @media ($laptop) {
        font-size: 17px;
    }
    @media ($tablet) {
        font-size: 18px;
    }
    @media ($smallTablet) {
        font-size: 17px;
    }
    @media ($mobile) {
        font-size: 16px;
    }
}
.linkSelect {
    width: 330px;
    margin: 0 auto;
    transition: 0.5s 1.8s ease;
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
