export type EmergencyRoomData = {
    No_permis_installation: string | null;
    Nombre_de_civieres_fonctionnelles: number;
    Nombre_de_civieres_occupees: number;
    Nombre_de_patients_sur_civiere_plus_de_24_heures: number;
    Nombre_de_patients_sur_civiere_plus_de_48_heures: number;
    Nombre_total_de_patients_presents_a_lurgence: number;
    Nombre_total_de_patients_en_attente_de_PEC : number;
    DMS_sur_civiere: number;
    DMS_ambulatoire: number;
    DMS_sur_civiere_horaire: string;
    DMS_ambulatoire_horaire: string;
    ['Heure_de_l\'extraction_(image)']: string;
    Mise_a_jour: string;
    RSS: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
    Region: 'Bas-Saint-Laurent' | 'Saguenay-Lac-Saint-Jean' | 'Capitale-Nationale' | 'Mauricie et Centre-du-Québec' | 'Estrie' | 'Montréal' | 'Outaouais' | 'Abitibi-Témiscamingue' | 'Côte-Nord' | 'Nord-du-Québec' | 'Gaspésie-Îles-de-la-Madeleine' | 'Chaudière-Appalaches' | 'Laval' | 'Lanaudière' | 'Laurentides' | 'Montérégie' | 'Ensemble du Québec';
    Nom_etablissement: string | 'Total régional';
    Nom_installation: string | 'Total régional';
}