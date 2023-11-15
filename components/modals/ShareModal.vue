<template>
  <div v-if="item">
    <ShareNetwork
      network="facebook"
      :url="`https://tender-app-ten.vercel.app/tender/${item.id}`"
      :title="item.title"
      :description="item.desc"
      :hashtags="item.title"
      :quote="item.title"
      :media="item.tender_images[0].media"
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
