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
    this.setSprint = this.setSprint.bind(this);
    this.setProject = this.setProject.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      sprints: [],
      sprintIds: [],
      projectId: null,
      isLogin: false,
      result: null,
    };
  }

  _getJSON(path, params) {
    /* global API_HOST */

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(params),
    };

    return fetch(`${API_HOST}${path}`, options).then(res => res.json())
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      isLogin: false,
      loading: true,
      result: null,
    });

    const [email, password] = event.target.elements;

    return this._getJSON('login', { email: email.value, password: password.value })
      .then(res => {
        this.setState({
          isLogin: res.status === 'ok',
          loading: false,
          result: res,
        });
      });
  }

  setSprint(event) {
    const ids = this.state.sprintIds;
    const sprints = this.state.sprints;
    const sprintId = parseInt(event.target.value, 10);
    const offset = ids.indexOf(sprintId);

    if (offset === -1) {
      if (event.target.checked) {
        this.setState({
          sprintIds: ids.concat(sprintId)
        });

        this._getJSON('stories', { projectId: this.state.projectId, sprintId })
          .then(res => {
            this.setState({
              sprints: res.payload.map(sprintInfo => {
                return {
                  id: sprintInfo.id,
                  name: sprintInfo.title,
                  userStories: sprintInfo.tasks.map(taskInfo => {
                    return {
                      id: taskInfo.id,
                      real: taskInfo.effortLogged,
                      estimated: taskInfo.effortEstimate,
                    };
                  }),
                };
              }),
            });
          });
      }
    } else {
      if (!event.target.checked) {
        ids.splice(offset, 1);

        this.setState({
          sprintIds: ids,
          sprints: sprints.filter(sprintInfo => sprintInfo.id === sprintId),
        });
      }
    }
  }

  setProject(event) {
    this.setState({
      projectId: parseInt(event.target.value, 10),
      sprintIds: [],
      sprints: [],
    });
  }

  render() {
    const { projectId, sprintIds, sprints, isLogin, loading, result } = this.state;

    if (!isLogin) {
      return <Login
        loading={loading}
        onSubmit={this.handleSubmit}
        message={result && result.message}
      />;
    }

    const selectedProject = result.payload.find(projectInfo => projectInfo.id === this.state.projectId);
    const projects = result.payload;
    const renderItems = [];

    for (let i = 0; i < sprints.length; i+=2) {
      const left = sprints[i];
      const right = sprints[i+1];

      console.log(left, right);

      renderItems.push(
        <Card user='User' key={i}>
        {left && <CardItem {...left} />}
        {right && <CardItem {...right} />}
      </Card>);
    }

    return (
      <div>
        <div>
          <select onChange={this.setProject}>
            <option key={0}></option>

            {projects.map(projectInfo => (
              <option key={projectInfo.id} value={projectInfo.id}>{projectInfo.title}</option>
            ))}
          </select>
        </div>

        {projectId && selectedProject.sprints.map(sprint => (
          <div key={sprint.id}>
            <label>
              <input type='checkbox' onChange={this.setSprint} value={sprint.id} />
              {sprint.title}
            </label>
          </div>
        ))}

        <div className='flex'>{renderItems}</div>
      </div>
    );
  }
}
