export type EmergencyRoomData = {
  No_permis_installation: string | null;
  Nombre_de_civieres_fonctionnelles: string | number | NoData;
  Nombre_de_civieres_occupees: string | number | NoData;
  Nombre_de_patients_sur_civiere_plus_de_24_heures: string | number | NoData;
  Nombre_de_patients_sur_civiere_plus_de_48_heures: string | number | NoData;
  Nombre_total_de_patients_presents_a_lurgence: string | number | NoData;
  Nombre_total_de_patients_en_attente_de_PEC: string | number | NoData;
  DMS_sur_civiere: string | number | NoData;
  DMS_ambulatoire: string | number | NoData;
  DMS_sur_civiere_horaire: string | null;
  DMS_ambulatoire_horaire: string | null;
  ["Heure_de_l'extraction_(image)"]: string | number;
  Mise_a_jour: string;
  RSS:
    | "01"
    | "02"
    | "03"
    | "04"
    | "05"
    | "06"
    | "07"
    | "08"
    | "09"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16";
  Region:
    | "Bas-Saint-Laurent"
    | "Saguenay-Lac-Saint-Jean"
    | "Capitale-Nationale"
    | "Mauricie et Centre-du-Québec"
    | "Estrie"
    | "Montréal"
    | "Outaouais"
    | "Abitibi-Témiscamingue"
    | "Côte-Nord"
    | "Nord-du-Québec"
    | "Gaspésie-Îles-de-la-Madeleine"
    | "Chaudière-Appalaches"
    | "Laval"
    | "Lanaudière"
    | "Laurentides"
    | "Montérégie"
    | "Ensemble du Québec";
  Nom_etablissement: string | "Total régional";
  Nom_installation: string | "Total régional";
};

type NoData = "pas d'information disponible";
