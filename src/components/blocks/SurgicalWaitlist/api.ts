import axios from 'axios';
import { API_HOST } from '@/api/constants';
import type { SurgicalWaitlist } from './types';

export async function getSurgicalWaitlistData({region, delay}: {region: string, delay: string}) {
   const response = await axios.get<SurgicalWaitlist[]>(`${API_HOST[import.meta.env.MODE]}/waitlist`, {
      params: {
         region,
         delay,
      }
   });
   
   return response.data;
}