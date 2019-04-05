/** @format */

const ProjectCommands = {
  show() {
    this.api
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
  },
  shouldSeeProjects() {
    this.expect.element('@Projects').to.be.visible
  }
}

const projectURL = `${process.env.VUE_DEV_SERVER_URL}/projects`

module.exports = {
  url: projectURL,
  commands: [ProjectCommands],
  elements: {
    Projects: {
      selector: 'table.Projects-table'
    }
  }
}
