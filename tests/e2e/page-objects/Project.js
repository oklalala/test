/** @format */

const ProjectCommands = {
  show() {
    this.api
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
  },
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
