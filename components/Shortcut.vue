<template>
    <div class="shortcut">
        <div class="inner">
            <div class="imageHolder">
                <picture>
                    <source
                        :srcset="`${image.sizes.large}.webp`"
                        type="image/webp"
                    >
                    <img
                        :src="image.sizes.large"
                        :alt="image.alt"
                        class="image objectFitCover"
                    >
                </picture>
            </div>
            <div class="infoHolder">
                <h3 class="heading">{{ heading }}</h3>
                <p class="text">{{ content }}</p>
                <AppButton
                    :url="link.url"
                    :target="link.target"
                    label="Läs mer"
                />
            </div>
        </div>
    </div>
</template>

<script>
import AppButton from './AppButton.vue';

export default {
    components: {
        AppButton,
    },
    props: {
        image: {
            type: Object,
            default: null,
        },
        heading: {
            type: String,
            default: null,
        },
        content: {
            type: String,
            default: null,
        },
        link: {
            type: Object,
            default: null,
        },
    },
};
</script>

<style lang="scss" scoped>
.inner {
    display: flex;
}
.imageHolder {
    flex-shrink: 0;
    width: 236px;
    height: 236px;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #8ac8df 0%,#94d3b3 100%);
    }
}
.image {
    mix-blend-mode: overlay;
    opacity: 0.6;
}
.infoHolder {
    flex-shrink: 1;
    padding-left: 60px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}
.heading {
    margin-bottom: 18px;
}
.text {
    font-size: 16px;
    line-height: 1.63;
    flex-grow: 1;
}
.button {
    min-width: 200px;
}

</style>
