<template>
    <AppButton
        id="searchButton"
        :icon="darkStyle ? searchIconDark : searchIcon"
        :aria-expanded="searchOpen.toString()"
        aria-controls="expandedSearch"
        aria-label="Öppna sektion för att kunna söka"
        label="Sök"
        class="searchButton iconAndLabel"
        @clicked="toggleSearch()"
    />
</template>

<script>
import AppButton from './AppButton.vue';
import searchIcon from '../assets/images/icon-search.svg';
import searchIconDark from '../assets/images/icon-search-grey.svg';

export default {
    components: {
        AppButton,
    },
    props: {
        darkStyle: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        searchIcon,
        searchIconDark,
    }),
    computed: {
        searchOpen() {
            return this.$store.getters.expandedSearchOpen;
        },
    },
    methods: {
        toggleSearch() {
            this.$store.commit('toggleSearch');
        },
    },
};
</script>

<style lang="scss" scoped>
.searchButton {
    min-width: 0;
    /deep/ .label {
        @media ($mobile) {
            display: none;
        }
    }
}
</style>
