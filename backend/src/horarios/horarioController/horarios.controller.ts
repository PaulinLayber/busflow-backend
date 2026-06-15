import { Controller, Get, Param, Post, Query } from '@nestjs/common';

import { ImportService } from './../import/import.service';
import { HorariosService } from '../horarioService/horarios.service';

@Controller('horarios')
export class HorariosController {


constructor(
    private readonly horariosService: HorariosService,
    private readonly importService: ImportService
) {}




@Get()
buscar(@Query() filtros: { origem?: string; destino?: string }) {

  if (!filtros.origem && !filtros.destino) {
    return this.horariosService.findAll();
  }


  return this.horariosService.buscar({
      origem: filtros.origem,
      destino: filtros.destino
    });
}

@Get(":id")
  findOne(@Param('id') id: number) {
    return this.horariosService.findOne(id);
}

@Get('rotas')
  todasRotas() {
    return this.horariosService.todasRotas();
}




 @Post('importar')
  importar(){
    return this.importService.importarPlaneta();
  }

}
