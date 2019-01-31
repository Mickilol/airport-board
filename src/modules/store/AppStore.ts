import { injectable } from 'inversify';
import { observable } from 'mobx';

@injectable()
export class AppStore {

  @observable number = 4;

}

