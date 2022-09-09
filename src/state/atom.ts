import { atom } from "recoil";
import { IEvento } from "../interfaces/IEvento";
import { IFiltroEvento } from "../interfaces/IFiltroEvento";
import { eventosAsync } from "./seletores";

export const listaDeEventosState = atom<IEvento[]>({
	key: "listaDeEventosState",
	default: eventosAsync,
});

export const filtroDeEventos = atom<IFiltroEvento>({
	key: "filtroDeEventos",
	default: {},
});
