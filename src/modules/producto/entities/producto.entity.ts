import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Categoria } from "../../categoria/entities/categoria.entity";
import { PedidoProducto } from '../../pedido/entities/pedidoproducto.entity';
import { text } from 'stream/consumers';
//import { Categoria } from 'src/modules/categoria/entities/categoria.entity';
@Entity("productos")
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar', length:250})
    nombre: string;

    @Column({type:'decimal', precision:10, scale:2})
    precio: number;

    @Column({type:'int'})
    stock: number;

    @Column({type:'varchar',length:250, nullable:true})
    imagen: string;

    @Column({type:'text',nullable:true})
    descripcion: string;

    @Column({type:'boolean',default:true})
    estado: boolean;

    @ManyToOne(() => Categoria, categoria => categoria.productos)
    categoria: Categoria;
    
    @OneToMany(() => PedidoProducto, (pedprod) => pedprod.producto)
    pedidoProducto: PedidoProducto[];
}