import { Module } from '@nestjs/common';
import { HorariosService } from './horarioService/horarios.service';
import { DatabaseModule } from 'src/database/database.module';
import { ImportService } from './import/import.service';
import { HorariosController } from './horarioController/horarios.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [HorariosController],
  providers: [HorariosService, ImportService]
})
export class HorariosModule {}
