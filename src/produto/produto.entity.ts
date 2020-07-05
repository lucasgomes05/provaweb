import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "produtos" })
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nome', type: 'varchar', length: 64 })
    nome: string;

    @Column({ name: 'descricao', type: 'varchar', length: 256 })
    descricao: string;

    @Column({ name: 'preco', type: 'decimal' })
    preco: number;

    @Column({ name: 'quantidade_estoque', type: 'decimal' })
    quantidadeEstoque: number;

    @Column({ name: 'unidade_medida', type: 'varchar', length: 10 })
    unidadeMedida: string;

    @Column({ name: 'data_de_validade', type: 'date'})
    dataDeValidade: Date;
}