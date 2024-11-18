const express = require("express");
const companyModel = require("../../models/company/companyIndex.model");

const projectInfo = async (req, res) => {
  try {
    const data = await companyModel.BrokenLink.find();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = projectInfo;
