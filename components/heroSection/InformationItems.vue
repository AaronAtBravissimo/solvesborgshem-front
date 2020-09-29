<template>
    <div class="informationItems flex justify-center flex-wrap">
        <div
            v-for="(item, index) in items"
            :key="index"
            class="item flex items-center"
        >
            <div
                :class="item.icon"
                class="iconHolder flex-no-shrink"
            >
                <img
                    :src="icons[item.icon]"
                    alt=""
                    class="icon w-full h-full"
                >
            </div>
            <div class="textHolder flex-grow">
                <h4 class="heading">
                    {{ item.heading }}
                </h4>
                <p class="text">
                    <span class="keyFigure">{{ item.keyFigure }}</span>
                    {{ item.text }}
                    <AppLink
                        :url="item.link.url"
                        :target="item.link.target"
                        class="link"
                    >
                        {{ item.link.title }}
                    </AppLink>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import AppLink from '../AppLink.vue';
import thumbUp from '../../assets/images/icon-thumbs-up.svg';
import digitalLock from '../../assets/images/icon-digital-lock.svg';
import noSmoke from '../../assets/images/icon-no-smoke.svg';

export default {
    components: {
        AppLink,
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    data: () => ({
        icons: {
            thumbUp,
            digitalLock,
            noSmoke,
        },
    }),
};
</script>

<style lang="scss" scoped>
.informationItems {
    width: 1200px;
    max-width: 100%;
    margin: 20px auto 0;
    @media ($mediumTablet) {
        width: 320px;
    }
    @media ($mobile) {
        width: 260px;
    }
}

.item {
    width: 33.33%;
    padding: 0 30px;
    @media ($largeTablet) {
        padding: 0 15px;
    }
    @media ($tablet) {
        display: block;
    }
    @media ($mediumTablet) {
        width: 100%;
        margin-bottom: 30px;
    }
    @media ($mobile) {
        margin-bottom: 20px;
    }
    &:last-child {
        margin-bottom: 0;
    }
}

.iconHolder {
    width: 84px;
    height: 84px;
    @media ($largeTablet) {
        width: calc(84px * 0.9);
        height: calc(84px * 0.9);
    }
    @media ($tablet) {
        width: calc(84px * 0.8);
        height: calc(84px * 0.8);
        margin: 0 auto 20px;
    }
    @media ($mobile) {
        width: calc(84px * 0.75);
        height: calc(84px * 0.75);
    }
}

.iconHolder.thumbUp {
    width: 70px;
    height: 70px;
    @media ($largeTablet) {
        width: calc(70px * 0.88);
        height: calc(70px * 0.88);
    }
    @media ($tablet) {
        width: calc(84px * 0.8);
        height: calc(84px * 0.8);
    }
    @media ($mediumTablet) {
        width: calc(70px * 0.8);
        height: calc(70px * 0.8);
    }
    @media ($mobile) {
        width: calc(70px * 0.72);
        height: calc(70px * 0.72);
    }
}

.textHolder {
    padding-left: 25px;
    @media ($tablet) {
        flex-grow: 0;
        width: 100%;
        padding-left: 0;
        text-align: center;
    }
}

.heading {
    margin-bottom: 2px;
    @media ($largeTablet) {
        margin-bottom: 4px;
    }
}

.text {
    font-size: 16px;
    @media ($largeTablet) {
        font-size: 15px;
    }
    @media ($mobile) {
        font-size: 14px;
    }
}

.keyFigure,
.link {
    color: $primaryColor;
    font-weight: 400;
}

.link:hover {
    text-decoration: underline;
}
</style>
