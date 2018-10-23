<template>
    <div class="search">
        test
    </div>
</template>

<script>
export default {
    computed: {
        keyword() {
            return this.$route.params.keyword;
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
