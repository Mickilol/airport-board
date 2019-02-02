import { injectable } from 'inversify';
import { action, observable } from 'mobx';
import flightData from '../data/flightData.json';

interface IFlightArray {
  date: Date;
  event: string;
  flightNumber: number;
  stationTitle: string;
  status: string;
  isDelayed: boolean;
  delayDate: Date | null;
}

@injectable()
export class AppStore {

  @observable flightArray: IFlightArray[] = [];

  @action
  getFlightList() {
    for (const item of flightData) {
      const flight: IFlightArray = {
        date: new Date(item.date),
        event: item.event,
        flightNumber: item.flightNumber,
        stationTitle: item.stationTitle,
        status: item.status,
        isDelayed: item.isDelayed,
        delayDate: item.delayDate !== null ? new Date(item.delayDate) : null,
      };

      this.flightArray.push(flight);
    }
  }

}

