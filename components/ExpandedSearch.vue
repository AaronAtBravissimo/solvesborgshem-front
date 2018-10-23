<template>
    <div class="expandedSearch flex justify-center relative">
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
        />
    </div>
</template>

<script>
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
    methods: {
        searchHandler() {
            if (this.keyword.length < 0) return;
            this.$router.push(`/sok/?sokord=${this.keyword}`);
        },
    },
};
</script>

<style lang="scss" scoped>
$iconSize: 22px;

.expandedSearch {
    padding: 60px 0;
    background-color: $primaryTextColor;
    margin-left: -50px;
    width: calc(100% + 100px);
    @media ($smallDesktop) {
        margin-left: -30px;
        width: calc(100% + 60px);
    }
}
.inner {
    width: 800px;
}
.form {
    padding: 18px 0;
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
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
