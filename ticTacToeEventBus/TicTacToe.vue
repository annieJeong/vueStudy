<template>
<div>
    <div>{{turn}}님의 차례입니다.</div>
    <table-component :table-data="tableData"></table-component>
    <div v-if="winner">{{winner}}님의 승리.</div>
</div>
</template>

<script>
import tableComponent from './TableComponent'
import eventBus from './EventBus'
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
        onClickTd(rowIndex, cellIndex) {
            this.$set(this.tableData[rowIndex], cellIndex, this.turn)
            
            let win = false
            // 왜 every가 안되지 ??????? 
            // console.log(this.tableData[rowIndex].every(v => v === this.trun), this.tableData[rowIndex], this.turn)
            if(this.tableData[rowIndex][0] === this.turn 
                && this.tableData[rowIndex][1] === this.turn
                && this.tableData[rowIndex][2] === this.turn) { // 가로
                win = true
            }
            if (!win && this.tableData[0][cellIndex] === this.turn 
                && this.tableData[1][cellIndex] === this.turn
                && this.tableData[2][cellIndex] === this.turn) {//세로
                win = true
            }
            if (!win && this.tableData[0][0] === this.turn 
                && this.tableData[1][1] === this.turn
                && this.tableData[2][2] === this.turn) {//좌>우 방향대각선
                win = true
            }
            if (!win && this.tableData[0][2] === this.turn 
                && this.tableData[1][1] === this.turn
                && this.tableData[2][0] === this.turn) {//우>좌 방향 대각선
                win = true
            }

            if(win){
                this.winner = this.turn;
                this.turn = 'O'
                this.tableData = [['','',''],['','',''],['','','']]
            } else {
                let fullFill = true;
                this.tableData.forEach(row => {
                    row.forEach(cell =>{
                        if(!cell){
                            fullFill = false;
                            return ;
                        }
                    })
                    if(!fullFill){
                        return ;
                    }
                });
                if(fullFill){
                    //무승부
                    this.winner = '';
                    this.turn = 'O'
                    this.tableData = [['','',''],['','',''],['','','']]
                } else {
                    this.turn = this.turn =='O'? 'X' : 'O'
                }
            }
        }
    },
    created() {
        eventBus.$on('clickTd', this.onClickTd)
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