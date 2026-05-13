<template>
    <div
        v-if="article"
        class="articlePage"
    >
        <div class="container">
            <div class="articleInner">
                <div class="articleMeta">
                    <nuxt-link
                        to="/artiklar"
                        class="backLink"
                    >
                        ← Alla nyheter
                    </nuxt-link>
                </div>
                <h1 class="articleTitle">
                    {{ article.post_title }}
                </h1>
                <div class="articleInfo">
                    <span class="articleDate">{{ formattedDate }}</span>
                </div>
                <p
                    v-if="article.preamble"
                    class="articlePreamble"
                >
                    {{ article.preamble }}
                </p>
                <div
                    v-if="heroImage"
                    class="articleHeroImage"
                >
                    <img
                        :src="heroImage"
                        :alt="heroImageAlt"
                        class="heroImg"
                    >
                </div>
                <div
                    v-if="article.content"
                    class="articleContent"
                    v-html="article.content"
                />
                <div class="articleFooter">
                    <nuxt-link
                        to="/artiklar"
                        class="backLinkBottom"
                    >
                        ← Tillbaka till alla nyheter
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getMeta, updatePage } from '../utils/helpers';

export default {
    head() {
        if (this.article && this.article.yoast) {
            return getMeta(this.article.yoast);
        }
        return { title: this.article ? this.article.post_title : 'Artikel' };
    },
    data: () => ({
        article: null,
    }),
    async asyncData({ route }) {
        let { path } = route;
        if (path.includes('.') || path.includes('wp-json')) return { article: null };
        path = path.replace(/\//g, '-_-');
        path = path.replace(/\\/g, '-_-');
        try {
            const data = await import(`../static/json/${path}.json`);
            return { article: Object.assign({}, data) };
        } catch (e) {
            return { article: null };
        }
    },
    computed: {
        formattedDate() {
            if (!this.article) return '';
            const raw = this.article.article_date || this.article.post_date;
            if (!raw) return '';
            const d = new Date(raw);
            return d.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
        },
        heroImage() {
            if (this.article && this.article.image && this.article.image.sizes) {
                return this.article.image.sizes.large;
            }
            return null;
        },
        heroImageAlt() {
            if (this.article && this.article.image) {
                return this.article.image.alt || '';
            }
            return '';
        },
    },
    async mounted() {
        const article = await updatePage(this.$route.path, 'article');
        if (article && article.post_title) this.article = article;
    },
};
</script>

<style lang="scss" scoped>
.articlePage {
    padding: 60px 0 80px;
    @media ($tablet) {
        padding: 40px 0 60px;
    }
    @media ($mobile) {
        padding: 30px 0 40px;
    }
}
.articleInner {
    max-width: 720px;
    margin: 0 auto;
}
.articleMeta {
    margin-bottom: 24px;
}
.backLink {
    font-size: 13px;
    font-family: $secondaryFont;
    color: #3aa2d2;
    letter-spacing: 1px;
    text-transform: uppercase;
}
.articleTitle {
    font-size: 40px;
    line-height: 1.2;
    margin-bottom: 16px;
    @media ($tablet) {
        font-size: 32px;
    }
    @media ($mobile) {
        font-size: 26px;
    }
}
.articleInfo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
    font-family: $secondaryFont;
    font-size: 13px;
    color: #83a1ab;
}
.articleDate {
    text-transform: uppercase;
    letter-spacing: 1px;
}
.articlePreamble {
    font-size: 18px;
    line-height: 1.7;
    color: #333;
    margin-bottom: 36px;
    font-weight: 500;
    @media ($mobile) {
        font-size: 16px;
    }
}
.articleHeroImage {
    margin-bottom: 40px;
}
.heroImg {
    width: 100%;
    height: auto;
    display: block;
}
.articleContent {
    font-size: 16px;
    line-height: 1.8;
    color: #333;
    /deep/ h2 {
        font-size: 24px;
        margin: 36px 0 16px;
    }
    /deep/ h3 {
        font-size: 20px;
        margin: 28px 0 12px;
    }
    /deep/ p {
        margin-bottom: 20px;
    }
    /deep/ a {
        color: #3aa2d2;
        text-decoration: underline;
    }
    /deep/ ul, /deep/ ol {
        margin: 0 0 20px 24px;
    }
    /deep/ img {
        max-width: 100%;
        height: auto;
        margin: 20px 0;
    }
    /deep/ blockquote {
        border-left: 4px solid #3aa2d2;
        margin: 28px 0;
        padding: 12px 24px;
        background: #f5f9fb;
        font-style: italic;
        font-size: 18px;
    }
}
.articleFooter {
    margin-top: 60px;
    padding-top: 32px;
    border-top: 1px solid #d2dde1;
}
.backLinkBottom {
    font-size: 13px;
    font-family: $secondaryFont;
    color: #3aa2d2;
    letter-spacing: 1px;
    text-transform: uppercase;
}
</style>
