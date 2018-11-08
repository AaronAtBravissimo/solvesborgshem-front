<template>
    <section class="employees box">
        <div
            v-if="heading"
            class="container"
        >
            <div class="headingHolder">
                <h2>{{ heading }}</h2>
            </div>
        </div>
        <Tabs
            v-if="showAll"
            :tabs="sections"
            :active="currentFilter"
            @changed="val => currentFilter = val"
        />
        <transition-group
            :id="`tabGroup-${currentFilter}`"
            :aria-labelledby="`tab-${currentFilter}`"
            role="tabpanel"
            class="columns flex flex-wrap"
            name="fade-in"
            tag="div"
        >
            <div
                v-for="employee in employeesOut"
                :key="employee.id"
                class="column"
            >
                <Employee
                    :employee="employee"
                />
            </div>
        </transition-group>
    </section>
</template>

<script>
import employees from '../static/json/employees.json';
import Tabs from './Tabs.vue';
import Employee from './Employee.vue';

export default {
    components: {
        Tabs,
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

.fade-in-enter-active {
    transition: all 0.5s ease;
}
.fade-in-leave-active {
    opacity: 0;
}
.fade-in-enter {
    transform: translateY(30px);
    opacity: 0;
}

.headingHolder {
    margin-top: -9px;
}
.columns {
    padding: 35px 0;
    margin-bottom: -#{$marginBottom};
    position: relative;
    @media ($mediumTablet) {
        padding: 35px 30px;
    }
    @media ($smallTablet) {
        padding: 30px 0;
    }
    @media ($mobile) {
        margin-bottom: -30px;
    }
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
    @media ($mediumTablet) {
        width: 100%;
    }
    @media ($mobile) {
        margin-bottom: 30px;
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
        @media ($mediumTablet) {
            padding: 0;
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
        @media ($mediumTablet) {
            padding: 0;
        }
    }
}
</style>
