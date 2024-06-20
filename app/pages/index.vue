<script lang="ts" setup>
import type { Database } from "../types/supabase"

const supabase = useSupabaseClient<Database>()

const { data: merchants, refresh: refreshMerchants } = await useAsyncData(
  "merchants",
  async () => {
    const { data } = await supabase.from("merchants").select("*")
    return data
  }
)

const { data: vouchers, refresh: refreshVouchers } = await useAsyncData(
  "vouchers",
  async () => {
    const { data } = await supabase.from("vouchers").select("*")
    return data
  }
)

// Listen to inserts
tableSubscriber("public", "merchants", refreshMerchants)
tableSubscriber("public", "vouchers", refreshVouchers)

const signOut = async () => {
  await supabase.auth.signOut()
  navigateTo("/login")
}
</script>

<template>
  <div class="flex justify-center mt-3">
    <Card
      v-for="merchant in merchants"
      :key="merchant.id"
      class="w-[35vw]"
    >
      <template #title>{{ merchant.name }}</template>
      <template #content>
        <Listbox
          :options="vouchers?.filter((v) => v.merchant_id === merchant.id)"
        >
          <template #option="slotProps">
            <Badge :severity="slotProps.option.redeemed ? 'primary' : 'info'">{{
              slotProps.option.redeemed ? "Redeemed" : "Un-redeemed"
            }}</Badge>
            <Chip class="mb-1">{{ slotProps.option.id }}</Chip>
          </template>
        </Listbox>
      </template>
    </Card>

    <Button
      class="fixed top-3 right-3"
      @click="signOut"
      >Sign Out</Button
    >
  </div>
</template>
