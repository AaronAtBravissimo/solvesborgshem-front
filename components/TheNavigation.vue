<template>
    <nav>
        <ul class="list-reset flex">
            <li
                v-for="item in menu.items"
                :key="item.ID"
                class="ml-6"
            >
                <AppLink
                    :url="item.url"
                    :title="item.title"
                    :target="item.target"
                    classes="font-semibold"
                />
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    computed: {
        menu() {
            return this.$store.getters.menu;
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
