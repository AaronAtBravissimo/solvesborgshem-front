<template>
    <div
        :class="{'isOpen': isOpen, 'isDisabled': disabled}"
        class="select"
        @click="toggle()"
    >
        <div class="activeItem">{{ activeItem.label }}</div>
        <ul class="dropdown">
            <li
                v-for="(item, index) in items"
                :key="index"
                :class="[selected === index ? 'isSelected' : '']"
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
    },
    data() {
        return {
            selected: this.initialSelected,
            isOpen: false,
        };
    },
    computed: {
        activeItem() {
            return this.items[this.selected];
        },
    },
    methods: {
        changeActive(index) {
            this.selected = index;
            this.$emit('changed', this.activeItem.value);
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
.activeItem {
    position: relative;
    padding: $verticalPadding;
    padding-right: 64px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    z-index: 1;
    border: 1px solid $borderColor;
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
    &:hover {
        background-color: #e8e8e8;
    }
    &.isSelected {
        background-color: $borderColor;
    }
    &:last-child {
        border: 0;
    }
}
</style>
