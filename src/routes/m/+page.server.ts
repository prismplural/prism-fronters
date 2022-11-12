import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        let mid = data.get('mid');

        throw redirect(307, `./m/${mid.toLowerCase()}`);
    }
  };