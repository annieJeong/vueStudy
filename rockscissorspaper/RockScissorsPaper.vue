<template>
  <div>
      <div id="computer" :style="styleObj"></div>
      <div>
          <button @click="onclickBtn('rock')">바위</button>
          <button @click="onclickBtn('scissors')">가위</button>
          <button @click="onclickBtn('paper')">보</button>
      </div>
      <div>{{result}}</div>
      <div>{{score}}점</div>
  </div>
</template>

<script>
const rspCodes = {
    rock : '0',
    scissors : '-130px',
    paper : '-280px'
}
let interval = null

const score = {
    scissors : 1,
    rock : 0,
    paper : -1
}

const computerPick = (imgCode) => {
    return Object.entries(rspCodes).find((v)=>{
        return v[1] === imgCode
    })[0]
}

export default {
    data() {
        return{
            imgCode : '0',
            result : '',
            score : 0,
        }
    },
    computed : { 
        styleObj(){
            return {
                background : `url(https://sites.google.com/site/hafsrsp/_/rsrc/1468855017636/config/customLogo.gif?revision=2) ${this.imgCode} 0`
            }
        }
    },
    methods : {
        onclickBtn(choice){
            clearInterval(interval);
            const myScore = score[choice]
            const cpuScore = score[computerPick(this.imgCode)]
            const diff = myScore - cpuScore
            if (diff == 0){ // 비김
                this.result = '비겼습니다.'
            } else if ([-1, 2].includes(diff)) { // 이김
                this.result = '이겼습니다.'
                this.score ++;
            } else { // 짐
                this.result = '졌습니다.'
                this.score --;
            }
            setTimeout(()=>{
                this.changeHand()
            }, 1000)
        },
        changeHand(){
            interval = setInterval(() =>{
                if(this.imgCode ===rspCodes.rock){
                    this.imgCode = rspCodes.scissors
                } else if(this.imgCode ===rspCodes.scissors){
                    this.imgCode = rspCodes.paper
                } else if(this.imgCode ===rspCodes.paper){
                    this.imgCode = rspCodes.rock
                }
            }, 100)
        }
    },
    created(){
        console.log('created')
    },
    mounted() {
        console.log('mounted')
        this.changeHand()
    },
    updated(){
        console.log('updated')
    },
    beforeDestroy() {
        console.log('beforeDestroy')
        clearInterval(interval);
    },
    destroyd(){
        console.log('destroyd')
    },
}
</script>

<style scoped>
#computer{
    width: 150px;
    height: 155px;
    background-position: 0 0;
}
</style>