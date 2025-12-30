import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {SurgicalWaitlist} from './components/blocks/SurgicalWaitlist/SurgicalWaitlist.tsx';
import { Card, CardContent, CardTitle } from "./components/ui/card.tsx";

const QUERY_CLIENT = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <div className="bg-sky-50 min-h-screen py-8">
      <div className="gap-8 p-4 w-4/5 flex flex-col m-auto">
      <Card>
        <CardContent>
          <CardTitle><h1 className="text-xl">Quebec Health System Dashboard</h1></CardTitle>
        </CardContent>
      </Card>
      <SurgicalWaitlist />
      </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
