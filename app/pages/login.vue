<script lang="ts" setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const email = ref("")
const password = ref("")
const signUp = async () => {
  await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })
}

const signIn = async () => {
  const { data } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  console.log(data)

  if (user.value) {
    navigateTo("/")
  }
}
</script>

<template>
  <div class="flex justify-center mt-3">
    <Card class="w-[30vw]">
      <template #title>Authentication</template>
      <template #content>
        <div class="flex justify-between items-center gap-3 mb-3">
          <label
            for="email"
            class="font-semibold w-6rem"
            >Email</label
          >
          <InputText
            id="email"
            v-model="email"
            autocomplete="on"
            type="email"
          />
        </div>
        <div class="flex justify-between items-center gap-3 mb-5">
          <label
            for="password"
            class="font-semibold w-6rem"
            >Password</label
          >
          <Password
            v-model="password"
            :feedback="true"
          />
        </div>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Sign Up"
            severity="secondary"
            @click="signUp"
          />
          <Button
            type="button"
            label="Sign In"
            @click="signIn"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
