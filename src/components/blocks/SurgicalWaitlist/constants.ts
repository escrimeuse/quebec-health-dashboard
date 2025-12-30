import type { ChartConfig } from "@/components/ui/chart";
import type { Region, SurgicalSpecialty, Wait } from "./types";

export const REGION_LABELS: Record<Region, string> = {
    RSS01: 'Bas-Saint-Laurent',
    RSS02: 'Saguenay-Lac-Saint-Jean',
    RSS03: 'Capitale-Nationale',    
    RSS04: 'Mauricie et Centre-du-Québec',
    RSS05: 'Estrie',
    RSS06: 'Montréal',
    RSS07: 'Outaouais',
    RSS08: 'Abitibi-Témiscamingue',
    RSS09: 'Côte-Nord',
    RSS10: 'Nord-du-Québec',
    RSS11: 'Gaspésie-Îles-de-la-Madeleine',
    RSS12: 'Chaudière-Appalaches',
    RSS13: 'Laval',
    RSS14: 'Lanaudière',
    RSS15: 'Laurentides',
    RSS16: 'Montérégie'
}

export const CHART_CONFIG: ChartConfig = {
    Chirurgie_generale:{ label: 'General Surgery', color: 'var(--color-red-400)'},
    Chirurgie_orthopedique: { label: 'Orthopedic Surgery', color: 'var(--color-blue-400)'},   
    Chirurgie_plastique: { label: 'Plastic Surgery', color: 'var(--color-green-400)'},
    Chirurgie_vasculaire: { label: 'Vascular Surgery', color: 'var(--color-yellow-400)'},
    Neurochirurgie: { label: 'Neurosurgery', color: 'var(--color-purple-400)'},
    Obstetrique_et_gynecologie: { label: 'Obstetrics and Gynecology', color: 'var(--color-pink-400)'},
    ORL_chirurgie_cervico_faciale: { label: 'ENT or Cervico-facial Surgery', color: 'var(--color-indigo-400)'},
    Ophtalmologie: { label: 'Ophthalmology', color: 'var(--color-teal-400)'},
    Urologie: { label: 'Urology', color: 'var(--color-orange-400)'},
    Autres: { label: 'Others', color: 'var(--color-cyan-400)'},
    Total: { label: 'Total', color: 'var(--color-gray-400)'}
}

export const WAIT_LABELS: Record<Wait, string> = {
    '0 à 6 mois': '0 to 6 months',
    '6 à 12 mois': '6 to 12 months',
    "Plus d'1 an": 'More than 1 year'
}