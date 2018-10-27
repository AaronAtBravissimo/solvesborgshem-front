<template>
    <div class="employee flex items-center">
        <img
            :src="image"
            :alt="employee.image.alt"
            class="image objectFitCover"
        >
        <div class="infoHolder">
            <h3 class="heading">{{ employee.name }}</h3>
            <p
                v-if="employee.title"
                class="title"
            >
                {{ employee.title }}
            </p>
            <p
                v-if="employee.description"
                class="description"
            >
                {{ employee.description }}
            </p>
            <p
                v-if="employee.phone"
                class="phone"
            >
                <b>
                    Tel:
                    <a
                        class="link"
                        href="`tel:${employee.phone}`"
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
                        class="link"
                        href="`mailto:${employee.mail}`"
                    >
                        {{ employee.mail }}
                    </a>
                </b>
            </p>
        </div>
    </div>
</template>

<script>
import placeholderImage from '../assets/images/placeholder.png';

export default {
    props: {
        employee: {
            type: Object,
            required: true,
        },
    },
    computed: {
        image() {
            if (!this.employee.image) {
                return placeholderImage;
            }

            return this.employee.image.sizes.medium;
        },
    },
};
</script>

<style lang="scss" scoped>
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
}
.infoHolder {
    flex-shrink: 1;
    padding-left: 60px;
}
.heading {
    margin-bottom: 5px;
}
.title {
    font-family: $secondaryFont;
    font-style: italic;
    font-size: 20px;
    font-weight: 300;
    line-height: 1.3;
    margin-bottom: 15px;
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
}
</style>
