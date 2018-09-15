<template>
    <component
        :is="typeOfElement(url)"
        :class="[{'isLoading': loading, 'isDisabled': disabled}, color]"
        v-bind="setUrlAttr(url)"
        class="button"
        @click="$emit('clicked')"
    >
        <div class="flex">
            <div class="button__inner">
                <img
                    v-if="icon"
                    :src="icon"
                    class="button__icon"
                >
                <div class="button__label">{{ label }}</div>
            </div>
        </div>
        <div class="button__loading">
            <img
                class="button__loadingIcon"
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
    },
    methods: {
        setUrlAttr(url) {
            if (url.length < 1) {
                return { type: this.buttonType };
            }

            if (url.indexOf(baseUrl) !== -1) {
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

            if (url.indexOf(baseUrl) !== -1) {
                return 'nuxt-link';
            }

            return 'a';
        },
    },
};
</script>

<style lang="scss">

.button {
    background-color: $primaryColor;
    padding: 13px 22px;
    display: inline-block;
    border-radius: 6px;
    text-align: center;
    position: relative;
    outline: none !important;
    @media(tablet) {
        min-width: 180px;
        padding: 10px 20px;
    }
    @media(mobile) {
        min-width: 120px;
        padding: 8px 14px;
    }
    &__inner {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 24px;
    }
    &__label {
        letter-spacing: 2.8px;
        text-transform: uppercase;
        color: #fff;
        font-family: $primaryFont;
        font-weight: bold;
        font-size: 14px;
        @media(tablet) {
            font-size: 13px;
        }
        @media(mobile) {
            font-size: 12px;
        }
    }
    &__icon {
        width: 16px;
        height: 16px;
        margin-right: 20px;
        display: flex;
        flex-shrink: 0;
    }
    &__loading {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -15px;
        margin-top: -15px;
        opacity: 0;
    }
    &__loadingIcon {
        width: 100%;
        height: 100%;
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


.button.isLoading {
    pointer-events: none;
    .button__inner {
        opacity: 0;
    }
    .button__loading {
        opacity: 1;
    }
    .button__loadingIcon {
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
