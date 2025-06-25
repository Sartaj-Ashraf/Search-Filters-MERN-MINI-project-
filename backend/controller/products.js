const Product = require("../models/product.js");

const createProduct = async (req, res) => {
  const { name, price, rating, company } = req.body;
  if (!name || !price || !rating || !company) {
    return res.status(400).json({ msg: "Please provide the required fields" });
  }
  const product = await Product.create(req.body);
  res.status(200).json({ product, msg: "Product created successfully" });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  if(numericFilters){
    const operatorMap={
      "=":"$eq",
      ">":"$gt",
      ">=":"$gte",
      "<":"$lt",
      "<=":"$lte",
    }
    const regEx=/\b(<|>|<=|>=|=|<=|=)\b/g;
    let filters=numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)


    const options=['price','rating','company']
    filters=filters.split(',').forEach((item)=>{
      const [field,operator,value]=item.split('-')
      if(options.includes(field)){
        queryObject[field]={
          [operator]:Number(value)
        } 
      }
    })
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const totalProducts=await Product.countDocuments(queryObject);
  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ products, nbHits: totalProducts });
};

module.exports = { getAllProducts, createProduct };
