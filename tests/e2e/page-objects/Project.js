/** @format */

const ProjectCommands = {
  shouldSeeProjectList() {
    this.expect.element('@projectList').to.be.visible
  }
}

const projectURL = `${process.env.VUE_DEV_SERVER_URL}/project-list`

module.exports = {
  url: projectURL,
  commands: [ProjectCommands],
  elements: {
    projectList: {
      selector: 'table.projectList-table'
    }
  }
}
