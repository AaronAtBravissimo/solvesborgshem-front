<template>
    <aside
        v-click-outside="closeMenu"
        id="expandedMenu"
        :class="open ? 'isOpen' : 'resetMenu'"
        :aria-hidden="!open ? 'true' : 'false'"
        aria-labelledby="menuButton"
        class="expandedMenu"
    >
        <nav class="inner">
            <ul class="list list-reset">
                <li
                    v-for="(item, index) in menu.items"
                    :key="item.ID"
                    :class="`appearDelay-${index + 1}`"
                    class="item relative animation"
                    @click="$store.commit('closeMenu')"
                >
                    <AppLink
                        :url="item.url"
                        :target="item.target"
                        class="link font-semibold"
                    >
                        <span v-html="item.title"></span>
                    </AppLink>
                </li>
            </ul>
            <ul class="list-reset">
                <li @click="$store.commit('closeMenu')">
                    <AppButton
                        :icon="userIcon"
                        :class="`appearDelay-${menu.items.length + 1}`"
                        url="/mina-sidor/"
                        label="Mina sidor"
                        class="loginButton animation"
                    />
                </li>
                <li @click="$store.commit('closeMenu')">
                    <AppButton
                        :icon="errorReportIcon"
                        :class="`appearDelay-${menu.items.length + 2}`"
                        label="Felanmälan"
                        class="iconAndLabel animation"
                        url="/kundtjanst/"
                    />
                </li>
                <li @click="$store.commit('closeMenu')">
                    <AppButton
                        :icon="customizeIcon"
                        :class="`appearDelay-${menu.items.length + 3}`"
                        label="Tillgänglighet"
                        class="iconAndLabel customizeIcon animation"
                        url="/tillganglighet/"
                    />
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script>
import AppButton from './AppButton.vue';
import userIcon from '../assets/images/icon-user.svg';
import errorReportIcon from '../assets/images/icon-error-report.svg';
import customizeIcon from '../assets/images/icon-customize.svg';

export default {
    components: {
        AppButton,
    },
    data: () => ({
        userIcon,
        errorReportIcon,
        customizeIcon,
    }),
    computed: {
        menu() {
            return this.$store.getters.menu;
        },
        open() {
            return this.$store.getters.expandedMenuOpen;
        },
    },
    mounted() {
        document.addEventListener('keydown', this.keyListener);
    },
    methods: {
        keyListener(event) {
            if (this.open && event.keyCode === 27) { // escape
                this.$store.commit('closeMenu');
            }
        },
        closeMenu(event) {
            if (this.open && !(event.target.classList.contains('hamburger') || event.target.classList.contains('line'))) {
                this.$store.commit('closeMenu');
            }
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
    background-color: $primaryBackgroundColor;
    opacity: 0;
    transition-delay: 0.35s;
    display: none;
    -webkit-overflow-scrolling: touch;
    @media ($laptop) {
        display: block;
    }
    @media ($mobile) {
        padding: 30px;
        width: 260px;
    }
    &.isOpen {
        opacity: 1;
        transition-delay: 0s;
    }
}

.list {
    margin-bottom: 25px;
}

.animation {
    opacity: 0;
    transform: translateY(100px);
    .isOpen & {
        opacity: 1;
        transform: translateY(0px);
    }
    .resetMenu & {
        transition-duration: 0s;
        transition-delay: 0s;
    }
}

.link {
    font-family: $secondaryFont;
    color: #ffffff;
    font-weight: 500;
    font-size: 18px;
    padding: 20px 0;
    display: block;
    position: relative;
    letter-spacing: 1px;
    border-bottom: 1px solid transparentize(#ffffff, 0.75);
    @media ($mobile) {
        font-size: 15px;
        padding: 15px 0;
    }
}
.loginButton {
    margin-bottom: 20px;
}
.iconAndLabel {
    display: none;
    min-width: 0px;
    padding: 0;
    margin-right: 0;
    margin-bottom: 15px;
    @media ($tablet) {
        display: inline-block;
    }
}

@for $i from 0 to 15 {
    .appearDelay-#{$i} {
        transition: transform 1s cubic-bezier(0.165, 0.84, 0.44, 1) #{0.05 + $i/10 + s},
        opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1) #{0.1 + $i/10 + s};
    }
}
</style>
