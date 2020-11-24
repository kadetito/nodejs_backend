export interface Jornadas {
  id_jornada?: string;
  horaEntrada: {
    type: string;
    required: [true, "La hora es obligatoria"];
  };
}
