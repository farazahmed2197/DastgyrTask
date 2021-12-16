const { getType } = require("./helper");

const inventoryValidate = (data) => {
  let validationErrors = [];
  if (!data.sku || typeof data.sku != "string")
    validationErrors.push({
      field: "SKU",
      reason: "invalid or missing value",
    });
  if (!data.quantity || typeof parseInt(data.quantity) != "number")
    validationErrors.push({
      field: "quantity",
      reason: "invalid or missing value",
    });
  if (!data.price || typeof parseInt(data.price) != "number")
    validationErrors.push({
      field: "price",
      reason: "invalid or missing value",
    });
  if (!data.type || typeof data.type != "string")
    validationErrors.push({
      field: "type",
      reason: "invalid or missing value",
    });
  if (validationErrors.length == 0 && getType(data.type) == "invalid")
    validationErrors.push({
      field: "type",
      reason: "invalid operation type",
    });
  return validationErrors;
};

module.exports = { inventoryValidate };
