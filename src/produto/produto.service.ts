import { Injectable } from "@nestjs/common";
import { Produto } from "./produto.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        private repository: Repository<Produto>) { }

    async create(produto: Produto) {
        return this.repository.save(produto);
    }

    async delete(id: number) {
        return this.repository.delete(id);
     }

    async findById(id: number) {
        return this.repository.findOne(id);
    }

    async findAll() {
        return this.repository.find();
    }
}