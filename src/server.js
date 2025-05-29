import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1/index'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'   



const START_SERVER = () => {
  const app = express()

  //truy cập dữ liệu json từ body request
  app.use(express.json())

  app.use('/v1', APIs_V1)

  //middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)


  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. ${env.AUTHOR} Backend server running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })



  exitHook(() => {
    console.log('4. Disconnecting from MongoDB Cloud Atlas...')  
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB Cloud Atlas!')
  })
}

(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas')

    //Khởi động server Back-end sau khi Connect Database thành công
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
