import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Categoria } from "../../categoria/entities/categoria.entity";
import { PedidoProducto } from '../../pedido/entities/pedidoproducto.entity';
//import { Categoria } from 'src/modules/categoria/entities/categoria.entity';
@Entity("productos")
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    precio: number;

    @Column()
    stock: number;

    @Column()
    imagen: string;

    @Column()
    descripcion: string;

    @Column()
    estado: boolean;

    @ManyToOne(() => Categoria, categoria => categoria.productos)
    categoria: Categoria;
    
    @OneToMany(() => PedidoProducto, (pedprod) => pedprod.producto)
    pedidoProducto: PedidoProducto[];
}