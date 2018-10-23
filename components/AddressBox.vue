<template>
    <div class="addressBox flex">
        <div class="left">
            <div class="inner flex">
                <div class="iconHolder flex-no-shrink">
                    <img :src="apartmentsIcon">
                </div>
                <div class="textHolder flex-grow flex-shrink content">
                    <p>
                        Adress:<br>
                        Daggåkevägen 1A<br>
                        294 37, Sölvesborg<br>
                        Blekinge län
                    </p>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="map">

            </div>
        </div>
    </div>
</template>

<script>
import apartmentsIcon from '../assets/images/icon-apartments.svg';

export default {
    data: () => ({
        apartmentsIcon,
    }),
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
    padding: 50px 30px;
}
.iconHolder {
    width: 50px;
}
.textHolder {
    padding-left: 15px;
    padding-top: 2px;
    font-size: 16px;
}
</style>
