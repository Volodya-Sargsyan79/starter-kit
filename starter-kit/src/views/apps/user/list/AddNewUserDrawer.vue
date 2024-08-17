<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import {inject} from "vue"



const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'userData',
])

const credentials = ref({
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  role: '',
})

const axios = inject("axios")

const isFormValid = ref(false)
const refForm = ref()

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

async function onSubmit() {
  const formData = {    
    username: credentials.value.username,
    first_name: credentials.value.first_name,
    last_name: credentials.value.last_name,
    email: credentials.value.email,
    password: credentials.value.password,
    is_admin: credentials.value.role=="Admin" ? true : false,
    is_store_owner: credentials.value.role=="Store owner" ? true : false,
  }

  console.log("Form Data:", formData) // Add this to inspect the data

  const token = localStorage.getItem("token")
  try {
    await axios.post("/api/v1/users/add-store-owner/", formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      closeNavigationDrawer()
    })
  } catch (error) {
    console.log(error.response || error)
  }
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Add User"
      @cancel="closeNavigationDrawer"
    />

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- 👉 First name -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.first_name"
                  :rules="[requiredValidator]"
                  label="First Name"
                  placeholder="John Doe"
                />
              </VCol>

              <!-- 👉 Last name -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.last_name"
                  :rules="[requiredValidator]"
                  label="Last Name"
                  placeholder="John Doe"
                />
              </VCol>

              <!-- 👉 Username -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.username"
                  :rules="[requiredValidator]"
                  label="Username"
                  placeholder="Johndoe"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  :type="email"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              <!-- 👉 Passwor -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.password"
                  label="Password"
                  placeholder="············"
                  :rules="[requiredValidator]"
                  :type="'password'"
                />
              </VCol>

              <!-- 👉 Repeat Password -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.repeatPassword"
                  label="Repeat Password"
                  placeholder="············"
                  :rules="[requiredValidator]"
                  :type="'password'"
                />
              </VCol>

              <!-- 👉 Role -->
              <VCol cols="12">
                <VSelect
                  v-model="credentials.role"
                  label="Select Role"
                  placeholder="Select Role"
                  :rules="[requiredValidator]"
                  :items="['Admin', 'Store owner']"
                />
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-4"
                >
                  Submit
                </VBtn>
                <VBtn
                  type="reset"
                  variant="outlined"
                  color="error"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
