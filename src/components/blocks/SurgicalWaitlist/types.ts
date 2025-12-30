export type SurgicalWaitlist = {
    Period: string;
    Region: Region;
    ['Delais_d\'attente']: Wait;
    Total: number;
} & { [key in SurgicalSpecialty]: number };

export type Region = 'RSS01' | 'RSS02' | 'RSS03' | 'RSS04' | 'RSS05' | 'RSS06' | 'RSS07' | 'RSS08' | 'RSS09' | 'RSS10' | 'RSS11' | 'RSS12' | 'RSS13' | 'RSS14' | 'RSS15' | 'RSS16';

export type Wait = '0 à 6 mois' | '6 à 12 mois' | 'Plus d\'1 an';

export type SurgicalSpecialty = 
    'Chirurgie_generale' | 
    'Chirurgie_orthopedique' |
    'Chirurgie_plastique' |
    'Chirurgie_vasculaire' |
    'Neurochirurgie' | 
    'Obstetrique_et_gynecologie' |
    'ORL_ou_chirurgie_cervico_faciale' |
    'Ophtalmologie' |
    'Urologie' |
    'Autres';