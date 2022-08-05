const validate = async (decoded, request) => {
  if (decoded) {
    return { isValid:true, credentials: decoded.userType}
  } else {
    return { isValid: false };
  }
}

module.exports = {
    validate
}