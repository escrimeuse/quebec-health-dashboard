import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { getSurgicalWaitlistData } from "./api";
import { useCallback, useMemo, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CHART_CONFIG, WAIT_LABELS } from "./constants";
import type { SurgicalWaitlist, Delay } from "./types";
import type { Region } from "@/utils/regions";
import { CalendarClock } from "lucide-react";

export function SurgicalWaitlist({ region }: { region: Region }) {
  const [delay, setDelay] = useState<Delay>("0_6");

  const queryFn = useCallback(async () => {
    return getSurgicalWaitlistData({ region, delay });
  }, [region, delay]);

  const { data, isLoading } = useQuery({
    queryKey: ["surgical-waitlist-data", delay, region],
    queryFn,
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="gap-2 flex flex-row items-center">
            <CalendarClock />
            Surgical Waitlist
          </CardTitle>

          <CardDescription>
            Number of patients on the surgical waitlist over time, by surgical
            specialty, wait time period, and region.
          </CardDescription>
          <CardAction>
            <ToggleGroup type="single" value={delay} variant="outline">
              {Object.keys(WAIT_LABELS).map((key) => {
                return (
                  <ToggleGroupItem
                    key={key}
                    value={key}
                    size="sm"
                    onClick={() => setDelay(key as Delay)}
                  >
                    {WAIT_LABELS[key as keyof typeof WAIT_LABELS]}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </CardAction>
        </CardHeader>
        <CardContent>
          {isLoading || data === undefined ? (
            <p>Loading</p>
          ) : (
            <SurgicalWaitlistChart data={data} />
          )}
        </CardContent>
      </Card>
    </>
  );
}

function SurgicalWaitlistChart({ data }: { data: SurgicalWaitlist[] }) {
  const transformed = useMemo(() => {
    return data.map((d) => {
      return {
        ...d,
        xAxis: `${d.period}-${d.year}`,
      };
    });
  }, [data]);

  return (
    <ChartContainer config={CHART_CONFIG}>
      <LineChart accessibilityLayer data={transformed}>
        <CartesianGrid vertical={false} />

        <XAxis
          xAxisId={0}
          dataKey="xAxis"
          allowDuplicatedCategory={true}
          tick={CustomizedAxisTick}
          interval={0}
          tickLine={true}
          axisLine={true}
        ></XAxis>
        <YAxis yAxisId={0} tickLine={false} axisLine={true} />

        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                const [period, year] = value.split("-");
                return `Financial Period ${period} (${year})`;
              }}
            />
          }
        />

        {Object.keys(CHART_CONFIG).map((specialtyKey) => (
          <Line
            key={specialtyKey}
            dataKey={specialtyKey}
            stroke={CHART_CONFIG[specialtyKey].color}
            strokeWidth={2}
            type="monotone"
            activeDot={{ r: 3 }}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomizedAxisTick({ x, y, payload }: any) {
  const [period, year] = payload.value.split("-");
  const label = period === "P01" ? year : "";

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        {label}
      </text>
    </g>
  );
}
