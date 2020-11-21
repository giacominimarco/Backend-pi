import { Repository, EntityRepository } from "typeorm";
import TypeHours from "../models/TypeHour";

@EntityRepository(TypeHours)
class TypeHoursRepository extends Repository<TypeHours> {}

export default TypeHoursRepository;
