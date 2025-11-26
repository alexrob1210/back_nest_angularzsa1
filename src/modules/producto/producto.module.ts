import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Producto])], // Solo entidades aquí
  controllers: [ProductoController],
  providers: [ProductoService], // Agrega ProductoRepository aquí
})
export class ProductoModule {}