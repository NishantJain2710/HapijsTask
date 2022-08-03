const validate = async (decoded, request) => {
    if (decoded) {
      return { isValid: true };
    } else {
      return { isValid: false };
    }
}

module.exports = {
    validate
}