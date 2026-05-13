<template>
    <article class="newsCardWrap">
        <AppLink
            :url="article.post_link"
            class="newsCard"
        >
            <img
                v-if="image"
                :src="image"
                :alt="imageAlt"
                class="newsCardImage"
            >
            <div
                v-else
                class="newsCardPlaceholder"
            />
            <div class="newsCardOverlay">
                <div class="newsCardMeta">
                    <span
                        v-if="category"
                        class="newsCardCategory"
                    >{{ category }}</span>
                    <span class="newsCardDateLine">
                        <span
                            v-if="category && formattedDate"
                            class="newsCardSep"
                        >– </span>
                        <span class="newsCardDate">{{ formattedDate }}</span>
                    </span>
                </div>
                <div class="newsCardBottom">
                    <h3 class="newsCardTitle">{{ article.post_title }}</h3>
                    <span class="newsCardArrow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <line
                                x1="5"
                                y1="12"
                                x2="19"
                                y2="12"
                            />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </span>
                </div>
            </div>
        </AppLink>
    </article>
</template>

<script>
import AppLink from './AppLink.vue';

export default {
    components: {
        AppLink,
    },
    props: {
        article: {
            type: Object,
            required: true,
        },
    },
    computed: {
        image() {
            if (this.article.image && this.article.image.sizes) {
                return this.article.image.sizes.large;
            }
            return null;
        },
        imageAlt() {
            if (this.article.image) {
                return this.article.image.alt || '';
            }
            return '';
        },
        formattedDate() {
            const raw = this.article.article_date || this.article.post_date;
            if (!raw) return '';
            const d = new Date(raw);
            return d.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
        },
        category() {
            const terms = this.article.taxonomies && this.article.taxonomies.article_category;
            if (terms && terms.length > 0) return terms[0].name;
            return null;
        },
    },
};
</script>

<style lang="scss" scoped>
.newsCardWrap {
    width: 100%;
    height: 100%;
    position: relative;
    display: block;
}
.newsCard {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &:hover .newsCardImage {
        transform: scale(1.04);
    }
    &:hover .newsCardArrow {
        opacity: 1;
    }
}
.newsCardImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
}
.newsCardPlaceholder {
    width: 100%;
    height: 100%;
    background-color: #cdd8dc;
}
.newsCardOverlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to top,
        rgba(0,0,0,0.72) 0%,
        rgba(0,0,0,0.18) 55%,
        transparent 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 24px;
    @media ($mobile) {
        padding: 16px;
    }
}
.newsCardMeta {
    font-family: $primaryFont;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.85);
    margin-bottom: 6px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    @media ($mobile) {
        font-size: 9px;
        letter-spacing: 0.5px;
    }
}
.newsCardCategory {
    display: inline-block;
    background-color: rgba(0,0,0,0.55);
    color: $primaryColor;
    padding: 3px 6px;
    border-radius: 3px;
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}
.newsCardDateLine {
    white-space: nowrap;
}
.newsCardSep {
    color: rgba(255,255,255,0.6);
}
.newsCardDate {
    color: rgba(255,255,255,0.85);
}
.newsCardTitle {
    font-family: $secondaryFont;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.25;
    color: #fff;
    margin: 0;
    @media ($tablet) {
        font-size: 15px;
    }
    @media ($mobile) {
        font-size: 14px;
    }
}
.newsCardBottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
}
.newsCardArrow {
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    border: 1.5px solid rgba(255,255,255,0.7);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    opacity: 0.7;
    transition: opacity 0.25s;
}
</style>
