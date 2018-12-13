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
};
</script>

<style lang="scss" scoped>
.searchPlace iframe {
    min-height: 7501px;
}
</style>
