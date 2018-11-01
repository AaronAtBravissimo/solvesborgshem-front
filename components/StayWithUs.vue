<template>
    <section class="stayWithUs">
        <div class="container">
            <div class="top">
                <h2 class="heading">{{ stayWithUs.heading }}</h2>
                <p class="preamble">{{ stayWithUs.preamble }}</p>
            </div>
        </div>
        <div class="columns">
            <div
                v-for="(card, index) in getCards"
                :key="index"
                class="column"
            >
                <CardWithIcon
                    :card="card"
                    :counter="index"
                />
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
    computed: {
        stayWithUs() {
            return this.$store.getters.options.stayWithUs;
        },
        getCards() {
            if (this.stayWithUs) {
                const { columns } = this.stayWithUs;
                for (let i = 0; i < columns.length; i++) {
                    columns[i].text = columns[i].content;
                }
                return columns;
            }
            return false;
        },
    },
};
</script>

<style lang="scss" scoped>
$gutter: 35px;
$gutterLaptop: 30px;
$gutterSmallTablet: 25px;

.stayWithUs {
    text-align: center;
    background-color: #fff;
    padding: 97px 0 114px;
    margin-left: -50px;
    margin-right: -50px;
    @media ($tablet) {
        padding: 90px 0;
    }
    @media ($smallTablet) {
        padding: 70px 0;
    }
    @media ($mobile) {
        padding: 50px 0;
    }
}
.top {
    margin-bottom: 60px;
    @media ($tablet) {
        margin-bottom: 50px;
    }
    @media ($smallTablet) {
        margin-bottom: 40px;
    }
    @media ($mobile) {
        margin-bottom: 30px;
    }
    .preamble {
        margin-top: 16px;
    }
}
.columns {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-left: -$gutter;
    margin-right: -$gutter;
    padding: 0px 150px;
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
