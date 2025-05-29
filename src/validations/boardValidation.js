import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'   
import  ApiError  from '~/utils/ApiError.js' 

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict(),  
        description: Joi.string().required().min(3).max(256).trim().strict(),
    })


    try{
        await correctCondition.validateAsync(req.body, {abortEarly: false,}) // Trả về tất cả lỗi thay vì dừng lại khi gặp lỗi đầu tiên
        next()
        } 
        catch (error) {
        // const errorMessage = new Error(error).message  
        // const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)   
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message), ) // Gọi middleware xử lý lỗi
  
}}  

export const boardValidation = {
    createNew
}