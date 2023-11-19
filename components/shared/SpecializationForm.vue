<template>
  <div class="form-container">
    <div class="search-wrapper">
      <input
        type="text"
        class="form-control search-input"
        placeholder="ابحث عن تخصص"
        v-model="searchQuery"
        @input="filterOptions"
        id="search-input"
      />
      <label for="search-input">
        <svg class="icon">
          <use
            xlink:href="~/static/fontawesome/solid.svg#magnifying-glass"
          ></use>
        </svg>
      </label>
    </div>

    <div class="selected-options">
      <div
        v-for="option in selectedOptions"
        :key="option.id"
        class="selected-option"
        @click="emitDeselectOption(option)"
      >
        {{ option.name }}
        <span class="deselect"><i class="fa-solid fa-x"></i></span>
      </div>
    </div>

    <div class="options-list">
      <div
        v-for="option in filteredOptions"
        :key="option.id"
        :class="['option-item', { 'is-selected': isSelected(option) }]"
        @click="emitToggleSelection(option)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
    selectedOptions: Array,
  },
  data() {
    return {
      searchQuery: '',
    }
  },
  computed: {
    filteredOptions() {
      const searchLower = this.searchQuery.toLowerCase()
      return this.options.filter((option) =>
        option.name.toLowerCase().includes(searchLower)
      )
    },
  },
  methods: {
    emitToggleSelection(option) {
      // Notify the parent component to toggle the selection
      this.$emit('toggle-selection', option)
    },
    emitDeselectOption(option) {
      // Notify the parent component to deselect the option
      this.$emit('deselect-option', option)
    },
    isSelected(option) {
      return this.selectedOptions.some(
        (selectedOption) => selectedOption.id === option.id
      )
    },
    filterOptions() {
      // Recalculate the filtered options based on the search query
    },
  },
}
</script>

<style scoped lang="scss">
.form-container {
  /* Styles here */
}
.selected-options {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.selected-option {
  background-color: #648dc4;
  color: white;
  padding: 14px 26px;
  border-radius: 10px;
  margin-right: 5px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.deselect {
  position: absolute;
  top: -10px;
  left: -5px;
  background-color: #fff;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  i {
    color: #000;
  }
}
.search-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  .search-input {
    width: 100%;
    padding: 10px 3rem;
    height: 50px;
    background-color: #efefef;
    border: none;
    border-radius: 0;
    &::placeholder {
      color: #919191;
      font-weight: 500;
    }
  }

  label {
    position: absolute;
    margin-bottom: 0;
    padding: 0 1rem;
    .icon {
      width: 1.3rem;
      height: 1.3rem;
      fill: #919191;
    }
  }
}

.options-list {
  display: flex;
  flex-direction: column;
  /* Additional styles */
}
.option-item {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  user-select: none;
}
// .option-item.is-selected {
//   background-color: #648dc4;
//   color: white;
// }
</style>
