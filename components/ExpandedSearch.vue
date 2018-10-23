<template>
    <transition
        @enter="slideDown"
        @leave="slideUp"
    >
        <div
            v-show="searchOpen"
            class="expandedSearch relative"
        >
            <div>
                <div class="inner flex items-center justify-center">
                    <form
                        class="form w-full relative"
                        @submit.prevent="searchHandler"
                    >
                        <img
                            :src="searchIcon"
                            class="icon"
                        >
                        <input
                            ref="searchField"
                            v-model="keyword"
                            type="search"
                            class="searchField w-full"
                            placeholder="Ange din sökning här..."
                        >
                    </form>
                </div>
                <AppButton
                    :icon="closeIcon"
                    label="Stäng"
                    class="closeButton iconAndLabel"
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
            if (this.keyword.length < 0) return;
            this.$router.push(`/sok/?sokord=${this.keyword}`);
        },
        closeSearch() {
            this.$store.commit('closeSearch');
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

.fade-in-enter-active {
    transition: all 0.5s ease;
}
.fade-in-leave-active {
    opacity: 0;
}
.fade-in-enter {
    opacity: 0;
}

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
    padding: 50px 0;
    margin: 0 auto;
}
.form {
    padding: 18px 0;
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    opacity: 0;
    transition: 0.25s;
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
    opacity: 0.5;
}
.searchField {
    font-size: 18px;
    font-family: $secondaryFont;
    line-height: normal;
    color: #ffffff;
    padding-left: #{$iconSize + 15px};
    &::placeholder {
        color: #ffffff;
        opacity: 0.65;
    }
}
.closeButton {
    position: absolute;
    right: 30px;
    top: 30px;
    /deep/ .icon {
        width: 12px;
        height: 12px;
    }
}
</style>
