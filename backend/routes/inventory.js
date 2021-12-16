const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventory");
const Product = require("../models/Product");
const Validation = require("../util/validator");
const sequelize = require("../dbConnect");
const { getType } = require("../util/helper");

router.post("/add", async (req, res) => {
  try {
    // validation of input
    const validation = Validation.inventoryValidate(req.body);
    if (validation.length > 0)
      return res.status(400).json({ error: validation });

    // if product doesn't exist then create one
    let product = await Product.findOne({
      where: {
        SKU: req.body.sku,
      },
    });
    
    // if product doesn't exists then add it
    if (!product) await addProduct(req.body);
    const type = getType(req.body.type);
    
    // validation for quantity check
    if (
      type == "out" &&
      (await getInventoryBySKU({ field: "sku", value: req.body.sku }))[0].total
      <
        req.body.quantity
    )
      return res
        .status(300)
        .json({ error: "Inventory of requested product is out of stock" });

    const newInventory = await Inventory.create({
      SKU: req.body.sku,
      quantity: req.body.quantity,
      price: req.body.price,
      type: type,
      cause: req.body.type,
      status: "1",
    });

    return res.status(200).json({
      data: newInventory,
      status: true,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
      data: null,
      status: false,
    });
  }
});

router.get("/get", async (req, res) => {
  try {
    let response = await getInventoryBySKU();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(402).json({
      error: error.message,
      data: [],
      status: false,
    });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let response = await Inventory.findAll({
      where: {
        InventoryId: id,
      },
    });

    return res.status(200).json(response[0]);
  } catch (error) {
    return res.status(402).json({
      error: error,
      data: [],
      status: false,
    });
  }
});

const addProduct = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.create({
        title: data.title || `product-${data.sku}`,
        description: data.description || `product-${data.sku} description`,
        SKU: data.sku,
        status: "1",
      });
      if (product) resolve(product);
      else throw new Error("Product not added!");
    } catch (error) {
      console.log(error);
      reject(error.message);
    }
  });
};

const getInventoryBySKU = async (data) => {
  let inQuery = [{ field: "type", value: "in" }];
  let outQuery = [{ field: "type", value: "out" }];
  data ? inQuery.push(data) : null;
  data ? outQuery.push(data) : null;

  let responseIn = await getInventory(inQuery);
  let responseOut = await getInventory(outQuery);

  let response = [];
  // compare the in and out inventories
  for (row of responseIn) {
    let updatedRecord = responseOut.find((rcrd) => rcrd.sku == row.sku);
    // if out type inventory found then adjust the final quantity
    if (updatedRecord) {
      row.total = row.total - updatedRecord.total;
    }
    response.push(row);
  }

  return response;
};

const getInventory = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const having = {};
      await data.forEach((element) => {
        having[element.field] = element.value;
      });
      console.log(having);

      // having["sku"] = "abc1";
      let response = await Inventory.findAll({
        attributes: [
          "sku",
          [sequelize.fn("SUM", sequelize.col("quantity")), "total"],
        ],
        group: ["sku", "type"],
        having,
        raw: true,
      });

      resolve(response);
    } catch (error) {
      reject(error.message);
    }
  });
};

module.exports = router;
