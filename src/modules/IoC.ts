
import { Container } from 'inversify';
import { AppStore } from './store/AppStore';

const container = new Container();

const singletons = [
  AppStore,
];

for (const singleton of singletons) {
  container.bind<any>(singleton).to(singleton).inSingletonScope();
}

// New decorator syntax
const lazyInject = (k: any) => (proto: any, key: string, descriptor?: any) => {
  descriptor.initializer = () => container.get(k);
};

export {
  container,
  lazyInject,
};