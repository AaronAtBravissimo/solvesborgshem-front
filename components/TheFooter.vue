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
                <div class="topInner">
                    <div class="topLeft">
                        <div class="logoHolder flex-no-shrink">
                            <Logo white-color/>
                        </div>
                        <p class="openingHoursText">
                            {{ footerData.openingHours }}
                        </p>
                    </div>
                    <div class="topRight">
                        <h4 class="quoteText">Flytta in. Andas ut.</h4>
                        <p class="descriptionText">
                            {{ footerData.businessDescription }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="bottomInner">
                    <div class="bottomLeft">
                        <div class="columns">
                            <div
                                v-for="(column, index) in footerData.columns"
                                :key="index"
                                class="column"
                            >
                                <div class="widget">
                                    <p class="widgetHeading">{{ column.heading }}</p>
                                    <div
                                        v-if="column.content"
                                        class="widgetBody"
                                        v-html="column.content"
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottomRight">
                        <div class="socialIcons">
                            <SocialIcon
                                :link="footerData.facebook"
                                icon="facebook"
                            />
                            <SocialIcon
                                :link="footerData.instagram"
                                icon="instagram"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import Logo from './Logo.vue';
import SocialIcon from './SocialIcon.vue';

export default {
    components: {
        Logo,
        SocialIcon,
    },
    computed: {
        footerData() {
            return this.$store.getters.options.footer;
        },
    },
};
</script>

<style lang="scss" scoped>
$columnsGutter: 40px;
$columnsGutterTablet: 30px;

.mainFooter {
    margin-top: 22px;
    /deep/ p {
        font-size: 16px;
        line-height: 1.63;
        @media ($tablet) {
            font-size: 15px;
        }
        @media ($mobile) {
            font-size: 14px;
        }
    }
    .openingHoursText {
        font-size: 20px;
        line-height: 1.6;
        color: #a1a1a1;
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
    /deep/ a:focus {
        outline: 2px solid #fff;
    }
}
.graphicHolder {
    line-height: 0;
    overflow: hidden;
}
.graphic {
    width: calc(100% + 50px);
    max-width: none;
    margin-left: -25px;
}
.inner {
    background-color: #232323;
    padding: 0 100px 95px;
    margin-top: -132px;
    @media ($largeDesktop) {
        margin-top: -100px;
    }
    @media ($smallDesktop) {
        padding: 0 50px 95px;
    }
    @media ($laptop) {
        margin-top: -75px;
        padding: 0 50px 70px;
    }
    @media ($largeTablet) {
        margin-top: -50px;
    }
    @media ($tablet) {
        margin-top: -30px;
        padding: 0 30px 50px;
    }
    @media ($smallTablet) {
        margin-top: -10px;
        padding: 0 30px 40px;
    }
    @media ($mobile) {
        margin-top: -5px;
        padding: 0 15px 30px;
    }
}
.topInner {
    display: flex;
    justify-content: space-between;
    @media ($largeTablet) {
        flex-wrap: wrap;
    }
}
.topLeft {
    flex-shrink: 0;
    @media ($largeTablet) {
        flex-shrink: 1;
    }
}
.topRight {
    width: 550px;
    flex-shrink: 1;
    text-align: right;
    margin-top: 10px;
    @media ($laptop) {
        margin-top: 0;
    }
    @media ($largeTablet) {
        width: 100%;
        max-width: 550px;
        text-align: left;
        margin-top: 20px;
    }
}
.bottom {
    margin-top: -8px;
    @media ($smallDesktop) {
        margin-top: 30px;
    }
}
.bottomInner {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    @media ($largeTablet) {
        flex-wrap: wrap;
    }
}
.bottomLeft {
    flex-shrink: 1;
    @media ($largeTablet) {
        width: 100%;
        margin-bottom: 20px;
    }
    @media ($smallerTablet) {
        margin-bottom: 30px;
    }
}
.logoHolder {
    width: 378px;
    height: 44px;
    position: relative;
    margin-bottom: 25px;
    @media ($tablet) {
        width: 325px;
        height: 38px;
    }
    @media ($smallTablet) {
        width: 300px;
        height: 35px;
    }
    @media ($mobile) {
        width: 275px;
        height: 32px;
    }
    @media (max-width: 350px) {
        width: 250px;
        height: 30px;
    }
}
.quoteText {
    font-size: 30px;
    line-height: 1.5;
    letter-spacing: 5.9px;
    margin-right: -7px;
    margin-bottom: 18px;
    color: #fff;
    @media ($tablet) {
        font-size: 26px;
        letter-spacing: 5px;
        margin-bottom: 15px;
        margin-right: 0;
    }
    @media ($smallTablet) {
        font-size: 24px;
    }
    @media ($mobile) {
        font-size: 22px;
        letter-spacing: 3px;
    }
    @media (max-width: 350px) {
        font-size: 20px;
        letter-spacing: 2.5px;
    }
}
.descriptionText {
    color: #a1a0a0;
}
.columns {
    display: flex;
    margin-left: -$columnsGutter;
    margin-right: -$columnsGutter;
    @media ($tablet) {
        margin-left: -$columnsGutterTablet;
        margin-right: -$columnsGutterTablet;
    }
    @media ($mediumTablet) {
        flex-wrap: wrap;
        margin-bottom: -20px;
    }
}
.column {
    padding: 0 $columnsGutter;
    border-right: 1px solid #a1a0a0;
    @media ($tablet) {
        padding: 0 $columnsGutterTablet;
    }
    @media ($mediumTablet) {
        width: 50%;
        margin-bottom: 20px;
        border: 0;
    }
    @media ($smallerTablet) {
        width: 100%;
    }
    &:last-child {
        border-right: 0;
    }
}
.widget {
    /deep/ a:hover {
        color: $primaryColor;
    }
}
.widgetHeading {
    font-weight: bold;
    color: $primaryColor;
    margin-bottom: 0;
}
.widgetBody {
    color: #ffffff;
}
.socialIcons {
    display: flex;
}
</style>
