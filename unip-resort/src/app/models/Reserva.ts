import { Cliente } from "./Cliente";
import { Quarto } from "./Quarto";

export interface Reserva {
    id: number;
    dataReserva: Date;
    dataSaida: Date;
    valor: number;
    status:boolean;
    cliente: Cliente;
    quarto: Quarto;
}