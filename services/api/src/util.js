function mapStories(payload) {
  return payload
    .filter(us => us.status.narrative === 'Completed')
    .map(us => {
      return {
        id: us.id,
        planEstimate: us.planEstimate,
        storyPoints: us.storyPoints,
        effortEstimate: us.effortEstimate,
        effortRemaining: us.effortRemaining,
        effortLogged: us.effortLogged,
        status: us.status.narrative,
        sprint: {
          id: us.sprint.id,
          title: us.sprint.title,
          status: us.sprint.status.narrative,
        },
        epic: us.epic && {
          id: us.epic.id,
          title: us.epic.title,
          status: us.epic.status.narrative,
        },
        tags: us.tags && us.tags.map(tag => tag.title),
        tasks: us.tasks && us.tasks
          .filter(task => task.status.narrative === 'Done')
          .map(task => {
            return {
              id: task.id,
              title: task.title,
              sprint: task.sprintId,
              effortEstimate: task.effortEstimate,
              effortLogged: task.effortLogged,
              effortRemaining: task.effortRemaining,
              owner: task.owner && {
                firstName: task.owner.firstName,
                lastName: task.owner.lastName,
              },
              status: task.status.narrative,
            };
          })
      };
    });
}

function mapSprints(payload, projectInfo) {
  return payload.map(sprints => {
    return {
      id: projectInfo.id,
      title: projectInfo.title,
      sprints: sprints.map(sprint => {
        return {
          id: sprint.id,
          title: sprint.title,
        };
      }),
    };
  });
}

module.exports = {
  mapStories,
  mapSprints,
};
