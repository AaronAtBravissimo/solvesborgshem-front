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
                <p>{{ card.text }}</p>
            </div>
        </div>
        <div class="bottom">
            <span
                :class="card.type"
                class="tag"
            >
                {{ card.type }}
            </span>
        </div>
    </a>
</template>

<script>
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

            return 'https://via.placeholder.com/366x245';
        },
    },
};
</script>

<style lang="scss" scoped>
.card {
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
.imageHolder {
    position: relative;
    height: 353px;
    margin-bottom: 30px;
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
}
.date {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
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
    &.facebook {
        background-color: #385899;
    }
    &.instagram {
        background: linear-gradient(
            45deg,
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
</style>
