import { Card } from "@components/card";

import { Button } from "@vms/ui";

export default function Home() {
  return (
    <div className="text-2xl text-center">
      Welcome to VMS
      <br /> <Button>Click me</Button>
      <Card>Hello from card</Card>
    </div>
  );
}
