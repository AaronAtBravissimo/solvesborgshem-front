<template>
    <div class="heroSlider">
        <div class="slides">
            <div
                v-for="(slide, index) in slides"
                v-show="index === currentIndex"
                :key="index"
                class="slide relative"
            >
                <img
                    :src="slide.ordinaryImage.sizes.large"
                    :alt="slide.ordinaryImage.alt"
                    class="background"
                >
                <img
                    :src="slide.transparentImage.sizes.large"
                    :alt="slide.transparentImage.alt"
                    class="image"
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        slides: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            currentIndex: 0,
            interval: null,
        };
    },
    mounted() {
        this.start();
    },
    methods: {
        nextSlide() {
            if (this.currentIndex >= (this.slides.length - 1)) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
        },
        start() {
            this.interval = setInterval(() => this.nextSlide(), 4000);
        },
        stop() {
            clearInterval(this.interval);
        },
    },
};
</script>

<style lang="css" scoped>
.heroSlider {
    height: 700px;
}
.image {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
