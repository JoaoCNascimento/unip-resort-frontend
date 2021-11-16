import { Funcionario } from "./Funcionario";

export interface Gerente extends Funcionario {
    bonificacao: Number;
}