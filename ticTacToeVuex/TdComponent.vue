<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
import { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store'
import { mapState } from 'vuex'

export default {
    props : {
        cellIndex: Number,
        rowIndex:Number,
    },
    computed : { //vuex state 가져올때 사용
        ...mapState({
            tableData : state => state.tableData,
            turn : state => state.turn,
            cellData(state){
                return state.tableData[this.rowIndex][this.cellIndex];
            }
        }),
        // cellData() {
        //     return this.$store.state.tableData[this.rowIndex][this.cellIndex];
        // },
        // tableData(){
        //     return this.$store.state.tableData;
        // },
        // turn(){
        //     return this.$store.state.turn;
        // },
    },
    methods: {
        onClickTd(){
            if(this.cellData) return;

            this.$store.commit(CLICK_CELL, {row:this.rowIndex, cell:this.cellIndex});
            
            let win = false
            if(this.tableData[this.rowIndex][0] === this.turn 
                && this.tableData[this.rowIndex][1] === this.turn
                && this.tableData[this.rowIndex][2] === this.turn) { // 가로
                win = true
            } 
            if (this.tableData[0][this.cellIndex] === this.turn 
                && this.tableData[1][this.cellIndex] === this.turn
                && this.tableData[2][this.cellIndex] === this.turn) {//세로
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

</style>