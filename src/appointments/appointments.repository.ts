import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Appointment } from "./schemas/appointment.model";
import { Appointment as AppointmentDto } from "./dtos/appointment.dto";

@Injectable()
export class AppointmentsRepository {
  constructor(@InjectModel(Appointment.name) private readonly appointmentsModel: Model<Appointment>) {
  }

  async createAppointment(appointment: AppointmentDto) {
    const createdAppointment = new this.appointmentsModel(appointment);
    return createdAppointment.save();
  }

}
