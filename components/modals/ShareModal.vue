<template>
  <div>
    <ShareNetwork
      network="facebook"
      url="https://tender-app-ten.vercel.app/tender/4"
      :title="this.item.title"
      :description="this.item.desc"
      hashtags="مناقصة"
      quote="Blah blah blah"
      media="https://i.pinimg.com/564x/a1/34/32/a134320ae7a4b7c793a807d3207412bb.jpg"
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
