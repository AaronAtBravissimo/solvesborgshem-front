<template>
    <AppLink
        :url="link"
        class="smallCard w-full"
    >
        <div class="inner">
            <div class="imageHolder">
                {{ imagealt }}
                <AppImage
                    :image="image"
                    :alt="imagealt"
                    class="image"
                />
            </div>
            <div class="infoHolder">
                <h3 class="heading">{{ heading }}</h3>
                <p class="text">{{ content }}</p>
            </div>
        </div>
    </Applink>
</template>

<script>
import AppLink from './AppLink.vue';
import AppImage from './AppImage.vue';

export default {
    components: {
        AppLink,
        AppImage,
    },
    props: {
        image: {
            type: String,
            default: null,
        },
        imagealt: {
            type: String,
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
            type: String,
            default: null,
        },
    },
};
</script>

<style lang="scss" scoped>
.smallCard {
    display: flex;
    transition: 0.25s;
    background-color: #fff;
    padding: 30px 50px;
    box-shadow: 0 0 50px 0 rgba(13, 42, 56, 0.1);
}
.inner {
    display: flex;
}
.imageHolder {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
}
.infoHolder {
    flex-shrink: 1;
    padding-left: 60px;
}
.heading {
    margin-bottom: 18px;
}
.text {
    font-size: 16px;
    line-height: 1.63;
    flex-grow: 1;
}

</style>
