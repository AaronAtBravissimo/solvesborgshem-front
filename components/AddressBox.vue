<template>
    <div class="addressBox flex">
        <div class="left flex justify-center">
            <div class="iconHolder flex-no-shrink">
                <img :src="apartmentsIcon">
            </div>
            <div class="textHolder flex-shrink content">
                <p>
                    Adress:<br>
                    <span v-html="address"></span>
                </p>
            </div>
        </div>
        <div class="right flex">
            <no-ssr>
                <gmap-map
                    :zoom="16"
                    :center="positon"
                    :options="{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }"
                    map-type-id="roadmap"
                >
                    <gmap-marker
                        :icon="icon"
                        :position="positon"
                        :draggable="false"
                    />
                </gmap-map>
            </no-ssr>
        </div>
    </div>
</template>

<script>
import apartmentsIcon from '../assets/images/icon-apartments.svg';
import markerIcon from '../assets/images/icon-marker.svg';

export default {
    props: {
        map: {
            type: Object,
            default: null,
        },
        address: {
            type: String,
            default: null,
        },
    },
    data: () => ({
        apartmentsIcon,
        icon: {
            url: markerIcon,
            size: {
                width: 46.32,
                height: 61.84,
                f: 'px',
                b: 'px',
            },
            scaledSize: {
                width: 46.32,
                height: 61.84,
                f: 'px',
                b: 'px',
            },
        },
    }),
    computed: {
        positon() {
            return {
                lat: Number(this.map.lat),
                lng: Number(this.map.lng),
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.addressBox {
    margin-bottom: 30px;
}
.left {
    width: 50%;
    background-color: $primaryColor;
    color: #ffffff;
    padding: 70px 30px;
}
.right {
    width: 50%;
}
.iconHolder {
    width: 50px;
}
.textHolder {
    padding-left: 15px;
    padding-top: 2px;
    font-size: 16px;
}
.vue-map-container {
    width: 100%;
}
</style>
