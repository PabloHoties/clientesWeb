import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { config } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consulta-clientes.component.html',
  styleUrl: './consulta-clientes.component.css'
})
export class ConsultaClientesComponent implements OnInit {

  //atributos
  clientes: any[] = []; //array de objetos
  mensagem: string = '';//exibir mensagens

  //método construtor
  //inicializar o HttpClient
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    
  }

  //método executado sempre que o componente
  //for exibido na página (ao carregar o componente)
  ngOnInit(): void {  
    
    //fazendo uma requisição para consultar os clientes na API
    this.httpClient.get(config.apiUrl + '/clientes')
      .subscribe({ //função para capturar o retorno da API
        next: (data) => { //resposta de sucesso
          //guardar os clientes obtidos na consulta da API
          this.clientes = data as any[];
        },
        error: (e) => { //resposta de erro
          console.log(e.error);
        }
      });
  }

  //método executado no momento em que o botão de exclusão for clickado
  onDelete(id: string) : void {
    if(confirm('Deseja realmente excluir o cliente selecionado?')) {
    this.httpClient.delete(config.apiUrl + '/clientes/' + id, { responseType: 'text' })
    .subscribe({
      next: (data) => {
         this.mensagem = data; //guardando a mensagem obtida
         this.ngOnInit(); //executando a consulta novamente
      },
      error: (e) => {
          console.log(e.error);
      }
    })
    }
  }

  //método para abrir a página de edição do cliente
  onEdit(id: string): void {
    this.router.navigate(['/clientes-edicao', id]);
  }
}
