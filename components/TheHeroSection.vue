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
import TheHeroSlider from './TheHeroSlider.vue';

export default {
    components: {
        TheHeroSlider,
    },
    props: {
        heroSection: {
            type: Object,
            default: null,
        },
    },
};
</script>

<style lang="css" scoped>
.heroSection {
    position: relative;
    margin-top: 46px;
    margin-bottom: 60px;
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
    width: 1100px;
}
.right {
    padding-right: 75px;
}
.textHolder {
    width: 550px;
    margin-top: 118px;
    margin-bottom: 45px;
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
</style>
