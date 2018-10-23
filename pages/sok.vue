<template>
    <div class="search">
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
                <div
                    v-for="result in results"
                    :key="result.link"
                    class=""
                >
                    {{ result.heading }}
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
import { apiUrl } from '../utils/config';

export default {
    data: () => ({
        results: [],
        loading: true,
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
.results {
    padding-top: 500px;
}
</style>
