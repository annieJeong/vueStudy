<template>
  <div>
      <h1>{{result}}</h1>
      <form @submit.prevent="onSubmitForm">
          <input ref="answer" type="number" minlength="4" maxlength="4" v-model="value">
          <button type="submit">입력</button>
      </form>
      <div>시도 : {{tries.length}}</div>
      <ul>
          <li v-for="t in tries" v-bind:key="t.idx">
              <div>{{t.try}}</div>
              <div>{{t.result}}</div>
          </li>
      </ul>
  </div>
</template>

<script>
const getNumber = () => {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    let array = [];
    while(array.length < 4){
        let pick=candidates.splice(Math.floor(Math.random()*9),1)[0]
        array.push(pick);
    }
    return array;
}

export default {
    data() {
        return{
            answers: getNumber(), // [1,2,3,4]
            tries: [], //시도
            value : '', //입력
            result : '', //결과
        }
    },
    methods : {
        onSubmitForm(){
            if(this.value == this.answers.join('')){
                this.tries.push({
                    idx : this.tries.length +1,
                    try : this.value,
                    result: '홈런'
                });
                this.result = '홈런';
                alert('홈런! 게임을 재시작합니다.');
                this.value = '';
                this.anwers = getNumber();
                this.tries = [];
                this.$refs.answer.focus();
            }else {
                if(this.tries.length >= 9){
                    this.result = `최종 실패! 정답은 ${this.answers.join('')}이었습니다.`
                    alert('10회 이상 틀려서 최종 실패! 게임을 다시 시작합니다.')
                    this.tries = []
                    this.value = ''
                    this.answers = getNumber();
                    this.$refs.answer.focus();
                    return ;
                }
                let strike = 0;
                let ball = 0;
                const answerArray = this.value.split('').map(v => parseInt(v));
                for(let i = 0; i  < 4; i ++ ){
                    if(answerArray[i] === this.answers[i]){ // scrike
                        strike ++
                    } else if(this.answers.includes(answerArray[i])) { // ball
                        ball++
                    }
                }
                this.tries.push({
                    idx : this.tries.length +1,
                    try : this.value,
                    result: `${strike}스트라이크, ${ball}볼`
                });
            }
            this.value = '';
            this.$refs.answer.focus();
        },
    },
}
</script>

<style>

</style>