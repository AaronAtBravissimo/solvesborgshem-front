<template>
    <div
        :class="{ 'isDanger': notice.important }"
        class="headerNotice"
    >
        <div class="container flex items-center justify-center">
            <img
                :src="infoIcon"
                class="icon flex-no-shrink"
            >
            <div class="text flex flex-wrap items-center">
                <p>{{ notice.content }}</p>
                <AppButton
                    :url="notice.link.url"
                    label="Läs mer"
                    class="readMore"
                />
            </div>

        </div>
    </div>
</template>

<script>
import AppButton from './AppButton.vue';
import infoIcon from '../assets/images/icon-info.svg';

export default {
    components: {
        AppButton,
    },
    data() {
        return {
            infoIcon,
        };
    },
    computed: {
        notice() {
            return this.$store.getters.options.notice;
        },
    },
};
</script>

<style lang="scss" scoped>
.headerNotice {
    background-color: $primaryTextColor;
    min-height: 69px;
    display: flex;
    margin-left: -#{$frameSize};
    width: calc(100% + #{$frameSize * 2});
    color: #ffffff;
    padding: 15px 0;
    @media ($smallDesktop) {
        margin-left: -#{$frameSizeSmallDesktop};
        width: calc(100% + #{$frameSizeSmallDesktop * 2});
    }
    @media ($mobile) {
        margin-left: -15px;
        width: calc(100% + 30px);
        padding: 12px 0;
    }
    &.isDanger {
        background-color: #b74141;
    }
}
.container {
    @media ($smallerTablet) {
        flex-wrap: wrap;
    }
}
.icon {
    margin-right: 15px;
    width: 28px;
    height: 28px;
    @media ($smallerTablet) {
        margin-right: 0;
        margin-bottom: 10px;
        width: 24px;
        height: 24px;
    }
    @media ($mobile) {
        width: 20px;
        height: 20px;

    }
}
.text {
    @media ($smallerTablet) {
        justify-content: center;
        width: 100%;
        text-align: center;
    }
}
p {
    font-size: 15px;
    margin-bottom: 0;
    padding-right: 5px;
    @media ($smallTablet) {
        font-size: 14px;
        padding-right: 0;
    }
    @media ($mobile) {
        font-size: 13px;
    }
}
.readMore {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    min-width: 0;
    &:hover {
        background-color: transparent;
        /deep/ .label::after {
            opacity: 0;
        }
    }
}
.readMore /deep/ .label {
    position: relative;
    font-family: $secondaryFont;
    text-transform: none;
    letter-spacing: 0.5px;
    font-weight: bold;
    @media ($mobile) {
        font-size: 13px;
    }
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        height: 1px;
        background-color: #fff;
        transition: 0.25s;
    }
}
</style>
