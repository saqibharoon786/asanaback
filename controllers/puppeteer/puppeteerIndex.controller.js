var brokenLinks = require("./brokenLinks.controller");
var projectInfo = require("./projectInfo.controller");

var puppeteerController = {
  brokenLinks,
  projectInfo,
};

module.exports = puppeteerController;
