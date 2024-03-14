import { HttpHeaders } from "@angular/common/http";
import { config } from "../../environments/environment";
import { decrypt } from "./crypto-helper";

/*
    Função para retornar um objeto HttHeader contendo um TOKEN JWT autorizado
*/
export function authHeader() : HttpHeaders {

    // Ler o token que está gravado na local storage
    const data = localStorage.getItem(config.authToken) as string;

    // Descriptografar o valor do token
    const token = decrypt(data);

    // Criando o cabeçalho das requisições
    const httpHeaders = new HttpHeaders({
        Authorization: 'Bearer ' +  token
      })

    // Retornar o valor
    return httpHeaders;
}