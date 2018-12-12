<template>
    <article class="flex w-full">
        <a
            :href="card.link"
            class="card w-full"
            target="_blank"
        >
            <div class="top">
                <div class="imageHolder">
                    <img
                        :src="image"
                        class="image ab100 objectFitCover"
                    >
                </div>
                <div class="content">
                    <div class="date">
                        <img
                            class="dateIcon"
                            src="../assets/images/card/icon-calendar.svg"
                        >
                        <span class="dateLabel">{{ card.date_formatted }}</span>
                    </div>
                    <p
                        v-if="text"
                        class="text"
                    >
                        {{ text }}
                    </p>
                </div>
            </div>
            <div class="bottom">
                <div
                    :class="card.type"
                    class="mediaType flex items-center justify-center"
                >
                    <img
                        :src="getSocialIcon"
                        class="mediaTypeIcon"
                    >
                </div>
            </div>
        </a>
    </article>
</template>

<script>
import facebook from '../assets/images/card/facebook.svg';
import instagram from '../assets/images/icon-instagram.svg';
import linkedin from '../assets/images/card/linkedin.svg';
import twitter from '../assets/images/card/twitter.svg';
import youtube from '../assets/images/card/youtube.svg';
import imageMissing from '../assets/images/image-missing.jpg';

export default {
    props: {
        card: {
            type: Object,
            required: true,
        },
    },
    computed: {
        image() {
            if (this.card.image) {
                return this.card.image;
            }

            return imageMissing;
        },
        getSocialIcon() {
            const icons = {
                facebook,
                instagram,
                linkedin,
                twitter,
                youtube,
            };
            return icons[this.card.type];
        },
        text() {
            if (!this.card.text) return false;

            const maxLength = 150;
            return this.card.text.length > maxLength
                ? `${this.card.text.substring(0, maxLength)}...`
                : this.card.text;
        },
    },
};
</script>

<style lang="scss" scoped>
.card {
    font-family: $secondaryFont;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: $primaryShadow;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:hover {
        transform: translateY(-10px);
    }
}
.top {
    margin-bottom: 38px;
    @media ($mediumTablet) {
        margin-bottom: 30px;
    }
    @media ($mobile) {
        margin-bottom: 20px;
    }
}
.bottom {
    margin-bottom: 20px;
    @media ($mediumTablet) {
        margin-bottom: 10px;
    }
    @media ($mobile) {
        margin-bottom: 0;
    }
}
.imageHolder {
    position: relative;
    height: 353px;
    margin-bottom: 26px;
    @media ($largeDesktop) {
        height: 250px;
    }
    @media ($smallDesktop) {
        height: 300px;
    }
    @media ($laptop) {
        height: 250px;
    }
    @media ($tablet) {
        height: 200px;
    }
    @media ($mediumTablet) {
        height: 180px;
    }
    @media ($smallTablet) {
        height: 150px;
    }
    @media ($smallerTablet) {
        height: 200px;
    }
}
.title {
    display: block;
    font-size: 16px;
    line-height: 1.75;
    letter-spacing: 1px;
    margin-bottom: 15px;
}
.content {
    font-size: 16px;
    line-height: 1.63;
    padding: 0 15px;
}
.date {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    text-align: center;
    color: #83a1ab;
}
.dateIcon {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin-bottom: 3px;
}
.dateLabel {
    margin-left: 12px;
    font-size: 14px;
    @media ($smallTablet) {
        font-size: 12px;
    }
}
.text {
    font-size: 14px;
    line-height: 1.715;
    @media ($smallTablet) {
        font-size: 13px;
    }
}
.mediaType {
    position: relative;
    width: 42px;
    height: 42px;
    border-radius: 100%;
    margin: 0 auto;
    @media ($smallTablet) {
        width: 36px;
        height: 36px;
    }
    &.facebook {
        background-color: #385899;
    }
    &.instagram {
        background: linear-gradient(
            0deg,
            #f09433 0%,
            #e6683c 25%,
            #dc2743 50%,
            #cc2366 75%,
            #bc1888 100%
        );
    }
    &.twitter {
        background-color: #1da1f2;
    }
    &.youtube {
        background-color: #ff0000;
    }
    &.linkedin {
        background-color: #0077b5;
    }
}
.mediaTypeIcon {
    height: 18px;
    @media ($smallTablet) {
        height: 16px;
    }
}
</style>
