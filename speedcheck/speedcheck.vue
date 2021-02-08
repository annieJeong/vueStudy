<template>
  <div>
      <div id="screen" :class="state" @click="onClickScreen">{{message}}</div>
      <template v-if="result.length"><!-- v-show 태그는 존재 v-if 태그 미존재 layout에 영향이있을 수 있음. -->
        <div>평균시간 : {{average}}ms</div>
        <button @click.prevent="reset">초기화</button>
      </template>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;
export default {
    data() {
        return{
            result: [],
            state: 'waiting',
            message: '클릭해서 시작하세요',
        }
    },
    computed : { //값이 캐싱되어 계산로직을 computed에 하는게 좋음
    //화면이 변경될때 화면에 계산로직이 있는경우 재실행 되기 때문에 가공되는 데이터는 computed로 
        average() {
            return this.result.reduce((a,c) => a + c, 0)/this.result.length || 0;
        }
    },
    methods : {
        reset() {
            this.result = [];
        },
        onClickScreen(){
            if(this.state =='waiting'){
                this.state = 'ready';
                this.message = '초록색이 되면 클릭하세요'
                timeout = setTimeout(()=>{
                    this.state = 'now';
                    this.message = '지금 ! 클릭!'
                    startTime = new Date();
                }, Math.ceil(Math.random() * 1000) + 2000);
            } else if ( this.state =='ready'){
                this.state = 'waiting';
                this.message = 'X ! 초록색이 되면 클릭하세요'
                clearTimeout(timeout);
            } else if (this.state == 'now'){
                this.state = 'waiting';
                this.message = '클릭해서 시작하세요'
                endTime = new Date();
                console.log(endTime-startTime);
                this.result.push(endTime-startTime);
            }
        }
    },
}
</script>

<style scoped>
#screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
}
#screen.waiting {
    background-color: aqua;
}
#screen.ready {
    background-color: red;
}
#screen.now {
    background-color: greenyellow;
}
</style>