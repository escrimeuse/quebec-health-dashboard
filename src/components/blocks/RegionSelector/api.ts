import axios from "axios";
import { API_HOST } from "@/api/constants";
import type { Regions } from "./types";

export async function getRegionData() {
  const response = await axios.get<Regions[]>(
    `${API_HOST[import.meta.env.MODE]}/regions`,
  );

  return response.data;
}
