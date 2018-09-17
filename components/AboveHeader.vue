<template>
    <header class="aboveHeader">
        <div class="inner w-full">
            <div class="left flex items-center">
                <iconAndLabel
                    :icon="apartmentsIcon"
                    icon-class="icon-apartments"
                    label="Lediga lägenheter just nu"

                />
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
import IconAndLabel from './IconAndLabel.vue';
import apartmentsIcon from '../assets/images/icon-apartments.svg';


export default {
    components: {
        IconAndLabel,
    },
    data() {
        return {
            apartmentsIcon,
        };
    },
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
</style>
