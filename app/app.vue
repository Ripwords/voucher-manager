<script lang="ts" setup>
import type { Database } from "./types/supabase"

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
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <ul>
      <li
        v-for="merchant in merchants"
        :key="merchant.id"
      >
        {{ merchant.name }}
        <ul>
          <li
            v-for="voucher in vouchers?.filter(
              (voucher) => voucher.merchant_id === merchant.id
            )"
            :key="voucher.id"
          >
            {{ voucher.id }} ({{
              voucher.redeemed ? "redeemed" : "not redeemed"
            }})
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
