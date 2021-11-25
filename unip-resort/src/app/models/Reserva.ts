import { Cliente } from "./Cliente";
import { Quarto } from "./Quarto";

export interface Reserva {
    id: number;
    dataReserva: Date | string;
    dataSaida: Date | string;
    valor: number;
    status:boolean;
    tempoEstadia: Number;
    cliente: Cliente | Number;
    quarto: any;
    categoria?: any;
}