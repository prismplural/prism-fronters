import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        let sid = data.get('sid');
        let layout = data.get("layout");
        let showSystem = data.get("system");
        let cards = data.get("cards");

        let params: string[] = []
        if (layout) params.push(`l=${layout}`)
        if (showSystem) params.push(`s=y`)
        if (cards) params.push("c=f")

        throw redirect(307, `./f/${(sid as string).toLowerCase()}${params.length > 0 ? "?" + params.join("&") : ""}`);
    }
  };