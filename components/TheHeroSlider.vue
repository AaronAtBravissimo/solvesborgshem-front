<template>
    <div class="heroSlider">
        <div class="slides relative">
            <transition-group
                name="slide-fade"
                tag="div"
                class="backgroundHolder"
            >
                <div
                    v-for="(slide, index) in slides"
                    v-show="index === currentIndex"
                    :key="slide.id"
                    class="background"
                >
                    <img
                        :src="slide.sizes.large"
                        :alt="slide.alt"
                        class="backgroundImage objectFitCover"
                    >
                    <div class="imageOverlay"></div>
                </div>
            </transition-group>
            <img
                v-if="getRandomImage"
                :src="getRandomImage.sizes.large"
                class="slideImage"
            >
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
            currentIndex: 0,
            interval: false,
        };
    },
    computed: {
        getRandomImage() {
            const allImages = this.imageElements;
            if (allImages && allImages.length > 0) {
                const randomImage = allImages[
                    Math.floor(Math.random() * allImages.length)
                ];
                return randomImage;
            }
            return false;
        },
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

<style lang="scss" scoped>
$gutter: 40px;
$gutterLaptop: 20px;
$gutterMobile: 15px;

.slide-fade-enter-active {
  transition: 1s linear;
}

.slide-fade-enter-active .imageOverlay {
    transition: 1s linear;
}

.slide-fade-enter .imageOverlay {
    transform: translateX(0);
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
.slides {
    padding-right: 305px;
    @media ($largeDesktop) {
        padding-right: 200px;
    }
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
    height: 540px;
    position: relative;
    background-color: #fff;
    margin: $gutter;
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
.background{
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
.backgroundImage,
.imageOverlay {
    left: 0;
    top: 0;
}
.imageOverlay {
    transform: translateX(-100%);
    background-color: $primaryTextColor;
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
