<template>
    <div class="buildingsArchiveMap">
        <no-ssr>
            <gmap-map
                ref="gmap"
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
                    v-for="(area, index) in areas"
                    :key="area.id"
                    :icon="icon"
                    :position="getPosition(area.address)"
                    :draggable="false"
                    @click="changeFilter(area.term_id, index)"
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
    mounted() {
        if (!process.client) return;

        this.$nextTick(() => {
            this.$refs.gmap.$mapPromise.then((map) => {
                const bounds = new window.google.maps.LatLngBounds();

                for (let i = 0; i < this.areas.length; i++) {
                    bounds.extend(this.getPosition(this.areas[i].address));
                }

                map.fitBounds(bounds);
            });
        });
    },
    methods: {
        getPosition(cords) {
            return {
                lat: Number(cords.lat),
                lng: Number(cords.lng),
            };
        },
        changeFilter(areaId, index) {
            this.$emit('changed', areaId, index);
        },
    },
};
</script>

<style lang="scss" scoped>
.vue-map-container {
    width: 100%;
    height: 650px;
    margin-bottom: 30px;
}
</style>
