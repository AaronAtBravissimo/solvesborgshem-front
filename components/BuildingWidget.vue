<template>
    <div class="widget">
        <div class="inner">
            <div class="iconHolder flex justify-center items-center flex-no-shrink">
                <img
                    :src="icon"
                    class="icon"
                >
            </div>
            <div class="textHolder flex-grow flex-shrink">
                <h4 class="heading">{{ heading }}</h4>
                <div
                    v-if="table"
                    class="tableHolder content w-full"
                >
                    <template v-for="(row, index) in table">
                        <div
                            v-if="row && row.length > 0 && labels[index]"
                            :key="index"
                            class="row flex"
                        >
                            <div class="column">
                                <p class="tableText">{{ labels[index] }}:</p>
                            </div>
                            <div class="column flex-grow">
                                <p class="tableText">{{ row }}</p>
                            </div>
                        </div>
                    </template>
                </div>
                <div
                    v-if="body"
                    class="content"
                >
                    <p v-html="body"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        heading: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            default: null,
        },
        table: {
            type: Object,
            default: null,
        },
        icon: {
            type: String,
            default: null,
        },
    },
    data: () => ({
        labels: {
            addresses: 'Adress',
            propertyId: 'Fastighetsbeteckning',
            buildingTypes: 'Hustyper',
            yearBuilt: 'Byggår',
            numberOfApartments: 'Antal lägenheter',
            apartmentSizes: 'Storlekar',
            numberOfFloors: 'Antal våningar',
            elevator: 'Hiss',
            heating: 'Uppvärmning',
            electricity: 'Hushållsel',
            hotAndColdWater: 'Varm- och kallvatten',
            internetTelephonyAndTv: 'Internet, tv och telefoni',
            balconyPatio: 'Balkong/uteplats',
            storageRoom: 'Förråd',
            laundryCottage: 'Tvättstuga',
            garageCarport: 'Garage/carport',
            vegetation: 'Växtlighet',
            other: 'Övrigt',
        },
    }),
};
</script>

<style lang="scss" scoped>
$tableGutter: 10px;

.widget {
    font-size: 15px;
    @media ($smallerTablet) {
        font-size: 14px;
    }
}
.inner {
    display: flex;
    @media ($laptop) {
        flex-wrap: wrap;
    }
    @media ($largeTablet) {
        flex-wrap: nowrap;
    }
    @media ($smallerTablet) {
        flex-wrap: wrap;
    }
}
.iconHolder {
    width: 68px;
    height: 68px;
    border-radius: 100%;
    border: 4px solid #f4f8fa;
    @media ($smallDesktop) {
        width: 60px;
        height: 60px;
        border-width: 3px;
    }
    @media ($smallerTablet) {
        width: 50px;
        height: 50px;
        border-width: 2px;
    }
}
.icon {
    width: 30px;
    height: 30px;
    @media ($smallDesktop) {
        width: 26px;
        height: 26px;
    }
    @media ($smallerTablet) {
        width: 24px;
        height: 24px;
    }
}
.textHolder {
    padding-left: 35px;
    padding-top: 22px;
    @media ($largeDesktop) {
        padding-left: 30px;
    }
    @media ($smallDesktop) {
        padding-top: 16px;
    }
    @media ($laptop) {
        padding-left: 0;
        width: 100%;
    }
    @media ($largeTablet) {
        width: auto;
        padding-left: 20px;
    }
    @media ($smallerTablet) {
        padding-left: 0;
        width: 100%;
    }
}
.heading {
    font-size: 18px;
    font-weight: bold;
    line-height: 1.28;
    letter-spacing: 3.6px;
    color: #202020;
    margin-bottom: 27px;
    @media ($smallTablet) {
        font-size: 17px;
        margin-bottom: 20px;
    }
    @media ($smallerTablet) {
        font-size: 16px;
        letter-spacing: 3px;
        margin-bottom: 15px;
    }
    @media ($smallerMobile) {
        letter-spacing: 2px;
    }
}
.row {
    margin-left: -$tableGutter;
    margin-right: -$tableGutter;
    text-align: left;
    margin-bottom: 2px;
    @media ($smallTablet) {
        flex-wrap: wrap;
        margin: 0 0 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
}
.column {
    padding: 0 $tableGutter;
    width: 205px;
    @media ($smallTablet) {
        width: 100%;
        padding: 0;
    }
    &:first-child .tableText {
        font-weight: bold;
    }
}
</style>
