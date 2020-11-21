import { Repository, EntityRepository } from "typeorm";
import RequestHours from "../models/RequestsHours";

@EntityRepository(RequestHours)
class RequestHoursRepository extends Repository<RequestHours> {}

export default RequestHoursRepository;
