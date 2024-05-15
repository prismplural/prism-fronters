import { getParams } from "$lib/functions/utils.js"
import { redirect } from "@sveltejs/kit"

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    let mid = data.get("mid")

    const params = getParams(data)

    redirect(
      307,
      `./m/${(mid as string).toLowerCase()}${params.length > 0 ? "?" + params.join("&") : ""}`
    )
  },
}
