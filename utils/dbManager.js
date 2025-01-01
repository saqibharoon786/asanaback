const mongoose = require("mongoose");

const connectionCache = {}; // Cache to store active connections

const getTenantConnection = async (tenantId) => {
  if (connectionCache[tenantId]) {
    return connectionCache[tenantId]; // Return existing connection
  }

  const Tenant = require("../models/company/company.model");
  const tenant = await Tenant.findById(tenantId);
  if (!tenant) {
    throw new Error("Tenant not found");
  }

  const connection = await mongoose.createConnection(tenant.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connectionCache[tenantId] = connection; // Cache the connection
  return connection;
};

module.exports = { getTenantConnection };
