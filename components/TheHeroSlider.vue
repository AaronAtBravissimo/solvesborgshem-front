<template>
    <div class="heroSlider">
        <div class="slides relative">
            <transition-group
                name="fade"
                tag="div"
                class="backgroundHolder"
            >
                <div
                    v-for="(slide, index) in slides"
                    v-show="index === currentIndex"
                    :key="index"
                    class="background"
                >
                    <img
                        :src="slide.sizes.large"
                        :alt="slide.alt"
                        class="backgroundImage objectFitCover"
                    >
                </div>
            </transition-group>
            <div class="imageOverlay"></div>
            <div class="slideImageHolder">
                <no-ssr>
                    <img
                        v-show="imageElement"
                        :src="imageElement.sizes.large"
                        :alt="imageElement.alt"
                        class="slideImage"
                    >
                </no-ssr>
            </div>
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
</template>

<script>
export default {
    props: {
        slides: {
            type: Array,
            required: true,
        },
        imageElements: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            imageElement: false,
            currentIndex: 0,
            interval: false,
            duration: 6000,
            transDuration: 1000,
        };
    },
    mounted() {
        this.start();
    },
    created() {
        this.setImageElement();
    },
    methods: {
        setImageElement() {
            if (this.imageElements && this.imageElements.length > 1) {
                const rand = Math.floor(Math.random() * this.imageElements.length);
                this.imageElement = this.imageElements[rand];
            }
        },
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
            this.interval = setInterval(() => {
                this.beforeNext();
            }, this.duration);
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
        beforeNext() {
            setTimeout(() => {
                this.nextSlide();
            }, this.transDuration);
        },
    },
};
</script>

<style lang="scss" scoped>
$gutter: 40px;
$gutterLaptop: 20px;
$gutterMobile: 15px;

.fade-enter-active, .fade-leave-active {
  transition: all 1s ease;
  visibility: visible;
  opacity: 1;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  visibility: hidden;
}

.heroSlider {
    height: 700px;
    @media ($largeDesktop) {
        height: 650px;
    }
    @media ($laptop) {
        width: calc(100% + 30px);
        height: 550px;
    }
    @media ($largeTablet) {
        width: calc(100% + 50px);
        height: 500px;
    }
    @media ($tablet) {
        width: 100%;
        height: auto;
    }
}
.slides {
    padding-right: 200px;
    @media ($smallDesktop) {
        padding-right: 100px;
    }
    @media ($mediumTablet) {
        padding-right: $gutterLaptop;
    }
    @media ($mobile) {
        padding-right: $gutterMobile;
    }
}
.slideImageHolder {
    position: absolute;
    right: 0;
    top: 13px;
    opacity: 0;
    transform: translateY(-50px);
    transition: 0.75s 2.1s ease;
    .isLoaded & {
        opacity: 1;
        transform: translateY(0);
    }
    @media ($largeDesktop) {
        top: 0;
        width: 650px;
    }
    @media ($smallDesktop) {
        top: 30px;
        width: 600px;
    }
    @media ($laptop) {
        right: 30px;
        top: 50px;
        width: 520px;
    }
    @media ($largeTablet) {
        width: 450px;
    }
    @media ($tablet) {
        right: 0;
        width: 425px;
    }
    @media ($smallTablet) {
        right: -30px;
        top: 75px;
        width: 350px;
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
    height: 540px;
    position: relative;
    background-color: transparentize(#ffffff, 1);
    box-shadow: 0 0 50px 0 rgba(13, 42, 56, 0);
    margin: $gutter;
    transition: 0.75s 0.6s ease;
    .isLoaded & {
        background-color: transparentize(#ffffff, 0);
        box-shadow: $primaryShadow;
    }
    @media ($largeDesktop) {
        height: 500px;
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
    }
    @media ($mobile) {
        height: 250px;
        margin: $gutterMobile;
    }
}
.background,
.backgroundImage,
.imageOverlay {
    position: absolute;
    width: 100%;
    height: 100%;
}
.imageOverlay,
.background {
    left: -$gutter;
    top: -$gutter;
    @media ($laptop) {
        left: -$gutterLaptop;
        top: -$gutterLaptop;
    }
    @media ($mobile) {
        left: -$gutterMobile;
        top: -$gutterMobile;
    }
}
.backgroundImage, {
    left: 0;
    top: 0;
}
.imageOverlay {
    width: calc(100% - 200px);
    left: 0;
    top: -$gutter;
    background-color: #f4f8fa;
    transition: 0.75s 0s cubic-bezier(0.77, 0.02, 0.58, 1);
    .isLoaded & {
        transform: translateX(-100%);
    }
    @media ($smallDesktop) {
        width: calc(100% - 100px);
    }
    @media ($laptop) {
        top: -$gutterLaptop;
    }
    @media ($mediumTablet) {
        width: calc(100% - 20px);
    }
    @media ($mobile) {
        top: -15px;
        width: calc(100% - 15px);
    }
}
.buttons {
    position: absolute;
    left: $gutter;
    bottom: 0px;
    height: 40px;
    opacity: 0;
    transition: 0.5s 0.9s ease;
    @media ($laptop) {
        left: $gutterLaptop;
        bottom: -40px;
    }
    @media ($mobile) {
        display: none;
    }
    .isLoaded & {
        opacity: 1;
    }
}
.buttonIcon {
    width: 24px;
}
.prev {
    transform: rotate(0.5turn);
}
.pause,
.play {
    width: 22px;
}

</style>
