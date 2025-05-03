import TicketCard from "../_components/TicketCard";

export default async function TicketsPage() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <TicketCard key={index} />
      ))}
    </div>
  );
}
