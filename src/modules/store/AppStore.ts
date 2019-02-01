import { inject, injectable } from 'inversify';
import { action, observable } from 'mobx';
import { AxiosWrapper } from '../services/AxiosWrapper';
import { AxiosResponse } from 'axios';

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

  @inject(AxiosWrapper)
  private readonly axiosWrapper: AxiosWrapper;

  @observable number = 4;

  @observable flightArray: IFlightArray[] = [
    {
      date: new Date('2019-02-01T06:00:00'),
      event: 'departing',
      flightNumber: 1258,
      stationTitle: 'Архангельск',
      status: 'в полете',
      isDelayed: false,
      delayDate: null,
    },
    {
      date: new Date('2019-02-01T08:00:00'),
      event: 'departing',
      flightNumber: 9274,
      stationTitle: 'Саратов',
      status: 'в полете',
      isDelayed: true,
      delayDate: new Date('2019-02-01T08:20:00'),
    },
    {
      date: new Date('2019-02-01T09:00:00'),
      event: 'departing',
      flightNumber: 349,
      stationTitle: 'Севастополь',
      status: 'в полете',
      isDelayed: false,
      delayDate: null,
    },
    {
      date: new Date('2019-02-01T11:00:00'),
      event: 'departing',
      flightNumber: 876,
      stationTitle: 'Уральск',
      status: 'в полете',
      isDelayed: false,
      delayDate: null,
    },
    {
      date: new Date('2019-02-01T15:00:00'),
      event: 'arriving',
      flightNumber: 1233,
      stationTitle: 'Томск',
      status: 'в полете',
      isDelayed: true,
      delayDate: new Date('2019-02-01T15:30:00'),
    },
  ];

  @action
  getFlightList = async () => {
    await this.axiosWrapper.get('https://api.rasp.yandex.net/v3.0/schedule/' +
      '?apikey=b2e32b46-b01e-413a-afb9-59ac997adea0&station=s9600213&transport_types=plane')
      .then(response => {
        console.log(response);
      })
      .catch((reason: AxiosResponse) => {
        console.log(reason);
      });
  }


}

