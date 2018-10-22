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
    margin-left: -50px;
    width: calc(100% + 100px);
    color: #ffffff;
    @media ($smallDesktop) {
        margin-left: -30px;
        width: calc(100% + 60px);
    }
    &.isDanger {
        background-color: #b74141;
    }
}
.icon {
    margin-right: 10px;
    width: 28px;
    height: 28px;
}
p {
    font-size: 15px;
    margin-bottom: 0;
    padding-right: 5px;
}
.readMore {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    &:hover {
        background-color: transparent;
    }
}
</style>
