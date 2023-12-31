import SpecializationForm from '@/components/shared/SpecializationForm.vue'
export default {
  name: 'FormCard',
  components: { SpecializationForm },
  props: ['categories', 'item'],
  data() {
    return {
      maxChars: 500,
      form: {
        title: null,
        desc: null,
        expiry_date: null,
        company_name: null,
        tender_specifications_value: null,
        insurance_value: null,
        tender_specifications_file: null,
        tender_images: [],
        tender_other_files: [],
      },
      tender_specifications_file: null,
      tender_images: [],
      tender_other_files: [],
      category_ids: [],
      disabled: false,
      error: false,
    }
  },
  mounted() {
    if (this.item != null) {
      this.form.title = this.item.title
      this.form.desc = this.item.desc
      this.form.expiry_date = this.item.expiry_date
      this.form.company_name = this.item.company_name
      this.form.tender_specifications_value =
        this.item.tender_specifications_value
      this.form.insurance_value = this.item.insurance_value
      this.category_ids = this.item.categories
      this.tender_specifications_file = this.item.tender_specifications_file
      this.tender_images = this.item.tender_images
      this.tender_other_files = this.item.tender_other_files
    }
  },
  methods: {
    async deleteMedia(id, idx, type) {
      if (id != 'new') {
        await this.$axios
          .delete(`/tender/${this.item.id}/medias/${id}`)
          .then((res) => {
            this.TriggerNotify('success', 'تم حذف الملف بنجاح !')
          })
          .catch((err) => {
            const req_error = {
              data: err.response,
              type: 'catch',
            }
            this.error_handler(req_error)
            this.TriggerNotify('error', this.notify.message)
          })
      }
      if (type == 'tender_other_files') {
        if (id == 'new') {
          this.form.tender_other_files.splice(idx, 1)
        }
        this.tender_other_files.splice(idx, 1)
      } else if (type == 'tender_images') {
        if (id == 'new') {
          this.form.tender_images.splice(idx, 1)
        }
        this.tender_images.splice(idx, 1)
      } else if (type == 'tender_specifications_file') {
        if (id == 'new') {
          this.form.tender_specifications_file = null
        }
        this.tender_specifications_file = null
      }
    },
    handleFileUpload($event, type) {
      if (type == 'tender_specifications_file') {
        console.log($event.target.files[0])
        this.form.tender_specifications_file = $event.target.files[0]
        this.tender_specifications_file = {
          id: 'new',
          media: URL.createObjectURL($event.target.files[0]),
        }
      } else if (type == 'tender_images') {
        for (let x = 0; x < $event.target.files.length; x++) {
          this.form.tender_images.push($event.target.files[x])
          this.tender_images.push({
            id: 'new',
            media: URL.createObjectURL($event.target.files[x]),
          })
        }
      } else if (type == 'tender_other_files') {
        for (let x = 0; x < $event.target.files.length; x++) {
          this.form.tender_other_files.push($event.target.files[x])
          this.tender_other_files.push({
            id: 'new',
            media: URL.createObjectURL($event.target.files[x]),
          })
        }
      }
    },
    getShortenedFileName(mediaPath) {
      const fileName = mediaPath.split('/').pop()
      return fileName.length > 3 ? `${fileName.substring(0, 3)}...` : fileName
    },
    async submitForm() {
      if (this.isCategoryIdsEmpty) {
        this.error = true
        return
      } else {
        this.error = false
      }
      await this.$refs.form.validate().then((success) => {
        if (success) {
          this.handleReq()
        }
      })
    },
    async handleReq() {
      this.disabled = true
      const form_data = new FormData()

      if (this.item != null) {
        form_data.append('_method', 'PUT')
      }

      form_data.append('title', this.form.title)
      form_data.append('desc', this.form.desc)
      form_data.append('expiry_date', this.form.expiry_date)
      form_data.append('company_name', this.form.company_name)
      form_data.append(
        'tender_specifications_value',
        this.form.tender_specifications_value
      )
      form_data.append('insurance_value', this.form.insurance_value)
      if (this.form.tender_specifications_file != null) {
        form_data.append(
          'tender_specifications_file',
          this.form.tender_specifications_file
        )
      }
      if (this.form.tender_images.length > 0) {
        this.form.tender_images.forEach((file, index) => {
          form_data.append(`tender_images[${index}]`, file)
        })
      }
      if (this.form.tender_other_files.length > 0) {
        this.form.tender_other_files.forEach((file, index) => {
          form_data.append(`tender_other_files[${index}]`, file)
        })
      }
      this.category_ids.forEach((item, index) => {
        form_data.append(`category_ids[${index}]`, item.id)
      })

      if (this.item == null) {
        await this.$axios
          .post('/tender', form_data)
          .then((res) => {
            this.TriggerNotify('success', 'تم اضافة المناقصة بنجاح !')
            this.$router.replace({ name: 'my-tenders' })
          })
          .catch((err) => {
            const req_error = {
              data: err.response,
              type: 'catch',
            }
            this.error_handler(req_error)
            this.TriggerNotify('error', this.notify.message)
          })
      } else {
        await this.$axios
          .post(`/tenders/${this.item.id}`, form_data)
          .then((res) => {
            this.TriggerNotify('success', 'تم تعديل المناقصة بنجاح !')
            this.$router.replace({ name: 'my-tenders' })
          })
          .catch((err) => {
            const req_error = {
              data: err.response,
              type: 'catch',
            }
            this.error_handler(req_error)
            this.TriggerNotify('error', this.notify.message)
          })
      }

      this.disabled = false
    },
    toggleSelection(option) {
      // Determine if the option is already selected
      const isSelected = this.category_ids.some(
        (selectedOption) => selectedOption.id === option.id
      )
      // Toggle the selection
      if (isSelected) {
        // Remove the option from the selected options
        this.category_ids = this.category_ids.filter(
          (selectedOption) => selectedOption.id !== option.id
        )
      } else {
        // Add the option to the selected options
        this.category_ids = [...this.category_ids, option]
      }
    },
    deselectOption(option) {
      // Remove the option from the selected options
      this.category_ids = this.category_ids.filter(
        (selectedOption) => selectedOption.id !== option.id
      )
    },
  },
  computed: {
    isOverLimit() {
      return this.form.desc ? this.form.desc.length > this.maxChars : false
    },
    isCategoryIdsEmpty() {
      return this.category_ids.length === 0
    },
  },
}
