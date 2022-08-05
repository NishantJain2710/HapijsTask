const isManager = (req, h) => {
    if(req.auth.credentials.userType !== 'manager' || req.auth.credentials.userType !== 'super_admin'){
        const responsData = {
            errorType:'Private Route For Admins',
            location:"Authorization Middleware",
            message:"Only admins and super admins can access this Route."
        }
        const response = h
            .response(responsData)
            .type('application/json')
            .header('content-type', 'application/json')
            .code(400)
        return response
    }
}

const isSuperAdmin = (req, h) => {
    if(req.auth.credentials.userType !== 'super_admin'){
        const responsData = {
            errorType:'Private Route For Admins',
            location:"Authorization Middleware",
            message:"Only super admins can access this Route."
        }
        const response = h
            .response(responsData)
            .type('application/json')
            .header('content-type', 'application/json')
            .code(400)
        return response
    }
}

module.exports = {
    isManager,
    isSuperAdmin
}