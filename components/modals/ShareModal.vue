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
          'https://images.unsplash.com/photo-1699704674521-54b3252e52e9?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
          'https://images.unsplash.com/photo-1699704674521-54b3252e52e9?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
}
</script>

<style lang="scss" scoped></style>
