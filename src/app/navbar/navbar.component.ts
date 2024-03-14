import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { config } from '../../environments/environment';
import { decrypt } from '../helpers/crypto-helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  // Atributos
  isAuthenticated: boolean = false;
  emailUsuario: string = '';

  // Função executada quando a página é aberta
  ngOnInit(): void {
    // Verificar se existem dados de usuário gravados na local storage
    if(localStorage.getItem(config.authEmail) != null 
        && localStorage.getItem(config.authToken) != null) {

          // Capturar os dados
          const email = decrypt(localStorage.getItem(config.authEmail) as string);

          // Preenchendo os atributos
          this.isAuthenticated = true;
          this.emailUsuario = email;
    }
  }

  /*
    Função executada quando o usuário clicar no botão 'sair' (logout)
  */
    logout(): void {
      if(confirm('Deseja realmente sair do sistema?')) {
        // Apagar os dados gravados na local storage
        localStorage.removeItem(config.authEmail);
        localStorage.removeItem(config.authToken);

        // Redirecionar para a página raiz do projeto
        location.href = '/';
      }
    }
}
