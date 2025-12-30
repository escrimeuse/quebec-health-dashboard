import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REGION_LABELS } from "@/utils/regions";

export function RegionSelector({value, onValueChange}: {value: string, onValueChange: (value: string) => void}) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select a Region" />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                {Object.entries(REGION_LABELS).map(([regionKey, regionLabel]) => (
                    <SelectItem key={regionKey} value={regionKey}>{regionLabel}</SelectItem>
                ))}
            </SelectGroup>
            </SelectContent>
        </Select>
    )
}