export default async function getAllHomes(request) {
    const homesUrl = new URL("https://dinmaegler.onrender.com/homes");

    if (request) {
        const url = new URL(request.url);
        const search = url.searchParams.get("search")?.trim();

        if (search) {
            homesUrl.searchParams.set("_q", search);
        }
    }

    const response = await fetch(homesUrl.toString());
    return response.json();
}