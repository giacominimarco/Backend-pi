import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import EspecifyTypeHourRepository from "../repositories/EspecifyTypeHourRepository";
import TypeHourRepository from '../repositories/TypeHours';
import PDFDocument from 'pdfkit';
import fs from 'fs'
import path from 'path';
import { sendMail } from "../config/e-mail";
import InternalEventRepository from "../repositories/InternalEventRepository";
import { decode } from "jsonwebtoken";
import AdminRepository from "../repositories/AdminRepository";
import { createSecret } from "../utils";

class EventController {

  async createPDF(request: Request, response: Response) {

      const doc = new PDFDocument({ autoFirstPage: false });
      doc.addPage({
          size: 'LEGAL',
          layout: 'landscape'
      })
      .image("background.jpg", 430, 15, { width: 550 })
      .image("logo.jpg", 100, 45, { width: 250 })

      .fontSize(40)
      .fillColor("#c3c3c3")
      .text("Certificado", 115, 177)

      .fontSize(20)
      .fillColor("#000")
      .text("Pedro Henrique Barroso da Silva", 115, 225, { align: "left" })

      .fontSize(16)
      .fillColor("#044444")
      .text("Participou do evento: Palestra da AWS", 115, 260, { align: "left" })
      .text("na data de", 115, 278, { align: "left" })
      .fillColor("#000")
      .fontSize(18)
      .text("25/11/2020", 195, 278, { align: "left" })
      .fontSize(16)
      .fillColor("#044444")
      .text("com carga horária de 25 horas", 115, 298, { align: "left" })
      .moveDown();

      doc.pipe(fs.createWriteStream('teste2.pdf'));
      doc.end();

      const file = path.join(__dirname, '..','..', 'teste2.pdf');

      await sendMail("phbs1235@gmail.com", "teste", file, 'Certificado do evento')

      return response.json({message: "deu certo"})

  }
  async createEvent(request: Request, response: Response) {
    const internalEventRepository = getCustomRepository(InternalEventRepository);
    const infoAdminRepository = getCustomRepository(AdminRepository)
    const {nameEvent, description, eventDate, howManyHours} = request.body;

    const authHeader = request.headers.authorization || "";

    const [, token] = authHeader?.split(" ");

    const payload = decode(token);
    const secret = createSecret();
    const infoAdmin = await infoAdminRepository.findOne({
      where: {
        user_id: payload?.sub
      }
    })
    const createInternalEvent = await internalEventRepository.create({
      eventName: nameEvent,
      description: description,
      eventDate: eventDate,
      howManyHours: howManyHours,
      activeEvent: true,
      info_admin_id: infoAdmin?.id,
      key: secret,
    })

    const responseInternalEvent = await internalEventRepository.save(createInternalEvent);

    return response.json(responseInternalEvent)
  }
  async getEvents(request: Request, response: Response) {
    const internalEventRepository = getCustomRepository(InternalEventRepository);

    const allEvents = await internalEventRepository.find({
      order:{
        eventDate: "DESC"
      }
    });

    const returnAllEvents = allEvents.map((item)=>{
      const all = {
        eventName: item.eventName,
        description: item.description,
        eventDate: item.eventDate,
        howManyHours: item.howManyHours,
        id: item.id,
        activeEvent: item.activeEvent,
        key: item.key
      }
      return all
    })

    return response.json(returnAllEvents)
  }
  async updateEvent(request: Request, response: Response) {
    const internalEventRepository = getCustomRepository(InternalEventRepository);
    const {id, activeEvent} = request.body;

    await internalEventRepository.createQueryBuilder("internalEvent")
    .update({
      activeEvent: activeEvent
    })
    .where(
      { id: id }
    ).updateEntity(true).execute();

    return response.json({message: "Sucesso!"})
  }
}

export default new EventController();



