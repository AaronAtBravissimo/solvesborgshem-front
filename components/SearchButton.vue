<template>
    <AppButton
        :id="name"
        :icon="darkStyle ? searchIconDark : searchIcon"
        :aria-expanded="searchOpen.toString()"
        aria-controls="expandedSearch"
        aria-label="Öppna sektion för att kunna söka"
        class="searchButton iconAndLabel"
        label="Sök"
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
        name: {
            type: String,
            default: 'searchButton',
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
