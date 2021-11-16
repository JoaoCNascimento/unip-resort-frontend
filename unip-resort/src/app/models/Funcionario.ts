import { Pessoa } from "./Pessoa";

export interface Funcionario extends Pessoa {
    matricula: string
    ctps: string
    dataAdmissao: Date
    cargo: string
    salario: Number
    // hospedagem: Hospedagem
}