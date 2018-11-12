<template>
    <div class="searchFilterBox flex justify-center items-center">
        <form
            role="search"
            class="searchForm flex items-center"
            @submit.prevent="searchHandler"
        >
            <p
                v-if="searchLabel"
                class="text"
            >
                {{ searchLabel }}
            </p>
            <input
                :value="keyword"
                :aria-label="ariaLabelForSearch"
                type="search"
                class="searchInput"
                placeholder="Ange önskat sökord..."

            >
            <AppButton
                :icon="searchIcon"
                class="searchButton flex-no-shrink"
                label="Sök"
                type="submit"
            />
        </form>
        <slot name="filter">
        </slot>
    </div>
</template>

<script>
import AppButton from './AppButton.vue';
import searchIcon from '../assets/images/icon-search-white.svg';

export default {
    components: {
        AppButton,
    },
    props: {
        keyword: {
            type: String,
            default: null,
        },
        searchLabel: {
            type: String,
            default: null,
        },
        ariaLabelForSearch: {
            type: String,
            default: null,
        },
    },
    data: () => ({
        searchIcon,
    }),
    methods: {
        searchHandler(event) {
            const keyword = event.target[0].value;
            this.$emit('search', keyword);
        },
    },
};
</script>

<style lang="scss" scoped>
.searchFilterBox {
    background-color: #ffffff;
    padding: 50px;
    box-shadow: $primaryShadow;
    margin-bottom: 30px;
    @media ($largeDesktop) {
        padding: 50px 30px;
    }
    @media ($laptop) {
        padding: 40px 30px;
    }
    @media ($smallerTablet) {
        padding: 30px 15px;
    }
}
.searchForm {
    max-width: 100%;
}
.searchInput {
    width: 500px;
    max-width: 100%;
    border-radius: 6px;
    padding: 12px 20px;
    border: solid 1px #cfcfcf;
    background-color: #fafafa;
    font-size: 16px;
    font-family: $secondaryFont;
    line-height: normal;
    color: $primaryTextColor;
    margin-right: 15px;
    @media ($tablet) {
        padding: 12px 18px;
        font-size: 15px;
    }
    @media ($mobile) {
        width: calc(100% - 30px);
        padding: 12px 15px;
        font-size: 14px;
    }
    &:focus {
        outline: 2px solid $primaryTextColor;
        outline-offset: 5px;
        transition: .125s;
    }
}
.searchButton {
    @media ($tablet) {
        min-width: 0;
    }
    &:focus {
        outline-color: $primaryTextColor;
    }
}
.filterHolder {
    flex-shrink: 0;
    margin-left: 30px;
    margin-right: 30px;
}
.select {
    width: 300px;
    max-width: 100%;
}
.text {
    margin-bottom: 0;
    margin-right: 15px;
    flex-shrink: 0;
}
.mapFilterButton:focus {
    outline-color: #404040;
}
</style>
