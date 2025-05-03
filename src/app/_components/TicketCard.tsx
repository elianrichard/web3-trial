import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TicketCard = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tari Kecak</CardTitle>
        <CardDescription>Mint your ticket now!</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <p className="text-2xl font-bold">50 SOL</p>
        <Button disabled>Minted</Button>
        {/* <Button>Mint!</Button> */}
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
