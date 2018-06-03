/* global React */

import ProgressBar from '../ProgressBar';
import Card from '../Card';

export default class App extends React.Component {
  render() {
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

    return (
      <div className='home'>
        <Card>
          <div>
            {userStories.map(story => {
              if (story.real > story.estimated) {
                return <ProgressBar
                          key={story.id}
                          max={story.real * 10}
                          value={story.estimated * 10}
                          over />;
              } else {
                return <ProgressBar
                          key={story.id}
                          max={story.estimated * 10}
                          value={story.real * 10} />;
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
            }
          )}
          </div>
        </Card>
      </div>
    );
  }
}
