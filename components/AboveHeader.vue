<template>
    <header class="aboveHeader">
        <div class="outer w-full flex">
            <div class="inner w-full">
                <div class="left flex items-center">
                    <AppButton
                        :icon="apartmentsIcon"
                        label="Lediga lägenheter"
                        class="iconAndLabel thinLabel apartmentsIcon noMarginRight"
                        url="https://minasidor.solvesborgshem.se/"
                    />
                    <AppButton
                        v-if="number > 0"
                        :counter="number"
                        label="Se lägenheter"
                        class="iconAndLabel availableApartments"
                        url="https://minasidor.solvesborgshem.se/"
                    />
                    <AppButton
                        :icon="penIcon"
                        label="Registrera dig"
                        class="registerButton iconAndLabel thinLabel penIcon noMarginRight"
                        url="https://minasidor.solvesborgshem.se/"
                    />
                </div>
                <div class="right">
                    <AppButton
                        :icon="errorReportIcon"
                        label="Felanmälan"
                        class="iconAndLabel"
                        url="/kundtjanst/felanmalan/"
                    />
                    <AppButton
                        :icon="customizeIcon"
                        label="Tillgänglighet"
                        class="iconAndLabel customizeIcon"
                        url="/tillganglighet/"
                    />
                    <SearchButton/>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import AppButton from './AppButton.vue';
import SearchButton from './SearchButton.vue';
import apartmentsIcon from '../assets/images/icon-apartments.svg';
import errorReportIcon from '../assets/images/icon-error-report.svg';
import customizeIcon from '../assets/images/icon-customize.svg';
import penIcon from '../assets/images/icon-pen.svg';

export default {
    components: {
        AppButton,
        SearchButton,
    },
    data() {
        return {
            apartmentsIcon,
            errorReportIcon,
            customizeIcon,
            penIcon,
            number: 0,
        };
    },
};
</script>

<style lang="scss" scoped>
.aboveHeader {
    background-color: $primaryBackgroundColor;
    display: flex;
    margin-left: -#{$frameSize};
    width: calc(100% + #{$frameSize * 2});
    @media ($smallDesktop) {
        margin-left: -#{$frameSizeSmallDesktop};
        width: calc(100% + #{$frameSizeSmallDesktop * 2});
    }
    @media ($smallerTablet) {
        display: none;
    }
}
.outer {
    background-color: $primaryBackgroundColor;
    min-height: 69px;
    @media #{$laptopLessHeight} {
        min-height: 60px;
    }
    @media ($tablet) {
        min-height: 55px;
    }
}
.inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    @media ($smallDesktop) {
        padding: 0 30px;
    }
    @media ($tablet) {
        justify-content: center;
    }
}
.right {
    margin-right: -12px;
    @media ($tablet) {
        display: none;
    }
}
.availableApartments {
    margin-right: 10px;
}
.registerButton {
    margin-left: 20px;
    @media ($largeTablet) {
        display: none;
    }
}
</style>
