<template>
<div>
    <div>{{turnMessage}}</div>
    <!-- <table-component/> -->
    <table-component>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
        </tr>
    </table-component>
    <!-- <table>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
        </tr>
    </table> -->
    <div v-if="winner">{{winner}}님의 승리.</div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store, { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store'
import tableComponent from './TableComponent'

export default {
    store,
    components : {
        tableComponent
    },
    data() {
        return{
            data: 1,
        }
    },
    computed : { 
        ...mapState(['winner','turn', 'tableData']),
        ...mapGetters(['turnMessage']),
        // ...mapState({
        //     winner: state => state.winner,
        //     winner2(state){ //function 으로 this 사용도 가능.
        //         return state.winner + this.data
        //     },
        //     turnState: 'turn'
        // })
        //
        // winner(){
        //     return  this.$store.state.winner
        // },
        // turn(){
        //     return  this.$store.state.turn
        // }
    },
    methods : {
        onClickTd(rowIndex, cellIndex){
            if(this.tableData[rowIndex][cellIndex]) return;

            this.$store.commit(CLICK_CELL, {row:rowIndex, cell:cellIndex});
            
            let win = false
            if(this.tableData[rowIndex][0] === this.turn 
                && this.tableData[rowIndex][1] === this.turn
                && this.tableData[rowIndex][2] === this.turn) { // 가로
                win = true
            } 
            if (this.tableData[0][cellIndex] === this.turn 
                && this.tableData[1][cellIndex] === this.turn
                && this.tableData[2][cellIndex] === this.turn) {//세로
                win = true
            }
            if (this.tableData[0][0] === this.turn 
                && this.tableData[1][1] === this.turn
                && this.tableData[2][2] === this.turn) {//좌>우 방향대각선
                win = true
            }
            if (this.tableData[0][2] === this.turn 
                && this.tableData[1][1] === this.turn
                && this.tableData[2][0] === this.turn) {//우>좌 방향 대각선
                win = true
            }

            if(win){
                this.$store.commit(SET_WINNER, this.turn);
                this.$store.commit(RESET_GAME);
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
                    this.$store.commit(NO_WINNER);
                    this.$store.commit(RESET_GAME);
                } else {
                    this.$store.commit(CHANGE_TURN);
                }
            }

        }
    },
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