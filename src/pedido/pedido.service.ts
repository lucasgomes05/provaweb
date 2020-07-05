import { Injectable } from "@nestjs/common";
import { Pedido } from "./pedido.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PedidoService {

    constructor(
        @InjectRepository(Pedido)
        private repository: Repository<Pedido>) { }

    async create(pedido: Pedido) {
        return this.repository.save(pedido);
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