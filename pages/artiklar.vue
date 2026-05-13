<template>
    <div class="artiklarPage">
        <div class="topBanner">
            <div class="container">
                <h1 class="pageTitle">Nyheter</h1>
            </div>
        </div>
        <div class="wideContainer">
            <div class="filterBox">
                <span class="filterLabel">Filtrering</span>
                <div class="filterRow">
                    <div class="filterGroup">
                        <label
                            class="filterGroupLabel"
                            for="filter-category"
                        >Kategori</label>
                        <div class="selectWrapper">
                            <select
                                id="filter-category"
                                v-model="selectedCategory"
                                class="filterSelect"
                            >
                                <option value="">Alla kategorier</option>
                                <option
                                    v-for="cat in categories"
                                    :key="cat.term_id"
                                    :value="cat.term_id"
                                >
                                    {{ cat.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="filterGroup">
                        <label
                            class="filterGroupLabel"
                            for="filter-year"
                        >Årtal</label>
                        <div class="selectWrapper">
                            <select
                                id="filter-year"
                                v-model="selectedYear"
                                class="filterSelect"
                            >
                                <option value="">Alla år</option>
                                <option
                                    v-for="year in years"
                                    :key="year"
                                    :value="year"
                                >
                                    {{ year }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <p class="filterSummary">
                Visar artiklar för
                <strong>{{ selectedCategory ? categoryName : 'alla kategorier' }}</strong>,
                <strong>{{ selectedYear || 'alla år' }}</strong>
            </p>
            <div class="columns">
                <div
                    v-for="article in visibleArticles"
                    :key="article.id"
                    class="column"
                >
                    <NewsCard :article="article" />
                </div>
            </div>
            <div
                v-if="hasMore"
                class="loadMoreHolder"
            >
                <button
                    class="loadMoreBtn"
                    @click="loadMore"
                >
                    Visa {{ remaining }} artiklar till
                </button>
            </div>
        </div>
    </div>
</template>


<script>
import articles from '../static/json/articles.json';
import NewsCard from '../components/NewsCard.vue';

const PAGE_SIZE = 6;

export default {
    components: {
        NewsCard,
    },
    head() {
        return { title: 'Nyheter & Aktuellt – Sölvesborgshem' };
    },
    data: () => ({
        articles,
        selectedCategory: '',
        selectedYear: '',
        visibleCount: PAGE_SIZE,
    }),
    computed: {
        sortedArticles() {
            return this.articles
                .slice()
                .sort((a, b) => {
                    const dateA = new Date(a.article_date || a.post_date || 0);
                    const dateB = new Date(b.article_date || b.post_date || 0);
                    return dateB - dateA;
                });
        },
        categories() {
            const seen = [];
            const cats = [];
            this.sortedArticles.forEach((article) => {
                const terms = article.taxonomies && article.taxonomies.article_category;
                if (terms) {
                    terms.forEach((term) => {
                        if (!seen.includes(term.term_id)) {
                            seen.push(term.term_id);
                            cats.push(term);
                        }
                    });
                }
            });
            return cats;
        },
        years() {
            const seen = [];
            this.sortedArticles.forEach((article) => {
                const raw = article.article_date || article.post_date;
                if (raw) {
                    const y = new Date(raw).getFullYear();
                    if (!seen.includes(y)) seen.push(y);
                }
            });
            return seen.sort((a, b) => b - a);
        },
        filteredArticles() {
            return this.sortedArticles.filter((article) => {
                const matchCat = !this.selectedCategory || (
                    article.taxonomies
                    && article.taxonomies.article_category
                    && article.taxonomies.article_category.some(
                        t => t.term_id === this.selectedCategory,
                    )
                );
                const raw = article.article_date || article.post_date;
                const matchYear = !this.selectedYear || (
                    raw && new Date(raw).getFullYear() === this.selectedYear
                );
                return matchCat && matchYear;
            });
        },
        visibleArticles() {
            return this.filteredArticles.slice(0, this.visibleCount);
        },
        hasMore() {
            return this.visibleCount < this.filteredArticles.length;
        },
        remaining() {
            const left = this.filteredArticles.length - this.visibleCount;
            return Math.min(left, PAGE_SIZE);
        },
        categoryName() {
            const cat = this.categories.find(c => c.term_id === this.selectedCategory);
            return cat ? cat.name : '';
        },
    },
    watch: {
        selectedCategory() {
            this.visibleCount = PAGE_SIZE;
        },
        selectedYear() {
            this.visibleCount = PAGE_SIZE;
        },
    },
    methods: {
        loadMore() {
            this.visibleCount += PAGE_SIZE;
        },
    },
};
</script>

<style lang="scss" scoped>
.wideContainer {
    width: 1440px;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 40px;
    @media ($tablet) {
        padding: 0 30px;
    }
    @media ($mobile) {
        padding: 0 15px;
    }
}
.artiklarPage {
    padding-bottom: 80px;
    @media ($mobile) {
        padding-bottom: 40px;
    }
}
.topBanner {
    background-color: #f5f9fb;
    padding: 50px 0 40px;
    margin-bottom: 40px;
    @media ($mobile) {
        padding: 30px 0 25px;
        margin-bottom: 24px;
    }
}
.pageTitle {
    font-size: 36px;
    @media ($mobile) {
        font-size: 26px;
    }
}
.filterBox {
    background-color: #f5f9fb;
    margin-bottom: 20px;
}
.filterLabel {
    display: block;
    font-family: $secondaryFont;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 14px;
    color: #555;
}
.filterRow {
    display: flex;
    gap: 20px;
    @media ($mobile) {
        flex-direction: column;
        gap: 12px;
    }
}
.filterGroup {
    flex: 1;
}
.filterGroupLabel {
    display: block;
    font-size: 13px;
    color: #83a1ab;
    margin-bottom: 6px;
    font-family: $secondaryFont;
}
.selectWrapper {
    position: relative;
    &::after {
        content: '▾';
        position: absolute;
        right: 14px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: #555;
        font-size: 14px;
    }
}
.filterSelect {
    width: 100%;
    appearance: none;
    border: 1px solid #d2dde1;
    background: #fff;
    padding: 10px 36px 10px 14px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    &:focus {
        outline: none;
        border-color: #3aa2d2;
    }
}
.filterSummary {
    font-size: 14px;
    color: #555;
    margin-bottom: 30px;
}
.columns {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
    @media ($mobile) {
        margin: 0;
    }
}
.column {
    width: calc(33.333% - 30px);
    height: 450px;
    margin: 0 15px 30px;
    position: relative;
    @media ($tablet) {
        width: 100%;
    }
    @media ($smallTablet) {
        width: 100%;
        margin: 0 0 20px;
    }
    /deep/ .newsCardTitle {
        font-size: 16px;
    }
}
.loadMoreHolder {
    text-align: center;
    margin-top: 20px;
}
.loadMoreBtn {
    display: inline-block;
    padding: 12px 32px;
    border: 1px solid #3aa2d2;
    background: transparent;
    color: #3aa2d2;
    font-family: $secondaryFont;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background: #3aa2d2;
        color: #fff;
    }
}
</style>
