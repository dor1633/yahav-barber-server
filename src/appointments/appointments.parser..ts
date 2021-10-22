import { Injectable } from "@nestjs/common";
import { SavedAppointment } from "./schemas/appointment.model";
import { Appointment as AppointmentDto } from "./dtos/appointment.dto";
import { DateRange, formatFromAndToToTimeRange, getFormattedDate } from "../common/dates.helper";

;

@Injectable()
export class AppointmentsParser {
    parseAppointmentDtoToDBObject(appointment: AppointmentDto, dateRange: DateRange): SavedAppointment {
        return {
            barberId: appointment.barberId,
            clientId: appointment.clientId,
            from: dateRange.fromDate.getTime(),
            to: dateRange.toDate.getTime()
        }
    }

    parseAppointmentsInDBToAppointmentsDto(appointments: SavedAppointment[]): AppointmentDto[] {
        const formattedAppointments: AppointmentDto[] = [];
        for (const appointment of appointments) {
            formattedAppointments.push({
                barberId: appointment.barberId,
                clientId: appointment.clientId,
                date: getFormattedDate(new Date(appointment.from), true),
                timeRange: formatFromAndToToTimeRange(appointment.from, appointment.to)
            })
        }

        return formattedAppointments;
    }
}