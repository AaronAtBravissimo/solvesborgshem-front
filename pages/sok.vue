<template>
    <div class="search">
        <TopSection :top-section="topSection"/>
        <form @submit.prevent="searchHandler">
            <input
                :value="keyword"
                type="search"
                name=""
            >
        </form>
        <div
            v-if="loading"
            class="loader"
        >
            Laddar...
        </div>
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
        <div
            v-if="results.length < 1 && !loading"
            class="noResults"
        >
            Inget sökresultat kunde hittas.
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import TopSection from '../components/TopSection.vue';
import SmallCard from '../components/SmallCard.vue';
import { apiUrl } from '../utils/config';

export default {
    components: {
        TopSection,
        SmallCard,
    },
    data: () => ({
        results: [],
        loading: true,
        topSection: {
            heading: 'Sökresultat',
            preamble: 'Du sökte efter',
            image: null,
        },
    }),
    computed: {
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
input {
    border: 1px solid #000;
}
</style>
