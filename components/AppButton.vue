<template>
    <component
        :is="typeOfElement(url)"
        :class="[{'isLoading': loading, 'isDisabled': disabled}, color]"
        v-bind="setUrlAttr(url)"
        class="button"
        @click="$emit('clicked')"
    >
        <div class="flex">
            <div class="inner">
                <img
                    v-if="icon"
                    :src="icon"
                    class="icon"
                >
                <div
                    v-if="counter"
                    class="counter flex items-center justify-center"
                >
                    {{ counter }}
                </div>
                <div class="label">{{ label }}</div>
            </div>
        </div>
        <div class="loading">
            <img
                class="loadingIcon"
                src="../assets/images/spinner.svg"
                alt=""
            >
        </div>

    </component>
</template>

<script>
import { makeUrlRelative } from '../utils/helpers';
import { baseUrl } from '../utils/config';

export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            default: '',
        },
        loading: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        url: {
            type: String,
            default: '',
        },
        target: {
            type: String,
            default: '',
        },
        color: {
            type: String,
            default: '',
        },
        buttonType: {
            type: String,
            default: 'button',
        },
        counter: {
            type: Number,
            default: null,
        },
    },
    computed: {
        isRelative() {
            return this.url.substring(4) !== 'http';
        },
    },
    methods: {
        setUrlAttr(url) {
            if (url.length < 1) {
                return { type: this.buttonType };
            }

            if (url.indexOf(baseUrl) !== -1 || this.isRelative) {
                return { to: makeUrlRelative(url) };
            }

            return {
                href: url,
                target: this.target,
            };
        },
        typeOfElement(url) {
            if (url.length < 1) {
                return 'button';
            }

            if (url.indexOf(baseUrl) !== -1 || this.isRelative) {
                return 'nuxt-link';
            }

            return 'a';
        },
    },
};
</script>

<style lang="scss" scoped>

.button {
    background-color: $primaryColor;
    padding: 13px 22px;
    display: inline-block;
    border-radius: 6px;
    text-align: center;
    position: relative;
    outline: none !important;
    @media($tablet) {
        min-width: 180px;
        padding: 10px 20px;
    }
    @media($mobile) {
        min-width: 120px;
        padding: 8px 14px;
    }
    &.isDisabled {
        cursor: default;
        opacity: 0.6;
        pointer-events: none;
    }
    &:hover {
        background-color: #232323;
    }
}

.inner {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 24px;
}
.label {
    letter-spacing: 2.8px;
    text-transform: uppercase;
    color: #fff;
    font-family: $primaryFont;
    font-weight: bold;
    font-size: 14px;
    @media($tablet) {
        font-size: 13px;
    }
    @media($mobile) {
        font-size: 12px;
    }
}
.icon {
    width: 16px;
    height: 16px;
    margin-right: 20px;
    display: flex;
    flex-shrink: 0;
}
.loading {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15px;
    margin-top: -15px;
    opacity: 0;
}
.loadingIcon {
    width: 100%;
    height: 100%;
}

.iconAndLabel {
    background: none !important;
    padding: 0;
    margin-right: 32px;
    @media ($largeTablet) {
        margin-right: 15px;
    }
    &:last-child {
        margin-right: 0;
    }
    .icon {
        max-height: 16px;
        margin-right: 0;
    }
    .counter {
        font-size: 12px;
        color: #ffffff;
        width: 28px;
        height: 28px;
        border-radius: 100%;
        font-weight: bold;
        background-color: #efb56b;
    }
    .label {
        flex-shrink: 1;
        padding: 0 10px;
        font-size: 12px;
        letter-spacing: 2.1px;
        font-weight: bold;
    }
    &.thinLabel .label {
        font-weight: 300;
    }
    &.apartmentsIcon .icon {
        width: 38px;
    }
    &.customizeIcon .icon {
        width: 18px;
    }
    &.noMarginRight {
        margin-right: 0;
    }
}

.button.isLoading {
    pointer-events: none;
    .inner {
        opacity: 0;
    }
    .loading {
        opacity: 1;
    }
    .loadingIcon {
        animation-name: rotate;
        animation-duration: 0.8s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
}

@keyframes rotate {
    0% {
        transform: rotate(360deg);
    }
}
</style>
