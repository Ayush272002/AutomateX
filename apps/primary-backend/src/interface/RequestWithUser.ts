import { Request } from "express";

export default interface RequestWithUser extends Request {
  id: number;
}
