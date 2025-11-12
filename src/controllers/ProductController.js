const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, countInStock, rating, description } =
      req.body;
    console.log("req.body", req.body);

    // Kiểm tra dữ liệu đầu vào
    if (
      !name ||
      !image ||
      !type ||
      !price ||
      !countInStock ||
      !rating ||
      !description
    ) {
      return res.status(400).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin sản phẩm",
      });
    }
    // Gọi service
    const response = await ProductService.createProduct(req.body);
    // Nếu service trả lỗi
    if (response.status === "ERROR") {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      status: "ERROR",
      message: error.message || "Internal server error",
    });
  }
};

const updateProduct = async (req, res) => {
try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The ProductID is required",
      });
    }

    console.log("productId", productId);
    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      status: "ERROR",
      message: error.message || "Internal server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    console.log("productId", productId);
    if (!productId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The productID is required",
      });
    }
    // Check if the userID is provided
    console.log("productId", productId);
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};
const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("productId", productId);

    if (!productId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The ProductID is required",
      });
    }

    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message || "Something went wrong",
    });
  }
};

const getAllProduct = async (req, res) => {
  console.log("req.query", req.query);
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await ProductService.getAllProduct(
      Number(limit) || 8,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message || "Internal server error",
    });
  }
};
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getDetailsProduct,
};
