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
            {{ filter.label }}
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
.filter {
    margin: 0 20px;
    &.isActive {
        border-bottom: 2px solid #000;
    }
}
</style>
