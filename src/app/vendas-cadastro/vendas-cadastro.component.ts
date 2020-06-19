
import { VendasService } from './../vendas/vendas.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-vendas-cadastro',
  templateUrl: './vendas-cadastro.component.html',
  styleUrls: ['./vendas-cadastro.component.css']
})
export class VendasCadastroComponent implements OnInit {

  venda: any;
  item: any;
  clientes: Array<any>;
  produtos: Array<any>;
  @Output() vendaSalva = new EventEmitter();

  constructor( private vendasService: VendasService) { }

  ngOnInit(){

    this.vendasService.listarClientes()
    .subscribe(response => this.clientes = response);

    this.vendasService.listarProdutos()
    .subscribe(response => this.produtos = response);

    this.novaVenda();
  }

  novaVenda(){
    this.venda = { itens: [], frete: 0.0, total: 0.0 };
    this.item = {};
  }

  incluirItem(){
    this.item.total = (this.item.produto.valor * this.item.quantidade);

    this.venda.itens.push(this.item);

    this.item = {};

    this.calcularTotal();
  }

  calcularTotal(){
    const totalItens = this.venda.itens
    .map(i => (i.produto.valor * i.quantidade))
    .reduce((total, v) => total + v, 0);

    this.venda.total = totalItens + this.venda.frete;
  }

  adicionar(frm: FormGroup){
    this.vendasService.adicionar(this.venda).subscribe(response => {
      frm.reset();

      this.novaVenda();

      this.vendaSalva.emit(response);

  });

}
}
