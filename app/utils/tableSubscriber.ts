import type { Database } from "~/types/supabase"

export default (
  schema: string,
  table: string,
  refresh: () => Promise<void>
) => {
  const supabase = useSupabaseClient<Database>()

  supabase
    .channel(table)
    .on(
      "postgres_changes",
      { event: "INSERT", schema, table },
      async () => await refresh()
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema, table },
      async () => await refresh()
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema, table },
      async () => await refresh()
    )
    .subscribe()
}
