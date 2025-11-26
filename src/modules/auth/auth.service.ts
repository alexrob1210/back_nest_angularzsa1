import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash ,compare} from 'bcrypt';


@Injectable()
export class AuthService {
    


   constructor(private jwtService:JwtService,
                @InjectRepository(User) private userRepository:Repository<User>){}

    async funRegister(objUser:RegisterAuthDto){
        const {password}=objUser
       // console.log("Antes: ",objUser)
        const plainToHash=await hash(password, 12)
        //console.group(plainToHash)

        objUser={...objUser, password:plainToHash}
        //console.log("Despues",objUser)

        return this.userRepository.save(objUser)
    }
    async login(Credentiales:LoginAuthDto){
        const{email,password}=Credentiales
        const user=await this.userRepository.findOne({
            where:{
                email :email
            }
        })
        
        if(!user)return new HttpException('Usuario no encontrado', 400);

        const verificarPass = await compare(password,user.password)
        
        if (!verificarPass) throw new HttpException('Password invalido',401)

       let payload={email:user.email, id:user.id}
        const token= this.jwtService.sign(payload)
        return {user:user, token:token}
    }
    
}

