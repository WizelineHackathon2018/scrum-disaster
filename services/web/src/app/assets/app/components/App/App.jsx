/* global React */

import ProgressBar from '../ProgressBar';
import Card from '../Card';
import Login from '../Login';

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

    const userStories = [
      {
        id: 1,
        estimated: 4.5,
        real: 5.0,
        complex: 3,
      },
      {
        id: 2,
        estimated: 8.5,
        real: 6.0,
        complex: 5,
      },
    ];

    if (!isLogin) {
      return <Login onSubmit={this.handleSubmit} />;
    } else {
      return (
        <div className="home">
          <Card>
            <div>
              {userStories.map(story => {
                if (story.real > story.estimated) {
                  return <ProgressBar key={story.id} max={story.real * 10} value={story.estimated * 10} over />;
                } else {
                  return <ProgressBar key={story.id} max={story.estimated * 10} value={story.real * 10} />;
                }
              })}
            </div>
          </Card>
          <Card>
            <div>
              {userStories.map(story => {
                if (story.real > story.estimated) {
                  return <ProgressBar key={story.id} max={story.real * 10} value={story.estimated * 10} over />;
                } else {
                  return <ProgressBar key={story.id} max={story.real * 10} value={story.estimated * 10} />;
                }
              })}
            </div>
          </Card>
        </div>
      );
    }
  }
}
