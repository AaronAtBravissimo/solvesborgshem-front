<template>
    <div class="tabs flex justify-center">
        <div
            v-for="(tab, index) in tabs"
            :key="index"
            class="tab"
        >
            <AppButton
                :class="{'notActive': active !== index}"
                :label="tab.name"
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
    margin-bottom: 60px;
}
.tab {
    margin: 0 10px;
}
.button.notActive {
    background-color: #ddd;
}
</style>
