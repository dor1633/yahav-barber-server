import { Injectable } from "@nestjs/common";
import { SavedAppointment } from "./schemas/appointment.model";
import { Appointment as AppointmentDto } from "./dtos/appointment.dto";
import { DateRange } from "../common/dates.helper";

;

@Injectable()
export class AppointmentsParser {
    parseAppointmentDtoToDbObject(appointment: AppointmentDto, dateRange: DateRange): SavedAppointment {
        return {
            barberId: appointment.barberId,
            clientId: appointment.clientId,
            from: dateRange.fromDate.getTime(),
            to: dateRange.toDate.getTime()
        }
    }
}