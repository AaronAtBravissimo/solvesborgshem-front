<template>
    <div
        :class="{'isOpen': isOpen, 'isDisabled': disabled}"
        :aria-expanded="isOpen"
        aria-haspopup="true"
        role="menu"
        class="select"
    >
        <button
            class="dropdownToggle"
            type="button"
            @click="toggle"
        >
            {{ activeItem.label }}
        </button>
        <ul class="dropdown">
            <li
                v-for="(item, index) in itemsFixed"
                :key="index"
                :class="{'isFocused': focusedItem === index, 'isSelected': selected === index}"
                class="dropdownItem"
                @click="changeActive(index)"
            >
                {{ item.label }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        initialSelected: {
            type: Number,
            default: 0,
        },
        showFirstItem: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            selected: this.initialSelected,
            isOpen: false,
            focusedItem: null,
        };
    },
    computed: {
        activeItem() {
            return this.items[this.selected];
        },
        itemsFixed() {
            if (this.showFirstItem) {
                return this.items;
            }

            return this.items.slice(1);
        },
    },
    created() {
        if (process.client) {
            document.addEventListener('keydown', this.keyListener);
            document.addEventListener('click', this.clickOutSideHandler);
        }
    },
    beforeDestroy() {
        document.removeEventListener('click', this.clickOutSideHandler);
        document.removeEventListener('keydown', this.keyListener);
    },
    methods: {
        clickOutSideHandler(event) {
            const classes = event.target.classList;

            if (
                !classes.contains('select')
                && !classes.contains('dropdownToggle')
                && !classes.contains('dropdown')
                && !classes.contains('dropdownItem')
            ) {
                this.isOpen = false;
            }
        },
        keyListener(event) {
            if (!this.isOpen) return;

            if (event.keyCode === 27 || event.keyCode === 9) { // Escape or Tab
                this.isOpen = false;
            } else if (event.keyCode === 38) { // Arrow up
                event.preventDefault();
                if (this.focusedItem > 0) {
                    this.focusedItem--;
                }
            } else if (event.keyCode === 40) { // Arrow down
                event.preventDefault();
                if (this.focusedItem === null) {
                    this.focusedItem = 0;
                } else if (this.focusedItem < (this.itemsFixed.length - 1)) {
                    this.focusedItem++;
                }
            } else if (event.keyCode === 13 && this.focusedItem !== null) {
                this.changeActive(this.focusedItem);
            }
        },
        changeActive(index) {
            this.selected = index;
            this.$emit('changed', this.activeItem.value);
            this.isOpen = false;
        },
        toggle() {
            if (this.disabled) {
                return;
            }

            this.isOpen = !this.isOpen;
        },
    },
};
</script>

<style lang="scss" scoped>
$borderColor: #ced4da;
$arrowSize: 24px;
$verticalPadding: 20px;

.select {
    cursor: pointer;
    position: relative;
    &.isOpen .activeItem::after {
        transform: rotate(180deg);
    }
    &.isOpen .dropdown {
        transform: scaleY(1);
        z-index: 2;
    }
    &.isDisabled {
        pointer-events: none;
        opacity: 0.6;
    }
}
.dropdownToggle {
    position: relative;
    padding: $verticalPadding;
    padding-right: 64px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    z-index: 1;
    border: 2px solid $borderColor;
    width: 100%;
    &::after {
        content: "";
        position: absolute;
        top: 50%;
        margin-top: (-$arrowSize / 2);
        right: $verticalPadding;
        width: $arrowSize;
        height: $arrowSize;
        background: url("../assets/images/icon-arrow.svg") no-repeat center;
        background-size: 100%;
        transition: 0.25s;
    }
    &:focus {
        border-color: $primaryColor;
    }
}
.dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    list-style: none;
    transform: scaleY(0);
    transition: 0.25s;
    transform-origin: top;
    overflow: auto;
    box-shadow: 0 10px 30px 2px rgba(0, 0, 0, 0.1);
    max-height: 320px;
    background-color: #ffffff;
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px #dddddd;
        border-radius: 0;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.25);
        border-radius: 100px;
    }
}
.dropdownItem {
    border-bottom: 1px solid $borderColor;
    transition: 0.25s;
    display: flex;
    align-items: center;
    padding: 12px $verticalPadding;
    &.isSelected {
        background-color: $borderColor;
    }
    &.isFocused,
    &:hover,
    &:focus {
        background-color: #e8e8e8;
    }
    &:last-child {
        border: 0;
    }
}
</style>
