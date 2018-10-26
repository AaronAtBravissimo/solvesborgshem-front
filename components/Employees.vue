<template>
    <section class="employees">
        <div class="filters flex justify-center mb-8">
            <div
                v-for="(section, index) in sections"
                :key="section.term_id"
                class="filter mx-6"
            >
                <AppButton
                    :class="{'notActive': currentFilter !== index}"
                    :label="section.name"
                    @clicked="currentFilter = index"
                />
            </div>
        </div>
        <div class="columns flex flex-wrap">
            <div
                v-for="employee in employeesOut"
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
import AppButton from './AppButton.vue';
import Employee from './Employee.vue';

export default {
    components: {
        AppButton,
        Employee,
    },
    data: () => ({
        employees,
        currentFilter: 0,
    }),
    computed: {
        sections() {
            const sections = [];
            const added = [];

            for (let i = 0; i < this.employees.length; i++) {
                const employee = this.employees[i];
                const sectionId = this.getTermId(employee);

                if (sectionId && !added.includes(sectionId)) {
                    added.push(sectionId);
                    sections.push(employee.taxonomies.section[0]);
                }
            }

            return sections.sort((a, b) => a.name.localeCompare(b.name));
        },
        employeesOut() {
            let employeesAll = this.employees;

            if (this.currentFilter !== null) {
                const section = this.sections[this.currentFilter].term_id;
                employeesAll = employeesAll.filter((employee) => {
                    const termId = this.getTermId(employee);
                    if (termId) {
                        return termId === section;
                    }

                    return false;
                });
            }

            return employeesAll;
        },
    },
    methods: {
        getTermId(employee) {
            if (!employee.taxonomies.section) return false;

            return employee.taxonomies.section[0].term_id;
        },
    },
};
</script>

<style lang="scss" scoped>
$gutter: 30px;

.employees {
    padding: 50px 80px;
    background-color: #fff;
}
.columns {
    margin-left: -$gutter;
    margin-right: -$gutter;
}
.column {
    width: 33.3333%;
    padding: $gutter;
}
.button.notActive {
    background-color: #ddd;
}
</style>
