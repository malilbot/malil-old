const site = "https://hst.sh/"
import centra from "centra";

export async function hst(body: string) {
    const post = await (await centra(site + "documents", "POST")
        .body(body)
        .send()).json();
    return site + post.key;
}
