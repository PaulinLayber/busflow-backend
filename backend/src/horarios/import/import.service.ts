import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import * as fs from 'fs/promises'; // Alterado para a versão asnc/promises
import * as path from 'path';

@Injectable()
export class ImportService {
  // Criando um logger nativo do NestJS para monitorar no terminal
  private readonly logger = new Logger(ImportService.name);

  constructor(private database: DatabaseService) {}

  async importarPlaneta() {
    const caminho = path.join(process.cwd(), '../scraper/horarios_planeta.json');
    this.logger.log(`Iniciando leitura do arquivo: ${caminho}`);

    let horarios: any[];

    try {
      // Leitura assíncrona, liberando a thread do Node para outras requisições
      const arquivo = await fs.readFile(caminho, 'utf-8');
      horarios = JSON.parse(arquivo);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Erro ao ler ou processar o arquivo JSON: ${errorMessage}`);
      throw new InternalServerErrorException('Não foi possível processar o arquivo de horários.');
    }

    const dados: Array<{
      empresa: string;
      origem: string;
      destino: string;
      horario: string;
      tipo: string;
    }> = [];

    for (const item of horarios) {
      // Evita quebras se 'rota' ou 'horarios' vierem nulos do scraper
      if (!item.rota || !Array.isArray(item.horarios)) {
        this.logger.warn(`Item ignorado devido a formato inválido: ${JSON.stringify(item)}`);
        continue;
      }

      // Regex flexível para " X " maiúsculo ou minúsculo
      const partes = item.rota.split(/\s+[Xx]\s+/); 
      const origem = partes[0]?.trim() ?? 'Desconhecida';
      const destino = partes[1]?.split('[')[0].trim() ?? 'Desconhecido';

      for (const hora of item.horarios) {
        dados.push({
          empresa: 'Planeta',
          origem,
          destino,
          horario: hora,
          tipo: item.dias ?? 'Não informado',
        });
      }
    }

    // Se não houver dados válidos, evita chamada desnecessária ao banco
    if (dados.length === 0) {
      return { mensagem: 'Nenhum horário novo para importar.', importados: 0 };
    }

    this.logger.log(`Salvando ${dados.length} registros no banco de dados...`);

    // Insere os dados usando a performance do createMany
    await this.database.horario.createMany({
      data: dados,
      skipDuplicates: true // Opcional: útil se seu banco tiver uma constraint única e você quiser ignorar duplicados
    });

    this.logger.log('Importação concluída com sucesso!');

    return {
      mensagem: 'Importação concluída',
      importados: dados.length,
    };
  }
}