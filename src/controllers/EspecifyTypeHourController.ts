import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import EspecifyTypeHourRepository from "../repositories/EspecifyTypeHourRepository";
import TypeHourRepository from '../repositories/TypeHours';

interface EspecifyTypeHourProps{
  type_hour_id: any;
  activity: string;
  workload_equivalent: string;
  documentation_required: string;
  comments: string;
}[]


class EspecifyTypeHourController {

  async createEspecifyTypeHour(request: Request, response: Response) {
    const typeHourRepository = getCustomRepository(TypeHourRepository);
    const especifyTypeHourRepository = getCustomRepository(EspecifyTypeHourRepository);

    const teachingSearchId = await typeHourRepository.findOne({
      where: {
        name: "Ensino"
      }
    })

    const extensionSearchId = await typeHourRepository.findOne({
      where: {
        name: "Extensão"
      }
    })

    const researchSearchId = await typeHourRepository.findOne({
      where: {
        name: "Pesquisa"
      }
    })

    const allEspecifyTypeHour = [
      {
          type_hour_id: teachingSearchId?.id.toString(),
          activity: "Aula inaugural",
          workload_equivalent: "4h",
          documentation_required: "Lista de presença",
          comments: "Na área do curso",
      },
      {
          type_hour_id: teachingSearchId?.id.toString(),
          activity: "Unidade Curricular não prevista na organização curricular do curso",
          workload_equivalent: "Carga horária total da UC, máximo 50h",
          documentation_required: "Atestado de aprovação fornecido pela Instituição",
          comments: "A Unidade curricular deverá estar relacionada à área do curso",
      },
      {
          type_hour_id: teachingSearchId?.id.toString(),
          activity: "Monitoria acadêmica",
          workload_equivalent: "Carga horária total da Monitoria, Máximo 40h ",
          documentation_required: "Declaração da Instituição",
          comments: "A Monitoria deverá ser realizada na área do Curso",
      },
      {
          type_hour_id: teachingSearchId?.id.toString(),
          activity: "Visita técnica",
          workload_equivalent: "4h por visita, máximo 20h",
          documentation_required: "Lista de presença organizada pelo Professor Responsável e Relatório de Visita",
          comments: "As visitas são organizadas pela Coordenação do Curso sob orientação de Docente Responsável, atendendo a uma ou várias Unidades Curriculares",
      },
      {
          type_hour_id: teachingSearchId?.id.toString(),
          activity: "Visita em feiras",
          workload_equivalent: "4h por visita, máximo 20h",
          documentation_required: "Lista de presença organizada pelo Professor Responsável e Relatório de Visita",
          comments: "As visitas são organizadas pela Coordenação do Curso sob orientação de Professor Responsável, atendendo a uma ou várias Unidades Curriculares",
      },
      {
          type_hour_id: teachingSearchId?.id.toString(),
          activity: "Ministrante de curso",
          workload_equivalent: "Carga horária total do Curso ministrado, máximo 30h",
          documentation_required: "Declaração da Instituição onde ministrou curso e Plano dos conteúdos ministrados",
          comments: "Sem observação",
      },
      {
          type_hour_id: teachingSearchId?.id.toString(),
          activity: "Participação em palestra",
          workload_equivalent: "3h por palestra",
          documentation_required: "Declaração",
          comments: "Sem observação",
      },
      {
          type_hour_id: teachingSearchId?.id.toString(),
          activity: "Participação em Projetos Integradores",
          workload_equivalent: "20h, máximo 1 projeto",
          documentation_required: "Declaração e Relatório",
          comments: "Os projetos integradores são organizados pela Coordenação de Curso e as atividades acompanhadas por docente Líder",
      },
      {
          type_hour_id: researchSearchId?.id.toString(),
          activity: "Participação em Projeto de Pesquisa ou Iniciação Científica (Bolsista)",
          workload_equivalent: "Máximo 40h",
          documentation_required: "Declaração e Relatório",
          comments: "Os Projetos de Pesquisa contemplam o Programa SENAI/SC de Inovação ou outro programa na IES. O acompanhamento das atividades é realizado por Docente Orientador",
      },
      {
          type_hour_id: researchSearchId?.id.toString(),
          activity: "Apresentação oral ou na forma de pôster de trabalhos em eventos técnicos (congresso, seminário, simpósio)",
          workload_equivalent: "40h por evento",
          documentation_required: "Certificado ou Declaração de apresentação",
          comments: "Sem observação",
      },
      {
          type_hour_id: researchSearchId?.id.toString(),
          activity: "Publicação de artigo técnico-científico completo (anais, revistas especializadas)",
          workload_equivalent: "40h por artigo",
          documentation_required: "Cópia da publicação",
          comments: "Sem observação",
      },
      {
          type_hour_id: researchSearchId?.id.toString(),
          activity: "Publicação de resumo técnico-científico (anais, revistas especializadas)",
          workload_equivalent: "40h por resumo",
          documentation_required: "Cópia da publicação",
          comments: "Sem observação",
      },
      {
          type_hour_id: researchSearchId?.id.toString(),
          activity: "Autoria ou co-autoria em capitulo de livro. ",
          workload_equivalent: "40h",
          documentation_required: "Cópia da publicação",
          comments: "Sem observação",
      },
      {
          type_hour_id: extensionSearchId?.id.toString(),
          activity: "Estágio não obrigatório",
          workload_equivalent: "50h por estágio, máximo 50h",
          documentation_required: "Declaração da Instituição estagiada e Relatório de Estágio",
          comments: "Sem observação",
      },
      {
          type_hour_id: extensionSearchId?.id.toString(),
          activity: "Participação e organização de eventos",
          workload_equivalent: "5h por evento, máximo 10h ",
          documentation_required: "Certificado ou Declaração de Participação",
          comments: "Sem observação",
      },
      {
          type_hour_id: extensionSearchId?.id.toString(),
          activity: "Participação em congresso",
          workload_equivalent: "10 h por dia",
          documentation_required: "Certificado",
          comments: "Sem observação",
      },
      {
          type_hour_id: extensionSearchId?.id.toString(),
          activity: "Participação em seminários, simpósios, workshops, fóruns ou mesas redondas",
          workload_equivalent: "5h por dia",
          documentation_required: "Certificado",
          comments: "Sem observação",
      },
      {
          type_hour_id: extensionSearchId?.id.toString(),
          activity: "Participação em cursos e minicursos de extensão ou atualização profissional",
          workload_equivalent: "De acordo com a carga horária de duração do curso, máximo 40h",
          documentation_required: "Certificado",
          comments: "Sem observação",
      },
      {
          type_hour_id: extensionSearchId?.id.toString(),
          activity: "Participação em préincubadora",
          workload_equivalent: "30 h",
          documentation_required: "Certificado ou Declaração",
          comments: "Sem observação",
      },
      {
        type_hour_id:  extensionSearchId?.id.toString(),
        activity: "Representação acadêmica (Colegiado do Curso, Conselho Superior da Faculdade, CPA, Comissão permanente de seleção e acompanhamento do FIES, Comissões para bolsa de estudo e pesquisa do Art. 170)",
        workload_equivalent: "10h por semestre, máximo 20h ",
        documentation_required: "Declaração da Instituição de Ensino",
        comments: "Sem observação",
    },
    {
        type_hour_id:  extensionSearchId?.id.toString(),
        activity: "Representação Estudantil",
        workload_equivalent: "5h por semestre, máximo 10h",
        documentation_required: "Declaração",
        comments: "Sem observação",
    },
    {
        type_hour_id:  extensionSearchId?.id.toString(),
        activity: "Representante de turma",
        workload_equivalent: "5h por semestre, máximo 20h",
        documentation_required: "Declaração da Instituição de Ensino",
        comments: "Sem observação",
    },
    {
        type_hour_id:  extensionSearchId?.id.toString(),
        activity: "Trabalho voluntário",
        workload_equivalent: "5h por trabalho, máximo 40h",
        documentation_required: "Declaração da Instituição do voluntariado",
        comments: "Sem observação",
    },
    {
        type_hour_id:  extensionSearchId?.id.toString(),
        activity: "Curso de língua estrangeira",
        workload_equivalent: "10h por semestre, máximo 40h",
        documentation_required: "Declaração",
        comments: "Sem observação",
    },
    {
        type_hour_id:  extensionSearchId?.id.toString(),
        activity: "Presença como ouvinte em bancas de defesa de Trabalho de Conclusão de Curso (Graduação e PósGraduação)",
        workload_equivalent: "2h por banca de defesa, máximo 10h",
        documentation_required: "Lista de Presença, Declaração da Instituição",
        comments: "Sem observação",
    },
    {
        type_hour_id:  extensionSearchId?.id.toString(),
        activity: "Certificação de mercado na área do curso",
        workload_equivalent: "20h por certificação",
        documentation_required: "Certificado",
        comments: "Sem observação",
    }
    ]

    const saveAllEspecifyTypeHour = allEspecifyTypeHour.map((item: EspecifyTypeHourProps)=>{
      const createEspecifyTypeHour = especifyTypeHourRepository.create({
        type_hour_id: item.type_hour_id,
        activity: item.activity,
        workload_equivalent: item.workload_equivalent,
        documentation_required:item.documentation_required,
        comments: item.comments
      });
      return createEspecifyTypeHour
    })

    return response.status(201).json(saveAllEspecifyTypeHour);
  }

  async index(request: Request, response: Response) {
    const typeHour = getCustomRepository(TypeHourRepository);
    const typeHours = await typeHour.find();

    return response.json(typeHours);
  }

}

export default new EspecifyTypeHourController();


