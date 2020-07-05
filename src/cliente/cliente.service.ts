import { Injectable } from "@nestjs/common";
import { Cliente } from "./cliente.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ClienteService {

    constructor(
        @InjectRepository(Cliente)
        private repository: Repository<Cliente>) { }

    async create(cliente: Cliente) {
        return this.repository.save(cliente);
    }

    async checaCredenciais(email: string, senha: string) {
        return this.repository.findOne({email: email, senha: senha});
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