<template>
    <div class="heroSlider">
        <div class="slides">
            <transition-group
                name="slide-fade"
                tag="div"
            >
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
                            <div class="imageOverlay"></div>
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
            this.interval = setInterval(() => this.nextSlide(), 6000);
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

<style lang="scss" scoped>
$gutter: 40px;
$gutterLaptop: 20px;
$gutterMobile: 15px;

.slide-fade-enter-active {
    .slideImage {
        transform: translateY(0);
    }
}
.slide-fade-leave-active {
    display: none;
}
.slide-fade-enter,
.slide-fade-leave-active {
    .slideImage {
        transform: translateY(-10px);
        opacity: 0;
    }
    .imageOverlay {
        left: 0;
    }
    .backgroundImage {
        opacity: 0;
    }
}
.heroSlider {
    height: 700px;
    @media ($laptop) {
        width: calc(100% + 30px);
    }
    @media ($largeTablet) {
        width: calc(100% + 50px);
    }
    @media ($tablet) {
        width: 100%;
        height: auto;
    }
}
.slideImage {
    position: absolute;
    right: 0;
    top: 13px;
    transition: 0.5s 1s;
    @media ($largeDesktop) {
        right: -50px;
        top: 0;
        width: 650px;
    }
    @media ($smallDesktop) {
        top: 30px;
        width: 600px;
    }
    @media ($laptop) {
        top: 50px;
        width: 520px;
    }
    @media ($largeTablet) {
        right: 0;
        width: 450px;
    }
    @media ($tablet) {
        width: 425px;
    }
    @media ($mobile) {
        right: 50%;
        margin-right: -140px;
        top: 30px;
        width: 280px;
    }
}
.backgroundHolder {
    width: 100%;
    padding-right: 305px;
    height: 540px;
    position: relative;
    margin: $gutter;
    transition: 0.5s 0.5s;
    overflow: hidden;
    @media ($largeDesktop) {
        padding-right: 200px;
        height: 500px;
    }
    @media ($smallDesktop) {
        padding-right: 100px;
    }
    @media ($laptop) {
        height: 450px;
        margin: $gutterLaptop;
    }
    @media ($largeTablet) {
        height: 400px;
    }
    @media ($mediumTablet) {
        height: 375px;
        padding-right: $gutterLaptop;
    }
    @media ($mobile) {
        height: 250px;
        margin: $gutterMobile;
        padding-right: $gutterMobile;
    }
}
.background {
    background-color: #fff;
}
.backgroundImage {
    opacity: 1;
}
.background,
.backgroundImage {
    position: relative;
    width: 100%;
    height: 100%;
}
.imageOverlay {
    transition: 0.5s linear;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #5a5450;
    opacity: 1;
}
.backgroundImage,
.imageOverlay {
    left: -$gutter;
    top: -$gutter;
    position: absolute;
    @media ($laptop) {
        left: -$gutterLaptop;
        top: -$gutterLaptop;
    }
    @media ($mobile) {
        left: -$gutterMobile;
        top: -$gutterMobile;
    }
}
.imageOverlay {
    left: -100%;
}
.buttons {
    position: absolute;
    left: 0;
    bottom: 0;
    width: calc(100% - #{$gutter});
    display: none;
    @media ($smallDesktop) {
        justify-content: flex-start;
    }
    @media ($laptop) {
        width: calc(100% - #{$gutterLaptop});
        display: none; // NOTE: Plocka fram sedan och lägg där det passar bäst
    }
    @media ($mobile) {
        width: calc(100% - #{$gutterMobile});
    }
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
