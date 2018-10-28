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
                    url="/mina-sidor/"
                    label="Mina sidor"
                    class="loginButton"
                />
                <SearchButton dark-style/>
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
import SearchButton from './SearchButton.vue';
import userIcon from '../assets/images/icon-user.svg';

export default {
    components: {
        Logo,
        TheNavigation,
        AppButton,
        MenuButton,
        SearchButton,
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
    @media ($smallTablet) {
        width: 250px;
        height: 29px;
    }
    @media ($mobile) {
        width: 210px;
        height: 24px;
    }
    @media ($smallerMobile) {
        width: 190px;
        height: 22px;
    }
}
.inner {
    padding: 40px 0 46px;
    display: flex;
    align-items: center;
    @media ($smallTablet) {
        padding: 35px 0;
    }
    @media ($mobile) {
        padding: 25px 0;
    }
}
.loginButton {
    &:focus {
        outline: 2px solid $primaryTextColor;
        outline-offset: 3px;
        transition: 0.125s;
    }
    @media ($laptop) {
        display: none;
    }
}
.searchButton {
    display: none;
    @media ($tablet) {
        display: block;
    }
    /deep/ .label {
        color: $primaryTextColor;
    }
}
</style>
