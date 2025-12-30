import {  ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query";
import {Line, LineChart, CartesianGrid, XAxis, YAxis} from "recharts";
import { getSurgicalWaitlistData } from "./api";
import { useMemo, useState } from "react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CHART_CONFIG, WAIT_LABELS } from "./constants";
import type { SurgicalWaitlist, Wait } from "./types";
import type { Region } from "@/utils/regions";

export function SurgicalWaitlist({region}: {region: Region}) {
  const [waitPeriod, setWaitPeriod] = useState<Wait>("0 à 6 mois");
  
  const {data, isLoading} = useQuery({queryKey: ['surgical-waitlist-data'], queryFn: async () => {
    return getSurgicalWaitlistData();
  }});


  return (
    <>
      <Card>
        <CardHeader>
            <CardTitle>Surgical Waitlist</CardTitle>
        
            <CardDescription>
                Number of patients on the surgical waitlist over time, by surgical specialty, wait time period, and region.
            </CardDescription>
            <CardAction>
                <ToggleGroup type="single" value={waitPeriod} variant="outline">
                    {Object.keys(WAIT_LABELS).map((key) => {
                        return <ToggleGroupItem key={key} value={key} size="sm" onClick={() => setWaitPeriod(key as Wait)}>{WAIT_LABELS[key as keyof typeof WAIT_LABELS]}</ToggleGroupItem>
                    })}
                </ToggleGroup>
 
            </CardAction>
        </CardHeader>
        <CardContent>
          {isLoading || data === undefined ? <p>Loading</p> : <SurgicalWaitlistChart chartData={data.records} region={region} wait={waitPeriod}/>}
        </CardContent>
      </Card>
    </>
  )
}

function SurgicalWaitlistChart({ chartData, region, wait}: { chartData: SurgicalWaitlist[], region?: Region, wait?: Wait}) {
  const data = useMemo(() => {
    if (!chartData) return [];

    return chartData.filter((record) => record.Region === region && record['Delais_d\'attente'] === wait);
  }, [chartData, region, wait])

  return (<ChartContainer config={CHART_CONFIG}>
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        
        <XAxis xAxisId={0} dataKey="PeriodeAttente" allowDuplicatedCategory={true} tick={CustomizedAxisTick} interval={0} tickLine={true} axisLine={true}></XAxis>
        <YAxis yAxisId={0} tickLine={false} axisLine={true} />

        <ChartTooltip content={<ChartTooltipContent labelFormatter={(value) =>  {
            const [year, period] = value.split('-');
            return `Financial Period ${period} (20${year.substring(0,2)})`;
        }} />} />

        {Object.keys(CHART_CONFIG).map((specialtyKey) => (<Line key={specialtyKey} dataKey={specialtyKey} stroke={CHART_CONFIG[specialtyKey].color} strokeWidth={2} type="monotone" activeDot={{r: 3}} dot={false} />))}

      </LineChart>
    </ChartContainer>)
}


function CustomizedAxisTick({x, y, payload}: any) {
  const label = payload.value.indexOf("P01") > -1 ? `20${payload.value.substring(0,2)}` : '';

   return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        {label}
      </text>
    </g>
  );
}