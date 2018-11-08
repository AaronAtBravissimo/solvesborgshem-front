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
                    :target="item.target"
                    class="link"
                >
                    <span v-html="item.title"></span>
                </Applink>
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
.mainNavigation {
    margin-right: 45px;
    @media ($smallDesktop) {
        margin-right: 30px;
    }
    @media ($laptop) {
        display: none;
    }
}
.item {
    margin-right: 39px;
    @media ($smallDesktop) {
        margin-right: 25px;
    }
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
    &:hover,
    &:focus {
        color: $primaryColor;
    }
}

.nuxt-link-exact-active:not(:focus),
.nuxt-link-active:not(:focus) {
    color: $primaryColor;
    &::after {
        opacity: 1;
    }
}
</style>
