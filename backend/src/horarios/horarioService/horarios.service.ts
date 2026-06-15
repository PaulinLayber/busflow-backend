import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class HorariosService {
    constructor(private database: DatabaseService) {}

    findAll() {
        return this.database.horario.findMany();
    }

    findOne(id: number) {
        return this.database.horario.findUnique({
            where: { id }
        });
    }

   async buscar(filtros?: {  origem?: string; destino?: string;}) {

        return this.database.horario.findMany({
            where: {
                origem: filtros?.origem
                ? {
                contains: filtros.origem
                }
                : undefined,

             destino: filtros?.destino
                ? {
             contains: filtros.destino
                }
                : undefined,
            },

            orderBy: {
            horario: 'asc'
            }
        });

    

    }
    async todasRotas() {
        return this.database.horario.findMany({
            select: {
                origem: true,
                destino: true
            },
            distinct: ['origem', 'destino']
        });
    }
}
