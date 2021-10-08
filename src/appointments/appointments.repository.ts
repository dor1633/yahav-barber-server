import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Appointment, SavedAppointment } from "./schemas/appointment.model";

@Injectable()
export class AppointmentsRepository {
  constructor(@InjectModel(Appointment.name) private readonly appointmentsModel: Model<Appointment>) {
  }

  async createAppointment(appointment: SavedAppointment) {
    const createdAppointment = new this.appointmentsModel(appointment);
    return createdAppointment.save();
  }

}
