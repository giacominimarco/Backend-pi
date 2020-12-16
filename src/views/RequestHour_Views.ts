import RequestsHours from '../models/RequestsHours';
import Files_Views from './Files_Views';
import File from '../models/File';

interface indexRequestHourProps {
  id: string;
  states_id: string;
  name: string;
  lastName: string;
  registration: number;
  course: string;
  team: string;
  dateRequisition: Date;
  typeHour: string;
  hour: number;
  file: File;
  calculatedHours: number;

}[]

export default {
  render(requestHour: indexRequestHourProps) {
    return {
      id: requestHour.id,
      states_id: requestHour.states_id,
      name: requestHour.name,
      lastName: requestHour.lastName,
      registration: requestHour.registration,
      course: requestHour.course,
      team: requestHour.team,
      dateRequisition: requestHour.dateRequisition,
      typeHour: requestHour.typeHour,
      hour: requestHour.hour,
      file: Files_Views.render(requestHour.file),
      calculatedHours: requestHour.calculatedHours
    };
  },
  renderMany(requestHour: indexRequestHourProps[]) {
    return requestHour.map(item => this.render(item))
  },
}
