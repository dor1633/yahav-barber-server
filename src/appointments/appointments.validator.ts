import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as _ from 'lodash'
import { AppointmentsRepository } from "./appointments.repository";

@Injectable()
export class AppointmentsValidator {
    constructor(private appointmentsRepository: AppointmentsRepository) {
    }

    async getAppointmentIfExist(barberId: string) {
        const appointment = await this.appointmentsRepository.getAppointmentById(barberId);

        if (_.isEmpty(appointment)) {
            throw new NotFoundException(`Barber ${barberId} doesn't exist`);
        }

        return appointment;
    }
}