import { Repository, EntityRepository } from "typeorm";
import States from "../models/States";

@EntityRepository(States)
class StatesRepository extends Repository<States> {}

export default StatesRepository;
