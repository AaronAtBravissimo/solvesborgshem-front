<template>
    <div class="search">
        <TopSection :top-section="topSection"/>
        <SearchFilterBox
            :keyword="keyword"
            aria-label-for-search="Sök igenom innehåll på webbplatsen"
            @search="searchHandler"
        />
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
                            :image="result.image.url"
                            :imagealt="result.image.alt"
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
import SearchFilterBox from '../components/SearchFilterBox.vue';
import Spinner from '../components/Spinner.vue';
import { apiUrl } from '../utils/config';

export default {
    components: {
        TopSection,
        SmallCard,
        AppButton,
        SearchFilterBox,
        Spinner,
    },
    head() {
        return {
            title: 'Sökresultat - Sölvesborghem',
        };
    },
    data: () => ({
        results: [],
        loading: true,
    }),
    computed: {
        topSection() {
            return {
                heading: 'Sökresultat',
                preamble:
                    `
                        Du sökte efter <b>"${this.keyword}"</b>.<br>
                        Det finns <b>${this.results.length} träffar</b> som motsvarar din sökning.
                    `,
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
        searchHandler(keyword) {
            this.$router.replace(`/sok/?sokord=${keyword}`);
        },
        async search() {
            this.loading = true;
            const res = await axios.get(`${apiUrl}/api/search?keyword=${this.keyword}`);
            this.results = res.data;
            this.loading = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.spinner {
    margin-top: 80px;
}
.noResultsText {
    text-align: center;
    font-style: italic;
    margin-top: 80px;
}
</style>
