const isAdmin = async (req, res, next) => {
  const { id } = req.params;
  if (id == 7) {
    req.verify = true;
    next();
    return;
  }
  res
    .status(400)
    .json({
      message: "Kechirasiz bu blogni ko'rish uchun adminning ruxsati kerak!",
    });
};

module.exports = isAdmin;
