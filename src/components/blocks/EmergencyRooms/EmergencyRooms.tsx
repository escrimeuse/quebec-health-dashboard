import { useQuery } from "@tanstack/react-query";
import { getEmergencyRoomData } from "./api";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo, useState } from "react";
import type { Region } from "@/utils/regions";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Ambulance, Hospital, History } from "lucide-react";

const SORT_BY = [
  { label: "Patients in ER", value: "totalERPatients" },
  { label: "Occupied Stretchers", value: "occupiedStretchers" },
  { label: "Wait time (waiting room)", value: "waitTimeAmbulatory" },
  { label: "Wait time (stretcher)", value: "waitTimeStretcher" },
];

const NO_DATA_AVAILABLE = "pas d'information disponible";

export function EmergencyRooms({ region }: { region: Region }) {
  const [sort, setSort] = useState("totalERPatients");

  const { data } = useQuery({
    queryKey: ["emergency-room-data"],
    queryFn: async () => {
      return getEmergencyRoomData();
    },
  });

  const filteredData = useMemo(() => {
    return data?.records
      .filter((record) => Number(record.RSS) === Number(region.substring(3)))
      .filter((record) => record.Nom_installation !== "Total régional")
      .map((record) => {
        return {
          ...record,
          waitTimeAmbulatory: transformedData(record.DMS_ambulatoire),
          waitTimeStretcher: transformedData(record.DMS_sur_civiere),
          totalERPatients: transformedData(
            record.Nombre_total_de_patients_presents_a_lurgence,
          ),
          occupiedStretchers: transformedData(
            record.Nombre_de_civieres_occupees,
          ),
          totals: [
            {
              category: "patientsWaitingFirstVisit",
              count: transformedData(
                record.Nombre_total_de_patients_en_attente_de_PEC,
              ),
              fill: "var(--color-yellow-200)",
            },
            {
              category: "patientsSeen",
              count:
                Number(record.Nombre_total_de_patients_presents_a_lurgence) -
                Number(record.Nombre_total_de_patients_en_attente_de_PEC),
              fill: "var(--color-yellow-300)",
            },
          ],
          stretchers: [
            {
              category: "occupiedStretchers",
              count:
                Number(record.Nombre_de_civieres_occupees) -
                Number(
                  record.Nombre_de_patients_sur_civiere_plus_de_24_heures,
                ) -
                Number(record.Nombre_de_patients_sur_civiere_plus_de_48_heures),
              fill: "var(--color-red-200)",
            },
            {
              category: "occupied24Hours",
              count: transformedData(
                record.Nombre_de_patients_sur_civiere_plus_de_24_heures,
              ),
              fill: "var(--color-red-400)",
            },
            {
              category: "occupied48Hours",
              count: transformedData(
                record.Nombre_de_patients_sur_civiere_plus_de_48_heures,
              ),
              fill: "var(--color-red-600)",
            },
          ],
        };
      })
      .sort((a, b) => {
        const aValue = a[sort];
        const bValue = b[sort];

        if (aValue < bValue) {
          return -1;
        }
        if (aValue === bValue) {
          return 0;
        }
        return 1;
      });
  }, [data, region, sort]);

  console.log("filteredData", filteredData);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="gap-2 flex flex-row items-center">
          <Ambulance />
          Emergency Room Status
        </CardTitle>
        <CardAction className="gap-2 flex flex-row content-center items-center">
          <p className="text-sm">Sort by</p>
          <ToggleGroup type="single" value={sort} variant="outline">
            {SORT_BY.map((sortMethod) => {
              return (
                <ToggleGroupItem
                  key={sortMethod.value}
                  value={sortMethod.value}
                  size="sm"
                  onClick={() => setSort(sortMethod.value)}
                >
                  {sortMethod.label}
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-6 grid grid-cols-1">
          {filteredData?.map((data) => {
            console.log("data", data);
            const [stretcherWaitHours, stretcherWaitMinutes] =
              data.DMS_sur_civiere_horaire === NO_DATA_AVAILABLE
                ? []
                : data.DMS_sur_civiere_horaire.split(":").map(Number);
            const [ambulatoryWaitHours, ambulatoryWaitMinutes] = (
              data.DMS_ambulatoire_horaire === NO_DATA_AVAILABLE
                ? ""
                : data.DMS_ambulatoire_horaire
            )
              .split(":")
              .map(Number);
            return (
              <Item key={data.No_permis_installation} variant="muted">
                <ItemHeader>
                  <ItemTitle className="gap-2 flex flex-row items-center">
                    <Hospital />
                    {data.Nom_installation}
                  </ItemTitle>
                  <ItemDescription className="gap-1 flex flex-row items-center text-xs">
                    <History size={18} />
                    Last updated at: {data.Mise_a_jour}
                  </ItemDescription>
                </ItemHeader>
                <ItemContent className="gap-2 grid grid-cols-3">
                  <ChartContainer
                    config={{
                      patientsWaitingFirstVisit: {
                        label: "Patients Waiting To Be Seen",
                      },
                      patientsSeen: { label: "Patients Already Seen" },
                    }}
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                      />
                      <Pie
                        data={data.totals}
                        dataKey="count"
                        nameKey="category"
                        innerRadius={70}
                        strokeWidth={5}
                      >
                        <Label
                          content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                              return (
                                <text
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="fill-foreground text-3xl font-bold"
                                  >
                                    {
                                      data.Nombre_total_de_patients_presents_a_lurgence
                                    }
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                  >
                                    Patients in ER
                                  </tspan>
                                </text>
                              );
                            }
                          }}
                        />
                      </Pie>
                    </PieChart>
                  </ChartContainer>

                  <ChartContainer
                    config={{
                      occupiedStretchers: {
                        label: "Patients in stretchers less than 24 hours",
                      },
                      occupied24Hours: {
                        label: "Patients in stretchers more than 24 hours",
                      },
                      occupied48Hours: {
                        label: "Patients in stretchers more than 48 hours",
                      },
                    }}
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                      />
                      <Pie
                        data={data.stretchers}
                        dataKey="count"
                        nameKey="category"
                        innerRadius={70}
                        strokeWidth={5}
                      >
                        <Label
                          content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                              return (
                                <text
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="fill-foreground text-3xl font-bold"
                                  >
                                    {data.Nombre_de_civieres_occupees} /{" "}
                                    {data.Nombre_de_civieres_fonctionnelles}
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                  >
                                    Occupied Stretchers
                                  </tspan>
                                </text>
                              );
                            }
                          }}
                        />
                      </Pie>
                    </PieChart>
                  </ChartContainer>

                  <div className="gap-8 flex flex-col content-center justify-center content-stretch">
                    <div className="gap-1 flex items-center flex-col">
                      <span className="text-5xl font-bold">
                        {stretcherWaitHours}h {stretcherWaitMinutes}m
                      </span>
                      <p className="text-lg">Average wait time on stretcher</p>
                    </div>

                    <div className="gap-1 flex items-center flex-col">
                      <span className="text-5xl font-bold">
                        {ambulatoryWaitHours}h {ambulatoryWaitMinutes}m
                      </span>
                      <p className="text-lg">
                        Average wait time in waiting room
                      </p>
                    </div>
                  </div>
                </ItemContent>
              </Item>
            );
          })}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}

function transformedData(data) {
  if (data === NO_DATA_AVAILABLE || data === null || data === undefined) {
    return null;
  }

  return Number(data);
}
