<template>
  <div>
    <ShareNetwork
      network="facebook"
      :url="`https://tender-app-ten.vercel.app/tender/${item.id}`"
      :title="this.item.title"
      :description="this.item.desc"
      :hashtags="this.item.title"
      :quote="this.item.title"
    >
      <button>Share on Facebook</button>
    </ShareNetwork>
  </div>
</template>

<script>
export default {
  props: ['item'],
  head: {
    // title: this.item.title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Your page description goes here',
      },
      // Open Graph data
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Page Title',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Your page description goes here',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://i.pinimg.com/236x/45/b6/7a/45b67a28f2d4dc0a328fc4b36d55a604.jpg',
      },
      // Twitter Card data
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Page Title',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Your page description goes here',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content:
          'https://i.pinimg.com/236x/45/b6/7a/45b67a28f2d4dc0a328fc4b36d55a604.jpg',
      },
    ],
  },
}
</script>

<style lang="scss" scoped></style>
