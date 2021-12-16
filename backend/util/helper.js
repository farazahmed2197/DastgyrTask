const getType = (type) => {
  let rType = "";
  switch (type.toLowerCase()) {
    case "purchase":
    case "return":
      rType = "in";
      break;
    case "damage":
    case "sales":
    case "stolen":
      rType = "out";
      break;
    default:
      rType = "invalid";
  }

  return rType;
};

module.exports = { getType };
