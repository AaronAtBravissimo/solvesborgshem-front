<template>
    <div
        :class="{'isOpen': open}"
        class="accordion"
    >
        <div
            class="header"
            @click="toggle()"
        >
            <h3 class="heading">{{ heading }}</h3>
            <button
                :id="`accordionButton-${accordionNumber}`"
                :aria-controls="`accordionBody-${accordionNumber}`"
                :aria-expanded="open.toString()"
                type="button"
                class="button"
            >
                <img
                    :src="arrow"
                    class="buttonIcon"
                >
            </button>
        </div>
        <transition
            @enter="slideDown"
            @leave="slideUp"
        >
            <div
                v-show="open"
                :id="`accordionBody-${accordionNumber}`"
                :aria-labelledby="`accordionButton-${accordionNumber}`"
                class="body"
            >
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import arrow from '../assets/images/icon-arrow-down.svg';

/* eslint-disable no-param-reassign */
export default {
    props: {
        heading: {
            type: String,
            required: true,
        },
        accordionNumber: {
            type: Number,
            default: null,
        },
    },
    data: () => ({
        open: false,
        transition: 350,
        arrow,
    }),
    methods: {
        slideDown(el, done) {
            el.style.transition = `${this.transition}ms`;
            el.style.overflow = 'hidden';
            el.style.height = 0;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.height = `${el.firstChild.offsetHeight}px`;
                });
            });

            setTimeout(() => {
                el.style.height = '';
                done();
            }, this.transition);
        },
        slideUp(el, done) {
            el.style.height = `${el.firstChild.offsetHeight}px`;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.height = 0;
                });
            });

            setTimeout(() => {
                done();
            }, this.transition);
        },
        toggle() {
            this.open = !this.open;
        },
    },
};
</script>

<style lang="scss" scoped>
$buttonSize: 24px;
$buttonSizeSmallTablet: 20px;
$buttonSizeMobile: 16px;

.header {
    cursor: pointer;
    position: relative;
    padding-right: #{$buttonSize * 2};
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 15px;
    transition: 0.35s;
    @media ($smallTablet) {
        padding-bottom: 12px;
        padding-right: #{$buttonSizeSmallTablet * 2};
    }
    @media ($mobile) {
        padding-bottom: 10px;
        padding-right: #{$buttonSizeMobile * 2};
    }
    &:hover .heading {
        color: $primaryColor;
    }
}
.heading {
    font-family: $secondaryFont;
    text-transform: none;
    font-weight: 500;
    letter-spacing: 0;
    font-size: 20px;
    margin-bottom: 0;
    transition: 0.35s;
    line-height: 1.65;
    @media ($laptop) {
        font-size: 18px;
    }
    @media ($smallTablet) {
        font-size: 16px;
    }
    @media ($mobile) {
        font-size: 14px;
    }
}
.button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 28px;
    height: 28px;
    right: 0;
    top: 0;
}
.buttonIcon {
    width: $buttonSize;
    height: $buttonSize;
    position: relative;
    transition: 0.35s;
    @media ($smallTablet) {
        width: $buttonSizeSmallTablet;
        height: $buttonSizeSmallTablet;
    }
    @media ($mobile) {
        width: $buttonSizeMobile;
        height: $buttonSizeMobile;
    }
}
.content {
    padding-top: 20px;
    @media ($smallTablet) {
        padding-top: 18px;
    }
    @media ($mobile) {
        padding-top: 15px;
    }
    /deep/ p {
        font-size: 16px;
        @media ($laptop) {
            font-size: 15px;
        }
        @media ($smallTablet) {
            font-size: 14px;
        }
        @media ($mobile) {
            font-size: 13px;
        }
    }
}

.accordion.isOpen {
    .header {
        border-color: $primaryColor;
    }
    .heading {
        color: $primaryColor;
    }
    .buttonIcon {
        transform: rotate(180deg);
    }
}
</style>
