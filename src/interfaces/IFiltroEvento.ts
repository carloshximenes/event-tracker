export type EstadoEvento = "completos" | "incompletos" | null;

export interface IFiltroEvento {
	data?: Date | null;
	estado?: EstadoEvento;
}
