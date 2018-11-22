/** @format */

const EntryCommands = {
  show() {
    this.api
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
  },
  shouldSeeInputsAndSubmit() {
    this.expect.element('@accountInput').to.be.visible
    this.expect.element('@passwordInput').to.be.visible
    this.expect.element('@submitButton').to.be.visible
  },
  enterAccountAndPassword() {
    this.api.setValue('form input[name=account]', 'root')
    this.api.setValue('form input[name=password]', '0000')
  },
  enterWrongAccountAndPassword() {
    this.api.setValue('form input[name=account]', 'root')
    // this.api.setValue('form input[name=password]', '0000')
  },
  clickLoginButton() {
    this.api.click('form button[type=submit]')
  },
  shouldSeeLoginError() {
    this.expect.element('@feedbackText').text.to.equal('帳號密碼不匹配')
  },
  shouldSeeProjectPageIfSuccess() {
    this.waitForElementVisible('.projectList', 2000)
  }
}

module.exports = {
  commands: [EntryCommands],
  elements: {
    accountInput: {
      selector: 'form input[name=account]'
    },
    passwordInput: {
      selector: 'form input[name=password][type=password]'
    },
    submitButton: {
      selector: 'form button[type=submit]'
    },
    feedbackText: {
      selector: 'form p.feedback'
    }
  }
}
