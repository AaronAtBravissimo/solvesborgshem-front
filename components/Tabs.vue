<template>
    <div
        role="tablist"
        class="tabs flex flex-wrap justify-center"
    >
        <AppButton
            v-for="(tab, index) in tabs"
            :key="index"
            :id="`tab-${index}-${moduleNumber}`"
            :class="{'notActive': active !== index}"
            :label="tab.name"
            :aria-selected="active === index ? 'true' : 'false'"
            :aria-controls="active === index ? `tabGroup-${index}-${moduleNumber}` : false"
            class="tab"
            role="tab"
            @clicked="changeTab(index)"
        />
    </div>
</template>

<script>
import AppButton from './AppButton.vue';

export default {
    components: {
        AppButton,
    },
    props: {
        tabs: {
            type: Array,
            required: true,
        },
        active: {
            type: Number,
            required: true,
        },
        moduleNumber: {
            type: Number,
            default: null,
        },
    },
    methods: {
        changeTab(index) {
            if (this.active !== index) {
                this.$emit('changed', index);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.tabs {
    margin: 0 -10px 40px;
    @media ($tablet) {
        margin: 0 -8px 35px;
    }
    @media ($smallTablet) {
        margin: 0 -6px 25px;
    }
    @media ($mobile) {
        margin: 0 -3px 12px;
    }
}
.tab {
    margin: 0 10px 20px;
    min-width: 0;
    @media ($tablet) {
        margin: 0 8px 16px;
    }
    @media ($smallTablet) {
        margin: 0 6px 12px;
    }
    @media ($mobile) {
        margin: 0 3px 6px;
        padding: 5px 12px;
    }
    &:focus {
        outline: 2px solid $primaryTextColor !important;
        outline-offset: 3px !important;
    }
}
.button.notActive {
    background-color: #ddd;
    &:hover {
        background-color: $primaryBackgroundColor;
    }
}
.tabs /deep/ .label {
    @media ($mobile) {
        letter-spacing: 0.8px;
        font-size: 9px;
    }
}
</style>
