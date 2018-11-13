<template>
    <article class="w-full">
        <AppLink
            :url="link.url"
            :target="link.target"
            class="shortcut h-full flex"
        >
            <div class="inner">
                <div class="imageHolder">
                    <AppImage
                        :image="image.sizes.large"
                        :alt="image.alt"
                        class="image ab100"
                    />
                    <AppImage
                        :image="image.sizes.large"
                        alt=""
                        class="imageNotMixed ab100"
                    />
                    <div class="imageOverlay ab100"></div>
                </div>
                <div class="infoHolder">
                    <h3 class="heading">{{ heading }}</h3>
                    <p class="text">{{ content }}</p>
                    <div class="button">
                        <span class="flex">
                            <span class="inner">
                                <span class="label">Läs mer</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </Applink>
    </article>
</template>

<script>
import AppLink from './AppLink.vue';
import AppButton from './AppButton.vue';
import AppImage from './AppImage.vue';

export default {
    components: {
        AppLink,
        AppButton,
        AppImage,
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
.shortcut {
    padding: 36px 40px;
    transition: 0.25s;
    &:focus {
        outline-offset: 0;
    }
    @media ($largeTablet) {
        padding: 30px;
    }
    @media ($mobile) {
        padding: 0 0 30px;
    }
    &:hover {
        background-color: #f4f8fa;
        .imageNotMixed {
            opacity: 1;
        }
        @media ($mobile) {
            background-color: transparent;
        }
    }
    .button {
        transition: 0.25s;
    }
    .button .inner {
        justify-content: center;
    }
}
.inner {
    display: flex;
    height: 100%;
    @media ($smallDesktop) {
        flex-wrap: wrap;
        justify-content: center;
    }
    @media ($tablet) {
        flex-wrap: nowrap;
        justify-content: flex-start;
    }
    @media ($smallTablet) {
        flex-wrap: wrap;
        justify-content: center;
    }
}
.imageHolder {
    flex-shrink: 0;
    width: 236px;
    height: 236px;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
    @media ($largeDesktop) {
        width: 200px;
        height: 200px;
    }
    @media ($smallDesktop) {
        margin-bottom: 30px;
    }
    @media ($tablet) {
        margin-bottom: 0;
        width: 180px;
        height: 180px;
    }
    @media ($mediumTablet) {
        width: 160px;
        height: 160px;
    }
    @media ($smallTablet) {
        margin-bottom: 30px;
    }
    @media ($mobile) {
        width: 120px;
        height: 120px;
    }
}
.image {
    z-index: 10;
    opacity: 0.6;
    mix-blend-mode: overlay;
    transition: 0.35s;
    border-radius: 100%;
    overflow: hidden;
}
.imageNotMixed {
    z-index: 15;
    opacity: 0;
    transition: 0.35s;
    border-radius: 100%;
    overflow: hidden;
}
.imageOverlay {
    z-index: 5;
    background: linear-gradient(135deg, #8ac8df 0%,#94d3b3 100%);
    transition: 0.35s;
}
.infoHolder {
    flex-shrink: 1;
    padding-left: 60px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    @media ($largeDesktop) {
        padding-left: 50px;
    }
    @media ($smallDesktop) {
        width: 100%;
        padding-left: 0;
        align-items: center;
        text-align: center;
    }
    @media ($tablet) {
        width: auto;
        padding-left: 30px;
        align-items: flex-start;
        text-align: left;
    }
    @media ($smallTablet) {
        width: 100%;
        padding-left: 0;
        align-items: center;
        text-align: center;
    }
}
.heading {
    margin-bottom: 18px;
}
.text {
    font-size: 16px;
    line-height: 1.63;
    flex-grow: 1;
    margin-bottom: 32px;
    @media ($tablet) {
        font-size: 15px;
    }
    @media ($mobile) {
        font-size: 14px;
        margin-bottom: 25px;
    }
}
.button {
    min-width: 200px;
}

</style>
