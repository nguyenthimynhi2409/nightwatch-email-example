const getCodeFromEmail = require("../src/readEmail");

module.exports = {
  "Kiểm tra lấy mã code từ email": async function (browser) {
    const code = await getCodeFromEmail();
    if (!code) {
      browser.assert.fail("no receive code");
    } else {
      browser.assert.ok("get code thành công");
    }
    browser.end();
  },
};
