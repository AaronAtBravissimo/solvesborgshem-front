<template>
    <div class="buildingsArchive">
        <div class="buildings">
            <AppLink
                v-for="building in buildings"
                :key="building.id"
                :url="building.post_link"

                class="building block"
            >
                {{ building.post_title }}
            </AppLink>
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
