import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { AppStore } from './store/AppStore';
import { lazyInject } from './IoC';

@observer
class App extends Component {
  @lazyInject(AppStore)
  private readonly store: AppStore;

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          Number = {this.store.number}
        </header>
      </div>
    );
  }
}

export default App;
