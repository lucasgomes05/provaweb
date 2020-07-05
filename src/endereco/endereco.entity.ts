import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "src/cliente/cliente.entity";

@Entity({ name: "enderecos" })
export class Endereco {

    constructor(cliente: Cliente, bairro?: string, cidade?: string, cep?: string) {
        this.cliente = cliente;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'bairro', type: 'varchar', length: 256 })
    bairro: string;

    @Column({ name: 'cidade', type: 'varchar', length: 256 })
    cidade: string;

    @Column({ name: 'cep', type: 'varchar', length: 32 })
    cep: string;

    @ManyToOne(type => Cliente, cliente => cliente.enderecos)
    @JoinColumn({ name: "cliente_id" })
    cliente: Cliente;
}