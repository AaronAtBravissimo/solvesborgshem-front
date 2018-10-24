<template>
    <div
        class="pswp"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
    >
        <div class="pswp__bg"></div>

        <div class="pswp__scroll-wrap">

            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>

            <div class="pswp__ui pswp__ui--hidden">

                <div class="pswp__top-bar">

                    <div class="pswp__counter"></div>

                    <button
                        class="pswp__button pswp__button--close"
                        title="Close (Esc)">
                    </button>

                    <button
                        class="pswp__button pswp__button--share"
                        title="Share">
                    </button>

                    <button
                        class="pswp__button pswp__button--fs"
                        title="Toggle fullscreen">
                    </button>

                    <button
                        class="pswp__button pswp__button--zoom"
                        title="Zoom in/out">
                    </button>

                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div>

                <button
                    class="pswp__button pswp__button--arrow--left"
                    title="Previous (arrow left)">
                </button>

                <button
                    class="pswp__button pswp__button--arrow--right"
                    title="Next (arrow right)">
                </button>

                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>

            </div>

        </div>

    </div>
</template>

<style lang="scss">
.pswp__bg {
    background: #000000 !important;
}

.pswp__ui--fit .pswp__top-bar,
.pswp__ui--fit .pswp__caption,
.pswp__top-bar,
.pswp__caption {
    background-color: $primaryColor !important;
}

.pswp__caption__center {
    width: 100%;
    max-width: calc(100% - 30px);
}

.pswp__caption__center {
    text-align: center;
    font-size: 18px;
    line-height: 1.3;
}

.pswp__button--arrow--left::before,
.pswp__button--arrow--right::before {
    border-radius: 100%;
    width: 40px;
    height: 40px;
    top: 50%;
    margin-top: -20px;
    background: url("../assets/images/icon-arrow-white.svg") no-repeat center center !important;
    background-size: 18px !important;
    background-color: $primaryColor !important;
}

.pswp__button--arrow--left::before {
    transform: rotate(180deg);
}

.pswp__button--arrow--right::before {
    right: 12px;
}

.pswp__button--arrow--left::before {
    left: 12px;
}

.pswp .pswp__top-bar .pswp__button {
    background-image: url("../assets/images/photoswipe-skin.svg") !important;
}
</style>
