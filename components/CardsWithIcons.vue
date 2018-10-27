<template>
    <section class="cardsWithIcons">
        <div class="columns flex">
            <div
                v-for="(card, index) in columns"
                :key="index"
                class="column"
            >
                <CardWithIcon :card="card"/>
            </div>
        </div>
    </section>
</template>

<script>
import CardWithIcon from './CardWithIcon.vue';

export default {
    components: {
        CardWithIcon,
    },
    props: {
        columns: {
            type: Array,
            default: null,
        },
    },
};
</script>

<style lang="scss" scoped>
$gutter: 35px;
$gutterLaptop: 30px;
$gutterSmallTablet: 25px;

.cardsWithIcons {
    padding: 60px 80px;
    background-color: #fff;
    margin-bottom: 50px;
    box-shadow: 0 0 50px 0 rgba(13, 42, 56, 0.1);
}
.columns {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-left: -$gutter;
    margin-right: -$gutter;
    @media ($largeDesktop) {
        padding: 0 50px;
    }
    @media ($laptop) {
        margin-left: -$gutterLaptop;
        margin-right: -$gutterLaptop;
    }
    @media ($largeTablet) {
        margin-bottom: -50px;
    }
    @media ($smallTablet) {
        margin-left: -$gutterSmallTablet;
        margin-right: -$gutterSmallTablet;
    }
    @media ($smallerTablet) {
        margin-left: auto;
        margin-right: auto;
        width: 360px;
        max-width: 100%;
    }
    @media ($mobile) {
        margin-bottom: -30px;
    }
}
.column {
    width: 25%;
    padding: 0 $gutter;
    @media ($laptop) {
        padding: 0 $gutterLaptop;
    }
    @media ($largeTablet) {
        width: 50%;
        margin-bottom: 50px;
    }
    @media ($smallTablet) {
        padding: 0 $gutterSmallTablet;
    }
    @media ($smallerTablet) {
        width: 100%;
        padding: 0;
    }
    @media ($mobile) {
        margin-bottom: 30px;
    }
}
</style>
