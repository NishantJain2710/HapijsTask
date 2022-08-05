const validate = async (decoded, request) => {

    if (decoded) {
        request.auth.credentials = { roles:decoded.userType}
        return { isValid:true, credentials: decoded.userType}
    } else {
        return { isValid: false };
    }
}

module.exports = {
    validate
}