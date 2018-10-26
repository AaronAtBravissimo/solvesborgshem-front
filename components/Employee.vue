<template>
    <div class="employee">
        <img
            :src="image"
            :alt="employee.image.alt"
            class="image objectFitCover"
        >
        <div class="body">
            <h3>{{ employee.name }}</h3>
            <p
                v-if="employee.title"
                class="title"
            >
                {{ employee.title }}
            </p>
            <p
                v-if="employee.description"
                class="description"
            >
                {{ employee.description }}
            </p>
            <p
                v-if="employee.phone"
                class="phone"
            >
                {{ employee.phone }}
            </p>
            <p
                v-if="employee.email"
                class="email"
            >
                {{ employee.email }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        employee: {
            type: Object,
            required: true,
        },
    },
    computed: {
        image() {
            if (!this.employee.image) {
                return 'https://picsum.photos/200';
            }

            return this.employee.image.sizes.medium;
        },
    },
};
</script>

<style lang="scss" scoped>
.image {
    width: 150px;
    height: 150px;
}
</style>
