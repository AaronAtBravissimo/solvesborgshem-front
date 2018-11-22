<template>
    <div class="imageElement">
        <no-ssr>
            <img
                v-show="imageElement"
                :src="imageElement.sizes.large"
                :alt="imageElement.alt"
                class="image"
            >
        </no-ssr>
    </div>
</template>

<script>
export default {
    props: {
        imageElements: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            imageElement: false,
        };
    },
    created() {
        this.setImageElement();
    },
    methods: {
        setImageElement() {
            if (this.imageElements && this.imageElements.length > 1) {
                const rand = Math.floor(Math.random() * this.imageElements.length);
                this.imageElement = this.imageElements[rand];
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.imageElement {
    opacity: 0;
    transform: translateY(-50px);
    transition: 0.75s 1.05s ease;
    .isLoaded & {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
