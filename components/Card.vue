<template>
    <a
        :href="card.link"
        class="card"
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
                <p class="text">{{ card.text }}</p>
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
</template>

<script>
import facebook from '../assets/images/card/facebook.svg';
import instagram from '../assets/images/icon-instagram.svg';
import linkedin from '../assets/images/card/linkedin.svg';
import twitter from '../assets/images/card/twitter.svg';
import youtube from '../assets/images/card/youtube.svg';

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

            return 'https://via.placeholder.com/353x353';
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
    },
};
</script>

<style lang="scss" scoped>
.card {
    font-family: $secondaryFont;
    width: 100%;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0 0 50px 0 rgba(13, 42, 56, 0.1);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* &:hover {
        transform: translateY(-10px);
    } */ // NOTE: Plocka fram senare
}
.top {
    margin-bottom: 57px;
}
.bottom {
    margin-bottom: 20px;
}
.imageHolder {
    position: relative;
    height: 353px;
    margin-bottom: 26px;
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
}
.text {
    font-size: 14px;
    line-height: 1.715;
}
.tag {
    display: block;
    position: absolute;
    left: 50%;
    top: 0;
    min-width: 135px;
    max-width: 100%;
    transform: translateX(-50%);
    z-index: 2;
    line-height: 1.15;
    font-size: 15px;
    color: #ffffff;
    padding: 12px;
    text-align: center;
    text-transform: capitalize;
    font-weight: 300;

}
.mediaType {
    position: relative;
    width: 42px;
    height: 42px;
    border-radius: 100%;
    margin: 0 auto;
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
}
</style>
