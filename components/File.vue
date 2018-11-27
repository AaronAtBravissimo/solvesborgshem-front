<template>
    <a
        :href="file.file.url"
        target="_blank"
        class="file flex justify-between items-center"
        download
    >
        <span class="left flex items-center flex-grow flex-shrink">
            <span class="name">
                {{ file.name }}
                <span class="type">
                    ({{ file.file.subtype }})
                </span>
            </span>
        </span>

        <span class="right flex items-center flex-no-shrink">
            <img
                :src="downloadIcon"
                class="icon"
                alt=""
            >
        </span>
    </a>
</template>

<script>
import downloadIcon from '../assets/images/icon-download.svg';

export default {
    props: {
        file: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        downloadIcon,
    }),
};
</script>

<style lang="scss" scoped>
.file {
    font-family: $secondaryFont;
    border-bottom: 1px solid #ddd;
    margin-bottom: 15px;
    padding-bottom: 15px;
    line-height: 1.5;
    position: relative;
    @media ($mediumTablet) {
        margin-bottom: 12px;
        padding-bottom: 12px;
    }
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        height: 1px;
        background-color: $primaryColor;
        width: 0;
        transition: 0.35s linear;
    }
}
.file:hover::after {
    width: 100%;
}
.left {
    padding-right: 50px;
    @media ($mobile) {
        padding-right: 30px;
    }
}
.name {
    font-size: 16px;
    display: inline-block;
    @media ($mediumTablet) {
        font-size: 15px;
    }
    @media ($mobile) {
        font-size: 14px;
    }
}
.type {
    font-size: 12px;
    padding-left: 5px;
    color: $primaryColor;
    @media ($mobile) {
        font-size: 11px;
        padding-left: 0;
    }
}
.icon {
    width: 24px;
    height: 24px;
    @media ($mediumTablet) {
        width: 20px;
        height: 20px;
    }
    @media ($mobile) {
        width: 18px;
        height: 18px;
    }
}
</style>
