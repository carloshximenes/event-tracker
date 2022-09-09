import { useRecoilValue } from "recoil";
import { eventosAsync } from "../seletores";

const useListaEventos = () => {
	return useRecoilValue(eventosAsync);
};

export default useListaEventos;
