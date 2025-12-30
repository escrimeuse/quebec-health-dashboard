import type { QuebecOpenData } from '@/api/types';
import axios from 'axios';
import type { SurgicalWaitlist } from './types';

const RESOURCE_ID = '7c83f4be-bc3a-4756-86db-115e8ead93f1';

const API_URL_QUERY = `https://www.donneesquebec.ca/recherche/api/3/action/datastore_search_sql?sql=SELECT * from "${RESOURCE_ID}"`;

export async function getSurgicalWaitlistData() {
   const response = await axios.get<QuebecOpenData<SurgicalWaitlist>>(API_URL_QUERY);
   
   return response.data.result;
}