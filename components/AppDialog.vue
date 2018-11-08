<template>
    <transition name="dialog">
        <div
            :aria-labelledby="dialogId"
            class="dialog"
            role="dialog"
            @click="clickOutSide"
        >
            <div
                ref="first"
                tabindex="0">
            </div>
            <div class="wrapper">
                <div class="outer">
                    <div class="holder">
                        <div
                            ref="dialog"
                            class="inner"
                            tabindex="-1"
                        >
                            <div class="overflow-hidden mb-8">
                                <div class="header">
                                    <h3
                                        :id="dialogId"
                                        class="heading"
                                    >
                                        {{ heading }}
                                    </h3>
                                    <button
                                        ref="close"
                                        type="button"
                                        class="close"
                                        aria-label="Stäng denna rutan"
                                        @click="close()">
                                    </button>
                                </div>
                                <div class="body content">
                                    <div v-html="content"></div>
                                    <button
                                        ref="innerClose"
                                        type="button"
                                        class="innerClose"
                                        @click="close()"
                                    >
                                        <div class="innerCloseText">
                                            Stäng denna rutan
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref="last"
                tabindex="0">
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        heading: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        dialogId: {
            type: String,
            required: true,
        },
        focusOnClose: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            open: true,
        };
    },
    mounted() {
        document.body.classList.add('overflow-hidden');
        document.addEventListener('focus', this.trapFocus, true);
        document.addEventListener('keydown', this.keyListener);
        this.$refs.dialog.focus();
    },
    destroyed() {
        document.body.classList.remove('overflow-hidden');
        document.removeEventListener('focus', this.trapFocus, true);
        document.addEventListener('keydown', this.keyListener);
    },
    methods: {
        keyListener(event) {
            if (event.keyCode === 27) { // escape
                this.close();
            }
        },
        trapFocus(event) {
            if (event.target === this.$refs.last) {
                this.$refs.close.focus();
            } else if (event.target === this.$refs.first) {
                this.$refs.innerClose.focus();
            }
        },
        clickOutSide(event) {
            if (
                event.target.classList.contains('dialog')
                || event.target.classList.contains('wrapper')
                || event.target.classList.contains('outer')
            ) {
                this.close();
            }
        },
        close() {
            if (this.focusOnClose) {
                document.querySelector(this.focusOnClose).focus();
            }

            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
.dialog-enter-active,
.dialog-leave-active {
    transition: opacity 0.35s;
}
.dialog-enter,
.dialog-leave-to {
    opacity: 0;
}
.dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 100%;
    background-color: transparentize(#000000, 0.3);
    z-index: 100;
    overflow: auto;
    padding: 0 15px;
    -webkit-overflow-scrolling: touch;
}
.wrapper {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 30px 0;
}
.outer {
    margin: auto;
    display: flex;
    width: 100%;
    max-height: 100%;
}
.holder {
    width: 720px;
    margin: 0 auto;
    max-width: 100%;
}
.inner {
    max-width: 100%;
    margin: 0 auto;
    padding-bottom: 30px;
    outline: 0;
}
.header {
    background-color: $primaryColor;
    padding: 27px 30px;
    position: relative;
    @media ($mobile) {
        padding: 18px 20px;
    }
}
.heading {
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 2.8px;
    text-transform: uppercase;
    padding-right: 35px;
    margin-bottom: 0;
    @media ($mobile) {
        font-size: 12px;
        letter-spacing: 1.8px;
    }
}
.content /deep/ p {
    font-size: 16px;
    margin-bottom: 20px;
}
.close {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 50%;
    right: 30px;
    margin-top: -9px;
    background: url("../assets/images/icon-close-white.svg") no-repeat center;
    background-size: 16px;
    cursor: pointer;
    @media ($mobile) {
        right: 20px;
    }
}
.body {
    padding: 50px;
    background-color: #ffffff;
    @media ($mobile) {
        padding: 30px 20px;
    }
}
.innerClose {
    display: flex;
    justify-content: center;
    line-height: 1.6;
    margin: 25px auto 0;
}
.innerCloseText {
    position: relative;
    padding-left: 25px;
    font-size: 15px;
    padding-top: 2px;
    cursor: pointer;
    @media ($mobile) {
        padding-left: 22px;
        font-size: 14px;
        padding-top: 3px;
    }
    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 1px;
        background-color: #1d1d1b;
        left: 0;
        top: 50%;
        margin-top: -0.5px;
        transform: rotate(45deg);
        @media ($mobile) {
            width: 16px;
        }
    }
    &::after {
        transform: rotate(-45deg);
    }
}
</style>
