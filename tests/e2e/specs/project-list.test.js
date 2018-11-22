/** @format */

// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  '登入後，可以看到專案列表': browser => {
    let Project = browser.page.Project()

    Project.shouldSeeProjectList()
  },

  '登入後，可以看到一般使用者的導覽列選項': browser => {},

  '登入後，可以看到一般使用者的導覽列選項': browser => {},

  'ADMIN 可以看到的導覽列設定選項': browser => {},

  'ADMIN 可以看到的導覽列設定選項': browser => {},

  'ADMIN, MGT 可以切換專案狀態': browser => {},

  'OPT 可以看見傾度管量測鈕': browser => {}
}
