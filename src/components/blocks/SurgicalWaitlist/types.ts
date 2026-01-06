import type { Region } from "@/utils/regions";

export type SurgicalWaitlist = {
  id: number;
  delay: Delay;
  period: Period;
  year: string;
  region: Region;
  total: number | null;
} & { [key in SurgicalSpecialty]: number | null };

export type Delay = "0_6" | "6_12" | "12_plus";

export type Period =
  | "P01"
  | "P02"
  | "P03"
  | "P04"
  | "P05"
  | "P06"
  | "P07"
  | "P08"
  | "P09"
  | "P10"
  | "P11"
  | "P12"
  | "P13";

export type SurgicalSpecialty =
  | "entf"
  | "general"
  | "neuro"
  | "obgyn"
  | "opthamology"
  | "orthopedic"
  | "other"
  | "plastic"
  | "urology"
  | "vascular";
