<template>
    <aside
        :class="{'isOpen': open}"
        class="expandedMenu"
    >
        <nav class="inner">
            <ul class="list list-reset">
                <li
                    v-for="item in menu.items"
                    :key="item.ID"
                    class="item relative"
                    @click="$store.commit('closeMenu')"
                >
                    <AppLink
                        :url="item.url"
                        :target="item.target"
                        classes="link font-semibold"
                    >
                        <span v-html="item.title"></span>
                    </AppLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script>
export default {
    computed: {
        menu() {
            return this.$store.getters.menu;
        },
        open() {
            return this.$store.getters.expandedMenuOpen;
        },
    },
};
</script>

<style lang="scss" scoped>
.expandedMenu {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 250px;
    z-index: 40;
    overflow: auto;
    background-color: $primaryColor;
    opacity: 0;
    transition-delay: 0.35s;
    &.isOpen {
        opacity: 1;
        transition-delay: 0s;
    }
}

.list {
    padding: 0;
    padding-bottom: 30px;
    padding-top: 60px;
    @media ($mobile) {
        padding-top: 38px;
    }
}

.link {
    color: #ffffff;
    font-weight: 700;
    font-size: 16px;
    padding: 12px 25px;
    display: block;
    position: relative;
    &.nuxt-link-active {
        padding-left: 55px;
    }
    &::after {
        content: "";
        position: absolute;
        left: 25px;
        top: 50%;
        margin-top: -6px;
        width: 17px;
        height: 12px;
        opacity: 0;
        transition: 0.25s 0.25s;
    }
    &.nuxt-link-active::after {
        opacity: 1;
    }
}
</style>
