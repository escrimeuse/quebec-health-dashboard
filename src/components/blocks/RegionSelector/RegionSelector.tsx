import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRegionData } from "./api";
import { useQuery } from "@tanstack/react-query";

export function RegionSelector({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["regions"],
    queryFn: async () => await getRegionData(),
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a Region" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.map(({ code, name }) => (
            <SelectItem key={code} value={code}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
