<template>
    <div class="tabs flex flex-wrap justify-center">
        <div
            v-for="(tab, index) in tabs"
            :key="index"
            class="tab"
        >
            <AppButton
                :id="`tab-${index}`"
                :class="{'notActive': active !== index}"
                :label="tab.name"
                :aria-selected="active === index ? 'true' : 'false'"
                :aria-controls="active === index ? `tabGroup-${index}-${moduleNumber}` : false"
                :role="active === index ? 'tab' : false"
                @clicked="changeTab(index)"
            />
        </div>
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
    margin-bottom: 40px;
    @media ($tablet) {
        margin-bottom: 35px;
    }
    @media ($smallTablet) {
        margin-bottom: 25px;
    }
    @media ($mobile) {
        margin-bottom: 15px;
    }
}
.tab {
    margin: 0 10px 20px;
    @media ($tablet) {
        margin: 0 8px 16px;
    }
    @media ($smallTablet) {
        margin: 0 6px 12px;
    }
    @media ($mobile) {
        margin: 0 4px 8px;
    }
    /deep/ .button {
        @media ($smallTablet) {
            min-width: 0;
        }
    }
    /deep/ .button:focus {
        outline: 2px solid $primaryTextColor;
        outline-offset: 3px;
    }
}
.button.notActive {
    background-color: #ddd;
}
</style>
