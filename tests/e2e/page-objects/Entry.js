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
    this.assert
      .visible('@accountInput')
      .assert.visible('@passwordInput')
      .assert.visible('@submitButton')
    return this.api
  },
  enterAccountAndPassword() {
    this.api
      .setValue('form input[name=account]', ACCOUNT)
      .setValue('form input[name=password]', PASSWORD)
    return this.api
  },
  enterWrongAccountAndPassword() {
    this.api
      .setValue('form input[name=account]', ACCOUNT)
      .setValue('form input[name=password]', WRONG_PASSWORD)
    return this.api
  },
  clickLoginButton() {
    this.api.click('form button[type=submit]')
    return this.api
  },
  shouldSeeLoginError() {
    this.assert.containsText('@feedbackText', '帳號密碼不匹配')
    return this.api
  },
  shouldSeeProjectPageIfSuccess() {
    this.api.pause(1000).assert.urlContains('/projects')
    return this.api
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
