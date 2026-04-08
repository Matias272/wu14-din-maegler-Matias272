export default async function getHomeById(id) {
  if (!id) {
    throw new Response("Property id is missing", { status: 400 });
  }

  const response = await fetch(`https://dinmaegler.onrender.com/homes/${id}`);

  if (!response.ok) {
    throw new Response("Property not found", { status: response.status });
  }

  return response.json();
}
