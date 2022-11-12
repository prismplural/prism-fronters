import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        let sid = data.get('sid');

        throw redirect(307, `./f/${sid.toLowerCase()}`);
    }
  };