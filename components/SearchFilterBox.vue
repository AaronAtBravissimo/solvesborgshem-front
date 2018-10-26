<template>
    <div class="searchFilterBox flex justify-center">
        <form
            class="searchForm flex items-center"
            @submit.prevent="searchHandler"
        >
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
    </div>
</template>

<script>
import AppButton from './AppButton.vue';
import searchIcon from '../assets/images/icon-search.svg';

export default {
    components: {
        AppButton,
    },
    data: () => ({
        searchIcon,
    }),
    computed: {
        keyword() {
            return this.$route.query.sokord;
        },
    },
    methods: {
        searchHandler(event) {
            const keyword = event.target[0].value;
            if (!keyword || keyword.length < 0) return;
            this.$router.replace(`/sok/?sokord=${keyword}`);
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
}
.searchInput {
    min-width: 500px;
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
</style>
