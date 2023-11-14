<template>
  <main class="home_wrapper">
    <AppHeader></AppHeader>
    <div class="container-fluid mt-5">
      <TenderFilter @handle-form="handleFilter"></TenderFilter>
    </div>
    <TenderSection :tenders="tenders"></TenderSection>
    <CategoriesSection :items="homedata.categories"></CategoriesSection>
    <ServicesSection :items="homedata.our_services"></ServicesSection>
    <OurClients :items="homedata.our_clients"></OurClients>
  </main>
</template>

<script>
//importing components
import AppHeader from '~/components/homepage/AppHeader.vue'
import TenderFilter from '~/components/shared/TenderFilter.vue'
import TenderSection from '~/components/homepage/TenderSection.vue'
import CategoriesSection from '~/components/homepage/CategoriesSection.vue'
import ServicesSection from '~/components/homepage/ServicesSection.vue'
import OurClients from '~/components/homepage/OurClients.vue'

export default {
  name: 'HomePage',
  components: {
    AppHeader,
    TenderFilter,
    TenderSection,
    CategoriesSection,
    ServicesSection,
    OurClients,
  },
  data() {
    return {
      titles: [],
    }
  },
  async asyncData(context) {
    const homedata = await context.$axios.$get('/home').catch((err) => {})
    const tenders = await context.$axios.$get('/tenders').catch((err) => {})
    return { homedata: homedata.data, tenders: tenders.data }
  },
  methods: {
    async handleFilter(form) {
      this.titles = []
      await this.$axios
        .$get('/tenders', {
          params: {
            keyword: form.keyword,
            category_id: form.category != null ? form.category.id : null,
            country_id: form.country != null ? form.country.id : null,
          },
        })
        .then((res) => {
          this.titles = res.data.map((item) => item.title)
          this.$store.commit('tenders/SET_TENDERS_DATA', res.data)
        })
        .catch((err) => {
          const req_error = {
            data: err.response,
            type: 'catch',
          }
          this.error_handler(req_error)
          this.TriggerNotify('error', this.notify.message)
        })
      return this.titles
    },
  },
}

async function fetchData() {
  try {
    const response = await fetch(
      'https://supply-angel.appaths.com/api/website/tenders'
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

fetchData()
</script>
