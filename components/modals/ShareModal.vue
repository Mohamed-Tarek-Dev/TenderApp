<template>
  <div v-if="item" class="share-menu">
    <p>مشاركة المناقصة</p>
    <div class="social-icons">
      <ShareNetwork
        network="facebook"
        :url="dynamicUrl"
        :title="item.title"
        :description="item.desc"
        hashtags="Tender"
        :quote="item.title"
        :media="item.tender_images[0].media"
      >
        <button class="social-icon share-icon-1">
          <i class="fa-brands fa-facebook-f"></i>
        </button>
      </ShareNetwork>

      <ShareNetwork
        network="Twitter"
        :url="dynamicUrl"
        :title="item.title"
        :description="item.desc"
        :hashtags="item.title"
        :quote="item.title"
        :media="item.tender_images[0].media"
      >
        <button class="social-icon share-icon-2">
          <i class="fa-brands fa-twitter"></i>
        </button>
      </ShareNetwork>

      <ShareNetwork
        network="WhatsApp"
        :url="dynamicUrl"
        :title="item.title"
        :description="item.desc"
        :hashtags="item.title"
        :quote="item.title"
        :media="item.tender_images[0].media"
      >
        <button class="social-icon share-icon-3">
          <i class="fa-brands fa-whatsapp"></i>
        </button>
      </ShareNetwork>

      <ShareNetwork
        network="Messenger"
        :url="dynamicUrl"
        :title="item.title"
        :description="item.desc"
        :hashtags="item.title"
        :quote="item.title"
        :media="item.tender_images[0].media"
      >
        <button class="social-icon share-icon-4">
          <i class="fa-brands fa-facebook-messenger"></i>
        </button>
      </ShareNetwork>

      <ShareNetwork
        network="LinkedIn"
        :url="dynamicUrl"
        :title="item.title"
        :description="item.desc"
        :hashtags="item.title"
        :quote="item.title"
        :media="item.tender_images[0].media"
      >
        <button class="social-icon share-icon-5">
          <i class="fa-brands fa-linkedin-in"></i>
        </button>
      </ShareNetwork>
    </div>

    <div class="copy-section">
      <span>مشاركة الرابط</span>
      <div class="copy-input">
        <input ref="urlInput" type="text" :value="dynamicUrl" readonly />
        <button @click="copyUrlToClipboard">نسخ الرابط</button>
        <p v-if="copied">تم نسخ الرابط</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      copied: false,
    }
  },
  computed: {
    dynamicUrl() {
      const baseUrl = window.location.origin
      return `${baseUrl}/tender/${this.item.id}`
    },
  },
  methods: {
    async copyUrlToClipboard() {
      try {
        await navigator.clipboard.writeText(this.dynamicUrl)
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (err) {
        console.error('Failed to copy URL: ', err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.share-menu {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  max-width: 500px;
  margin: auto;
  position: absolute;
  top: 30%;
  left: 40px;
  z-index: 9;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #f9f9f9;
  }
  &::before {
    top: -11px;
    border-bottom: 11px solid rgba(0, 0, 0, 0.1);
  }
  &::after {
    .share-menu::after {
      top: -10px;
      border-bottom: 10px solid #f9f9f9;
    }
  }
  p {
    color: #333;
    font-weight: 900;
    font-size: 1.3rem;
  }
  .social-icons {
    margin: 20px 0;
    display: flex;

    .social-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      line-height: 40px;
      margin-right: 10px;
      transition: transform 0.3s ease;
      border: none;

      &.share-icon-1 {
        background-color: #3b5998;
      }
      &.share-icon-2 {
        background-color: #1da1f2;
      }
      &.share-icon-3 {
        background-color: #25d366;
      }
      &.share-icon-4 {
        background-color: #0084ff;
      }
      &.share-icon-5 {
        background-color: #0077b5;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .copy-section {
    .copy-input {
      position: relative;
      margin-top: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      input[type='text'] {
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 5px;
        width: calc(100% - 22px);
        transition: all 0.3s ease;
        outline: none;
        width: 75%;
        &:focus {
          border-color: #648dc4;
        }
      }
    }

    button {
      background-color: #648dc4;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      width: 25%;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        background-color: #4576b6;
      }
    }
    p {
      font-size: 16px;
      font-weight: 500;
      position: absolute;
      left: 8px;
      top: 6px;
      color: #fff;
      background-color: #000;
      padding: 5px;
      border-radius: 4px;
    }
  }
}
</style>
