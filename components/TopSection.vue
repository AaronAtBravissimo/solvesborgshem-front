<template>
    <section class="topSection">
        <img
            :src="topSection.image.sizes.large"
            :alt="topSection.image.alt"
            class="image"
        >
        <div class="headingPreamble">
            <div class="container">
                <h1 class="headingPreamble__heading">
                    {{ topSection.heading }}
                </h1>
                <p class="headingPreamble__preamble">
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
    object-fit: cover;
    margin-bottom: 67px;
}
.headingPreamble {
    text-align: center;
    &__heading {
        line-height: 1.05;
        font-size: 50px;
        letter-spacing: 10px;
        margin-left: 12px; // NOTE: Bör plockas bort?
    }
    &__preamble {
        font-size: 20px;
        line-height: 1.55;
        margin-top: 42px;
        margin-left: 6px;
    }
}
</style>
