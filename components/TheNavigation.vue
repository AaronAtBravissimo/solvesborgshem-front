<template>
    <nav class="mainNavigation">
        <ul class="list-reset flex">
            <li
                v-for="item in menu.items"
                :key="item.ID"
                class="item"
            >
                <AppLink
                    :url="item.url"
                    :title="item.title"
                    :target="item.target"
                    classes="link"
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
.item {
    margin-right: 39px;
    &:last-child {
        margin-right: 0;
    }
}
.link {
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 2.8px;
    color: #404040;
    text-transform: uppercase;
    padding: 11px 0;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        height: 4px;
        background-color: $primaryColor;
        opacity: 0;
        transition: 0.25s;
    }
    &:hover {
        color: $primaryColor;
    }
}

.nuxt-link-exact-active {
    color: $primaryColor;
    &::after {
        opacity: 1;
    }
}
</style>
