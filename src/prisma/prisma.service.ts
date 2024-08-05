import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(){
        super({
            datasources:{
                db:{
                    url:'mongodb+srv://sangeeth:sanghi135@nestjs.ufo8nqv.mongodb.net/test?retryWrites=true&w=majority'
                }
            }
        })
    }
}
