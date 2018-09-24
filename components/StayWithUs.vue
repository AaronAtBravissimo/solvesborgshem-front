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
                            :class="`icon--${step.icon}`"
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

.stayWithUs {
    text-align: center;
    background-color: #fff;
    padding: 97px 0 114px;
    margin-left: -50px;
    margin-right: -50px;
}
.top {
    margin-bottom: 60px;
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
}
.column {
    width: 25%;
    padding: 0 $gutter;
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
}
.icon {
    &--person {
        width: 37px;
        height: 78px;
    }
    &--thumbUp {
        width: 66px;
        height: 66px;
    }
    &--house {
        width: 76px;
        height: 82px;
    }
    &--checklist {
        width: 55px;
        height: 79px;
    }
}
.stepHeading {
    margin-bottom: 16px;
}
.stepText {
    font-size: 16px;
    line-height: 1.65;
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
}

</style>
