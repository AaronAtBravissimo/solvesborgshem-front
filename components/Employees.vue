<template>
    <section class="employees">
        <div
            v-if="heading"
            class="container"
        >
            <div class="headingHolder">
                <h2>{{ heading }}</h2>
            </div>
        </div>
        <div
            v-if="showAll"
            class="filters flex justify-center"
        >
            <div
                v-for="(section, index) in sections"
                :key="section.term_id"
                class="filter"
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
    props: {
        heading: {
            type: String,
            default: null,
        },
        showAll: {
            type: Boolean,
            default: false,
        },
        employeesIds: {
            type: Array,
            default: null,
        },
    },
    data: () => ({
        employees,
        currentFilter: null,
    }),
    computed: {
        sections() {
            const sections = [];
            const added = [];

            for (let i = 0; i < this.employees.length; i++) {
                const employee = this.employees[i];
                const sectionIds = this.getAllSections(employee);

                for (let j = 0; j < sectionIds.length; j++) {
                    const sectionId = sectionIds[j];
                    if (sectionId && !added.includes(sectionId)) {
                        added.push(sectionId);
                        sections.push(employee.taxonomies.section[j]);
                    }
                }
            }

            return sections.sort((a, b) => a.sort_order - b.sort_order);
        },
        employeesOut() {
            let employeesAll = this.employees;

            if (this.currentFilter !== null) {
                const section = this.sections[this.currentFilter].term_id;
                employeesAll = employeesAll.filter((employee) => {
                    const sections = this.getAllSections(employee);
                    if (sections) {
                        return sections.includes(section);
                    }

                    return false;
                });
            }

            if (!this.showAll) {
                const res = [];
                for (let i = 0; i < this.employeesIds.length; i++) {
                    const employee = employeesAll.find(
                        item => item.id === this.employeesIds[i],
                    );
                    if (employee) {
                        res.push(employee);
                    }
                }
                employeesAll = res;
            }

            return employeesAll;
        },
    },
    created() {
        if (this.showAll) {
            this.currentFilter = 0;
        }
    },
    methods: {
        getTermId(employee) {
            if (!employee.taxonomies.section) return false;

            return employee.taxonomies.section[0].term_id;
        },
        getAllSections(employee) {
            if (!employee.taxonomies.section) return false;

            return employee.taxonomies.section
                .map(section => section.term_id);
        },
    },
};
</script>

<style lang="scss" scoped>
$marginBottom: 50px;

.headingHolder {
    text-align: center;
    margin-top: -9px;
    margin-bottom: 67px;
    @media ($tablet) {
        margin-bottom: 30px;
    }
    @media ($smallTablet) {
        margin-bottom: 0;
    }
}

.filters {
    margin-bottom: 60px;
}
.filter {
    margin: 0 10px;
}
.employees {
    padding: 60px 80px;
    background-color: #fff;
    margin-bottom: 50px;
    box-shadow: 0 0 50px 0 rgba(13, 42, 56, 0.1);
}
.columns {
    padding: 35px 0;
    margin-bottom: -#{$marginBottom};
    position: relative;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        width: 1px;
        height: calc(100% - #{$marginBottom});
        background-color: #d2dde1;
        @media ($tablet) {
            display: none;
        }
    }
}
.column {
    width: 50%;
    position: relative;
    z-index: 1;
    margin-bottom: #{$marginBottom};
    @media ($tablet) {
        width: 100%;
    }
    &:nth-child(even) .employee {
        padding-left: 68px;
        @media ($largeDesktop) {
            padding-left: 50px;
        }
        @media ($largeTablet) {
            padding-left: 40px;
        }
        @media ($tablet) {
            padding-left: 30px;
        }
        @media ($mobile) {
            padding-left: 15px;
        }
    }
    &:nth-child(odd) .employee {
        padding-right: 68px;
        @media ($largeDesktop) {
            padding-right: 50px;
        }
        @media ($largeTablet) {
            padding-right: 40px;
        }
        @media ($tablet) {
            padding-right: 30px;
        }
        @media ($mobile) {
            padding-right: 15px;
        }
    }
}
.button.notActive {
    background-color: #ddd;
}
</style>
