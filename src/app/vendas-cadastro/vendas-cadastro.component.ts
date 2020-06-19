import { VendasService } from './../vendas/vendas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendas-cadastro',
  templateUrl: './vendas-cadastro.component.html',
  styleUrls: ['./vendas-cadastro.component.css']
})
export class VendasCadastroComponent implements OnInit {

  venda = { };
  clientes: Array<any>;
  produtos: Array<any>;

  constructor( private vendasService: VendasService) { }

  ngOnInit(){

    this.vendasService.listarClientes()
    .subscribe(response => this.clientes = response);

    this.vendasService.listarProdutos()
    .subscribe(response => this.produtos = response);
  }

}
