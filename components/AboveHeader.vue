<template>
    <header class="aboveHeader">
        <div class="inner w-full">
            <div class="left flex items-center">
                <div class="iconAndLabel iconAndLabel--thinLabel">
                    <div class="iconAndLabel__inner">
                        <div class="iconAndLabel__iconHolder">
                            <img
                                class="iconAndLabel__icon icon-apartments"
                                src="../assets/images/icon-apartments.svg"
                                alt=""
                            >
                        </div>
                        <div class="iconAndLabel__label">
                            Lediga lägenheter just nu
                        </div>
                    </div>
                </div>

                <div class="iconAndLabel">
                    <div class="iconAndLabel__inner">
                        <div class="iconAndLabel__iconHolder">
                            <div class="iconAndLabel__counter flex items-center justify-center">
                                2
                            </div>
                        </div>
                        <div class="iconAndLabel__label">
                            Se lägenheter
                        </div>
                    </div>
                </div>

            </div>
            <div class="right">

                <div class="iconAndLabel iconAndLabel--thinLabel">
                    <div class="iconAndLabel__inner">
                        <div class="iconAndLabel__iconHolder">
                            <img
                                class="iconAndLabel__icon"
                                src="../assets/images/icon-error-report.svg"
                                alt=""
                            >
                        </div>
                        <div class="iconAndLabel__label">
                            Felanmälan
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </header>
</template>

<script>

export default {

};
</script>

<style lang="scss" scoped>
.aboveHeader {
    background-color: #232323;
    min-height: 69px;
    display: flex;
    margin-left: -50px;
    width: calc(100% + 100px);
}
.inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
}

.iconAndLabel {
    &__inner {
        display: flex;
        align-items: center;
    }
    &__iconHolder {
        flex-shrink: 0;
    }
    &__icon {
        max-height: 16px;
    }
    &__counter {
        font-size: 12px;
        color: #ffffff;
        width: 28px;
        height: 28px;
        border-radius: 100%;
        font-weight: bold;
        background-color: #efb56b;
    }
    &__label {
        flex-shrink: 1;
        padding: 0 10px;
        font-size: 12px;
        text-transform: uppercase;
        color: #ffffff;
        letter-spacing: 2.2px;
        font-weight: bold;
    }
    &--thinLabel .iconAndLabel__label {
        font-weight: 300;
    }
}
.icon-apartments {
    width: 38px;
}
</style>
