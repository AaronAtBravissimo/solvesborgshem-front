<template>
    <transition
        @enter="slideDown"
        @leave="slideUp"
    >
        <div
            v-show="searchOpen"
            id="expandedSearch"
            :aria-hidden="!searchOpen ? 'true' : 'false'"
            aria-labelledby="searchButton searchButtonResponsive"
            class="expandedSearch relative"
        >
            <div class="container">
                <div class="inner flex items-center justify-center">
                    <form
                        role="search"
                        class="form w-full relative"
                        @submit.prevent="searchHandler"
                    >
                        <img
                            :src="searchIcon"
                            class="icon"
                            alt=""
                        >
                        <input
                            ref="searchField"
                            v-model="keyword"
                            type="search"
                            class="searchField w-full"
                            placeholder="Ange din sökning här..."
                            aria-label="Sök igenom innehåll på webbplatsen"
                        >
                    </form>
                </div>
                <AppButton
                    :icon="closeIcon"
                    label="Stäng"
                    class="closeButton iconAndLabel"
                    aria-label="Stäng sektion för att kunna söka"
                    @clicked="closeSearch()"
                />
            </div>
        </div>
    </transition>
</template>

<script>
/* eslint-disable no-param-reassign */

import AppButton from './AppButton.vue';
import searchIcon from '../assets/images/icon-search.svg';
import closeIcon from '../assets/images/icon-close-white.svg';

export default {
    components: {
        AppButton,
    },
    data: () => ({
        keyword: '',
        searchIcon,
        closeIcon,
    }),
    computed: {
        searchOpen() {
            const open = this.$store.getters.expandedSearchOpen;
            if (open) {
                this.$nextTick(() => {
                    this.$refs.searchField.focus();
                });
            }
            return open;
        },
    },
    methods: {
        searchHandler() {
            this.$router.push(`/sok/?sokord=${this.keyword}`);
        },
        closeSearch() {
            this.$store.commit('closeSearch');
            document.querySelector('.searchButton').focus();
        },
        slideDown(el, done) {
            el.style.transition = '0.35s';
            el.style.overflow = 'hidden';
            el.style.height = 0;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.height = `${el.firstChild.offsetHeight}px`;
                });
            });

            setTimeout(() => {
                el.style.height = '';
                done();
                el.classList.add('done');
            }, 350);
        },
        slideUp(el, done) {
            el.style.height = `${el.firstChild.offsetHeight}px`;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.height = 0;
                });
            });

            setTimeout(() => {
                done();
                el.classList.remove('done');
            }, 350);
        },
    },
};
</script>

<style lang="scss" scoped>
$iconSize: 22px;
$iconSizeSmallTablet: 18px;
$iconSizeMobile: 16px;

.expandedSearch {
    background-color: $primaryTextColor;
    margin-left: -50px;
    width: calc(100% + 100px);
    transition: 0.35s;
    overflow: hidden;
    @media ($smallDesktop) {
        margin-left: -30px;
        width: calc(100% + 60px);
    }
}
.inner {
    width: 800px;
    max-width: 100%;
    padding: 50px 0;
    margin: 0 auto;
    @media ($smallTablet) {
        padding: 40px 0;
    }
    @media ($mobile) {
        padding: 25px 15px;
    }
}
.form {
    padding: 18px 0;
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    opacity: 0;
    transition: 0.25s;
    @media ($smallTablet) {
        padding: 14px 0;
    }
    @media ($mobile) {
        margin: 10px 0 5px;
        padding: 10px 0;
    }
    .done & {
        opacity: 1;
    }
}
.icon {
    position: absolute;
    left: 0;
    top: 50%;
    width: $iconSize;
    height: $iconSize;
    margin-top: -#{$iconSize / 2};
    opacity: 0.8;
    @media ($smallTablet) {
        width: $iconSizeSmallTablet;
        height: $iconSizeSmallTablet;
        margin-top: -#{$iconSizeSmallTablet / 2};
    }
    @media ($mobile) {
        width: $iconSizeMobile;
        height: $iconSizeMobile;
        margin-top: -#{$iconSizeMobile / 2};
    }
}
.searchField {
    font-size: 18px;
    font-family: $secondaryFont;
    line-height: normal;
    color: #ffffff;
    padding-left: #{$iconSize + 15px};
    @media ($smallTablet) {
        font-size: 16px;
        padding-left: #{$iconSizeSmallTablet + 15px};
    }
    @media ($mobile) {
        font-size: 15px;
        padding-left: #{$iconSizeMobile + 15px};
    }
    &::placeholder {
        color: #ffffff;
        opacity: 0.65;
    }
    &:focus {
        outline: 2px solid #fff;
        outline-offset: 8px;
    }
}
.closeButton {
    position: absolute;
    right: 30px;
    top: 30px;
    min-width: 0;
    @media ($smallTablet) {
        right: 15px;
        top: 15px;
    }
    @media ($mobile) {
        right: 30px;
        top: 10px;
    }
    /deep/ .label {
        @media ($mobile) {
            display: none;
        }
    }
    /deep/ .icon {
        width: 12px;
        height: 12px;
        opacity: 0.5;
    }
}
</style>
