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
                v-for="(step, index) in stayWithUs.columns"
                :key="index"
                class="column"
            >
                <div class="step">
                    <div class="iconHolder">
                        <img
                            :src="getIcon(step.icon)"
                            :class="`${step.icon}`"
                            class="icon"
                        >
                        <div class="stepNumber">
                            {{ index + 1 }}
                        </div>
                    </div>
                    <h4 class="stepHeading">{{ step.heading }}</h4>
                    <p class="stepText">{{ step.content }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import person from '../assets/images/icon-person.svg';
import thumbUp from '../assets/images/icon-thumbs-up.svg';
import house from '../assets/images/icon-house.svg';
import checklist from '../assets/images/icon-checklist.svg';

export default {
    props: {
        heading: {
            type: String,
            default: null,
        },
        steps: {
            type: Array,
            default: null,
        },
    },
    computed: {
        stayWithUs() {
            return this.$store.getters.options.stayWithUs;
        },
    },
    methods: {
        getIcon(icon) {
            const icons = {
                person,
                thumbUp,
                house,
                checklist,
            };
            return icons[icon];
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
.iconHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 auto 52px;
    width: 220px;
    height: 220px;
    padding-bottom: 10px;
    border-radius: 100%;
    border: 8px solid #f4f8fa;
    @media ($laptop) {
        width: 200px;
        height: 200px;
    }
    @media ($smallTablet) {
        width: 180px;
        height: 180px;
        border-width: 5px;
    }
    @media ($smallerTablet) {
        width: 160px;
        height: 160px;
        margin-bottom: 30px;
    }
    @media ($mobile) {
        width: 140px;
        height: 140px;
    }
}
.icon {
    &.person {
        width: 37px;
        height: 78px;
        @media ($smallTablet) {
            width: 27px;
            height: 58px;
        }
        @media ($mobile) {

        }
    }
    &.thumbUp {
        width: 66px;
        height: 66px;
        @media ($smallTablet) {
            width: 56px;
            height: 56px;
        }
        @media ($mobile) {
            width: 46px;
            height: 46px;
        }
    }
    &.house {
        width: 76px;
        height: 82px;
        @media ($smallTablet) {
            width: 58px;
            height: 62px;
        }
        @media ($mobile) {
            width: 50px;
            height: 54px;
        }
    }
    &.checklist {
        width: 55px;
        height: 79px;
        @media ($smallTablet) {
            width: 45px;
            height: 64px;
        }
        @media ($mobile) {
            width: 38px;
            height: 54px;
        }
    }
}
.stepHeading {
    margin-bottom: 16px;
}
.stepText {
    font-size: 16px;
    line-height: 1.65;
    @media ($mobile) {
        font-size: 14px;
    }
}
.stepNumber {
    position: absolute;
    left: 50%;
    top: 100%;
    width: 40px;
    height: 40px;
    margin-left: -20px;
    margin-top: -18px;
    background-color: $primaryColor;
    color: #ffffff;
    border-radius: 100%;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    @media ($mobile) {
        width: 30px;
        height: 30px;
        margin-left: -15px;
        margin-top: -13px;
        font-size: 15px;
    }
}

</style>
