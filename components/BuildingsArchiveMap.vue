<template>
    <div class="buildingsArchiveMap">
        <no-ssr>
            <gmap-map
                :zoom="10"
                :center="positon"
                :options="{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }"
                map-type-id="roadmap"
            >
                <gmap-marker
                    v-for="area in areas"
                    :key="area.id"
                    :icon="icon"
                    :position="getPosition(area.address)"
                    :draggable="false"
                    @click="changeFilter(area.term_id)"
                />
            </gmap-map>
        </no-ssr>
    </div>
</template>

<script>
import markerIcon from '../assets/images/icon-marker.svg';

export default {
    props: {
        areas: {
            type: Array,
            required: true,
        },
    },
    data: () => ({
        icon: {
            url: markerIcon,
            size: {
                width: 44,
                height: 65,
                f: 'px',
                b: 'px',
            },
            scaledSize: {
                width: 44,
                height: 65,
                f: 'px',
                b: 'px',
            },
        },
    }),
    computed: {
        positon() {
            return {
                lat: 56.05734270000001,
                lng: 14.587357300000008,
            };
        },
    },
    methods: {
        getPosition(cords) {
            return {
                lat: Number(cords.lat),
                lng: Number(cords.lng),
            };
        },
        changeFilter(areaId) {
            this.$emit('changed', areaId);
        },
    },
};
</script>

<style lang="scss" scoped>
.vue-map-container {
    width: 100%;
    height: 600px;
    margin-bottom: 30px;
}
</style>
