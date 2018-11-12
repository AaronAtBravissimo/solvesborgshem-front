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
            <div
                :class="{'isFocused': mapIsFocused}"
                class="mapHolder flex w-full h-full"
            >
                <no-ssr>
                    <gmap-map
                        ref="gmap"
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
    </div>
</template>

<script>
import apartmentsIcon from '../assets/images/icon-apartments-white.svg';
import markerIcon from '../assets/images/icon-marker.svg';

export default {
    props: {
        cords: {
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
        mapIsFocused: false,
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
                lat: Number(this.cords.lat),
                lng: Number(this.cords.lng),
            };
        },
    },
    mounted() {
        document.addEventListener('focus', this.checkFocus, true);
    },
    destroyed() {
        document.removeEventListener('focus', this.checkFocus, true);
    },
    methods: {
        isDescendant(parent, child) {
            let node = child.parentNode;
            while (node != null) {
                if (node === parent) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        },
        checkFocus(event) {
            if (
                this.isDescendant(this.$refs.gmap.$el, event.target)
                && event.target.nodeName === 'DIV'
            ) {
                this.mapIsFocused = true;
            } else {
                this.mapIsFocused = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.addressBox {
    margin-bottom: 30px;
    @media ($smallerTablet) {
        margin-bottom: 20px;
    }
}
.left {
    width: 50%;
    background-color: $primaryColor;
    color: #ffffff;
    padding: 70px 30px;
    @media ($smallDesktop) {
        padding: 40px 30px;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    @media ($largeTablet) {
        flex-wrap: nowrap;
    }
    @media ($largeTablet) {
        padding: 50px 30px;
    }
    @media ($smallTablet) {
        flex-wrap: wrap;
        padding: 40px 30px;
    }
    @media ($smallerTablet) {
        display: none;
    }
}
.right {
    width: 50%;
    @media ($smallerTablet) {
        height: 260px;
        width: 100%;
    }
    @media ($smallerMobile) {
        height: 200px;
    }
}
.iconHolder {
    width: 50px;
}
.textHolder {
    padding-left: 15px;
    padding-top: 2px;
    font-size: 16px;
    @media ($smallDesktop) {
        width: 100%;
        padding-left: 0;
        padding-top: 10px;
    }
    @media ($largeTablet) {
        width: auto;
        padding-left: 15px;
        padding-top: 2px;
    }
    @media ($smallTablet) {
        width: 100%;
        padding-left: 0;
        padding-top: 10px;
    }
}
.mapHolder {
    transition: 0.125s;
    &.isFocused {
        outline: 2px solid $primaryTextColor;
        outline-offset: 5px;
    }
    >>> a:focus img {
        outline: 2px solid $primaryTextColor;
    }
}
.vue-map-container {
    width: 100%;
}
</style>
