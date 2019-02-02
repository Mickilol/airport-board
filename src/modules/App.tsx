import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { AppStore } from './store/AppStore';
import { lazyInject } from './IoC';
import classNames from 'classnames';
import dateFormat from 'dateformat';

interface IState {
  currentTab: string;
  searchRequest: string;
  flightType: string;
}

@observer
class App extends Component<{}, IState> {
  @lazyInject(AppStore)
  private readonly store: AppStore;

  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'departing',
      searchRequest: '',
      flightType: 'all',
    };
  }

  componentWillMount() {
    this.store.getFlightList();
  }

  handleChange = (name, value) => {
    this.setState({[name]: value} as IState);
  };

  render() {
    const { currentTab, searchRequest, flightType } = this.state;
    const flightArray = this.store.flightArray.filter(item =>
      (item.event === currentTab) && (item.flightNumber.toString().includes(searchRequest))
      && (flightType === 'delayed' ? item.isDelayed : item))
      .sort((item1, item2) => item1.date.getTime() - item2.date.getTime());

    return (
      <div className='container airport-board'>
        <header className='row'>
          <h1 className='col-12 airport-board__title'>
            Табло рейсов
          </h1>
          <div className={classNames('col-3 airport-board__switcher clickable',
            {'airport-board__switcher--active': currentTab === 'departing' })}
            onClick={() => this.handleChange('currentTab','departing')}
          >
            Вылет
          </div>
          <div className={classNames('col-3 airport-board__switcher clickable',
            {'airport-board__switcher--active': currentTab === 'arriving' })}
               onClick={() => this.handleChange('currentTab','arriving')}
          >
            Прилет
          </div>
        </header>

        <div className='row'>
          <div className='col-9 airport-board__search-input'>
            <svg viewBox='0 0 14 14' id='search' xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><g transform='translate(-5 -5)'><path id='aza' d='M10.972 14.983a3.987 3.987 0 0 0 3.982-3.993 3.987 3.987 0 0 0-3.982-3.993 3.987 3.987 0 0 0-3.981 3.993 3.987 3.987 0 0 0 3.981 3.993zm4.873-.53L19 17.589 17.592 19l-3.153-3.132a5.933 5.933 0 0 1-3.467 1.111C7.674 16.98 5 14.298 5 10.99 5 7.683 7.674 5 10.972 5c3.299 0 5.973 2.682 5.973 5.99 0 1.29-.407 2.486-1.1 3.464z'></path></g></svg>
            <input type='text' name='searchRequest' autoComplete='no' placeholder='Поиск по номеру рейса'
                   onChange={({target: {value, name}}) => this.handleChange(name, value)}
            />
          </div>

          <div className='col-3 airport-board__flight-select'>
            <select name='flightType' value={flightType}
                    onChange={({target: {value, name}}) => this.handleChange(name, value)}
            >
              <option value='all'>Все рейсы</option>
              <option value='delayed'>Задержанные</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 airport-board__flight-table'>
            { flightArray.length > 0 ?
              flightArray.map((item, id) =>
              <div className='airport-board__flight-table__item' key={id}>
                <div className={classNames('airport-board__flight-table__item__date',
                  { 'airport-board__flight-table__item__date--delayed': item.isDelayed })}
                >
                  <span className='expected-time'>{dateFormat(item.date, 'HH:MM')}</span>
                  <span className='delayed-time'>{ item.isDelayed && dateFormat(item.delayDate, 'HH:MM')}</span>
                </div>
                <div className='airport-board__flight-table__item__station'>
                  {item.stationTitle}
                </div>
                <div className='airport-board__flight-table__item__flight-number'>
                  {item.flightNumber}
                </div>
                <div className='airport-board__flight-table__item__status'>
                  {item.status}
                </div>
              </div>)
              :
              <div className='airport-board__flight-table__item airport-board__flight-table__item--empty-result'>
                По вашему запросу ничего не найдено
              </div>
            }

          </div>
        </div>
      </div>
    );
  }
}

export default App;
