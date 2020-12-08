import RequestsHours from '../models/RequestsHours';
import Files_Views from './Files_Views';
import File from '../models/File';

interface indexRequestHourProps {
  name: string;
  lastName: string;
  registration: number;
  course: string;
  team: string;
  dateRequisition: Date;
  typeHour: string;
  hour: number;
  file: File;
}[]

export default {
  render(requestHour: indexRequestHourProps) {
    return {
      name: requestHour.name,
      lastName: requestHour.lastName,
      registration: requestHour.registration,
      course: requestHour.course,
      team: requestHour.team,
      dateRequisition: requestHour.dateRequisition,
      typeHour: requestHour.typeHour,
      hour: requestHour.hour,
      file: Files_Views.render(requestHour.file),

    };
  },
}
