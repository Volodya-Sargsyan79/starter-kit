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

const onSubmit = () => {
  const formData = {
    username: credentials.value.username,
    email: credentials.value.email,
    password: credentials.value.password,
    is_admin: false,
    is_store_owner: true,
  }

  console.log("Form Data:", formData) // Add this to inspect the data

  const token = localStorage.getItem("token")

  axios
    .post("/api/v1/users/add-store-owner/", formData)
    .then(response => {
      console.log("User added successfully:", response.data)
    })
    .catch((error) => {
      errors.value = [] // Clear previous errors
      if (error.response) {
        for (const property in error.response.data) {
          errors.value.push(`${property}: ${error.response.data[property]}`)
        }
        console.error("Error response:", error.response)
      } else if (error.message) {
        errors.value.push("Something went wrong. Please try again!")
        console.error("Error message:", error.message)
      } else {
        errors.value.push("Something went wrong. Please try again!")
        console.error("Error:", error)
      }
    })
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
