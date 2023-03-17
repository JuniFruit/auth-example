import { IUserDocument } from "../models/user.model";

export interface IUserDto {
  id: string;
  email: string;
  isActivated: boolean;
}

export class UserDto implements IUserDto {
  isActivated: boolean;
  id: string;
  email: string;

  constructor(model: IUserDocument) {
    this.id = model._id;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
}
