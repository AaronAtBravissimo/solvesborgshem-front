<template>
    <component
        :is="typeOfElement(url)"
        :target="fixedTarget"
        v-bind="setUrlAttr(url)"
    >
        <slot></slot>
    </component>
</template>

<script>
import { baseUrl } from '../utils/config';
import { makeUrlRelative } from '../utils/helpers';

export default {
    props: {
        url: {
            type: String,
            default: '',
        },
        target: {
            type: String,
            default: null,
        },
    },
    computed: {
        fixedTarget() {
            if (!this.target || this.target === '') {
                return null;
            }

            return this.target;
        },
    },
    methods: {
        setUrlAttr(url) {
            if (url.indexOf(baseUrl) !== -1) {
                return { to: makeUrlRelative(url) };
            }

            return { href: url };
        },
        typeOfElement(url) {
            if (url.indexOf(baseUrl) !== -1) {
                return 'nuxt-link';
            }

            return 'a';
        },
    },
};
</script>
