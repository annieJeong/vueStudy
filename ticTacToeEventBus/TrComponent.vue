<template>
<tr>
  <td-component v-for="(cellData, index) in rowData" :key="index" :cellData="cellData" :cellIndex="index" :rowIndex="rowIndex"></td-component>
</tr>
</template>

<script>
import TdComponent from './TdComponent';
export default {
    components : {
        TdComponent
    },
    data() {
        return {
            parent: 'trData',
        }
    },
    props : {
        rowData : Array,
        rowIndex : Number,
    }
}
</script>

<style>

</style>