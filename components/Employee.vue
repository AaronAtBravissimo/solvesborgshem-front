<template>
    <div class="employee flex items-center">
        <AppImage
            :image="image"
            :alt="employee.image.alt"
            :use-webp="employee.image ? true : false"
            class="image objectFitCover"
        />
        <div class="infoHolder">
            <h3 class="heading">{{ employee.name }}</h3>
            <p
                v-if="employee.title"
                class="title"
            >
                {{ employee.title }}
            </p>
            <p
                v-if="description"
                class="description"
                v-html="description"
            >
            </p>
            <p
                v-if="employee.phone"
                class="phone"
            >
                <b>
                    Tel:
                    <a
                        :href="`tel:${employee.phone.replace(/\s+/g, '')}`"
                        class="link"
                    >
                        {{ employee.phone }}
                    </a>
                </b>
            </p>
            <p
                v-if="employee.mail"
                class="email"
            >
                <b>
                    E-post:
                    <a
                        :href="`mailto:${employee.mail}`"
                        class="link"
                    >
                        {{ employee.mail }}
                    </a>
                </b>
            </p>
        </div>
    </div>
</template>

<script>
import AppImage from './AppImage.vue';
import imageMissing from '../assets/images/image-missing.jpg';

export default {
    components: {
        AppImage,
    },
    props: {
        employee: {
            type: Object,
            required: true,
        },
    },
    computed: {
        image() {
            if (!this.employee.image) {
                return imageMissing;
            }

            return this.employee.image.sizes.medium;
        },
        description() {
            if (!this.employee.description) {
                return false;
            }
            const description = this.employee.description.split(':');
            return !description[1]
                ? description[0] : `<b>${description[0]}:</b>${description[1]}`;
        },
    },
};
</script>

<style lang="scss" scoped>
.employee {
    @media ($largeDesktop) {
        flex-wrap: wrap;
    }
    @media ($smallTablet) {
        justify-content: center;
    }
}
.image {
    flex-shrink: 0;
    width: 236px;
    height: 236px;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
    @media ($largeDesktop) {
        width: 200px;
        height: 200px;
        margin: 0 auto 30px;
    }
    @media ($tablet) {
        margin-bottom: 20px;
        width: 180px;
        height: 180px;
    }
    @media ($mediumTablet) {
        width: 160px;
        height: 160px;
        margin: 0 0 20px;
    }
    @media ($mobile) {
        width: 120px;
        height: 120px;
    }
}
.infoHolder {
    flex-shrink: 1;
    padding-left: 60px;
    @media ($largeDesktop) {
        width: 100%;
        padding-left: 0;
        text-align: center;
    }
    @media ($mediumTablet) {
        width: auto;
        padding-left: 30px;
        text-align: left;
    }
    @media ($smallTablet) {
        width: 100%;
        padding-left: 0;
        text-align: center;
    }
}
.heading {
    margin-bottom: 5px;
    @media ($tablet) {
        font-size: 18px;
        letter-spacing: 3px;
    }
    @media ($mobile) {
        font-size: 17px;
        letter-spacing: 1.5px;
    }
}
.title {
    font-family: $secondaryFont;
    font-style: italic;
    font-size: 20px;
    font-weight: 300;
    line-height: 1.3;
    margin-bottom: 15px;
    @media ($tablet) {
        font-size: 18px;
    }
    @media ($smallTablet) {
        font-size: 17px;
    }
    @media ($mobile) {
        font-size: 15px;
    }
}
.description {
    margin-bottom: 15px;
}
.link {
    color: $primaryColor;
    &:hover {
        color: $primaryTextColor;
    }
}
p {
    font-size: 16px;
    margin-bottom: 0;
    @media ($tablet) {
        font-size: 15px;
    }
    @media ($smallTablet) {
        font-size: 14px;
    }
    @media ($mobile) {
        font-size: 13px;
    }
}
</style>
