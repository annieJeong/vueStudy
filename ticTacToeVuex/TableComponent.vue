<template>
    <table>
        <!-- <tr-component v-for="(rowData, index) in tableData" :rowIndex="index" :key="index"></tr-component> -->
        <slot />
    </table>
</template>

<script>
import TrComponent from './TrComponent'

export default {
    components : {
        TrComponent
    },
    computed : {
        tableData() {
            return this.$store.state.tableData;
        }
    }
}
</script>