<template>
    <table>
        <tr-component v-for="(rowData, index) in tableData" :rowData="rowData" :rowIndex="index" :key="index"></tr-component>
    </table>
</template>

<script>
import TrComponent from './TrComponent'

export default {
    components : {
        TrComponent
    },
    props : {
        tableData : Array,
    },
}
</script>