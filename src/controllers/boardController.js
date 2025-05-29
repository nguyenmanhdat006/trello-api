import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";
 
const createNew = async (req, res, next) => {
    try {
        // console.log('req.body:', req.body)
        // console.log('req.query:', req.query)
        // console.log('req.params:', req.params)
        // console.log('req.files:', req.files)
        // console.log('req.cookies:', req.cookies)
        // console.log('req.jwtDecoded:', req.jwtDecoded)

        
        // điều hướng đến service để xử lý logic
        const createdBoard = await boardService.createNew() 


        res.status(StatusCodes.CREATED).json(createdBoard)
    } catch (error) { next(error) }  
}
export const boardController = {    
    createNew
}       