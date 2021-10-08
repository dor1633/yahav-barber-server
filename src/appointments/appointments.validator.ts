import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as _ from 'lodash'
import { DateRange, getFormattedDate } from "src/common/dates.helper";
import { User } from "src/users/schemas/user.model";
import { AvailabilityPerDate } from "../users/dtos/availabilityPerDate.dto";
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