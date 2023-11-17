<template>
  <div class="image-modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <span class="close-image" @click="closeModal"
        ><i class="fa-solid fa-xmark"></i
      ></span>
      <img :src="imageUrl" alt="Image Modal" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['imageUrl'],
  methods: {
    closeModal() {
      this.$emit('close-img')
    },
  },
}
</script>

<style scoped lang="scss">
/* Add your modal styling here */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;

  img {
    width: 100%;
    height: 100%;
    max-width: 500px;
  }
}
.close-image {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;

  i {
    font-size: 25px;
    color: #000;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      color: crimson;
    }
  }
}
</style>
