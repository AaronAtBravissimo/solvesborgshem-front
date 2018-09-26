<template>
    <header class="mainHeader">
        <div class="inner">
            <div class="logoHolder flex-no-shrink">
                <Logo/>
            </div>
            <div class="navigationHolder flex flex-grow items-center justify-end">
                <TheNavigation/>
                <AppButton
                    :icon="userIcon"
                    url="#minaSidor"
                    label="Mina sidor"
                    class="loginButton"
                />
            </div>
        </div>
    </header>
</template>

<script>
import Logo from './Logo.vue';
import TheNavigation from './TheNavigation.vue';
import AppButton from './AppButton.vue';
import userIcon from '../assets/images/icon-user.svg';

export default {
    components: {
        Logo,
        TheNavigation,
        AppButton,
    },
    data() {
        return {
            userIcon,
        };
    },
};
</script>

<style lang="scss" scoped>
.logoHolder {
    width: 378px;
    height: 44px;
    position: relative;
    top: -4px;
    @media ($smallDesktop) {
        width: 350px;
        height: 40px;
        top: -2px;
    }
}
.inner {
    padding: 40px 0 46px; // NOTE: Paddingen nedåt bör plockas bort sedan...
    display: flex;
    align-items: center;
}
.loginButton {
    @media ($laptop) {
        display: none;
    }
}
</style>
