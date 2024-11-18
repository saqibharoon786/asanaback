const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");

const companyModel = require("../../models/company/companyIndex.model");

const brokenLinks = async (req, res) => {
  try {
    const user = req.user;
    const url = req.body.url;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    const links = await page.$$eval("a", (anchors) =>
      anchors.map((a) => a.href)
    );
    const brokenlinks = [];

    for (const link of links) {
      try {
        const linkPage = await browser.newPage();
        const response = await Promise.race([
          linkPage.goto(link, { waitUntil: "networkidle2" }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 10000)
          ),
        ]);

        if (response.status() >= 400) {
          brokenlinks.push({ link, status: response.status() });
        }

        await linkPage.close();
      } catch (error) {
        console.log(`Error accessing ${link}:`, error.message);
        brokenlinks.push({ link, status: "Error" });
      }
    }

    const savedBrokenLinks = await companyModel.BrokenLink.create({
      companyId: user._id,
      companyName: user.email,
      projectName: url,
      brokenLinks: brokenlinks,
    });

    console.log("Broken links saved to broken_links.txt");
    await browser.close();

    // Return the brokenlinks array as JSON response
    return res.json({ brokenLinks: savedBrokenLinks });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = brokenLinks;
