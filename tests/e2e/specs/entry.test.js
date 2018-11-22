/** @format */

// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  '頁面載入會顯示網站標題、帳號、密碼、登入鈕': browser => {
    let Entry = browser.page.Entry()

    Entry.show()
    Entry.shouldSeeInputsAndSubmit()
    browser.end()
  },

  '未輸入帳密，登入會提示錯誤': browser => {
    let Entry = browser.page.Entry()

    Entry.show()
    Entry.clickLoginButton()
    Entry.shouldSeeLoginError()
    browser.end()
  },

  // 等有真的 login API 才能測
  // '輸入帳密，登入失敗會提示錯誤': browser => {
  //   let Entry = browser.page.Entry()

  //   Entry.show()
  //   Entry.enterWrongAccountAndPassword()
  //   Entry.clickLoginButton()
  //   Entry.shouldSeeLoginError()
  //   browser.end()
  // },

  '輸入帳密，登入成功會跳轉頁面': browser => {
    let Entry = browser.page.Entry()

    Entry.show()
    Entry.enterAccountAndPassword()
    Entry.clickLoginButton()
    Entry.shouldSeeProjectPageIfSuccess()
    browser.end()
  }
}
