const Audit = require("../models/audit");
const jwt = require("jsonwebtoken");
const { HTTP_FORBIDDEN } = require("../utils/httpCode");
const {
  REQUEST_WITHOUT_TOKEN,
  ERROR_ADDING_AUDIT_REGISTER,
} = require("../utils/constants");

const addAuditRegister = async (newElem) => {
  const newAudit = new Audit(newElem);
  await newAudit.save();

  return newAudit;
};

const newAuditRegister = async (req, res) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN,
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY);
    const reg = req.body.register;
    reg.actionPerformedByUser = id;
    const newAudit = await addAuditRegister(reg);

    return res.json(newAudit);
  } catch (error) {
    console.log(error);
    return res.status(HTTP_FORBIDDEN).json({
      error: ERROR_ADDING_AUDIT_REGISTER,
    });
  }
};

module.exports = {
  addAuditRegister,
  newAuditRegister,
};
