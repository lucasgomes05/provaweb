import { Controller, Body, Post, Get, Param, Put } from "@nestjs/common";
import { Produto } from './produto.entity';
import { ProdutoService } from "./produto.service";

interface ModificaEstoqueBody {
    idProduto: number,
    acao: number, //1 para adicionar, 2 para remover
    quantidade: number
}

@Controller("/produtos")
export class ProdutoController {

    constructor(
        private readonly service: ProdutoService) { }

    @Get("/todos")
    async findAll() {
        const produtos: Produto[] = await this.service.findAll();
        return { message: "Lista de todos os produtos.", produtos: produtos }
    }

    @Get(":id")
    async findById(@Param() id: number) { 
        const produto: Produto = await this.service.findById(id);
        return produto ? {
                message: "Produto encontrado com sucesso",
                produto: produto 
            } : {
                message: "Não foi localizado nenhum produto com esse id.",
                produto: null
            }
    }

    @Post("/modifica-estoque")
    async modificaEstoque(@Body() body: ModificaEstoqueBody) {
        let produto: Produto = await this.service.findById(body.idProduto);
        let qtdAtual: any = produto.quantidadeEstoque;

        if(body.acao === 1) {
            qtdAtual -= body.quantidade;
        } else {
            qtdAtual += body.quantidade;
        }

        produto.quantidadeEstoque = qtdAtual;
        await this.service.create(produto);

        return { message: "Estoque do produto alterado com sucesso.", produto: produto }
    }


    @Post("/criar")
    async create(@Body() produto: Produto) {
        const novoProduto = await this.service.create(produto);

        return { message: "Produto cadastrado com sucesso.", produto: novoProduto }
    }
}