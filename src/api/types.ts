export type QuebecOpenData<T> = {
  help: string;
  result: {
    fields: Field[];
    records: T[];
    sql: string | null;
  };
  success: boolean;
};

export type Field = {
  id: string;
  type: "int4" | "tsvector" | "numeric" | "text" | "timestamp";
};
