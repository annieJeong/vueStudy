import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex); // Vuex 사용시 연결 필수

export const SET_WINNER = 'SET_WINNER'
export const CLICK_CELL = 'CLICK_CELL'
export const CHANGE_TURN = 'CHANGE_TURN'
export const RESET_GAME = 'RESET_GAME'
export const NO_WINNER = 'NO_WINNER'

export default new Vuex.Store({
    state : {
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn : 'O',
        winner : '',
    }, // vue data
    getters : {
        turnMessage(state) {
            return state.turn + '의 턴입니다.';
        }
        // state + 추가적인 작업 / 캐싱
    }, // vue computed
    mutations : {
        [SET_WINNER](state, winner){
            state.winner = winner;
        },
        [CLICK_CELL](state, {row, cell}){
            // state.tableData[row][cell] = state.turn
            Vue.set(state.tableData[row], cell, state.turn)
        },
        [CHANGE_TURN](state){
            state.turn = state.turn ==='O'? 'X':'O'
        },
        [RESET_GAME](state){
            state.turn = 'O'
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ]
        },
        [NO_WINNER](state){
            state.winner = ''
        }
    }, // state 동기 사용하여 수정시 
    actions : {

    } // 비동기 사용시, 여러 mutations 연속 실행시
});