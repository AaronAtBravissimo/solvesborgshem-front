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
            <span class="inner flex items-center">
                <span class="icon">

                </span>
                <span class="label">
                    {{ filter.label }}
                </span>
            </span>
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
$checkWidthMediumTablet: 6px;
$checkWidthSmallerTablet: 5px;

.filters {
    margin: 0 -25px;
    @media ($mediumTablet) {
        margin: 0 -15px;
    }
    @media ($smallerTablet) {
        margin: 0 -12px;
    }
    @media ($mobile) {
        margin: 0 -8px;
        justify-content: space-between;
    }
    @media ($smallerMobile) {
        margin: 0 0 -15px;
        flex-wrap: wrap;
    }
}

.filter {
    margin: 0 25px;
    text-align: left;
    @media ($mediumTablet) {
        margin: 0 15px;
    }
    @media ($smallerTablet) {
        margin: 0 12px;
    }
    @media ($mobile) {
        margin: 0 8px;
    }
    @media ($smallerMobile) {
        width: 100%;
        margin: 0 0 15px;
    }
    &.isActive .icon::after {
        border-color: $primaryTextColor;
        animation: check 0.5s;
        @media ($mediumTablet) {
            animation: checkMediumTablet 0.5s;
        }
        @media ($smallerTablet) {
            animation: checkSmallerTablet 0.5s;
        }
    }
}
.icon {
    flex-shrink: 0;
    position: relative;
    width: 34px;
    height: 34px;
    border-radius: 100%;
    background-color: #dfe8eb;
    @media ($mediumTablet) {
        width: 30px;
        height: 30px;
    }
    @media ($smallerTablet) {
        width: 26px;
        height: 26px;
    }
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
        @media ($mediumTablet) {
            width: $checkWidthMediumTablet;
            height: $checkWidthMediumTablet * 2;
            margin-left: -#{$checkWidthMediumTablet + 1px};
        }
        @media ($smallerTablet) {
            width: $checkWidthSmallerTablet;
            height: $checkWidthSmallerTablet * 2;
            margin-left: -#{$checkWidthSmallerTablet + 1px};
        }
    }
}
.label {
    flex-grow: 1;
    padding-left: 16px;
    font-family: $secondaryFont;
    line-height: 1.63;
    font-size: 16px;
    @media ($mediumTablet) {
        padding-left: 14px;
        font-size: 15px;
    }
    @media ($smallerTablet) {
        padding-left: 10px;
        font-size: 13px;
    }
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

@keyframes checkMediumTablet {
    0% {
        width: 0;
        height: 0;
    }
    25% {
        width: $checkWidthMediumTablet;
        height: 0;
    }
    50% {
        width: $checkWidthMediumTablet;
        height: $checkWidthMediumTablet * 2;
    }
}

@keyframes checkSmallerTablet {
    0% {
        width: 0;
        height: 0;
    }
    25% {
        width: $checkWidthSmallerTablet;
        height: 0;
    }
    50% {
        width: $checkWidthSmallerTablet;
        height: $checkWidthSmallerTablet * 2;
    }
}
</style>
