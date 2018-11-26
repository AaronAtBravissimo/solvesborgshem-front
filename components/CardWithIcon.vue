<template>
    <div class="cardWithIcon">
        <div class="iconHolder">
            <img
                :src="getIcon(card.icon)"
                :class="`${card.icon}`"
                alt=""
                class="icon"
            >
            <div
                v-if="counter !== null"
                class="number"
            >
                {{ counter + 1 }}
            </div>
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
import person from '../assets/images/icon-person.svg';
import thumbUp from '../assets/images/icon-thumbs-up.svg';
import checklist from '../assets/images/icon-checklist.svg';

export default {
    props: {
        card: {
            type: Object,
            required: true,
        },
        counter: {
            type: Number,
            default: null,
        },
    },
    methods: {
        getIcon(icon) {
            const icons = {
                phone,
                email,
                house,
                clock,
                person,
                thumbUp,
                checklist,
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
        margin-bottom: 20px;
    }
    @media ($mobile) {
        width: 130px;
        height: 130px;
    }
}
.icon {
    &.phone {
        width: 82px;
        height: 82px;
        @media ($mediumTablet) {
            width: (82px * 0.7);
            height: (82px * 0.7);
        }
        @media ($mobile) {
            width: (82px * 0.55);
            height: (82px * 0.55);
        }
    }
    &.email {
        width: 80px;
        height: 80px;
        @media ($smallTablet) {
            width: 60px;
            height: 60px;
        }
        @media ($mobile) {
            width: (80px * 0.55);
            height: (80px * 0.55);
        }
    }
    &.house {
        width: 76px;
        height: 82px;
        @media ($smallTablet) {
            width: 58px;
            height: 62px;
        }
        @media ($mobile) {
            width: (50px * 0.55);
            height: (54px * 0.55);
        }
    }
    &.clock {
        width: 80px;
        height: 80px;
        @media ($smallTablet) {
            width: 60px;
            height: 60px;
        }
        @media ($mobile) {
            width: (80px * 0.55);
            height: (80px * 0.55);
        }
    }
    &.person {
        width: 37px;
        height: 78px;
        @media ($smallTablet) {
            width: 27px;
            height: 58px;
        }
        @media ($mobile) {
            width: (37px * 0.55);
            height: (78px * 0.55);
        }
    }
    &.thumbUp {
        width: 66px;
        height: 66px;
        @media ($smallTablet) {
            width: 56px;
            height: 56px;
        }
        @media ($mobile) {
            width: (66px * 0.55);
            height: (66px * 0.55);
        }
    }
    &.house {
        width: 76px;
        height: 82px;
        @media ($smallTablet) {
            width: 58px;
            height: 62px;
        }
        @media ($mobile) {
            width: (76px * 0.55);
            height: (82px * 0.55);
        }
    }
    &.checklist {
        width: 55px;
        height: 79px;
        @media ($smallTablet) {
            width: 45px;
            height: 64px;
        }
        @media ($mobile) {
            width: (55px * 0.55);
            height: (79px * 0.55);
        }
    }
}
.heading {
    margin-bottom: 16px;
    @media ($smallerTablet) {
        margin-bottom: 10px;
    }
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
.number {
    position: absolute;
    left: 50%;
    top: 100%;
    width: 40px;
    height: 40px;
    margin-left: -20px;
    margin-top: -18px;
    background-color: $primaryColor;
    color: #ffffff;
    border-radius: 100%;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    @media ($mobile) {
        width: 30px;
        height: 30px;
        margin-left: -15px;
        margin-top: -13px;
        font-size: 15px;
    }
}
</style>
