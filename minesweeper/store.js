import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex); // Vuex 사용시 연결 필수

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine)
    const candidate = Array(row * cell).fill().map((a, i) => i);
    const shuffle = [];
    while(candidate.length > row * cell - mine){
        const pick = candidate.splice(Math.floor(Math.random()* candidate.length), 1)[0]
        shuffle.push(pick);
    }
    const data = [];
    for(let i=0; i<row; i++){
        const rowData = []
        data.push(rowData);
        for(let j =0; j <cell; j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k = 0; k<shuffle.length; k++){
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
}

export default new Vuex.Store({
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0
        },
        timer: 0,
        halted: true, //중단
        result: '',
        opendCount: 0,
    }, // vue data
    getters: {
    }, // vue computed
    mutations: {
        [START_GAME](state, { row, cell, mine }) {
            state.data = { row, cell, mine };
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
            state.opendCount = 0;
            state.result = '';
        },
        [OPEN_CELL](state, {row, cell}) {
            let opendCount = 0;
            const checked = [];
            function checkAround(row, cell) {
                if(row<0 || row >= state.tableData.length 
                    || cell >= state.tableData[0].length){ //row or cell undefined check
                    return;
                }
                if([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])){
                    return;
                }
                if(checked.includes(row+'/'+cell)){ //재검사 방지
                    return;
                } else {
                    checked.push(row+'/'+cell)
                }
                let around = [];
                if(state.tableData[row-1]){
                    around = around.concat([
                        state.tableData[row-1][cell-1], state.tableData[row-1][cell], state.tableData[row-1][cell+1]
                    ])
                }
                around = around.concat([
                    state.tableData[row][cell-1], state.tableData[row][cell+1]
                ])
                if(state.tableData[row+1]){
                    around = around.concat([
                        state.tableData[row+1][cell-1], state.tableData[row+1][cell], state.tableData[row+1][cell+1]
                    ])
                }
                let counted = around.filter(v => {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
                })
                if(counted.length === 0 && row > -1){ // 주변칸에 지뢰 X
                  const near = [];

                  if(row -1 > -1){
                      if(cell > 0){
                          near.push([row-1, cell-1]);
                        }
                        near.push([row-1, cell]);
                        if(cell+1 < state.tableData[row].length){
                            near.push([row-1, cell+1]);
                        }
                    }
                    if(cell > 0){
                        near.push([row, cell-1]);
                    }
                    if(cell+1 < state.tableData[row].length){
                        near.push([row, cell+1]);
                    }
                    if(row+1 < state.tableData.length){
                        if(cell > 0){
                            near.push([row+1, cell-1]);
                        }
                        near.push([row+1, cell]);
                        if(cell+1 < state.tableData[row].length){
                            near.push([row+1, cell+1]);
                        }
                    }
                    near.forEach( n => {
                        if(state.tableData[n[0]][n[1]] !== CODE.OPENED){
                            checkAround(n[0], n[1])
                        }
                    })
                }
                if(state.tableData[row][cell] === CODE.NORMAL)
                    opendCount++;

                Vue.set(state.tableData[row], cell, counted.length);
                // return counted.length
            }
            checkAround(row, cell);
            let halted = false;
            let result;
            if(state.data.row * state.data.cell - state.data.mine === state.opendCount+ opendCount){
                halted = true;
                result =`${state.timer}초만에 승리!`
            }
            state.opendCount += opendCount
            state.halted = halted
            state.result = result;
        },
        [CLICK_MINE](state, {row, cell}) {
            state.halted = true;
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE)
         },
        [FLAG_CELL](state, {row, cell}) {
            if(state.tableData[row][cell] === CODE.MINE){
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE)
            }
            if(state.tableData[row][cell] === CODE.NORMAL){
                Vue.set(state.tableData[row], cell, CODE.FLAG)
            }
        },
        [QUESTION_CELL](state, {row, cell}) {
            if(state.tableData[row][cell] === CODE.FLAG_MINE){
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE)
            }
            if(state.tableData[row][cell] === CODE.FLAG){
                Vue.set(state.tableData[row], cell, CODE.QUESTION)
            }
        },
        [NORMALIZE_CELL](state, {row, cell}) {
            if(state.tableData[row][cell] === CODE.QUESTION_MINE){
                Vue.set(state.tableData[row], cell, CODE.MINE)
            }
            if(state.tableData[row][cell] === CODE.QUESTION){
                Vue.set(state.tableData[row], cell, CODE.NORMAL)
            }
         },
        [INCREMENT_TIMER](state) {
            state.timer ++;
        },



    }, // state 동기 사용하여 수정시 
    actions: {

    } // 비동기 사용시, 여러 mutations 연속 실행시
});