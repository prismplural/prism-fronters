import { getParams } from "$lib/functions/utils.js"
import { redirect } from "@sveltejs/kit"

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    let sid = data.get("sid")

    const params = getParams(data)

    throw redirect(
      307,
      `./f/${(sid as string).toLowerCase()}${params.length > 0 ? "?" + params.join("&") : ""}`
    )
  },
}
