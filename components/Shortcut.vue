<template>
    <div class="shortcut">
        <div class="inner">
            <div class="imageHolder">
                <img
                    :src="image.sizes.large"
                    :alt="image.alt"
                    class="image"
                >
            </div>
            <div class="infoHolder">
                {{ heading }}
                {{ content }}
                {{ link }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
