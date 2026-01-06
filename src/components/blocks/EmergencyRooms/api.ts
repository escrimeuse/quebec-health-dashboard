import type { QuebecOpenData } from "@/api/types";
import axios from "axios";
import type { EmergencyRoomData } from "./types";

const RESOURCE_ID = "b256f87f-40ec-4c79-bdba-a23e9c50e741";

const API_URL_QUERY = `https://www.donneesquebec.ca/recherche/api/3/action/datastore_search_sql?sql=SELECT * from "${RESOURCE_ID}"`;

export async function getEmergencyRoomData() {
  const response =
    await axios.get<QuebecOpenData<EmergencyRoomData>>(API_URL_QUERY);

  return response.data.result;
}
