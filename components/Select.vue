<template>
    <div
        :id="name"
        :class="{'isOpen': isOpen, 'isDisabled': disabled}"
        class="select"
    >
        <button
            :id="`${name}_button`"
            :aria-expanded="isOpen.toString()"
            :aria-labelledby="`${name}_button`"
            :aria-controls="`${name}_list`"
            class="dropdownToggle"
            type="button"
            aria-haspopup="true"
            @click="toggle"
        >
            <span class="activeItem">{{ activeItem.label }}</span>
        </button>
        <ul
            ref="listboxNode"
            :id="`${name}_list`"
            :aria-labelledby="name"
            :aria-activedescendant="`${name}__item__0`"
            :role="isMenu ? 'menu' : 'listbox'"
            class="dropdown"
        >
            <li
                v-for="(item, index) in itemsFixed"
                :ref="`${name}__item__${index}`"
                :id="`${name}__item__${index}`"
                :key="index"
                :class="{'isFocused': focusedItem === index, 'isSelected': selected === index}"
                :aria-selected="selected === index ? true : false"
                :role="isMenu ? 'menuitem' : 'option'"
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
        name: {
            type: String,
            default: null,
        },
        items: {
            type: Array,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        showFirstItem: {
            type: Boolean,
            default: true,
        },
        isMenu: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selected: null,
            isOpen: false,
            focusedItem: null,
        };
    },
    computed: {
        activeItem() {
            return this.items[this.selected ? this.selected : 0];
        },
        itemsFixed() {
            if (this.showFirstItem) {
                return this.items;
            }

            return this.items.slice(1);
        },
    },
    watch: {
        focusedItem(val) {
            const { listboxNode } = this.$refs;
            const item = this.$refs[`${this.name}__item__${val}`][0];

            if (listboxNode.scrollHeight > listboxNode.clientHeight) {
                const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
                const elementBottom = item.offsetTop + item.offsetHeight;
                if (elementBottom > scrollBottom) {
                    listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
                } else if (item.offsetTop < listboxNode.scrollTop) {
                    listboxNode.scrollTop = item.offsetTop;
                }
            }
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
            if (!this.showFirstItem) {
                this.selected = index + 1;
            }
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
$borderColor: #ffffff;

$arrowSize: 16px;
$arrowSizeMobile: 14px;

$verticalPadding: 25px;
$verticalPaddingTablet: 18px;
$verticalPaddingMobile: 15px;

.select {
    font-family: $secondaryFont;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    @media ($mobile) {
        font-size: 13px;
    }
    &.isOpen .activeItem::after {
        transform: rotate(180deg);
    }
    &.isOpen .dropdown {
        transform: scaleY(1);
        z-index: 2;
        margin-top: -5px;
        border-top: 0;
    }
    &.isOpen .dropDownToggle {
        padding: 16px $verticalPadding 21px;
        @media ($tablet) {
            padding: 16px $verticalPaddingTablet 21px;
        }
        @media ($mobile) {
            padding: 16px $verticalPaddingMobile 21px;
        }
    }
    &.isDisabled {
        pointer-events: none;
        opacity: 0.6;
    }
}
.dropdownToggle {
    position: relative;
    padding: 16px $verticalPadding;
    padding-right: 60px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    z-index: 1;
    border: 2px solid $borderColor;
    width: 100%;
    border-radius: 6px;
    box-shadow: 7.5px 13px 30px 0 rgba(13, 42, 56, 0.1);
    outline: 0 !important;
    @media ($tablet) {
        padding: 16px $verticalPaddingTablet;
    }
    @media ($mobile) {
        padding: 16px $verticalPaddingMobile;
    }
    &::after {
        content: "";
        position: absolute;
        right: $verticalPadding;
        top: 50%;
        margin-top: (-$arrowSize / 2);
        width: $arrowSize;
        height: $arrowSize;
        background: url("../assets/images/icon-arrow.svg") no-repeat center;
        background-size: 100%;
        transition: 0.25s;
        @media ($tablet) {
            right: $verticalPaddingTablet;
        }
        @media ($mobile) {
            right: $verticalPaddingMobile;
            margin-top: (-$arrowSizeMobile / 2);
            width: $arrowSizeMobile;
            height: $arrowSizeMobile;
        }
        .isOpen & {
            transform: rotate(0.5turn);
            margin-top: -10px;
        }
    }
    &:focus,
    .isOpen & {
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
    max-height: 320px;
    background-color: #ffffff;
    border: 2px solid $primaryColor;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
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
    cursor: pointer;
    border-bottom: 1px solid #f1f1f1;
    transition: 0.25s;
    display: flex;
    align-items: center;
    font-weight: 400;
    padding: 12px $verticalPadding;
    @media ($tablet) {
        padding: 12px $verticalPaddingTablet;
    }
    @media ($mobile) {
        padding: 12px $verticalPaddingMobile;
    }
    &.isSelected {
        background-color: $borderColor;
    }
    &.isFocused,
    &:hover,
    &:focus {
        background-color: #f1f1f1;
    }
    &:first-child {
        border-top: 1px solid #f1f1f1;
    }
    &:last-child {
        border: 0;
    }
}
</style>
