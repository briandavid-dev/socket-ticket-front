export const getUltimosTickets = async () => {
  const resp = await fetch("http://localhost:8080/ultimos-tickets");
  const data = await resp.json();
  return data.ultimos;
};
