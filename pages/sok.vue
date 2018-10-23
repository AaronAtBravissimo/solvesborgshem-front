<template>
    <div class="search">
        <TopSection :top-section="topSection"/>
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
                    class="flex-no-shrink"
                    label="Sök här"
                    type="submit"
                />
            </form>
        </div>
        <Spinner v-if="loading"/>
        <no-ssr v-if="results.length > 0 && !loading">
            <div class="results">
                <div class="smallCardColumns flex flex-wrap">
                    <div
                        v-for="result in results"
                        :key="result.link"
                        class="smallCardColumn flex"
                    >
                        <SmallCard
                            :image="result.image"
                            :heading="result.heading"
                            :content="result.preamble"
                            :link="result.link"
                        />
                    </div>
                </div>
            </div>
        </no-ssr>
        <p
            v-if="results.length < 1 && !loading"
            class="noResultsText"
        >
            Inget sökresultat kunde hittas.
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import TopSection from '../components/TopSection.vue';
import SmallCard from '../components/SmallCard.vue';
import AppButton from '../components/AppButton.vue';
import Spinner from '../components/Spinner.vue';
import { apiUrl } from '../utils/config';
import searchIcon from '../assets/images/icon-search.svg';

export default {
    components: {
        TopSection,
        SmallCard,
        AppButton,
        Spinner,
    },
    data: () => ({
        results: [],
        loading: true,
        searchIcon,
    }),
    computed: {
        topSection() {
            return {
                heading: 'Sökresultat',
                preamble: `Du sökte efter ${this.keyword}`,
                image: this.$store.getters.options.searchTopImage,
            };
        },
        keyword() {
            return this.$route.query.sokord;
        },
    },
    watch: {
        $route: {
            handler: 'search',
            immediate: true,
        },
    },
    methods: {
        async search() {
            this.loading = true;
            const res = await axios.get(`${apiUrl}/api/search?keyword=${this.keyword}`);
            this.results = res.data;
            this.loading = false;
        },
        searchHandler(event) {
            const keyword = event.target[0].value;
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
.spinner {
    margin-top: 80px;
}
.noResultsText {
    text-align: center;
    font-style: italic;
    margin-top: 80px;
}
</style>
