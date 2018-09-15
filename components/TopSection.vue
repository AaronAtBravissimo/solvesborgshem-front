<template>
    <section class="topSection">
        <picture>
            <source
                :srcset="`${topSection.image.sizes.large}.webp`"
                type="image/webp"
            >
            <img
                :src="topSection.image.sizes.large"
                :alt="topSection.image.alt"
                class="image objectFitCover"
            >
        </picture>
        <div class="textHolder text-center">
            <div class="container">
                <h1 class="heading">
                    {{ topSection.heading }}
                </h1>
                <p class="preamble">
                    {{ topSection.preamble }}
                </p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        topSection: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.topSection {
    padding-bottom: 84px;
}
.image {
    width: 100%;
    height: 470px;
    margin-bottom: 67px;
}
.preamble {
    margin-top: 42px;
    margin-left: 6px;
}
</style>
