<template>
    <div
        :class="{'isOpen': open}"
        class="accordion"
        role="presentation"
    >
        <div role="heading">
            <h3 class="mb-0">
                <button
                    :id="`accordionButton-${accordionNumber}`"
                    :aria-controls="`accordionBody-${accordionNumber}`"
                    :aria-expanded="open.toString()"
                    type="button"
                    class="inner flex w-full"
                    @click="toggle()"
                >
                    <span class="h3 heading">{{ heading }}</span>
                    <img
                        :src="arrow"
                        class="buttonIcon"
                        alt=""
                    >
                </button>
            </h3>
        </div>
        <transition
            @enter="slideDown"
            @leave="slideUp"
        >
            <div
                v-show="open"
                :id="`accordionBody-${accordionNumber}`"
                :aria-labelledby="`accordionButton-${accordionNumber}`"
                role="region"
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

.accordion .inner {
    cursor: pointer;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 15px;
    position: relative;
    padding-right: #{$buttonSize * 2};
    transition: 0.35s;
    @media ($smallTablet) {
        padding-right: #{$buttonSizeSmallTablet * 2};
        padding-bottom: 12px;
    }
    @media ($mobile) {
        padding-right: #{$buttonSizeMobile * 2};
        padding-bottom: 10px;
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
    text-align: left;
    line-height: 1.65;
    transition: 0.35s;
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
.buttonIcon {
    position: absolute;
    right: 0;
    top: 7px;
    width: $buttonSize;
    height: $buttonSize;
    transition: 0.35s;
    @media ($laptop) {
        top: 4px;
    }
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
    .inner {
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
