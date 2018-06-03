/* global React */
/* global API_HOST */

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

  handleSubmit() {
    console.log('handleSubmit...');
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'rodolfo@agavelab.com', password: 'v2c47mk7jd' }),
    })
      .then(res => res.json())
      .then(res => this.setState({ isLogin: true, result: res }));
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
