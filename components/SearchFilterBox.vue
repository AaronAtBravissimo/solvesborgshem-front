<template>
    <div class="searchFilterBox flex justify-center items-center">
        <form
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
                type="search"
                class="searchInput"
                placeholder="Ange önskat sökord..."
            >
            <AppButton
                :icon="searchIcon"
                class="searchButton flex-no-shrink"
                label="Sök här"
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
    padding: 30px 50px;
    box-shadow: 0 0 50px 0 rgba(13, 42, 56, 0.1);
    margin-bottom: 30px;
    @media ($largeDesktop) {
        padding: 30px;
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
    border-radius: 6px;
    padding: 12px 20px;
    border: solid 1px #cfcfcf;
    background-color: #fafafa;
    font-size: 16px;
    font-family: $secondaryFont;
    line-height: normal;
    color: $primaryTextColor;
    margin-right: 15px;
}
.searchButton:focus {
    outline-color: $primaryTextColor;
}
.filterHolder {
    width: 405px;
    flex-shrink: 0;
    margin-left: 30px;
    @media ($laptop) {
        width: 200px;
        margin-left: 15px;
    }
    .text {
        @media ($laptop) {
            display: none;
        }
    }
}
.select {
    width: 200px;
    @media ($laptop) {
        width: 100%;
    }
}
.text {
    margin-bottom: 0;
    margin-right: 15px;
    flex-shrink: 0;
}
</style>
