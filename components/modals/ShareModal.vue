<template>
  <div>
    <ShareNetwork
      network="facebook"
      url="https://tender-app-ten.vercel.app/tender/4"
      :title="this.item.title"
      :description="this.item.desc"
      media:="https://res.cloudinary.com/vuejsprojects/image/upload/c_scale,f_auto,q_auto,w_auto/v1/post/vue-social-sharing.jpg"
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
