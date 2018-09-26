<template>
    <button
        :class="{'isActive': open}"
        class="menuButton"
        type="button"
        @click="toggleMenu()"
    >
        <div class="inner">
            <div
                v-if="labels"
                class="labels"
            >
                <span class="label">{{ label }}</span>
            </div>
            <div class="hamburger">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </div>
        </div>
    </button>
</template>

<script>
export default {
    props: {
        labels: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        open() {
            return this.$store.getters.expandedMenuOpen;
        },
        label() {
            return this.menuOpen ? 'Stäng meny' : 'Meny';
        },
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu');
        },
    },
};
</script>

<style lang="scss" scoped>
$hamburgerWidth: 28px;
$hamburgerHeight: 18px;

.menuButton {
    display: none;
    @media ($laptop) {
        display: block;
    }
}
.inner {
    display: flex;
    align-items: center;
}
.labels {
    margin-right: 20px;
}
.label {
    font-size: 18px;
    font-weight: 400;
    transition: 0.25s;
}
.hamburger {
    position: relative;
    width: $hamburgerWidth;
    height: $hamburgerHeight;
}
.line {
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: $primaryColor;
    left: 0;
    top: 0;
    transition: 0.25s;
}
.line:nth-child(2) {
    top: 50%;
    margin-top: -1px;
}
.line:nth-child(3) {
    top: 100%;
    margin-top: -2px;
}

.menuButton:hover {
    .label {
        color: $primaryColor;
    }
}

.menuButton.isActive {
    .line {
        transform: rotate(45deg);
        margin-top: 8px;
    }
    .line:nth-child(2) {
        opacity: 0;
    }
    .line:nth-child(3) {
        transform: rotate(-225deg);
        margin-top: -10px;
    }
}
</style>
