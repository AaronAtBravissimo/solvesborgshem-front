<template>
    <header class="aboveHeader">
        <div class="inner w-full">
            <div class="left flex items-center">
                <AppButton
                    :icon="apartmentsIcon"
                    label="Lediga lägenheter just nu"
                    class="iconAndLabel thinLabel apartmentsIcon noMarginRight"
                />
                <AppButton
                    :counter="number"
                    label="Se lägenheter"
                    class="iconAndLabel"
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
                    label="Anpassa"
                    class="iconAndLabel customizeIcon"
                />
                <AppButton
                    :icon="searchIcon"
                    label="Sök"
                    class="iconAndLabel"
                />
            </div>
        </div>
    </header>
</template>

<script>
import AppButton from './AppButton.vue';
import apartmentsIcon from '../assets/images/icon-apartments.svg';
import errorReportIcon from '../assets/images/icon-error-report.svg';
import customizeIcon from '../assets/images/icon-customize.svg';
import searchIcon from '../assets/images/icon-search.svg';

export default {
    components: {
        AppButton,
    },
    data() {
        return {
            apartmentsIcon,
            errorReportIcon,
            customizeIcon,
            searchIcon,
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
    margin-left: -50px;
    width: calc(100% + 100px);
}
.inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
}
.right {
    margin-right: -12px;
}
</style>
