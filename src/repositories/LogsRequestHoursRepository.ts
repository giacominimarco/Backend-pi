import { Repository, EntityRepository } from "typeorm";
import LogsRequestHours from "../models/LogsRequestHours";

@EntityRepository(LogsRequestHours)
class LogsRequestHoursRepository extends Repository<LogsRequestHours> {}

export default LogsRequestHoursRepository;
