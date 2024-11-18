const mongoose = require("mongoose");

const brokenLinkSchema = new mongoose.Schema(
  {
    companyId: { type: String, required: true },
    companyName: { type: String, required: true },
    projectName: { type: String, required: true },
    brokenLinks: {
      type: [
        {
          link: { type: String, required: true },
          status: { type: String, required: true },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Explicitly specify the collection name to avoid adding "s"
const BrokenLink = mongoose.model(
  "BrokenLink",
  brokenLinkSchema,
  "brokenLinksCol"
);

module.exports = BrokenLink;
