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
                {{ heading }}
                {{ content }}
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

</style>
