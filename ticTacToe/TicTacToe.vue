<template>
<div>
    <div>{{turn}}님의 차례입니다.</div>
    <table-component :table-data="tableData"></table-component>
    <div v-if="winner">{{winner}}님의 승리.</div>
</div>
</template>

<script>
import tableComponent from './TableComponent'
export default {
    components : {
        tableComponent
    },
    data() {
        return{
            tableData: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ],
            turn : 'O',
            winner : '',
        }
    },
    computed : { 
    },
    methods : {
    },
    mounted(){
    },
    beforeDestroy() {
    },
    watch : {
    }
}
</script>

<style>
table {
    border-collapse: collapse;
}
td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
}
</style>