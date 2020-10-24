import { Repository, EntityRepository } from "typeorm";
import InfoStudent from "../models/InfoStudent";

@EntityRepository(InfoStudent)
class StudentRepository extends Repository<InfoStudent> {}

export default StudentRepository;
