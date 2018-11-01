<template>
    <div class="searchPlace">
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
.searchPlace {
    padding: 60px 80px;
    background-color: #fff;
    margin-bottom: 50px;
    box-shadow: 0 0 50px 0 rgba(13, 42, 56, 0.1);
}
.searchPlace iframe {
    height: 700px;
}
</style>
