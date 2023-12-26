<template>
  <div>
    欢迎
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const token = ref(JSON.parse(sessionStorage.getItem('authToken')));

    onMounted(() => {
      console.log(token.value.token);
    });

    return {
      token,
    };
  },
};
</script>
