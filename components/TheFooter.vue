<template>
    <footer class="mainFooter">
        <div class="graphicHolder">
            <img
                class="graphic"
                src="../assets/images/footer.svg"
                alt="Grafiskt element"
            >
        </div>
        <div class="inner">
            <div class="top">
                <div class="top__inner">
                    <div class="top__left">
                        <div class="logoHolder flex-no-shrink">
                            <Logo white-color/>
                        </div>
                    </div>
                    <div class="top__right">
                        <h4 class="quoteText">Flytta in. Andas ut.</h4>
                    </div>
                </div>
            </div>
            <div class="middle">
                <div class="middle__inner">
                    <div class="middle__left">
                        <p class="openingHoursText">
                            {{ footerData.openingHours }}
                        </p>
                    </div>
                    <div class="middle__right">
                        <p class="descriptionText">
                            {{ footerData.businessDescription }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="bottom__inner">
                    <div class="bottom__left">
                        <div class="columns">
                            <div
                                v-for="(column, index) in footerData.columns"
                                :key="index"
                                class="column"
                            >
                                <div class="widget">
                                    <p class="widget__heading">{{ column.heading }}</p>
                                    <div
                                        v-if="column.content"
                                        class="widget__body"
                                        v-html="column.content"
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom__right">

                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import Logo from './Logo.vue';

export default {
    components: {
        Logo,
    },
    data() {
        return {
        };
    },
    computed: {
        footerData() {
            return this.$store.getters.options.footer;
        },
    },
};
</script>

<style lang="scss" scoped>
/deep/ p {
    font-size: 16px;
    line-height: 1.63;
}
.mainFooter {
    margin-top: 22px;
}
.graphicHolder {
    line-height: 0;
}
.graphic {
    width: calc(100% + 50px);
    max-width: none;
    margin-left: -25px;
}
.inner {
    background-color: #232323;
    padding: 0 100px 100px;
    margin-top: -132px;
}
.top {
    margin-bottom: 24px;
    &__inner {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
}
.middle {
    &__inner {
        display: flex;
        justify-content: space-between;
    }
    &__left {
        width: 50%;
    }
    &__right {
        width: 550px;
        text-align: right
    }
}
.bottom {
    margin-top: -8px;
}
.logoHolder {
    width: 378px;
    height: 44px;
    position: relative;
}
.quoteText {
    font-size: 30px;
    line-height: 1.5;
    letter-spacing: 5.9px;
    margin-right: -7px;
    margin-bottom: -11px;
    color: #fff;
}
.openingHoursText {
    font-size: 20px;
    line-height: 1.6;
    color: #a1a1a1;
}
.descriptionText {
    margin-top: 6px;
    color: #a1a0a0;
}
.columns {
    display: flex;
    margin-left: -40px;
    margin-right: -40px;
}
.column {
    padding: 0 40px;
    border-right: 1px solid #a1a0a0;
    &:last-child {
        border-right: 0;
    }
}
.widget {
    &__heading {
        font-weight: bold;
        color: $primaryColor;
        margin-bottom: 0;
    }
    &__body {
        color: #ffffff;
    }
    /deep/ a:hover {
        color: $primaryColor;
    }
}
</style>
