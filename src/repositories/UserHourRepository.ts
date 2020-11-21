import { Repository, EntityRepository } from "typeorm";
import UserHour from "../models/UserHour";

@EntityRepository(UserHour)
class UserHourRepository extends Repository<UserHour> {}

export default UserHourRepository;
