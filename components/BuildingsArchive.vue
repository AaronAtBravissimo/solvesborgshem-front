<template>
    <div class="buildingsArchive">
        <div class="buildings">
            <div
                v-for="building in buildings"
                :key="building.id"
                class="building"
            >
                {{ building.post_title }}
            </div>
        </div>
    </div>
</template>

<script>
import buildings from '../static/json/buildings.json';

export default {
    data: () => ({
        buildings,
    }),
};
</script>

<style lang="scss" scoped>
</style>
