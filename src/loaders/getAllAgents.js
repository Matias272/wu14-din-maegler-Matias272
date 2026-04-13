export default async function getAllAgents() {
  const response = await fetch("https://dinmaegler.onrender.com/agents");
  return response.json();
}