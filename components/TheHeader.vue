<template>
    <header class="bg-grey-light">
        <div class="container">
            <div class="flex py-6 h-24">
                <div class="TheHeader__logoHolder flex flex-no-shrink bg-white p-6 -mt-4 shadow-lg">
                    <Logo/>
                </div>
                <div class="TheHeader__navigationHolder flex flex-grow items-center justify-end">
                    <TheNavigation/>
                </div>
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
.TheHeader__logoHolder {
    width: 127px;
    height: 188px;
}
</style>
