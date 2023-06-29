import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        let sid = data.get('sid');
        let layout = data.get("layout");
        let showSystem = data.get("system");

        let params: string[] = []
        if (layout) params.push(`l=${layout}`)
        if (showSystem) params.push(`s=y`)

        throw redirect(307, `./f/${(sid as string).toLowerCase()}${params.length > 0 ? "?" + params.join("&") : ""}`);
    }
  };