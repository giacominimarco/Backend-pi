import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import EspecifyTypeHourRepository from "../repositories/EspecifyTypeHourRepository";
import TypeHourRepository from '../repositories/TypeHours';
import PDFDocument from 'pdfkit';
import fs from 'fs'
import path from 'path';
import { sendMail } from "../config/e-mail";

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

      await sendMail("phbs1235@gmail.com", "teste", file)

      return response.json({message: "deu certo"})

  }
}

export default new EventController();



