<template>
    <div class="expandedSearch">
        <form @submit.prevent="searchHandler">
            <input
                v-model="keyword"
                type="search"
            >
        </form>
    </div>
</template>

<script>
export default {
    data: () => ({
        keyword: '',
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
.expandedSearch {
    width: 100%;
    top: 0;
    left: 0;
    padding: 50px;
    position: fixed;
    z-index: 100;
    background-color: $primaryTextColor;
}
input {
    width: 100%;
    background: #fff;
}
</style>
