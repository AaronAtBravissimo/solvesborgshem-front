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
        <AppButton
            :icon="userIcon"
            url="#minaSidor"
            label="Mina sidor"
            class="loginButton"
        />
    </aside>
</template>

<script>
import AppButton from './AppButton.vue';
import userIcon from '../assets/images/icon-user.svg';

export default {
    components: {
        AppButton,
    },
    data: () => ({
        userIcon,
    }),
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
    width: 300px;
    padding: 60px 30px;
    z-index: 40;
    overflow: auto;
    background-color: #232323;
    opacity: 0;
    transition-delay: 0.35s;
    display: none;
    @media ($laptop) {
        display: block;
    }
    @media ($mobile) {
        padding: 40px 15px;
    }
    &.isOpen {
        opacity: 1;
        transition-delay: 0s;
    }
}

.list {
    margin-bottom: 30px;
}

.link {
    color: #ffffff;
    font-weight: 700;
    font-size: 18px;
    padding: 15px 0;
    display: block;
    position: relative;
    text-transform: uppercase;
    letter-spacing: 4px;
    border-bottom: 2px solid transparentize(#ffffff, 0.75);
}
</style>
