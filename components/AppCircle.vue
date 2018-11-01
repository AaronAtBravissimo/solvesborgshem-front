<template>
    <div
        class="appCircle ab100"
        v-html="circleIcon"
    >
    </div>
</template>

<script>
import { circleIcon } from '../utils/icons';

export default {
    data: () => ({
        circleIcon,
    }),
};
</script>

<style lang="scss">
.appCircle {
    .circle {
        transition: stroke-dashoffset 0.35s linear;
        stroke-dasharray: 227;
    }
    svg {
        width: 100%;
        height: 100%;
    }
    .primaryCircle {
        stroke: $primaryColor;
    }
    .secondaryCircle {
        stroke-dashoffset: 227;
        stroke: #ffffff;
    }
}
</style>
