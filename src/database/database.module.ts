import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { ConfigService } from 'src/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { User } from 'src/modules/users/entities/user.entity';
import { Persona } from 'src/modules/persona/entities/persona.entity';
import { Producto } from 'src/modules/producto/entities/producto.entity';
import { Categoria } from 'src/modules/categoria/entities/categoria.entity';
import { Cliente } from 'src/modules/cliente/entities/cliente.entity';
import { Pedido } from 'src/modules/pedido/entities/pedido.entity';
import { PedidoProducto } from 'src/modules/pedido/entities/pedidoproducto.entity';

@Module({
  imports:[
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config: ConfigService)=>({
        type:'postgres',
        host:config.get('HOST') || 'localhost',
        port: +config.get('PORT_DB'),
        username: config.get('USERNAME')||'root',
        password: config.get('PASSWORD')||'prueba',
        database: config.get('DATABASE'),
        synchronize: false,
        logging:true,
        entities: [
          User,Persona,Producto,Categoria,Cliente,Pedido,PedidoProducto,
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
      })
    })
  ],
  providers:[...databaseProvider, ConfigService],
  exports:[...databaseProvider]
})
export class DatabaseModule {

}