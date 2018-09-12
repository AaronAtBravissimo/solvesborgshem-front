<template>
    <header class="mainHeader">
        <div class="inner">
            <div class="logoHolder flex-no-shrink">
                <Logo/>
            </div>
            <div class="navigationHolder flex flex-grow items-center justify-end">
                <TheNavigation/>
            </div>
        </div>
    </header>
</template>

<script>
import Logo from './Logo.vue';
import TheNavigation from './TheNavigation.vue';

export default {
    components: {
        Logo,
        TheNavigation,
    },
};
</script>

<style lang="scss" scoped>
.logoHolder {
    width: 378px;
    height: 44px;
    background-color: #000;
}
.inner {
    padding: 38px 50px;
    display: flex;
    align-items: center;
}
.navigationHolder {
    margin-right: 239px;
    margin-top: 8px;
}
</style>
