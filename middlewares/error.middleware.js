const errorMiddleware = (err, req, res, next ) => {
    err.status = err.status || 500 
    console.log(err.message) 
    res.status(err.status).json({
        success:false,  
        message:err.message , 
        stack :err.stack 

    })
}
export default errorMiddleware 