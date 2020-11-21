import { Repository, EntityRepository } from "typeorm";
import Solicitation from "../models/Solicitation";

@EntityRepository(Solicitation)
class SolicitationRepository extends Repository<Solicitation> {}

export default SolicitationRepository;
