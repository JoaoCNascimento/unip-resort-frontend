import { Cliente } from "./Cliente";
import { Quarto } from "./Quarto";

export interface Reserva {
    id: number;
    dataReserva: Date | string;
    dataSaida: Date | string;
    valor: number;
    status:boolean;
    tempoEstadia: Number;
    cliente: any;
    quarto: any;
    categoria?: any;
}