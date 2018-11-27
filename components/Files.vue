<template>
    <div class="files box">
        <div class="list">
            <div class="container">
                <File
                    v-for="(file, index) in files"
                    :key="index"
                    :file="file"
                />
            </div>
        </div>
    </div>
</template>

<script>
import File from './File.vue';

export default {
    components: {
        File,
    },
    props: {
        heading: {
            type: String,
            default: null,
        },
        files: {
            type: Array,
            default: null,
        },
    },
};
</script>

<style lang="scss" scoped>
.list .container {
    width: 1000px;
    padding: 0;
}
</style>
