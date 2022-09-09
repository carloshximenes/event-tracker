import { useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { IEvento } from "../../interfaces/IEvento";
import { listaDeEventosState } from "../atom";

const useAdicionarEvento = () => {
	const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

	return (evento: IEvento) => {
		const hoje = new Date();
		if (evento.inicio < hoje) {
			throw new Error(
				"Eventos não podem ser cadastrados com data menor do que a atual"
			);
		}
		evento.id = uuidv4();
		setListaDeEventos((listaAntiga) => [...listaAntiga, evento]);
	};
};

export default useAdicionarEvento;
