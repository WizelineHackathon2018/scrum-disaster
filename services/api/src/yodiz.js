const BASE_URL = 'https://app.yodiz.com/api/rest/v1';

const reqFast = require('req-fast');

class Yodiz {
  constructor(key) {
    this._apiKey = key;
    this._apiToken = null;
  }

  _getJSON(path, params, isPost) {
    return new Promise((resolve, reject) => {
      reqFast({
        method: isPost ? 'POST' : 'GET',
        url: `${BASE_URL}${path}`,
        data: params,
        headers: {
          'content-type': 'application/json',
          'api-key': this._apiKey,
          'api-token': this._apiToken || '',
        },
      }, (err, resp) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(resp.body);
      });
    });
  }

  doLogin(email, password) {
    return this._getJSON('/login', { email, password }, true)
      .then(data => {
        this._apiToken = data['api-token'];
      });
  }

  getProjects() {
    return this._getJSON('/projects', { fields: 'all' });
  }

  getSprints(projectId) {
    return this._getJSON(`/projects/${projectId}/sprints`, { fields: 'all' });
  }

  getUserstories(projectId, sprintId) {
    return this._getJSON(`/projects/${projectId}/sprints/${sprintId}/userstories`, { fields: 'all' });
  }
}

module.exports = Yodiz;
