<template>
    <div class="heroSlider">
        <div class="slides">
            <transition-group name="slide-fade">
                <div
                    v-for="(slide, index) in slides"
                    v-show="index === currentIndex"
                    :key="index"
                    class="slide relative"
                >
                    <div class="backgroundHolder">
                        <img
                            :src="slide.ordinaryImage.sizes.large"
                            :alt="slide.ordinaryImage.alt"
                            class="background"
                        >
                        <div class="buttons">
                            <button @click="prevHandler">prev</button>
                            <button @click="pause">pause</button>
                            <button @click="nextHandler">next</button>
                        </div>
                    </div>
                    <img
                        :src="slide.transparentImage.sizes.large"
                        :alt="slide.transparentImage.alt"
                        class="image"
                    >
                </div>
            </transition-group>
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
            interval: false,
        };
    },
    mounted() {
        this.start();
    },
    methods: {
        prevSlide() {
            if (this.currentIndex !== 0) {
                this.currentIndex--;
            } else {
                this.currentIndex = this.slides.length - 1;
            }
        },
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
            this.interval = false;
        },
        restartInterval() {
            if (this.interval) {
                this.stop();
                this.start();
            }
        },
        prevHandler() {
            this.restartInterval();
            this.prevSlide();
        },
        pause() {
            if (this.interval) {
                this.stop();
            } else {
                this.start();
            }
        },
        nextHandler() {
            this.restartInterval();
            this.nextSlide();
        },
    },
};
</script>

<style lang="css" scoped>
.slide-fade-enter-active {
    transition: all 1s ease;
}
.slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
}
.heroSlider {
    height: 700px;
    overflow: hidden;
}
.image {
    position: absolute;
    top: 0;
    right: 0;
}
.backgroundHolder {
    width: 789px;
    height: 540px;
    position: relative;
    margin: 40px;
    background-color: #fff;
}
.background {
    position: absolute;
    top: -40px;
    left: -40px;
    width: 100%;
    height: 100%;
}
.buttons {
    position: absolute;
    left: 0;
    bottom: 0;
}
</style>
