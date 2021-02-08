<template>
  <div v-if="currentGame === 'number-baseball'">
      <number-baseball></number-baseball>
  </div>
  <div v-else-if="currentGame === 'response-check'">
      <response-check></response-check>
  </div>
  <div v-else-if="currentGame === 'lotto-generator'">
      <lotto-generate></lotto-generate>
  </div>
  <div v-else>일치하는 게임이 없습니다.</div>
</template>

<script>
import NumberBaseball from '../numbaseball/numbaseball'
import ResponseCheck from '../speedcheck/speedcheck'
import LottoGenerate from '../lottoGenerlator/lottoGenerlator'
export default {
    components : {
        NumberBaseball,
        ResponseCheck,
        LottoGenerate,
    },
    mounted() {
        console.log(this.$router);
        console.log(this.$route);
    },
    computed : {
        currentGame() {
            return this.$route.params.name;
        },
    }
}
</script>

<style>

</style>