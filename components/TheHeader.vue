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
                <MenuButton/>
            </div>
        </div>
    </header>
</template>

<script>
import Logo from './Logo.vue';
import TheNavigation from './TheNavigation.vue';
import AppButton from './AppButton.vue';
import MenuButton from './MenuButton.vue';
import userIcon from '../assets/images/icon-user.svg';

export default {
    components: {
        Logo,
        TheNavigation,
        AppButton,
        MenuButton,
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
    @media ($mobile) {
        width: 220px;
        height: 26px;
    }
}
.inner {
    padding: 40px 0 46px; // NOTE: Paddingen nedåt bör plockas bort sedan...
    display: flex;
    align-items: center;
    @media ($mobile) {
        padding: 30px 0;
    }
}
.loginButton {
    @media ($laptop) {
        display: none;
    }
}
</style>
