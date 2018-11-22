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
            <div class="buttons flex justify-center">
                <button
                    aria-label="Bläddra vänster i bildspelet"
                    class="flex items-center justify-center"
                    @click="prevHandler"
                >
                    <img
                        class="buttonIcon prev"
                        src="../../assets/images/icon-arrow-right.svg"
                        alt=""
                    >
                </button>
                <button
                    :aria-label="interval ? 'Pausa bildspelet' : 'Spela bildspelet'"
                    class="flex items-center justify-center"
                    @click="pause"
                >
                    <img
                        v-if="interval"
                        class="buttonIcon pause"
                        src="../../assets/images/icon-pause.svg"
                        alt=""
                    >
                    <img
                        v-if="!interval"
                        class="buttonIcon play"
                        src="../../assets/images/icon-play.svg"
                        alt=""
                    >
                </button>
                <button
                    aria-label="Bläddra höger i bildspelet"
                    class="flex items-center justify-center"
                    @click="nextHandler"
                >
                    <img
                        class="buttonIcon next"
                        src="../../assets/images/icon-arrow-right.svg"
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
        // this.start();
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
    height: auto;
    width: calc(100% - #{$gutterHeroSlider});
    @media ($laptop) {
        width: calc(100% + #{$gutterHeroSliderLaptop});
    }
    @media ($tablet) {
        width: calc(100% - 175px);
    }
    @media ($mediumTablet) {
        width: calc(100% - 120px);
    }
    @media ($mobile) {
        width: calc(100% - #{$gutterHeroSliderMobile});
    }
}
.backgroundHolder {
    width: 100%;
    height: 540px;
    position: relative;
    background-color: transparentize(#ffffff, 1);
    box-shadow: 0 0 50px 0 rgba(13, 42, 56, 0);
    margin: $gutterHeroSlider;
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
        margin: $gutterHeroSliderLaptop;
    }
    @media ($largeTablet) {
        height: 400px;
    }
    @media ($mediumTablet) {
        height: 375px;
    }
    @media ($mobile) {
        height: 230px;
        margin: $gutterHeroSliderMobile;
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
    left: -$gutterHeroSlider;
    top: -$gutterHeroSlider;
    @media ($laptop) {
        left: -$gutterHeroSliderLaptop;
        top: -$gutterHeroSliderLaptop;
    }
    @media ($mobile) {
        left: -$gutterHeroSliderMobile;
        top: -$gutterHeroSliderMobile;
    }
}
.backgroundImage, {
    left: 0;
    top: 0;
}
.imageOverlay {
    left: 0;
    top: -$gutterHeroSlider;
    background-color: #f4f8fa;
    transition: 0.75s 0s cubic-bezier(0.77, 0.02, 0.58, 1);
    .isLoaded & {
        transform: translateX(-100%);
    }
    @media ($laptop) {
        top: -$gutterHeroSliderLaptop;
    }
    @media ($mobile) {
        top: -15px;
    }
}
.buttons {
    position: absolute;
    left: $gutterHeroSlider;
    bottom: 0px;
    height: 40px;
    opacity: 0;
    transition: 0.5s 0.9s ease;
    @media ($laptop) {
        left: $gutterHeroSliderLaptop;
        bottom: -40px;
    }
    @media ($mobile) {
        left: 0;
        width: 100%;
        bottom: -180px;
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
