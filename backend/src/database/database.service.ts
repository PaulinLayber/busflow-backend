import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';


@Injectable()
export class DatabaseService 
  extends PrismaClient 
  implements OnModuleInit, OnModuleDestroy {

  constructor() {

    const adapter = new PrismaMariaDb({
      host: 'localhost',
      port: 3308,
      user: 'horarios',
      password: 'horarios',
      database: 'horarios',
    });

    super({
      adapter,
    });

  }


  async onModuleInit() {
    await this.$connect();
  }


  async onModuleDestroy() {
    await this.$disconnect();
  }

}