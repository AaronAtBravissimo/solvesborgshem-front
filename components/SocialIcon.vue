<template>
    <a
        :href="link"
        class="socialIcon relative"
        target="_blank"
    >
        <AppCircle/>
        <img
            v-if="icon === 'facebook'"
            class="socialIcon__image"
            src="../assets/images/icon-facebook.svg"
            alt="Ikon för Facebook"
        >
        <img
            v-if="icon === 'instagram'"
            class="socialIcon__image"
            src="../assets/images/icon-instagram.svg"
            alt="Ikon för Instagram"
        >
    </a>
</template>

<script>
import AppCircle from './AppCircle.vue';

export default {
    components: {
        AppCircle,
    },
    props: {
        icon: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            default: '',
        },
    },
};
</script>
<style lang="scss">
.socialIcon {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 22px;
    line-height: 0;
    @media ($mobile) {
        width: 44px;
        height: 44px;
    }
    &:last-child {
        margin-right: 0;
    }
    &__image {
        margin-top: -2px;
        width: 16px;
        height: 16px;
    }
    &:hover {
        .secondaryCircle {
            stroke-dashoffset: 0;
        }
        .primaryCircle {
            stroke-dashoffset: -227;
        }
    }
}
</style>
