import { injectable } from "tsyringe";
import Text from "../models/Text";
import BaseService from "./base.service";
import TextRepository from "../repositories/text.repository";

@injectable()
export default class TextService extends BaseService<Text> {
  constructor(private textRepository: TextRepository) {
    super(textRepository);
  }

  async setCollabState(id: string, isLocked: boolean): Promise<any> {
    return this.textRepository.setCollabState(id, isLocked);
  }
}
