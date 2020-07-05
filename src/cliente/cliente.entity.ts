import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Endereco } from "src/endereco/endereco.entity";
import { Pedido } from "src/pedido/pedido.entity";

@Entity({ name: 'clientes' })
export class Cliente {

    constructor(nome?: string, cpf?: string, rg?: string, email?: string, senha?: string){
        this.nome = name;
        this.cpf = cpf;
        this.rg = rg;
        this.email = email;
        this.senha = senha;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nome', type: 'varchar', length: 100 })
    nome: string;

    @Column({ name: 'cpf', type: 'varchar', length: 32 })
    cpf: string;

    @Column({ name: 'rg', type: 'varchar', length: 32 })
    rg: string;

    @Column({ name: 'email', type: 'varchar', length: 100 })
    email: string;

    @Column({ name: 'senha', type: 'varchar', length: 100 })
    senha: string;

    @OneToMany(type => Endereco, endereco => endereco.cliente, { cascade: true, eager: true })
    enderecos: Array<Endereco>;

    @OneToMany(type => Pedido, pedido => pedido.cliente, { cascade: true, eager: true })
    pedidos: Array<Pedido>;
}