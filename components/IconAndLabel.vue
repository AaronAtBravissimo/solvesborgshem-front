<template>
    <div class="iconAndLabel">
        <div class="inner">
            <div
                v-if="number > 0"
                class="iconHolder"
            >
                <div class="counter flex items-center justify-center">
                    {{ number }}
                </div>
            </div>
            <div
                v-else
                class="iconHolder"
            >
                <img
                    :src="icon"
                    :alt="alt"
                    :class="iconClass"
                >
            </div>
            <div class="label">
                {{ label }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        number: {
            type: Number,
            default: 0,
        },
        label: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            default: '',
        },
        iconClass: {
            type: String,
            default: '',
        },
        alt: {
            type: String,
            default: '',
        },
    },
};
</script>
<style lang="scss" scoped>
.inner {
    display: flex;
    align-items: center;
}
.iconHolder {
    flex-shrink: 0;
}
.icon {
    max-height: 16px;
}
.counter {
    font-size: 12px;
    color: #ffffff;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    font-weight: bold;
    background-color: #efb56b;
}
.label {
    flex-shrink: 1;
    padding: 0 10px;
    font-size: 12px;
    text-transform: uppercase;
    color: #ffffff;
    letter-spacing: 2.2px;
    font-weight: bold;
}
.thinLabel .label {
    font-weight: 300;
}
.icon-apartments {
    width: 38px;
}
</style>
