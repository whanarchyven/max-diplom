import { Elysia, t } from 'elysia'
import { connectDB } from './db'
import { NewsSchema, NewsCreateSchema } from './schemas/news'
import { saveImage } from './utils/file'
import { cors } from '@elysiajs/cors'

const db = await connectDB()
const news = db.collection('news')

const app = new Elysia()
    .use(cors({
        origin: ['http://localhost:3001', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        exposeHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers'],
        credentials: true,
        maxAge: 86400
    }))
    .get('/', () => 'Hi Elysia Server')
    .get('/error', () => {
        throw new Error('Test Elysia Error')
    })
    .get('/id/:id', ({ params: { id } }) => id)
    .post('/mirror', ({ body }) => body, {
        body: t.Object({
            id: t.Number(),
            name: t.String()
        })
    })
    
    // Получение всех новостей
    .get('/news', async () => {
        return await news.find().toArray()
    })
    
    // Получение новости по slug
    .get('/news/:slug', async ({ params: { slug } }) => {
        const newsItem = await news.findOne({ slug })
        if (!newsItem) throw new Error('Новость не найдена')
        return newsItem
    })
    
    // Создание новости
    .post('/news', async ({ body }) => {
        // Сохраняем изображение и получаем имя файла
        const imageName = typeof body.image === 'string' && body.image.startsWith('data:') 
            ? await saveImage(body.image) 
            : body.image || ''
        
        const newsItem = {
            ...body,
            image: imageName,
            date: body.date || new Date().toISOString().split('T')[0] // Используем существующую дату или создаем новую
        }
        
        await news.insertOne(newsItem)
        return { success: true, data: newsItem }
    })
    
    // Обновление новости
    .put('/news/:slug', async ({ params: { slug }, body }) => {
        const { image, ...newsData } = body
        const updateData = { ...newsData }
        
        // Если прислали новое изображение, обрабатываем его
        if (image && image.startsWith('data:')) {
            updateData.image = await saveImage(image)
        }
        
        const result = await news.findOneAndUpdate(
            { slug },
            { $set: updateData },
            { returnDocument: 'after' }
        )
        
        if (!result) throw new Error('Новость не найдена')
        return { success: true, data: result }
    }, {
        body: NewsSchema
    })
    
    // Удаление новости
    .delete('/news/:slug', async ({ params: { slug } }) => {
        const result = await news.findOneAndDelete({ slug })
        if (!result) throw new Error('Новость не найдена')
        return { success: true, message: 'Новость успешно удалена' }
    })
    
    .listen(3000)

export type App = typeof app 