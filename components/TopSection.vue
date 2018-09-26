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
    @media ($tablet) {
        padding-bottom: 70px;
    }
    @media ($smallTablet) {
        padding-bottom: 60px;
    }
    @media ($mobile) {
        padding-bottom: 50px;
    }
}
.container {
    @media ($tablet) {
        padding: 0;
    }
}
.image {
    width: 100%;
    height: 470px;
    margin-bottom: 67px;
    @media ($smallDesktop) {
        height: 420px;
        margin-bottom: 50px;
    }
    @media ($largeTablet) {
        height: 380px;
        margin-bottom: 45px;
    }
    @media ($tablet) {
        height: 350px;
        margin-bottom: 40px;
    }
    @media ($smallTablet) {
        height: 300px;
        margin-bottom: 35px;
    }
    @media ($mobile) {
        height: 250px;
        margin-bottom: 30px;
    }
}
.preamble {
    margin-top: 42px;
    @media ($largeTablet) {
        margin-top: 35px;
    }
    @media ($tablet) {
        margin-top: 30px;
    }
    @media ($smallTablet) {
        margin-top: 25px;
    }
    @media ($mobile) {
        margin-top: 20px;
    }
}
</style>
