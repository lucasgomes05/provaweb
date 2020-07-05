import { Controller, Body, Post, Get, Param } from "@nestjs/common";
import { Cliente } from './cliente.entity';
import { ClienteService } from "./cliente.service";
import { EnderecoService } from '../endereco/endereco.service';
import { ClienteBodyModel } from './ClienteBodyModel';
import { Endereco } from "src/endereco/endereco.entity";

interface LoginBody {
    email: string,
    senha: string
}

@Controller("/clientes")
export class ClienteController {

    constructor(
        private readonly enderecoService: EnderecoService,
        private readonly service: ClienteService) { }

    @Get("/todos")
    async findAll() {
        const clientes: Cliente[] = await this.service.findAll();

        return { message: "Lista de todos os clientes.", clientes: clientes }
    }

    @Get(":id")
    async findById(@Param() id: number) { 
        const cliente: Cliente = await this.service.findById(id);

        return cliente ? {
            message: "Cliente encontrado com sucesso",
            cliente: cliente 
        } : {
            message: "Não foi localizado nenhum cliente com esse id.",
            cliente: null
        }
    }

    @Post("/criar")
    async create(@Body() bodyModel: ClienteBodyModel) {
        const cliente: Cliente = new Cliente(
            bodyModel.nome, bodyModel.cpf, bodyModel.rg, bodyModel.email);

        const novoCliente = await this.service.create(cliente);

        const endereco: Endereco = new Endereco(
            novoCliente, bodyModel.bairro, bodyModel.cidade, bodyModel.cep);

        await this.enderecoService.create(endereco);

        return { message: "Cliente cadastrado com sucesso.", cliente: novoCliente }
    }

    @Post("/logar")
    async logar(@Body() credenciais: LoginBody) {
        const cliente: Cliente = await this.service.checaCredenciais(
                                                credenciais.email,
                                                credenciais.senha);
        
        if(cliente !== null) {
            return { message: "Autenticado com sucesso!", token: "TOKEN_DEMONSTRATIVO" }
        } else {
            return { message: "Email ou senha inválidos."}
        }

    }

}