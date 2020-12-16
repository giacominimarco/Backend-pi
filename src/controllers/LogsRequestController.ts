import { Request, Response } from "express";

class LogsRequestController {
  async getLogForRequest(request: Request, response: Response) {
    const { id } = request.params;
    console.log(id)

    return response.json({message: "Sucesso"});
  }
}

export default new LogsRequestController();
