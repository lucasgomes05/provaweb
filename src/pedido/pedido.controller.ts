import { Controller, Body, Post, Get, Param } from "@nestjs/common";
import { Pedido } from './pedido.entity';
import { PedidoService } from "./pedido.service";
import { ClienteService } from '../cliente/cliente.service';
import { Cliente } from "src/cliente/cliente.entity";
import { Produto } from '../produto/produto.entity';

interface PedidoBody {
    codigo: string,
    transportadora: string,
    valorDescontos: number,
    dataDoPedido: Date,
    dataEntregaPrevista: Date,
    idCliente: number,
    produtos: Produto[]
}



@Controller("/pedidos")
export class PedidoController {

    constructor(
        private readonly clienteService: ClienteService,
        private readonly service: PedidoService) { }

    @Get("/todos")
    async findAll() {
        const pedidos: Pedido[] = await this.service.findAll();

        return { message: "Lista de todos os pedidos.", pedidos: pedidos }
    }

    @Get("/localizar-pedido/:id")
    async localizarPedido(@Param() id:number) {
        const pedido: Pedido = await this.service.findById(id);

        const rastreamentoFicticio = {
            status: "Objeto já saiu para a entrega do destinatário",
            faseInicial: {
                status: "Objeto encaminhado",
                unidade: "Curitiba/PR",
                data: "10/06/2020 10:47"
            },
            faseFinal: {
                status: "Objeto recebido pelos correios do Brasil",
                unidade: "Curitiba/PR",
                data: "14/06/2020 12:21"
            },
            pedido: pedido
        }

        return { message: "Pedido rastreado.", rastreamentoFicticio }

    }

    @Get(":id")
    async findById(@Param() id: number) { 
        const pedido: Pedido = await this.service.findById(id);

        return pedido ? {
            message: "Pedido encontrado com sucesso",
            cliente: pedido 
        } : {
            message: "Não foi localizado nenhum pedido com esse id.",
            cliente: null
        }
    }

    @Post("/criar")
    async create(@Body() pedidoBody: PedidoBody) {
        const cliente = await this.clienteService.findById(pedidoBody.idCliente);

        if(cliente !== null) {
            let valorTotalDoPedido = 0;

            pedidoBody.produtos.forEach((prod) => {
                valorTotalDoPedido += prod.preco;
            });

            if(pedidoBody.valorDescontos > 0) {
                const pedido: Pedido = new Pedido(pedidoBody.codigo, pedidoBody.transportadora, 
                    valorTotalDoPedido - pedidoBody.valorDescontos,
                    pedidoBody.valorDescontos, valorTotalDoPedido - pedidoBody.valorDescontos, 
                    pedidoBody.dataDoPedido, pedidoBody.dataEntregaPrevista,
                    cliente
                );
                
                const novoPedido: Pedido = await this.service.create(pedido);

                return { message: "Pedido cadastrado com sucesso.", pedido: novoPedido}
            } else { 
                const pedido: Pedido = new Pedido(pedidoBody.codigo, pedidoBody.transportadora, 
                    valorTotalDoPedido,
                    0, valorTotalDoPedido, 
                    pedidoBody.dataDoPedido, pedidoBody.dataEntregaPrevista,
                    cliente
                );

                const novoPedido: Pedido = await this.service.create(pedido);

                return { message: "Pedido cadastrado com sucesso.", pedido: novoPedido}
            }


        } else {
            return { message: "Não foi possível realizar o pedido pois não existe nenhum cliente com o id informado"}
        }

        
    }
}