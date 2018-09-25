<template>
    <section class="heroSection">
        <div class="inner">
            <div class="left">
                <TheHeroSlider
                    :slides="heroSection.slider"
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
                        @changed="linkSelectChanged"
                    />
                </div>
            </div>
        </div>
        <img
            class="leafs"
            src="../assets/images/leafs.png"
            alt="Löv"
        >
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

<style lang="css" scoped>
.heroSection {
    position: relative;
    margin-top: 46px;
    margin-bottom: 20px;
}
.inner {
    display: flex;
    justify-content: space-between;
}
.leafs {
    position: absolute;
    right: -50px;
    top: -4px;
}
.left {
    width: calc(100% - 550px);
}
.right {
    padding-right: 75px;
}
.textHolder {
    width: 550px;
    margin-top: 118px;
    margin-bottom: 47px;
}
.heading {
    line-height: 1.2;
    margin-bottom: 27px;
    padding-left: 30px;
    padding-right: 20px;
}
.secondRow {
    text-align: right;
}
.preamble {
    text-align: center;
}
.linkSelect {
    width: 330px;
    margin: 0 auto;
}
</style>
