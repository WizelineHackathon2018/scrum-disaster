/* global React */

import ProgressBar from '../ProgressBar';
import Card from '../Card';
import Login from '../Login';
import Sprint from '../Sprint';

function CardItem(props) {
  return (<Sprint key={props.id} name={props.name} date="February 20">
      {props.userStories.map(story => {
        const over = story.real > story.estimated;
        return (
          <ProgressBar
            key={story.id}
            max={over ? story.real : story.estimated}
            value={over ? story.estimated : story.real}
            over={over}
          />
        );
      })}
    </Sprint>)
}

export default class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isLogin: false,
      result: null,
    };
  }

  _getJSON(path, params) {
    /* global API_HOST */

    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    return fetch(`${API_HOST}${path}`, options).then(res => res.json())
  }

  handleSubmit(event) {
    event.preventDefault();

    const [email, password] = event.target.elements;

    return this._getJSON('login', { email: email.value, password: password.value })
      .then(res => {
        this.setState({ isLogin: res.status === 'ok', result: res });
      });
  }

  render() {
    const { isLogin } = this.state;

    const sprints = [
      {
        id: 1,
        name: 'SP1',
        userStories: [
          {
            id: 100,
            estimated: 4.5,
            real: 5.0,
            complex: 3,
          },
          {
            id: 101,
            estimated: 8.5,
            real: 6.0,
            complex: 5,
          },
        ],
      },
      {
        id: 2,
        name: 'SP2',
        userStories: [
          {
            id: 102,
            estimated: 4.5,
            real: 5.0,
            complex: 3,
          },
          {
            id: 103,
            estimated: 8.5,
            real: 6.0,
            complex: 5,
          },
        ],
      },
      {
        id: 3,
        name: 'SP3',
        userStories: [
          {
            id: 102,
            estimated: 4.5,
            real: 5.0,
            complex: 3,
          },
          {
            id: 103,
            estimated: 8.5,
            real: 6.0,
            complex: 5,
          },
        ],
      },
    ];

    const renderItems = [];

    for (let i = 0; i < sprints.length; i+=2) {
      const left = sprints[i];
      const right = sprints[i+1];

      renderItems.push(
        <Card key={i}>
        {left && <CardItem {...left} />}
        {right && <CardItem {...right} />}
      </Card>);
    }

    return (
      <div className="home">
        {renderItems}
      </div>
    );
  }
}
