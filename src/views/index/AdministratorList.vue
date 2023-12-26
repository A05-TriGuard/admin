<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  mounted() {
    fetch('/api/admin/account/list')
      .then(response => response.json())
      .then(data => {
        this.items = data;
      })
      .catch(error => console.error(error))
  }
}
</script>
