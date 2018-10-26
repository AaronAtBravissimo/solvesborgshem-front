<template>
    <section class="employees">
        <div class="columns flex flex-wrap">
            <div
                v-for="employee in employees"
                :key="employee.id"
                class="column"
            >
                <Employee
                    :employee="employee"
                />
            </div>
        </div>
    </section>
</template>

<script>
import employees from '../static/json/employees.json';
import Employee from './Employee.vue';

export default {
    components: {
        Employee,
    },
    data: () => ({
        employees,
    }),
};
</script>

<style lang="scss" scoped>
$gutter: 30px;

.employees {
    padding: 50px;
}
.columns {
    margin-left: -$gutter;
    margin-right: -$gutter;
}
.column {
    width: 33.3333%;
    padding: $gutter;
}
</style>
