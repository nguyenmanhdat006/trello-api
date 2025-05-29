// pwd: rQFCK37ANx1kXlWX

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'


let trelloDatabaseInstance = null
// khởi tạo đối tượng mongoClientInstance kết nối tới mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
// Kết nối tới Database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của monggoClientInstance
  await mongoClientInstance.connect()
  // Kết nối thành công thì lấy ra Database theo tên và gán ngược nó lại vào biến trelloDatabaseInstance ở trên
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

//Đóng kết nối Databse khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

// Function GET_DB (không phải async) có nhiệm vụ export ra trelloDatabaseInstance sau khi đã
// connect thành vông tới MongoDB để chúng ta sử dụng ở nhiều nơi tron trong code
// Lưu ý phải đảm bảo chỉ luôn gọi GET_DB sau khi đã kết nối thành công tới MongoDBMongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}