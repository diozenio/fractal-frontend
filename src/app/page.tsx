"use client";
import { Button } from "@/ui/primitives/button";

export default function Home() {
  return (
    <div className="flex h-screen flex-col gap-4 items-center justify-center">
      Hello World
      <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
    </div>
  );
}
