<template>
  <div>
      <div>당첨 숫자</div>
      <div id="result">
          <lotto-ball v-for="ball in winBalls" :key="ball.index" v-bind:number ="ball" ></lotto-ball>
      </div>
      <template v-if="bonus">
        <div>보너스</div>
        <lotto-ball v-bind:number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한번 더!</button>
      </template>
  </div>
</template>

<script>
import LottoBall from './lottoBall'
function getLottoNumbers(){
    //45개의 임의 숫자 랜덤정렬 후 앞 6자리 당첨번호 보너스 볼은 마지막 번호
    const candidate = new Array(45).fill().map((v, i) => i+1)
    const order = [];
    while(order.length < 45){ // order.length < 45
        order.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
    }
    const bonus = order[order.length -1]
    const winBalls = order.slice(0,6).sort((a, b) => a - b)
    return [...winBalls, bonus]
}

const timeouts = [];
export default {
    components : { LottoBall },
    data() {
        return{
            winNumbers : getLottoNumbers(),
            winBalls : [],
            bonus : null,
            redo : false,
        }
    },
    computed : { 
    },
    methods : {
        onClickRedo(){
            //초기화
            this.winNumbers = getLottoNumbers();
            this.winBalls = [];
            this.bonus = null;
            this.redo = false;
        },
        showBalls(){
            for(let i =0; i < this.winNumbers.length -1; i++){
                timeouts.push(setTimeout(()=>{
                    this.winBalls.push(this.winNumbers[i])
                }, (i+1) * 1000))
            }
            timeouts.push(setTimeout(() => {
                this.bonus = this.winNumbers[this.winNumbers.length -1];
                this.redo = true;
            }, 7000))
        }
    },
    created() {
    },
    mounted(){
        this.showBalls();
    },
    beforeDestroy() {
        timeouts.forEach((v) => clearTimeout(v))
    },
    watch : {
        // winBalls( val, oldVal){
        //     console.log(val, oldVal); //value에 Object, array는 참조관계에 있어서 정확하지않음.
        //     if(val.length === 0){
        //         this.showBalls();
        //     }
        // },
        // bonus(val, oldVal) {
        //     console.log(val, oldVal);
        //     if(!val){
        //         this.showBalls();
        //     }
        // },
        redo(val, oldVal) {
            console.log(val, oldVal);
            if(!val){
                this.showBalls();
            }
        }
    }
}
</script>

<style scoped>
</style>