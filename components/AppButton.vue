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
                <div class="button__label">{{ label }}</div>
                <img
                    v-if="icon"
                    :src="icon"
                    class="button__icon"
                >
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
