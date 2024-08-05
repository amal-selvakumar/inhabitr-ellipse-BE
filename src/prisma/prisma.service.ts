import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(){
        super({
            datasources:{
                db:{
                    url:'mongodb+srv://cloud-pumex:3BUpPa2SricXqwEE@inhabitr.a4ihhlg.mongodb.net/inhabitr-backend?retryWrites=true&w=majority'
                }
            }
        })
    }
}
