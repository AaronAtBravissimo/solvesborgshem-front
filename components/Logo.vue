<template>
    <nuxt-link
        class="block w-full h-full"
        to="/"
    >
        <img
            v-if="!whiteColor"
            class="block w-full h-full"
            src="../assets/images/logo.svg"
            alt=""
        >
        <img
            v-if="whiteColor"
            class="block w-full h-full"
            src="../assets/images/logo-white.svg"
            alt=""
        >
    </nuxt-link>
</template>

<script>
export default {
    props: {
        whiteColor: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
