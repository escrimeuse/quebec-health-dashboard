import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {SurgicalWaitlist} from './components/blocks/SurgicalWaitlist/SurgicalWaitlist.tsx';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./components/ui/card.tsx";
import { EmergencyRooms } from "./components/blocks/EmergencyRooms/EmergencyRooms.tsx";
import { RegionSelector } from "./components/blocks/RegionSelector/RegionSelector.tsx";
import { useState } from "react";

const QUERY_CLIENT = new QueryClient();

function App() {
  const [region, setRegion] = useState<Region>('RSS06');

  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <div className="bg-sky-50 min-h-screen py-8">
      <div className="gap-8 p-4 w-4/5 flex flex-col m-auto">
      <Card>
        <CardHeader>
          <CardTitle><h1 className="text-xl">Quebec Health System Dashboard</h1></CardTitle>
          <CardAction><RegionSelector value={region} onValueChange={(value) => setRegion(value as any)} /></CardAction>
        </CardHeader>
      </Card>
      <SurgicalWaitlist region={region}/>
      <EmergencyRooms region={region} />
      </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
