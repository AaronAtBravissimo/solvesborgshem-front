<template>
    <header class="mainHeader">
        <div class="inner">
            <div class="logoHolder flex-no-shrink">
                <Logo/>
            </div>
            <div class="navigationHolder flex flex-grow items-center justify-end">
                <TheNavigation/>
                <a
                    class="button"
                    href="#"
                >
                    <div class="flex">
                        <div class="button__inner">
                            <img
                                src="../assets/images/icon-user.svg"
                                class="button__icon"
                            >
                            <div class="button__label">Mina sidor</div>
                        </div>
                    </div>
                </a>
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
    position: relative;
    top: -4px;
}
.inner {
    padding: 40px 0 46px; // NOTE: Paddingen nedåt bör plockas bort sedan...
    display: flex;
    align-items: center;
}
</style>
