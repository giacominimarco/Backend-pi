import { Repository, EntityRepository } from "typeorm";
import EspecifyTypeHour from "../models/EspecifyTypeHour";

@EntityRepository(EspecifyTypeHour)
class EspecifyTypeHourRepository extends Repository<EspecifyTypeHour> {}

export default EspecifyTypeHourRepository;
