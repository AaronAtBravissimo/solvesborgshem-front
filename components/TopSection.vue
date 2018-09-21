<template>
    <section class="topSection">
        <AppImage
            :image="topSection.image.sizes.large"
            :alt="topSection.image.alt"
            class="image objectFitCover"
        />
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
import AppImage from './AppImage.vue';

export default {
    components: {
        AppImage,
    },
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
