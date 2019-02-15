<template>
    <div class="searchPlace box">
        <div class="container">
            <div class="momentum-container">
                <iframe
                    id="momentum"
                    src="https://marknad.solvesborgshem.se/pgSearchResult.aspx?#seekAreaMode=simple&search=y"
                    width="100%"
                    scrolling="no"
                    frameBorder="0"
                >
                </iframe>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        if (!process.client) return;

        /* eslint-disable */
        jQuery(document).ready(() => { 
            jQuery("#momentum").momentumFrame({ 
                 version: 4.2, 
                design: '[designkatalog]', //fråga momentum om denna variabel 
                hmsDomain: 'marknad' //ex vid marknad.foretag.se ska denna vara marknad })
            });
        });
    },
};
</script>

<style lang="scss" scoped>
.searchPlace iframe {
    min-height: 7501px;
}
</style>
