<template>
    <picture>
        <source
            v-if="useWebp"
            :srcset="`${imageSrc}.webp`"
            type="image/webp"
        >
        <img
            ref="image"
            :src="imageSrc"
            :alt="alt"
            :class="{ 'loaded': isLoaded, 'ab100': !disableAb100 }"
            class="imageSrc objectFitCover"
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
        imageWebp: {
            type: String,
            default: '',
        },
        alt: {
            type: String,
            default: '',
        },
        lazy: {
            type: Boolean,
            default: true,
        },
        disableAb100: {
            type: Boolean,
            default: false,
        },
        useWebp: {
            type: Boolean,
            default: true,
        },
    },
    data: () => ({
        loaded: false,
    }),
    computed: {
        isLoaded() {
            return !this.lazy || this.loaded;
        },
        webpImage() {
            if (this.lazy && !this.loaded) return null;

            if (!this.useWebp) return this.image;

            return this.imageWebp ? this.imageWebp : `${this.image}.webp`;
        },
        imageSrc() {
            if (this.lazy && !this.loaded) return null;

            return this.image;
        },
    },
    mounted() {
        if (!process.client || !this.lazy) return;

        const observer = new IntersectionObserver(this.handleIntersect, {
            rootMargin: '1200px 0px 1200px 0px',
            threshold: [0, 0.05, 0.01],
        });

        observer.observe(this.$refs.image);
    },
    methods: {
        handleIntersect(entries, observer) {
            if (entries[0].intersectionRatio > 0) {
                this.loaded = true;
                observer.unobserve(this.$refs.image);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.image {
    display: block;
    width: 100%;
}
.imageSrc {
    opacity: 0;
}
.loaded {
    opacity: 1;
}
</style>
