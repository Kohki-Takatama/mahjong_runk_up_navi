// ESM
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const fastify = Fastify({
  logger: true
})

//静的ファイルの提供設定
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'), // このファイルがあるroot directory/publicを静的ファイルの提供元として設定
  prefix: '/public/', // リクエストのプレフィックスを設定（https://myapp.com/public/file_nameでアクセスできるようになる）
})

// ルートハンドラ
fastify.get('/', function (request, reply) {
  reply.sendFile('index.html')
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})