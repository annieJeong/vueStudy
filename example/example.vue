<template>
  <div>
      <h1>{{result}}</h1>
      <form v-on:submit="onSubmitForm">
          <input type="text" v-model="value">
          <button>입력</button>
      </form>
  </div>
</template>

<script>
export default {
    data() {
        return{
            value : '',
            result : '',
        }
    },
    methods : {
        onSubmitForm(e){
            e.preventDefault();
            
        },
    },
}
</script>

<style>

</style>