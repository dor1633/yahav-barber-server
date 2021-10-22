import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { } from './schemas/barber.schema'
import { Barber } from "./schemas/barber.schema";
import { Barber as BarberDto } from "./dtos/barber.dto";

@Injectable()
export class BarbersRepository {
  constructor(@InjectModel(Barber.name) private readonly barbersModel: Model<Barber>) {
  }

  async createBarber(barber: BarberDto) {
    const createdUser = new this.barbersModel(barber);
    return createdUser.save();
  }

  async getBarberById(barberId: string) {
    return this.barbersModel.findById(barberId).exec();
  }

  async getAllBarbers() {
    return this.barbersModel.find().exec();
  }

  async updateBarber(barber: Barber) {
    return this.barbersModel.updateOne({ _id: barber._id }, barber).exec();
  }
}
