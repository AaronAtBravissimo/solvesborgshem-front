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
    position: relative;
    margin: 0 auto 52px;
    width: 220px;
    height: 220px;
    border-radius: 100%;
    border: 8px solid #f4f8fa;
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
