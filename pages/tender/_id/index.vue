<template>
  <div class="tender_details_wrapper">
    <div class="container-fluid">
      <!-- start:: breadcrumb -->
      <Breadcrumb :links="breadcrumb"></Breadcrumb>

      <h2 class="page-title">تفاصيل الصفقة</h2>

      <div class="tabs__buttons">
        <button
          class="btn tabs__buttons--detailsBtn"
          :class="{ active: activeTab == 'details' }"
          @click="activeTab = 'details'"
        >
          تفاصيل الصفقة
        </button>
        <button
          class="btn tabs__buttons--offersBtn"
          :class="{ active: activeTab == 'offers' }"
          @click="activeTab = 'offers'"
          btn
        >
          العروض المستملة
        </button>
      </div>

      <div v-if="activeTab == 'details'" class="details_wrapper">
        <div class="header_wrapper">
          <h4 class="title">
            {{ item.title }}
            <span>
              {{ $moment(item.created_at).startOf('day').fromNow() }}
            </span>
            <nuxt-link
              :to="{ name: 'tender-id-edit', params: { id: item.id } }"
            >
              <img
                src="~/assets/images/edit.svg"
                alt="icon"
                width="40"
                height="40"
                v-if="item.is_my_agent"
              />
            </nuxt-link>
          </h4>
          <div class="options_wrapper">
            <div class="item">
              <a href="javascript:;">
                <svg class="icon">
                  <use xlink:href="~/static/sprite.svg#share"></use>
                </svg>
              </a>
              <a href="javascript:;" @click="toggleFav">
                <span v-if="item.is_favorite != true">
                  <svg class="icon">
                    <use xlink:href="~/static/sprite.svg#favourite"></use>
                  </svg>
                  <span>اضافة الي المفضلة</span>
                </span>
                <span v-if="item.is_favorite == true">
                  <svg class="icon">
                    <use
                      xlink:href="~/static/sprite.svg#favourite-filled"
                    ></use>
                  </svg>
                  <span> حذف من المفضلة</span>
                </span>
              </a>
            </div>
          </div>
        </div>
        <!-- end::header_wrapper -->

        <div class="body_wrapper">
          <div class="row">
            <div class="col-lg-6">
              <div class="line">
                <div class="title">اسم صاحب الصفقة :</div>
                <div class="value">{{ item.user_name }}</div>
              </div>
              <!-- end::line -->
              <div class="line">
                <div class="title">اسم الشركة :</div>
                <div class="value">{{ item.company_name }}</div>
              </div>
              <!-- end::line -->
              <div class="line">
                <div class="title">تخصص المناقصة :</div>
                <div class="value">
                  <span v-for="(category, idx) in item.categories" :key="idx">
                    {{ category.name }},
                  </span>
                </div>
              </div>
              <!-- end::line -->
              <div class="line w-100 mb-5">
                <div class="title">التفاصيل</div>
                <div class="value">
                  {{ item.desc }}
                </div>
              </div>
              <!-- end::line -->
              <div class="line">
                <div class="title">قيمة كراسة الشروط :</div>
                <div class="value colored rev_font">
                  {{
                    item.tender_specifications_value != null
                      ? item.tender_specifications_value
                      : 'غير محدد'
                  }}
                </div>
              </div>
              <!-- end::line -->
              <div class="line">
                <div class="title">قيمة التأمين :</div>
                <div class="value colored rev_font">
                  {{
                    item.insurance_value != null
                      ? item.insurance_value
                      : 'غير محدد'
                  }}
                </div>
              </div>
              <!-- end::line -->
              <div class="line">
                <div class="title">تاريخ الانتهاء :</div>
                <div class="value colored rev_font">
                  {{ item.expiry_date }}
                </div>
              </div>
              <!-- end::line -->
              <div class="line mt-5 w-100">
                <div class="title">صور المناقصة :</div>
                <div class="flex_wrapper images">
                  <img
                    :src="img.media"
                    alt="image"
                    v-for="(img, idx) in item.tender_images"
                    :key="idx + 100"
                  />
                </div>
              </div>
              <!-- end::line -->
            </div>
          </div>
          <!-- end::row -->
        </div>
        <!-- end::body_wrapper -->

        <div class="other-wrapper">
          <div class="other__files">
            <h3>كراسة الشروط</h3>
            <div class="other__files--container">
              <div class="other__files--card">
                <div class="other__files--images">
                  <div v-if="isPdf(item.tender_specifications_file.media)">
                    <i class="fa-solid fa-file-pdf"></i>
                  </div>
                  <div v-else>
                    <img
                      :src="item.tender_specifications_file.media"
                      class="document-viewer"
                    />
                  </div>
                </div>

                <div class="other__files--buttons">
                  <button
                    @click="
                      downloadDocument(item.tender_specifications_file.media)
                    "
                    class="other__files--buttons--download"
                  >
                    تحميل الملف
                  </button>

                  <button
                    v-if="!isPdf(item.tender_specifications_file.media)"
                    @click="closeImageModal = true"
                    class="other__files--buttons--view"
                  >
                    عرض الملف
                  </button>
                </div>
                <transition name="fade">
                  <ImageModal
                    v-if="closeImageModal"
                    :imageUrl="item.tender_specifications_file.media"
                    @close-img="closeImageModal = false"
                  ></ImageModal>
                </transition>
              </div>
            </div>
          </div>

          <div class="other__files">
            <h3>ملفات اخرى</h3>
            <div class="other__files--container">
              <div
                v-for="(file, idx) in item.tender_images"
                :key="file.id"
                class="other__files--card"
              >
                <div class="other__files--images">
                  <div v-if="isPdf(file.media)">
                    <i class="fa-solid fa-file-pdf"></i>
                  </div>
                  <div v-else>
                    <img :src="file.media" class="document-viewer" />
                  </div>
                </div>

                <div class="other__files--buttons">
                  <button
                    @click="downloadDocument(file.media)"
                    class="other__files--buttons--download"
                  >
                    تحميل الملف
                  </button>

                  <button
                    v-if="!isPdf(file.media)"
                    @click="closeImageModal = true"
                    class="other__files--buttons--view"
                  >
                    عرض الملف
                  </button>
                </div>
                <transition name="fade">
                  <ImageModal
                    v-if="closeImageModal"
                    :imageUrl="file.media"
                    @close-img="closeImageModal = false"
                  ></ImageModal>
                </transition>
              </div>
            </div>
          </div>
        </div>

        <div
          class="footer_wrapper"
          v-if="!item.is_my_agent && item.added_offer == false"
        >
          <button
            type="button"
            class="btn btn-default"
            @click="$bvModal.show('apply_modal')"
          >
            تقديم عرض
          </button>
        </div>
        <!-- end::footer_wrapper -->
      </div>
      <!-- end::details_wrapper -->

      <div class="container">
        <div v-if="activeTab == 'offers' && item.is_my_agent">
          <div class="offers__page" v-for="offer in offers" :key="offer.id">
            <div class="offers__page--details">
              <h3 class="offers__page--name">الاسم: {{ offer.user.name }}</h3>
              <div class="offers__page--phone">
                رقم الهاتف:
                <span>{{ offer.user.phone }}</span>
                <span>{{ offer.user.phone_code }}+</span>
              </div>
              <p class="offers__page--desc">ملحوظة: {{ offer.desc }}</p>
            </div>

            <div class="offers__page--files">
              <div class="other-wrapper">
                <div class="other__files">
                  <h3>ملف عرض السعر</h3>
                  <div class="other__files--container">
                    <div
                      class="other__files--card"
                      v-for="(img, idx) in offer.images"
                    >
                      <div class="other__files--images">
                        <div v-if="isPdf(img.media)">
                          <i class="fa-solid fa-file-pdf"></i>
                        </div>
                        <div v-else>
                          <img :src="img.media" class="document-viewer" />
                        </div>
                      </div>

                      <div class="other__files--buttons">
                        <button
                          @click="downloadDocument(img.media)"
                          class="other__files--buttons--download"
                        >
                          تحميل الملف
                        </button>

                        <button
                          v-if="!isPdf(img.media)"
                          @click="closeImageModal = true"
                          class="other__files--buttons--view"
                        >
                          عرض الملف
                        </button>
                      </div>
                      <transition name="fade">
                        <ImageModal
                          v-if="closeImageModal"
                          :imageUrl="img.media"
                          @close-img="closeImageModal = false"
                        ></ImageModal>
                      </transition>
                    </div>
                  </div>
                </div>

                <div class="other__files">
                  <h3>ملف سابقة الاعمال</h3>
                  <div class="other__files--container">
                    <div
                      class="other__files--card"
                      v-for="(img, idx) in offer.files"
                    >
                      <div class="other__files--images">
                        <div v-if="isPdf(img.media)">
                          <i class="fa-solid fa-file-pdf"></i>
                        </div>
                        <div v-else>
                          <img :src="img.media" class="document-viewer" />
                        </div>
                      </div>

                      <div class="other__files--buttons">
                        <button
                          @click="downloadDocument(img.media)"
                          class="other__files--buttons--download"
                        >
                          تحميل الملف
                        </button>

                        <button
                          v-if="!isPdf(img.media)"
                          @click="closeImageModal = true"
                          class="other__files--buttons--view"
                        >
                          عرض الملف
                        </button>
                      </div>
                      <transition name="fade">
                        <ImageModal
                          v-if="closeImageModal"
                          :imageUrl="img.media"
                          @close-img="closeImageModal = false"
                        ></ImageModal>
                      </transition>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="offers_list" v-if="item.my_tender_offer != null">
          <div class="wrapper owned">
            <div class="wrapper_header">
              <img :src="item.my_tender_offer.user.avatar" alt="avatar" />
              <p class="name">{{ item.my_tender_offer.user.name }}</p>
            </div>

            <div class="wrapper_body">
              <p class="desc">{{ item.my_tender_offer.desc }}</p>
              <div class="flex_wrapper images">
                <p>ملفات العرض :</p>
                <a
                  :href="img.media"
                  target="_blank"
                  v-for="(img, idx) in item.my_tender_offer.images"
                  :key="idx + 1000"
                >
                  <img :src="img.media" alt="image" />
                </a>
              </div>
            </div>
          </div>
        </div> -->
        </div>
      </div>
    </div>

    <!-- start:: apply_modal -->
    <b-modal id="apply_modal" size="lg" hide-footer title="تقديم العرض">
      <div class="modal_wrapper">
        <div class="form_wrapper">
          <ValidationObserver ref="form">
            <b-form @submit.prevent="submitForm">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <b-form-group>
                  <b-input-group>
                    <b-form-textarea
                      type="text"
                      rows="6"
                      v-model="form.desc"
                      :class="{ invalid: errors[0] }"
                      placeholder="يرجى ادخال ملاحظة"
                    ></b-form-textarea>
                  </b-input-group>
                  <div class="uploads_wrapper">
                    <div class="item">
                      <input
                        type="file"
                        id="images"
                        @change="handleFileUpload($event, 'images')"
                        multiple
                      />
                      <label for="images">
                        <svg class="icon">
                          <use xlink:href="~/static/sprite.svg#image"></use>
                        </svg>
                        <span>اضافة صور</span>
                      </label>
                    </div>
                    <!-- end::item -->
                    <div class="item">
                      <input
                        type="file"
                        id="files"
                        @change="handleFileUpload($event, 'files')"
                        multiple
                      />
                      <label for="files" class="attahcment">
                        <svg class="icon">
                          <use
                            xlink:href="~/static/sprite.svg#attachment"
                          ></use>
                        </svg>
                        <span> اضافة ملفات</span>
                      </label>
                    </div>
                    <!-- end::item -->
                  </div>
                  <!-- end::buttons_wrapper -->
                  <span v-if="errors[0]" class="validation-error">
                    {{ errors[0] }}
                  </span>
                </b-form-group>
              </ValidationProvider>
              <!-- end::form-group -->

              <b-form-group>
                <div class="files_preview_wrapper">
                  <div class="wrapper" v-if="images.length > 0">
                    <label class="control-label"> الصور </label>
                    <div class="item" v-for="(file, idx) in images" :key="idx">
                      <a :href="file.media" target="_blank">
                        <img :src="file.media" alt="preivew" />
                      </a>
                      <span
                        class="close"
                        @click="deleteMedia(file.id, idx, 'images')"
                      >
                        x
                      </span>
                    </div>
                    <!-- end::item -->
                  </div>
                  <!-- end::wrapper -->
                  <div class="wrapper" v-if="files.length > 0">
                    <label class="control-label"> الملفات </label>
                    <div
                      class="item file"
                      v-for="(file, idx) in files"
                      :key="idx"
                    >
                      <a :href="file.media" target="_blank">
                        <img src="~/static/document-file.svg" alt="preivew" />
                        <span class="text"> {{ file.name }} </span>
                      </a>
                      <span
                        class="close"
                        @click="deleteMedia(file.id, idx, 'files')"
                      >
                        x
                      </span>
                    </div>
                    <!-- end::item -->
                  </div>
                  <!-- end::wrapper -->
                </div>
                <!-- end::files_preview_wrapper -->
              </b-form-group>

              <div class="form-group">
                <button
                  type="submit"
                  class="btn btn-default"
                  :disabled="disabled"
                >
                  <b-spinner variant="light" small v-if="disabled"></b-spinner>
                  <span>تقديم عرض</span>
                </button>
              </div>
              <!-- end::form-group -->
            </b-form>
            <!-- end::form -->
          </ValidationObserver>
        </div>
        <!-- end::form_wrapper -->
      </div>
    </b-modal>
    <!-- end:: apply_modal -->
  </div>
</template>

<script src="~/pages/tender/_id/-script.js"></script>

<style lang="scss" scoped>
@import '~/assets/css/pages/detailsPage.scss';

.other-wrapper {
  display: flex;
  gap: 5rem;
}
.other__files {
  margin-top: 3rem;
  h3 {
    font-weight: bold;
  }
  &--container {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    margin-bottom: 5rem;
  }

  &--card {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 12px;
    background-color: #fff;
  }

  &--images {
    img {
      width: 300px;
      height: 150px;
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      border: 1px solid #ccc;
      border-radius: 12px;
      box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
    }

    i {
      font-size: 200px;
      color: #4576b6;
      margin-bottom: 1rem;
    }
  }

  &--buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    gap: 1.2rem;

    &--download {
      background-color: #648dc4;
      color: #fff;
      border-radius: 25px;
      border: none;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
      padding: 10px 22px;
      transition: all 0.25s;
      &:hover {
        background-color: #4576b6;
      }
    }

    &--view {
      border: 1px solid #ccc;
      border-radius: 25px;
      background-color: #fff;
      color: #000;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
      padding: 10px 22px;
      transition: all 0.25s;
      &:hover {
        background-color: #648dc4;
        color: #fff;
      }
    }
  }
}

/*--------------------------  New Styles--------------------------*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.page-title {
  font-weight: bold;
}

.tabs__buttons {
  margin: 2rem 0;

  &--detailsBtn,
  &--offersBtn {
    &:hover {
      background-color: #c2d6f0;
    }
    &.active {
      background-color: #4576b6;
      color: #fff;
      outline: none;

      &:hover {
        background-color: #648dc4;
      }
    }
  }

  &--detailsBtn {
    margin-left: 3rem;
  }
  &--offersBtn {
  }
}

.offers__page {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5rem;
  border: 2px solid #4576b6;
  border-radius: 10px;
  padding: 1.5rem 1rem;

  &--details {
    display: flex;
    flex-direction: column;
  }

  &--name {
  }

  &--phone {
    margin: 0.5rem 0 1rem 0;
  }

  &--desc {
    margin-top: 2rem;
  }
  .other__files {
    margin-top: 0;
    h3 {
      font-size: 1.3rem;
    }
    &--container {
      margin-bottom: 0;
    }

    &--images {
      display: flex;
      justify-content: center;

      img {
        width: 250px;
        height: 125px;
      }
    }

    &--buttons {
      &--download,
      &--view {
        padding: 8px 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
