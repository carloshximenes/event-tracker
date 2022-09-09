import { selector } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { EstadoEvento } from "../../interfaces/IFiltroEvento";
import { filtroDeEventos, listaDeEventosState } from "../atom";

const filtrarPorData = (lista: IEvento[], data?: Date | null) => {
	return lista.filter((evt) => {
		if (!data) {
			return true;
		}
		const ehOwMesmoDia =
			data!.toISOString().slice(0, 10) ===
			evt.inicio.toISOString().slice(0, 10);
		return ehOwMesmoDia;
	});
};

const filtrarPorEstado = (lista: IEvento[], estado?: EstadoEvento) => {
	return lista.filter((evt) => {
		if (!estado) {
			return true;
		}
		const ehOwMesmoEstado =
			estado === "completos" ? evt.completo : !evt.completo;
		return ehOwMesmoEstado;
	});
};

export const eventosFiltradosState = selector({
	key: "eventosFiltradosState",
	get: ({ get }) => {
		const filtro = get(filtroDeEventos);
		const todosOsEventos = get(listaDeEventosState);
		let eventosFiltradosPorData = filtrarPorData(
			todosOsEventos,
			filtro?.data
		);

		let eventosFiltradosPorStatus = filtrarPorEstado(
			eventosFiltradosPorData,
			filtro?.estado
		);

		return eventosFiltradosPorStatus;
	},
});

export const eventosAsync = selector({
	key: "eventosAsync",
	get: async () => {
		const respostaHttp = await fetch("http://localhost:8080/eventos");
		const eventosJson: IEvento[] = await respostaHttp.json();
		return eventosJson.map((evento) => ({
			...evento,
			inicio: new Date(evento.inicio),
			fim: new Date(evento.fim),
		}));
	},
});
