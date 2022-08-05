const validate = async (decoded, request) => {
  
    if (decoded) {
      if(decoded.isSuperAdmin){
        return { isValid:true, credentials: 'superAdmin'}
      }

      if(!decoded.isSuperAdmin && !decoded.isCustomer){
        return { isValid:true, credentials: 'admin'}
      }

      if(decoded.isCustomer){
        return { isValid:true, credentials: 'customer'}
      }
    } else {
      return { isValid: false };
    }
}

module.exports = {
    validate
}