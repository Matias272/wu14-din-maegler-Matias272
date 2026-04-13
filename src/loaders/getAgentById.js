export default async function getAgentById(id) {
  if (!id) {
    throw new Response("Agent id is missing", { status: 400 });
  }

  const response = await fetch(`https://dinmaegler.onrender.com/agents/${id}`);

  if (!response.ok) {
    throw new Response("Agent not found", { status: response.status });
  }

  return response.json();
}