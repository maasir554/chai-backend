const asyncHandler = (reruestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch(err => next(err))
    }
} 

// const asyncHandler = (func) => async (req, res, next) => 
//     {
//         try{
//             await func()
//         }
//         catch(err){
//             res.status(ree.code || 500).json({
//                 message: err.message
//             })
//         }
//     }

export { asyncHandler }
