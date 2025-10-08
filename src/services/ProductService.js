const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, image, type, price, countInStock, rating } = newProduct;

      // Kiểm tra trùng tên
      const checkProduct = await Product.findOne({ name });
      if (checkProduct) {
        return resolve({
          status: "ERROR",
          message: "Tên sản phẩm đã tồn tại",
        });
      }

      // Tạo mới
      const createdProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
      });

      if (createdProduct) {
        return resolve({
          status: "SUCCESS",
          message: "Tạo sản phẩm thành công",
          data: createdProduct,
        });
      }

      // Trường hợp không tạo được
      return resolve({
        status: "ERROR",
        message: "Không thể tạo sản phẩm",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findById(id);
      console.log("checkProduct", checkProduct);

      if (!checkProduct) {
        return resolve({
          status: "ERROR",
          message: "Product không tồn tại",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "SUCCESS",
        message: "Cập nhật sản phẩm thành công",
        data: updatedProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm user theo _id
      const checkProduct = await Product.findById(id);
      console.log("checkProduct", checkProduct);

      if (!checkProduct) {
        return resolve({
          status: "ERROR",
          message: "Product không tồn tại",
        });
      }
      // Cập nhật user
      await Product.findByIdAndDelete(id);
      resolve({
        status: "SUCCESS",
        message: "delete product successful",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm user theo _id
      const checkProduct = await Product.findById(id);
      console.log("checkUser", checkProduct);

      if (!checkProduct) {
        return resolve({
          status: "ERROR",
          message: "product không tồn tại",
        });
      }

      resolve({
        status: "SUCCESS",
        message: "Lấy thông tin product thành công",
        data: checkProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
      if (filter) {
        const label = filter[0];
        console.log("label", label);
        const allobjectFilter = await Product.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit);

        resolve({
          status: "SUCCESS",
          message: "Get all product successful",
          data: allobjectFilter,
          total: totalProduct,
          pageCurret: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (sort) {
        console.log("sort");
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        console.log("objectSort", objectSort);
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        resolve({
          status: "SUCCESS",
          message: "Get all product successful",
          data: allProductSort,
          total: totalProduct,
          pageCurret: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      const allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit);

      resolve({
        status: "SUCCESS",
        message: "Get all product successful",
        data: allProduct,
        total: totalProduct,
        pageCurret: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getDetailsProduct,
};
