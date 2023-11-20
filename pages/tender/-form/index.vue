<template>
  <section class="tender_form">
    <div class="form_wrapper">
      <client-only>
        <ValidationObserver ref="form">
          <b-form @submit.prevent="submitForm">
            <div class="row align-items-stretch">
              <div class="col-lg-6">
                <div class="form_part h-100">
                  <div class="row">
                    <div class="col-lg-12 tender__details">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <b-form-group>
                          <b-input-group>
                            <b-form-input
                              type="text"
                              v-model="form.title"
                              class="tender__details--title"
                              :class="{ invalid: errors[0] }"
                              placeholder="عنوان الصفقة"
                            ></b-form-input>

                            <b-form-textarea
                              type="text"
                              v-model="form.desc"
                              :maxlength="maxChars"
                              rows="8"
                              class="tender__details--desc"
                              :class="{ invalid: errors[0] }"
                              placeholder="التفاصيل"
                            ></b-form-textarea>
                          </b-input-group>

                          <span v-if="errors[0]" class="validation-error">
                            {{ errors[0] }}
                          </span>

                          <div class="character-counter">
                            {{ form.desc ? form.desc.length : 0 }} /
                            {{ maxChars }}
                          </div>
                          <p v-if="isOverLimit" class="overlimit">
                            اقصى عدد حروف هو {{ maxChars }}
                          </p>
                        </b-form-group>
                      </ValidationProvider>
                      <!-- end::item -->

                      <div class="form_part h-100 with_border files-upload">
                        <b-form-group class="file_input">
                          <b-input-group>
                            <input
                              type="file"
                              id="tender_specifications_file"
                              @change="
                                handleFileUpload(
                                  $event,
                                  'tender_specifications_file'
                                )
                              "
                            />
                            <label for="tender_specifications_file">
                              <span class="input-icon"
                                ><i class="fa-solid fa-book-open"></i> اضف كراسة
                                الشروط</span
                              >
                            </label>
                          </b-input-group>

                          <div
                            class="preview_wrapper"
                            v-if="tender_specifications_file"
                          >
                            <div>
                              <a
                                class="name"
                                :href="tender_specifications_file.media"
                                target="_blank"
                                v-b-tooltip.hover
                                :title="
                                  tender_specifications_file.media
                                    .split('/')
                                    .pop()
                                "
                              >
                                {{
                                  getShortenedFileName(
                                    tender_specifications_file.media
                                  )
                                }}
                              </a>
                              <span
                                class="close"
                                @click="
                                  deleteMedia(
                                    tender_specifications_file.media.id,
                                    0,
                                    'tender_specifications_file'
                                  )
                                "
                              >
                                <b-icon icon="trash"></b-icon>
                              </span>
                            </div>
                          </div>
                          <!-- end::preview_wrapper -->
                        </b-form-group>
                        <!-- end::item -->

                        <b-form-group class="file_input">
                          <b-input-group>
                            <input
                              type="file"
                              id="tender_images"
                              multiple
                              @change="
                                handleFileUpload($event, 'tender_images')
                              "
                            />
                            <label for="tender_images">
                              <span class="input-icon"
                                ><i class="fa-regular fa-image"></i> اضف صور
                                المناقصة</span
                              >
                            </label>
                          </b-input-group>
                          <div
                            class="preview_wrapper"
                            v-if="tender_images.length > 0"
                          >
                            <div
                              v-for="(file, idx) in tender_images"
                              :key="idx"
                            >
                              <a
                                class="name"
                                :href="file.media"
                                target="_blank"
                                v-b-tooltip.hover
                                :title="file.media.split('/').pop()"
                              >
                                {{ getShortenedFileName(file.media) }}
                              </a>
                              <span
                                class="close"
                                @click="
                                  deleteMedia(file.id, idx, 'tender_images')
                                "
                              >
                                <b-icon icon="trash"></b-icon>
                              </span>
                            </div>
                          </div>
                          <!-- end::preview_wrapper -->
                        </b-form-group>
                        <!-- end::item -->

                        <b-form-group class="file_input">
                          <b-input-group>
                            <input
                              type="file"
                              multiple
                              id="tender_other_files"
                              @change="
                                handleFileUpload($event, 'tender_other_files')
                              "
                            />
                            <label for="tender_other_files">
                              <span class="input-icon"
                                ><i class="fa-solid fa-paperclip"></i> اضف ملفات
                                اخرى</span
                              >
                            </label>
                          </b-input-group>
                          <div
                            class="preview_wrapper"
                            v-if="tender_other_files.length > 0"
                          >
                            <div
                              v-for="(file, idx) in tender_other_files"
                              :key="idx"
                            >
                              <a
                                class="name"
                                :href="file.media"
                                target="_blank"
                                v-b-tooltip.hover
                                :title="file.media.split('/').pop()"
                              >
                                {{ getShortenedFileName(file.media) }}
                              </a>
                              <span
                                class="close"
                                @click="
                                  deleteMedia(
                                    file.id,
                                    idx,
                                    'tender_other_files'
                                  )
                                "
                              >
                                <b-icon icon="trash"></b-icon>
                              </span>
                            </div>
                          </div>
                          <!-- end::preview_wrapper -->
                        </b-form-group>
                        <!-- end::item -->
                      </div>
                    </div>
                    <!-- end::col -->

                    <!-- end::col -->

                    <div class="col-lg-12 tender__info">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <b-form-group>
                          <b-input-group>
                            <b-form-input
                              type="date"
                              v-model="form.expiry_date"
                              class="tender__info--date"
                              :class="{ invalid: errors[0] }"
                              placeholder="تاريخ الانتهاء"
                            ></b-form-input>

                            <b-form-input
                              type="text"
                              v-model="form.company_name"
                              class="tender__info--company"
                              :class="{ invalid: errors[0] }"
                              placeholder="اسم الشركة"
                            ></b-form-input>
                          </b-input-group>
                          <span v-if="errors[0]" class="validation-error">
                            {{ errors[0] }}
                          </span>
                        </b-form-group>
                      </ValidationProvider>
                      <!-- end::item -->
                    </div>
                    <!-- end::col -->

                    <div class="col-lg-12 tender__numbers">
                      <ValidationProvider
                        rules="required|numeric|min:1"
                        v-slot="{ errors }"
                      >
                        <b-form-group>
                          <b-input-group>
                            <b-form-input
                              type="number"
                              v-model="form.tender_specifications_value"
                              class="tender__numbers--value"
                              :class="{ invalid: errors[0] }"
                              placeholder="قيمة كراسة الشروط"
                            ></b-form-input>

                            <b-form-input
                              type="number"
                              v-model="form.insurance_value"
                              class="tender__numbers--insurance"
                              :class="{ invalid: errors[0] }"
                              placeholder="قيمة التأمين"
                            ></b-form-input>
                          </b-input-group>
                          <span v-if="errors[0]" class="validation-error">
                            {{ errors[0] }}
                          </span>
                        </b-form-group>
                      </ValidationProvider>
                      <!-- end::item -->
                    </div>

                    <!-- end::col -->
                  </div>
                  <!-- end::row -->
                </div>
                <!-- end::form_part -->
              </div>
              <!-- end::col -->

              <div class="col-lg-6">
                <div class="col-lg-12">
                  <SpecializationForm
                    :options="categories"
                    :selectedOptions="category_ids"
                    @toggle-selection="toggleSelection"
                    @deselect-option="deselectOption"
                  ></SpecializationForm>
                  <p v-if="error" class="error">يجب اختيار تخصص الصفقة</p>
                </div>
              </div>
              <!-- end::col -->

              <div class="col-xl-12">
                <div class="submit_wrapper">
                  <button
                    type="submit"
                    class="btn btn-default"
                    :disabled="disabled"
                  >
                    <b-spinner
                      v-if="disabled"
                      variant="light"
                      small
                    ></b-spinner>
                    <span v-if="item == null">اضافة</span>
                    <span v-else>حفظ</span>
                  </button>
                </div>
              </div>
            </div>
            <!-- end::row -->
          </b-form>
        </ValidationObserver>
      </client-only>
    </div>
    <!-- end::form_wrapper -->
  </section>
</template>

<script src="~/pages/tender/-form/script.js"></script>

<style lang="scss">
.tender_form {
  .multiselect__select {
    top: 15px !important;
  }
  .multiselect__tags {
    min-height: 60px !important;
    border-radius: 25px !important;
    display: flex;
    align-items: center;
  }
  .submit_wrapper {
    display: flex;
    justify-content: center;
    margin-top: 25px;
    .btn {
      width: 50%;
      background-color: $base-color;
      color: #fff;
      border-radius: 25px;
      padding-block: 15px;
    }
  }
  .form_part {
    position: relative;
    &.with_border {
      padding-inline-start: 35px;
    }
  }
}

/*------------------------- End Old Style -------------------------*/
.character-counter {
  font-size: 16px;
  color: #999;
  padding: 5px 25px;
  background-color: transparent;
}
.overlimit {
  color: crimson;
}

.tender__details {
  position: relative;
  fieldset {
    border: 2px solid #e6e6e6;
    border-radius: 25px;
  }

  .preview_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .validation-error {
    position: absolute;
    bottom: 0;
  }
  .input-group {
    flex-direction: column;
  }

  &--title {
    border: none !important;
    border-radius: 0 !important;
    width: 100% !important;
    background: transparent !important;
    height: 90px !important;
    padding: 10px 25px;
    &::placeholder {
      color: #999;
      font-size: 18px;
      font-weight: 500;
    }
  }

  &--desc {
    border: none !important;
    border-top: 2px solid #e6e6e6 !important;
    border-radius: 0 !important;
    width: 100% !important;
    background: transparent !important;
    padding: 16px 25px;
    &::placeholder {
      color: #999;
      font-size: 18px;
      font-weight: 500;
    }
  }

  .files-upload {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto !important;
    gap: 1rem;

    fieldset {
      border: none !important;
    }
    label {
      border: none !important;
    }
    input {
      border: none !important;
    }

    label[for='tender_specifications_file'],
    label[for='tender_images'],
    label[for='tender_other_files'] {
      padding: 0 !important;
      margin: 10px 15px;
      background-color: #efefef;
      border-radius: 15px !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      transition: all 0.2s ease;

      &:hover {
        background-color: #648dc4;
        span {
          color: #fff !important;
        }
      }
    }
    .input-icon {
      transition: all 0.3s ease;
      font-size: 20px;
      color: #000 !important;
    }
  }
}

.tender__info,
.tender__numbers {
  fieldset {
    border: 2px solid #e6e6e6;
    border-radius: 25px;
    position: relative;
  }

  .validation-error {
    position: absolute;
  }

  .input-group {
    flex-wrap: nowrap;
  }

  &--date,
  &--value,
  &--company,
  &--insurance {
    border: none !important;
    border-radius: 0 !important;
    width: 100% !important;
    background: transparent !important;
    padding: 10px 25px;
    height: 90px !important;
    &::placeholder {
      color: #999;
      font-size: 18px;
      font-weight: 500;
    }
  }

  &--date {
    border-left: 3px solid #e6e6e6 !important;
  }

  &--value {
    border-left: 3px solid #e6e6e6 !important;
  }
}

.error {
  color: crimson;
}
</style>
