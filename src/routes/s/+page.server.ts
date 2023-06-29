import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        let sid = data.get('sid');
        let layout = data.get("layout");
        let cards = data.get("cards");

        let params: string[] = []
        if (layout) params.push(`l=${layout}`)
        if (cards) params.push("c=f")
        
        throw redirect(307, `./s/${(sid as string).toLowerCase()}${params.length > 0 ? "?" + params.join("&") : ""}`);
    }
  };