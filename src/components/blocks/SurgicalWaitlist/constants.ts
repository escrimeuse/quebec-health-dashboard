import type { ChartConfig } from "@/components/ui/chart";
import type { Delay } from "./types";

export const CHART_CONFIG: ChartConfig = {
    general:{ label: 'General Surgery', color: 'var(--color-red-400)'},
    orthopedic: { label: 'Orthopedic Surgery', color: 'var(--color-blue-400)'},   
    plastic: { label: 'Plastic Surgery', color: 'var(--color-green-400)'},
    vascular: { label: 'Vascular Surgery', color: 'var(--color-yellow-400)'},
    neuro: { label: 'Neurosurgery', color: 'var(--color-purple-400)'},
    obgyn: { label: 'Obstetrics and Gynecology', color: 'var(--color-pink-400)'},
    entf: { label: 'ENT or Cervico-facial Surgery', color: 'var(--color-indigo-400)'},
    opthamology: { label: 'Ophthalmology', color: 'var(--color-teal-400)'},
    urology: { label: 'Urology', color: 'var(--color-orange-400)'},
    other: { label: 'Others', color: 'var(--color-cyan-400)'},
    total: { label: 'Total', color: 'var(--color-gray-400)'}
}

export const WAIT_LABELS: Record<Delay, string> = {
    '0_6': '0 to 6 months',
    '6_12': '6 to 12 months',
    "12_plus": 'More than 1 year'
}