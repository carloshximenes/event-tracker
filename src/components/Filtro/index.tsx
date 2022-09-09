import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { EstadoEvento, IFiltroEvento } from "../../interfaces/IFiltroEvento";
import { filtroDeEventos } from "../../state/atom";
import style from "./Filtro.module.scss";

const Filtro: React.FC = () => {
	const [data, setData] = useState("");
	const [estado, setEstado] = useState<EstadoEvento>(null);

	const setFiltroDeEvento = useSetRecoilState<IFiltroEvento>(filtroDeEventos);

	const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();
		const filtro: IFiltroEvento = {
			data: data ? new Date(data) : null,
			estado,
		};
		setFiltroDeEvento(filtro);
	};

	const aoMudarEstadoFiltro = (
		evento: React.ChangeEvent<HTMLSelectElement>
	) => {
		const valor = evento.target.value;

		valor === "completos" || valor === "incompletos"
			? setEstado(valor)
			: setEstado(null);
	};

	return (
		<form className={style.Filtro} onSubmit={submeterForm}>
			<h3 className={style.titulo}>Filtrar por data</h3>
			<input
				type="date"
				name="data"
				className={style.input}
				onChange={(evento) => setData(evento.target.value)}
				placeholder="Por data"
				value={data}
			/>
			<select
				className={style.select}
				name="select"
				onChange={aoMudarEstadoFiltro}
				defaultValue={""}
			>
				<option value="">Todos</option>
				<option value="completos">Completos</option>
				<option value="incompletos">Incompletos</option>
			</select>

			<button className={style.botao}>Filtrar</button>
		</form>
	);
};

export default Filtro;
