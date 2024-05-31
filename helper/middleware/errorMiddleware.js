// Error MiddleWare Configuration

const errorMiddleware = (err, req, res, next)=>{
    res
       .status(err.statusCode ? err.statusCode : 500)
       .send({err: err.message, data: err.data})
}

module.exports = errorMiddleware;