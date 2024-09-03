'use client'
import { Card } from "@components/card";
import { Button } from "@vms/ui";
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="text-2xl text-center text-red-500">
      Welcome to VMS
      <br /> <Button>Click me</Button>
      <Card>Hello from card</Card>
      <button className="text-black-500"  onClick={()=>router.push("forgot-password")} >gooo</button>
      <br/>
      
      <Link href="/forgot-password">Dashboard</Link>
    </div>
  );
}
