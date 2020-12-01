import { Repository, EntityRepository } from "typeorm";
import InternalEvent from "../models/InternalEvent";

@EntityRepository(InternalEvent)
class InternalEventRepository extends Repository<InternalEvent> {}

export default InternalEventRepository;
