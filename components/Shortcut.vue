<template>
    <AppLink
        :url="link.url"
        :target="link.target"
        class="shortcut"
    >
        <div class="inner">
            <div class="imageHolder">
                <AppImage
                    :image="image.sizes.large"
                    :alt="image.alt"
                    class="image"
                />
            </div>
            <div class="infoHolder">
                <h3 class="heading">{{ heading }}</h3>
                <p class="text">{{ content }}</p>
                <AppButton
                    label="Läs mer"
                    tabindex="-1"
                />
            </div>
        </div>
    </Applink>
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
    display: block;
    padding: 36px 40px;
    transition: 0.25s;
    &:focus {
        outline: 2px solid $primaryColor;
        outline-offset: 0;
        transition: 0.125s;
    }
    @media ($largeTablet) {
        padding: 30px;
    }
    @media ($mobile) {
        padding: 25px 15px;
    }
    &:hover {
        background-color: #f4f8fa;
    }
}
.inner {
    display: flex;
    @media ($smallDesktop) {
        flex-wrap: wrap;
    }
    @media ($tablet) {
        flex-wrap: nowrap;
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
    @media ($largeDesktop) {
        padding-left: 50px;
    }
    @media ($smallDesktop) {
        width: 100%;
        padding-left: 0;
    }
    @media ($tablet) {
        width: auto;
        padding-left: 30px;
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
