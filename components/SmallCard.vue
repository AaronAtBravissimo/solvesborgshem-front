<template>
    <article class="flex w-full">
        <AppLink
            :url="link"
            class="smallCard w-full"
        >
            <div class="inner">
                <div class="imageHolder">
                    <AppImage
                        v-if="image"
                        :image="image"
                        :alt="imagealt ? imagealt : ''"
                        class="image"
                    />
                </div>
                <div class="infoHolder">
                    <h3 class="heading">{{ heading }}</h3>
                    <p class="text">{{ content }}</p>
                </div>
            </div>
        </Applink>
    </article>
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
    transition: 0.25s;
    background-color: #fff;
    padding: 30px 50px;
    box-shadow: $primaryShadow;
    @media ($laptop) {
        padding: 30px 30px;
    }
    @media ($mobile) {
        padding: 25px 15px;
    }
    &:hover {
        transform: translateY(-10px);
    }
}
.inner {
    display: flex;
    @media ($smallerMobile) {
        flex-wrap: wrap;
    }
}
.imageHolder {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
    @media ($laptop) {
        width: 80px;
        height: 80px;
    }
    @media ($mobile) {
        width: 55px;
        height: 55px;
    }
    @media ($smallerMobile) {
        margin: 0 auto 20px;
    }
}
.infoHolder {
    flex-shrink: 1;
    padding-left: 60px;
    @media ($smallDesktop) {
        padding-left: 30px;
    }
    @media ($mobile) {
        padding-left: 20px;
    }
    @media ($smallerMobile) {
        padding-left: 0;
        text-align: center;
    }
}
.heading {
    margin-bottom: 18px;
    @media ($smallDesktop) {
        letter-spacing: 3px;
    }
    @media ($laptop) {
        letter-spacing: 2px;
        font-size: 20px;
        margin-bottom: 15px;
    }
    @media ($largeTablet) {
        letter-spacing: 1px;
    }
    @media ($mobile) {
        font-size: 17px;
        margin-bottom: 10px;
        letter-spacing: 0.5px;
    }
}
.text {
    font-size: 16px;
    line-height: 1.63;
    flex-grow: 1;
    @media ($laptop) {
        font-size: 15px;
    }
    @media ($mobile) {
        font-size: 14px;
    }
}

</style>
