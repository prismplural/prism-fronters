import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        let sid = data.get('sid');
        let layout = data.get("layout");

        let params: string[] = []
        if (layout) params.push(`l=${layout}`)
        
        throw redirect(307, `./s/${(sid as string).toLowerCase()}${params.length > 0 ? "?" + params.join("&") : ""}`);
    }
  };