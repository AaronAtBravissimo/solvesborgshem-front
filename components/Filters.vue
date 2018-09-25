<template>
    <div class="filters flex justify-center">
        <button
            v-for="filter in filters"
            :key="filter.value"
            :class="{'isActive': active === filter.value}"
            type="button"
            class="filter"
            @click="changeFilter(filter.value)"
        >
            <div class="inner flex items-center">
                <div class="icon">

                </div>
                <div class="label">
                    {{ filter.label }}
                </div>
            </div>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        filters: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            active: 0,
        };
    },
    methods: {
        changeFilter(value) {
            if (this.active === value) return;

            this.active = value;
            this.$emit('filterChanged', value);
        },
    },
};
</script>

<style lang="scss" scoped>
$checkWidth: 7px;

.filter {
    margin: 0 25px;
    &.isActive .icon::after {
        border-color: $primaryTextColor;
        animation: check 0.5s;
    }
}
.icon {
    flex-shrink: 0;
    position: relative;
    width: 34px;
    height: 34px;
    border-radius: 100%;
    background-color: #dfe8eb;
    &::after {
        content: "";
        transform: scaleX(-1) rotate(180deg + -45deg);
        transform-origin: top left;
        border-right: 2px solid transparent;
        border-top: 2px solid transparent;
        display: block;
        width: $checkWidth;
        height: $checkWidth * 2;
        left: 50%;
        top: 50%;
        position: absolute;
        margin-left: -#{$checkWidth + 1px};
        margin-top: 1px;
    }
}
.label {
    flex-grow: 1;
    padding-left: 16px;
    font-family: $secondaryFont;
    line-height: 1.63;
    font-size: 16px;
}

@keyframes check {
    0% {
        width: 0;
        height: 0;
    }
    25% {
        width: $checkWidth;
        height: 0;
    }
    50% {
        width: $checkWidth;
        height: $checkWidth * 2;
    }
}
</style>
