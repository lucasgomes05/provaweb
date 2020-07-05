import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "src/cliente/cliente.entity";

@Entity({ name: "pedidos" })
export class Pedido {

    constructor(codigo: string, transportadora: string, valorTotal: number, valorDescontos: number, 
        valorTotalProdutos: number, dataDoPedido: Date, dataEntregaPrevista: Date, cliente: Cliente) {
            this.codigo = codigo;
            this.transportadora = transportadora;
            this.valorDescontos = valorDescontos;
            this.valorTotal = valorTotal;
            this.valorTotalProdutos = valorTotalProdutos;
            this.cliente = cliente;
            this.dataDoPedido = dataDoPedido;
            this.dataEntregaPrevista = dataEntregaPrevista;
        }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'codigo', type: 'varchar', length: 64 })
    codigo: string;

    @Column({ name: 'transportadora', type: 'varchar', length: 128 })
    transportadora: string;

    @Column({ name: 'valor_total', type: 'decimal' })
    valorTotal: number;

    @Column({ name: 'valor_descontos', type: 'decimal' })
    valorDescontos: number;

    @Column({ name: 'valor_total_produtos', type: 'decimal' })
    valorTotalProdutos: number;

    @Column({ name: 'data_do_pedido', type: 'date'})
    dataDoPedido: Date;

    @Column({ name: 'data_entrega', type: 'date'})
    dataEntregaPrevista: Date;

    @ManyToOne(type => Cliente, cliente => cliente.pedidos)
    @JoinColumn({ name: "cliente_id" })
    cliente: Cliente;

}