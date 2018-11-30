/** @format */
const ACCOUNT = 'arel'
const PASSWORD = '0000'
const WRONG_PASSWORD = ''

const EntryCommands = {
  show() {
    this.api
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
    return this.api
  },
  shouldSeeInputsAndSubmit() {
    return this.assert.visible('@accountInput')
      .assert.visible('@passwordInput')
      .assert.visible('@submitButton')
  },
  enterAccountAndPassword() {
    return this.api
      .setValue('form input[name=account]', ACCOUNT)
      .setValue('form input[name=password]', PASSWORD)
  },
  enterWrongAccountAndPassword() {
    return this.api
      .setValue('form input[name=account]', ACCOUNT)
      .setValue('form input[name=password]', WRONG_PASSWORD)
  },
  clickLoginButton() {
    return this.api.click('form button[type=submit]')
  },
  shouldSeeLoginError() {
    return this.assert.containsText('@feedbackText', '帳號密碼不匹配')
  },
  shouldSeeProjectPageIfSuccess() {
    return this.assert.urlContains('/project-list')
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
