import { Repository, EntityRepository } from "typeorm";
import InfoAdmin from "../models/InfoAdmin";

@EntityRepository(InfoAdmin)
class AdminRepository extends Repository<InfoAdmin> {}

export default AdminRepository;
