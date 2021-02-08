<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
export default {
    props : {
        cellData: String,
        cellIndex: Number,
        rowIndex:Number,
    },
    methods: {
        onClickTd(){
            if(this.cellData) return;
            const rootData = this.$root.$data

            this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn)
            
            let win = false
            if(this.tableData[this.rowIndex][0] === this.turn 
                && this.tableData[this.rowIndex][1] === this.turn
                && this.tableData[this.rowIndex][2] === this.turn) { // 가로
                win = true
            } 
            if (rootData.tableData[0][this.cellIndex] === rootData.turn 
                && rootData.tableData[1][this.cellIndex] === rootData.turn
                && rootData.tableData[2][this.cellIndex] === rootData.turn) {//세로
                win = true
            }
            if (rootData.tableData[0][0] === rootData.turn 
                && rootData.tableData[1][1] === rootData.turn
                && rootData.tableData[2][2] === rootData.turn) {//좌>우 방향대각선
                win = true
            }
            if (rootData.tableData[0][2] === rootData.turn 
                && rootData.tableData[1][1] === rootData.turn
                && rootData.tableData[2][0] === rootData.turn) {//우>좌 방향 대각선
                win = true
            }

            if(win){
                rootData.winner = rootData.turn;
                rootData.turn = 'O'
                rootData.tableData = [['','',''],['','',''],['','','']]
            } else {
                let fullFill = true;
                rootData.tableData.forEach(row => {
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
                    rootData.winner = rootData.turn;
                    rootData.turn = 'O'
                    rootData.tableData = [['','',''],['','',''],['','','']]
                } else {
                    rootData.turn = rootData.turn =='O'? 'X' : 'O'
                }
            }

        }
    },
}
</script>

<style>

</style>