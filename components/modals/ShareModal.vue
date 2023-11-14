<template>
  <div>
    <ShareNetwork
      network="facebook"
      url="https://tender-app-ten.vercel.app/tender/4"
      :title="this.item.title"
      :description="this.item.desc"
      hashtags="مناقصة"
    >
      <button>Share on Facebook</button>
    </ShareNetwork>
  </div>
</template>

<script>
export default {
  props: ['item'],
}
</script>

<style lang="scss" scoped></style>
