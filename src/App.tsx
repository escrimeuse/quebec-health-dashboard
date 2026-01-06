import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SurgicalWaitlist } from "./components/blocks/SurgicalWaitlist/SurgicalWaitlist.tsx";
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "./components/ui/card.tsx";
import { RegionSelector } from "./components/blocks/RegionSelector/RegionSelector.tsx";
import { useState } from "react";
import { HeartPulse } from "lucide-react";

const QUERY_CLIENT = new QueryClient();

function App() {
  const [region, setRegion] = useState<string>("RSS06");

  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="gap-8 p-4 w-4/5 max-w-7xl flex flex-col m-auto">
          <Card>
            <CardHeader>
              <CardTitle>
                <h1 className="text-xl gap-2 flex flex-row content-center items-center">
                  <HeartPulse />
                  Quebec Health System Dashboard
                </h1>
              </CardTitle>
              <CardAction>
                <RegionSelector
                  value={region}
                  onValueChange={(value) => setRegion(value as Region)}
                />
              </CardAction>
            </CardHeader>
          </Card>
          <SurgicalWaitlist region={region} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
