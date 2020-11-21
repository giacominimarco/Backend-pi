import { Repository, EntityRepository } from "typeorm";
import File from "../models/File";

@EntityRepository(File)
class FileRepository extends Repository<File> {}

export default FileRepository;
