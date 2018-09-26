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
                        <div class="background">
                            <img
                                :src="slide.ordinaryImage.sizes.large"
                                :alt="slide.ordinaryImage.alt"
                                class="backgroundImage objectFitCover"
                            >
                            <div class="buttons flex justify-center">
                                <button
                                    class="flex items-center justify-center"
                                    @click="prevHandler"
                                >
                                    <img
                                        class="buttonIcon prev"
                                        src="../assets/images/icon-arrow-right.svg"
                                        alt=""
                                    >
                                </button>
                                <button
                                    class="flex items-center justify-center"
                                    @click="pause"
                                >
                                    <img
                                        v-if="interval"
                                        class="buttonIcon pause"
                                        src="../assets/images/icon-pause.svg"
                                        alt=""
                                    >
                                    <img
                                        v-if="!interval"
                                        class="buttonIcon play"
                                        src="../assets/images/icon-play.svg"
                                        alt=""
                                    >
                                </button>
                                <button
                                    class="flex items-center justify-center"
                                    @click="nextHandler"
                                >
                                    <img
                                        class="buttonIcon next"
                                        src="../assets/images/icon-arrow-right.svg"
                                        alt=""
                                    >
                                </button>
                            </div>
                        </div>
                    </div>
                    <img
                        :src="slide.transparentImage.sizes.large"
                        :alt="slide.transparentImage.alt"
                        class="slideImage objectFitCovere"
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
.slide-fade-leave-active {
    opacity: 0;
    display: none;
}
.slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
}
.heroSlider {
    height: 700px;
}
.slideImage {
    position: absolute;
    right: -142px;
    top: 13px;
}
.backgroundHolder {
    width: 100%;
    padding-right: 305px;
    height: 540px;
    position: relative;
    margin: 40px;
}
.background {
    background-color: #fff;
}
.background,
.backgroundImage {
    position: relative;
    width: 100%;
    height: 100%;
}
.backgroundImage {
    left: -40px;
    top: -40px;
    position: absolute;
}
.buttons {
    position: absolute;
    left: 0;
    bottom: 0;
    width: calc(100% - 40px);
}
.buttonIcon {
    width: 40px;
}
.prev {
    transform: rotate(0.5turn);
}
.pause,
.play {
    width: 32px;
}
</style>
