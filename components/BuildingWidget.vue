<template>
    <div class="widget">
        <div class="inner flex">
            <div class="iconHolder flex-no-shrink">

            </div>
            <div class="textHolder flex-grow flex-shrink">
                <h4 class="heading">{{ heading }}</h4>
                <div
                    v-if="table"
                    class="tableHolder content w-full"
                >
                    <div
                        v-for="(row, index) in table"
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
            other: 'Övrigt',
        },
    }),
};
</script>

<style lang="scss" scoped>
$tableGutter: 10px;

.widget {
    font-size: 15px;
}
.iconHolder {
    width: 68px;
    height: 68px;
    border-radius: 100%;
    border: 4px solid #f4f8fa;
}
.textHolder {
    padding-left: 35px;
    padding-top: 22px;
}
.heading {
    font-size: 18px;
    font-weight: bold;
    line-height: 1.28;
    letter-spacing: 3.6px;
    color: #202020;
    margin-bottom: 27px;
}
.row {
    margin-left: -$tableGutter;
    margin-right: -$tableGutter;
    text-align: left;
    margin-bottom: 2px;
}
.column {
    padding: 0 $tableGutter;
    width: 205px;
    &:first-child .tableText {
        font-weight: bold;
    }
}
</style>
