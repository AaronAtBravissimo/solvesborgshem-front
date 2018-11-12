<template>
    <header class="aboveHeader">
        <div class="inner w-full">
            <div class="left flex items-center">
                <AppButton
                    :icon="apartmentsIcon"
                    label="Lediga lägenheter just nu"
                    class="iconAndLabel thinLabel apartmentsIcon noMarginRight"
                    tabindex="-1"
                />
                <AppButton
                    :counter="number"
                    label="Se lägenheter"
                    class="iconAndLabel"
                    url="/soka-bostad/lediga-lagenheter/"
                />
            </div>
            <div class="right">
                <AppButton
                    :icon="errorReportIcon"
                    label="Felanmälan"
                    class="iconAndLabel"
                    url="/kundtjanst/"
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
    </header>
</template>

<script>
import AppButton from './AppButton.vue';
import SearchButton from './SearchButton.vue';
import apartmentsIcon from '../assets/images/icon-apartments.svg';
import errorReportIcon from '../assets/images/icon-error-report.svg';
import customizeIcon from '../assets/images/icon-customize.svg';

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
            number: 2,
        };
    },
};
</script>

<style lang="scss" scoped>
.aboveHeader {
    background-color: #232323;
    min-height: 69px;
    display: flex;
    margin-left: -#{$frameSize};
    width: calc(100% + #{$frameSize * 2});
    @media ($smallDesktop) {
        margin-left: -#{$frameSizeSmallDesktop};
        width: calc(100% + #{$frameSizeSmallDesktop * 2});
    }
    @media ($tablet) {
        min-height: 55px;
    }
    @media ($smallerTablet) {
        display: none;
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
</style>
