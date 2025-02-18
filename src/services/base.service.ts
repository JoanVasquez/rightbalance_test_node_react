import IService from "../interfaces/IService";
import BaseRepository from "../repositories/base.repository";

export default abstract class BaseService<T> implements IService<T> {
  constructor(private baseRepository: BaseRepository) {}

  async save?(data: T): Promise<T> {
    return this.baseRepository.createEntity(data);
  }
  async update?(id: string, data: T): Promise<T> {
    return this.baseRepository.updateEntity(id, data);
  }
  async delete?(id: string): Promise<any> {
    return this.baseRepository.deleteEntity(id);
  }
  async findById?(id: string): Promise<T> {
    return this.baseRepository.findEntityById(id);
  }
  async findAll?(): Promise<T[]> {
    return this.baseRepository.findAllEntity();
  }
}
