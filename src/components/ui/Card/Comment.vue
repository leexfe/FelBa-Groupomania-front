<script>
import AvatarVue from "../Avatar.vue"
export default {
  name: 'Comment',
  components: {
    AvatarVue,
  },
  //props passé à comment: avec email et content
  props :{
    email: { type: String, required: true }, 
    content: { type: String, required: true },
  }
}
</script>
<template>
  <div class="d-flex gap-1 center-vert">
    <AvatarVue></AvatarVue>
    <div class="d-flex flex-column comment_text p-1">
    
      <p>{{ email }} a commenté :</p>
      <p>{{ content }}</p>

    </div>
  </div>
</template>

<style scoped>

.center-vert{
    align-items: center ;
  }
.comment_text {
  border: 1px solid #ced4da;
  background-color: rgb(218, 218, 238);
  border-radius: 5px;
  width: 100%;
}

.card-body > .d-flex {
  margin-bottom: 1rem;
}
div img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border-color: 1px solid rgb(9, 2, 31);
}

.d-flex p {
  margin-bottom: 0;
}
.d-flex p:nth-child(1) {
  font-weight: 500;
}
</style>
