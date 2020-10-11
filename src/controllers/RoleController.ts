import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import RoleRepository from "../repositories/RoleRepository";
import PermissionRepository from "../repositories/PermissionRepository";

class RoleController {
  async create(request: Request, response: Response) {
    const roleRepository = getCustomRepository(RoleRepository);
    const permissionRepository = getCustomRepository(PermissionRepository);

    const { name, description, permission } = request.body;
    const existRole = await roleRepository.findOne({ name });
    if (existRole) {
      return response.status(400).json({ err: "O cargo já existe!" });
    }

    const existsPermissions = await permissionRepository.findByIds(permission);
    const role = roleRepository.create({
      name,
      description,
      permission: existsPermissions,
    });

    await roleRepository.save(role);

    return response.json(role);
  }
}

export default new RoleController();
