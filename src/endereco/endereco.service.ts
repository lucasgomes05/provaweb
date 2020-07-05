import { Injectable } from "@nestjs/common";
import { Endereco } from "./endereco.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class EnderecoService {

    constructor(
        @InjectRepository(Endereco)
        private repository: Repository<Endereco>) { }

    async create(endereco: Endereco) {
        return this.repository.save(endereco);
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