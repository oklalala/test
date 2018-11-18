// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  "頁面載入會顯示網站標題、帳號、密碼、登入鈕": browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible("#app", 5000)
      .assert.visible(".layout-title")
      .assert.containsText(".layout-title", "大地監控")
      .assert.visible(".login-account")
      .assert.visible(".login-password")
      .assert.visible(".login-button")
      .end();
  }
};
