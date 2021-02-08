import Vue from 'vue'
import VueRouter from 'vue-router'

import NumberBaseball from '../numbaseball/numbaseball'
import SpeedCheck from '../speedcheck/speedcheck'
import RockScissorsPaper from '../rockscissorspaper/RockScissorsPaper'
import LottoGenerator from '../lottoGenerlator/lottoGenerlator'
import GameMatcher from './GameMatcher'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes : [
        { path : '/number-baseball', component : NumberBaseball},
        { path : '/response-check', component: SpeedCheck},
        { path : '/rock-scissors-paper', component: RockScissorsPaper},
        { path : '/lotto-generator', component: LottoGenerator},
        { path : '/game/:name', component: GameMatcher}
    ],
})