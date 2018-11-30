/** @format */

// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  '頁面載入會顯示網站標題、帳號、密碼、登入鈕': browser => {
    browser
      .page.Entry().show()
      .page.Entry().shouldSeeInputsAndSubmit()
      .end()
  },

  // '未輸入帳密，登入會提示錯誤': browser => {
  //   browser
  //     .page.Entry().show()
  //     .page.Entry().clickLoginButton()
  //     .page.Entry().shouldSeeLoginError()
  //     .end()
  // },

  // '輸入帳密，登入失敗會提示錯誤': browser => {
  //   browser
  //     .page.Entry().show()
  //     .page.Entry().enterWrongAccountAndPassword()
  //     .page.Entry().clickLoginButton()
  //     .page.Entry().shouldSeeLoginError()
  //     .end()
  // },

  // '輸入帳密，登入成功會跳轉頁面': browser => {
  //   browser
  //     .page.Entry().show()
  //     .page.Entry().enterAccountAndPassword()
  //     .page.Entry().clickLoginButton()
  //     .page.Entry().shouldSeeProjectPageIfSuccess()
  //     .end()
  // }
}
