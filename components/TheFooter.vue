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
.mainFooter {
    margin-top: 22px;
    /deep/ p {
        font-size: 16px;
        line-height: 1.63;
    }
    .openingHoursText {
        font-size: 20px;
        line-height: 1.6;
        color: #a1a1a1;
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
}
.topInner {
    display: flex;
    justify-content: space-between;
}
.topLeft {
    flex-shrink: 0;
}
.topRight {
    width: 550px;
    flex-shrink: 1;
    text-align: right;
    margin-top: 10px;
}
.bottom {
    margin-top: -8px;
}
.bottomInner {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.bottomLeft {
    flex-shrink: 1;
}
.logoHolder {
    width: 378px;
    height: 44px;
    position: relative;
    margin-bottom: 25px;
}
.quoteText {
    font-size: 30px;
    line-height: 1.5;
    letter-spacing: 5.9px;
    margin-right: -7px;
    margin-bottom: 18px;
    color: #fff;
}
.descriptionText {
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
