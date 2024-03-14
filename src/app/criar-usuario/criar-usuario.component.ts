import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { config } from '../../environments/environment';

@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  // Atributos
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  // Método construtor
  constructor(
    private httpClient: HttpClient
  ) {}

  // Criando a estrutura do formulário
  form = new FormGroup({
    /* campo 'nome' */
    nome : new FormControl('', [
      Validators.required, Validators.minLength(8)
    ]),
    /* campo 'email' */
    email : new FormControl('', [
      Validators.required, Validators.email
    ]),
    /* campo 'senha' */
    senha : new FormControl('', [
      Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/)
    ])
  });

  // Função auxiliar para verificar o preenchimento dos campos
  get f() {
    return this.form.controls;
  }

  // Função para capturar o SUBMIT do formulário
  onSubmit(): void {
    
    // Limpar as mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    // Fazendo uma requisição HTTP POST para a API de usuários
    this.httpClient.post(config.apiUrlUsuarios + "/usuarios/criar", this.form.value,
      { responseType: 'text'})
      .subscribe({
        next: (data: any) => {
          this.mensagemSucesso = data;
          this.form.reset();
        },
        error: (e) => {
          this.mensagemErro = e.error;
        }
      });
  }
}
