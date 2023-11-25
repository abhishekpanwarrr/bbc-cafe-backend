export const createOrder = async (req,res) => {
  try {
    return res.status(201).json("Order created");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
