const bodyParser = require('body-parser');
const express = require('express');

const server = express();

const Yodiz = require('./yodiz');
const { mapStories } = require('./util');

const api = new Yodiz(process.env.YODIZ_API_KEY);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

function handler(cb) {
  return (req, res) => {
    Promise.resolve()
      .then(() => cb(req))
      .then(data =>{
        res.json({
          status: 'ok',
          payload: data,
        })
      })
      .catch(err => {
        res.json({
          status: 'err',
          message: err.message,
        });
      });
  };
}

server.get('/stories', handler(req => {
  return api.getUserstories(req.query.projectId, req.query.sprintId).then(data => mapStories(data));
}));

server.post('/login', handler(req => {
  return api.doLogin(req.body.email, req.body.password)
    .then(() => api.getProjects())
    .then(projects => {
      return Promise.all(projects.map(project => {
        return api.getSprints(project.id).then(data => mapSprints(data, project));
      }));
    });
}));

server.listen(process.env.PORT || 3000);
