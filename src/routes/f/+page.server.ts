import { fail, redirect } from "@sveltejs/kit"

export function load() {
  redirect(307, "/")
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const sid = data.get("sid")

    if (typeof sid !== "string") return fail(400, { sid: "", error: "Enter a system ID." })

    const normalizedSid = sid.trim().toLowerCase()
    if (!normalizedSid) return fail(400, { sid: "", error: "Enter a system ID." })

    redirect(303, `/f/${normalizedSid}`)
  },
}
