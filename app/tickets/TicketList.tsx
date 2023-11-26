const getTickets = async () => {
  const res = await fetch(`http://localhost:4000/tickets`, {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
};

const TicketList = async () => {
  const tickets = await getTickets();

  interface Ticket {
    id: string;
    title: string;
    priority: string;
    body: string;
  }

  return (
    <>
      {tickets.map((ticket: Ticket) => (
        <div key={ticket.id} className="card my-5">
          <h3>{ticket.title}</h3>
          <p>{ticket.body.slice(0, 200)}...</p>
          <div className={`pill ${ticket.priority}`}>
            {ticket.priority} priority
          </div>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets</p>
      )}
    </>
  );
};

export default TicketList;
