<template>
    <picture>
        <source
            :srcset="`${image}.webp`"
            type="image/webp"
        >
        <img
            :src="image"
            :alt="alt"
            class="image objectFitCover"
        >
    </picture>
</template>

<script>
export default {
    props: {
        image: {
            type: String,
            default: '',
        },
        alt: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
.image {
    display: block;
    width: 100%;
}
</style>
