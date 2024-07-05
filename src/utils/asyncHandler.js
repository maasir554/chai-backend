// NOTE: anyting directly written after arrow becomes the return value of arrow function
// in this case asyncHandler returns an arrow function.

const asyncHandler = (requestHandler) => (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch(err => next(err))
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
