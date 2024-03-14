import { Router } from "@angular/router";
import { config } from "../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    // Construtor para injeção de dependência
    constructor(
        private router: Router
    ) {}

    /*
        Método para verificar se o usuário está autenticado no sistema
    */
   canActivate() {
    // Verificar se o usuário está autenticado na local storage
    if(localStorage.getItem(config.authEmail) != null 
        && localStorage.getItem(config.authToken) != null) {
            return true;
    }
    else {
        // Redirecionar para a página de autenticação
        this.router.navigate(['/autenticar-usuario']);
        return false;
    }
    
   }
}