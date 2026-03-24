export default async function getAllHomes() {
    const response = await fetch("https://dinmaegler.onrender.com/homes");
    return response.json();
}