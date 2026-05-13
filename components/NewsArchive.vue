<template>
    <section
        v-if="latestArticles.length > 0"
        class="newsArchive box"
    >
        <div class="container">
            <h2 class="sectionHeading">
                {{ heading || 'Nyheter & Aktuellt' }}
            </h2>
            <div class="featuredGrid">
                <div class="featuredMain">
                    <NewsCard
                        :article="latestArticles[0]"
                        class="mainCard"
                    />
                </div>
                <div
                    v-if="latestArticles.length > 1"
                    class="featuredSide"
                >
                    <div
                        v-for="article in latestArticles.slice(1, 3)"
                        :key="article.id"
                        class="sideCard"
                    >
                        <NewsCard :article="article" />
                    </div>
                </div>
            </div>
            <div class="moreLinkHolder">
                <AppLink
                    url="/artiklar"
                    class="moreLink"
                >
                    Fler nyheter
                </AppLink>
            </div>
        </div>
    </section>
</template>

<script>
import articles from '../static/json/articles.json';
import NewsCard from './NewsCard.vue';
import AppLink from './AppLink.vue';

export default {
    components: {
        NewsCard,
        AppLink,
    },
    props: {
        heading: {
            type: String,
            default: null,
        },
    },
    data: () => ({
        articles,
    }),
    computed: {
        latestArticles() {
            return this.articles
                .slice()
                .sort((a, b) => {
                    const dateA = new Date(a.article_date || a.post_date || 0);
                    const dateB = new Date(b.article_date || b.post_date || 0);
                    return dateB - dateA;
                })
                .slice(0, 3);
        },
    },
};
</script>

<style lang="scss" scoped>
.newsArchive {
    padding-bottom: 0;
}

.sectionHeading {
    font-family: $secondaryFont;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 28px;
    @media ($mobile) {
        font-size: 22px;
        margin-bottom: 20px;
    }
}
.featuredGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 8px;
    height: auto;
    overflow: hidden;
    @media ($laptop) {
        height: auto;
    }
    @media ($tablet) {
        height: auto;
        grid-template-columns: 1fr;
    }
    @media ($smallTablet) {
        grid-template-columns: 1fr;
        height: auto;
        overflow: visible;
    }
}
.featuredMain {
    height: 100%;
    max-height: 810px;
    overflow: hidden;
    @media ($smallTablet) {
        height: 400px;
    }
    @media ($largeTablet) {
        height: 400px;
    }
    @media ($tablet) {
        height: 400px;
    }
    @media ($mobile) {
        height: 300px;
    }
}
.mainCard {
    height: 100%;
}
.featuredSide {
    display: grid;
    grid-template-rows: auto;
    grid-auto-rows: 1fr;
    gap: 8px;
    height: 100%;
    max-height: 810px;
    @media ($smallTablet) {
        grid-template-rows: unset;
        grid-auto-rows: unset;
        grid-template-columns: 1fr;
        height: auto;
    }
    @media ($tablet) {
        grid-template-rows: unset;
        grid-auto-rows: unset;
        grid-template-columns: 1fr;
        height: auto;
    }
}
.sideCard {
    height: 100%;
    overflow: hidden;
    @media ($tablet) {
        height: 400px;
    }
    @media ($mobile) {
        height: 300px;
    }
}
.moreLinkHolder {
    margin-top: 32px;
    padding-bottom: 60px;
    text-align: center;
}
.moreLink {
    display: inline-block;
    padding: 12px 36px;
    border: 1.5px solid $primaryTextColor;
    border-radius: 40px;
    font-family: $primaryFont;
    font-size: 14px;
    color: $primaryTextColor;
    transition: 0.2s;
    &:hover {
        background-color: $primaryTextColor;
        color: #fff;
    }
}
</style>
