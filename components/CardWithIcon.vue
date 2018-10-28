<template>
    <div class="cardWithIcon">
        <div class="iconHolder">
            <img
                :src="getIcon(card.icon)"
                :class="`${card.icon}`"
                class="icon"
            >
        </div>
        <h4 class="heading">{{ card.heading }}</h4>
        <div
            v-if="card.text"
            class="textHolder"
            v-html="card.text"
        >
        </div>
    </div>
</template>

<script>
import phone from '../assets/images/icon-phone.svg';
import email from '../assets/images/icon-message.svg';
import house from '../assets/images/icon-house.svg';
import clock from '../assets/images/icon-clock.svg';

export default {
    props: {
        card: {
            type: Object,
            required: true,
        },
    },
    methods: {
        getIcon(icon) {
            const icons = {
                phone,
                email,
                house,
                clock,
            };
            return icons[icon];
        },
    },
};
</script>

<style lang="scss" scoped>
.cardWithIcon {
    text-align: center;
}
.iconHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 auto 52px;
    width: 220px;
    height: 220px;
    padding-bottom: 10px;
    border-radius: 100%;
    border: 8px solid #f4f8fa;
    @media ($laptop) {
        width: 200px;
        height: 200px;
    }
    @media ($smallTablet) {
        width: 180px;
        height: 180px;
        border-width: 5px;
    }
    @media ($smallerTablet) {
        width: 160px;
        height: 160px;
        margin-bottom: 30px;
    }
    @media ($mobile) {
        width: 140px;
        height: 140px;
    }
}
.icon {
    &.phone {
        width: 82px;
        height: 82px;
    }
    &.email {
        width: 80px;
        height: 80px;
    }
    &.house {
        width: 76px;
        height: 82px;
        @media ($smallTablet) {
            width: 58px;
            height: 62px;
        }
        @media ($mobile) {
            width: 50px;
            height: 54px;
        }
    }
    &.clock {
        width: 80px;
        height: 80px;
    }
}
.heading {
    margin-bottom: 16px;
}
.textHolder {
    font-size: 16px;
    line-height: 1.65;
    @media ($mobile) {
        font-size: 14px;
    }
}
.textHolder /deep/ a {
    color: $primaryColor;
    text-decoration: underline;
    &:hover {
        color: $primaryTextColor;
    }
}
</style>
