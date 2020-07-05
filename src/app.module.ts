import { Module } from '@nestjs/common';
import { ClienteController } from './cliente/cliente.controller';
import { ProdutoController } from './produto/produto.controller';
import { PedidoController } from './pedido/pedido.controller';
import { ProdutoService } from './produto/produto.service';
import { ClienteService } from './cliente/cliente.service';
import { EnderecoService } from './endereco/endereco.service';
import { PedidoService } from './pedido/pedido.service';
import { Cliente } from './cliente/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './endereco/endereco.entity';
import { Produto } from './produto/produto.entity';
import { Pedido } from './pedido/pedido.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ecommerce-nest-jss',
      entities: [
        Cliente,
        Endereco,
        Produto,
        Pedido
      ],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([
      Cliente,
      Endereco,
      Produto,
      Pedido
    ])
  ],
  controllers: [
    ClienteController,
    ProdutoController,
    PedidoController
  ],
  providers: [
    ClienteService,
    EnderecoService,
    ProdutoService,
    PedidoService
  ],
})
export class AppModule {}
