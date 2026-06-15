import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HorariosModule } from './horarios/horarios.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [HorariosModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
