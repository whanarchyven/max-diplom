import { writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'
import { mkdir } from 'fs/promises'

export async function saveImage(base64Image: string): Promise<string> {
  try {
    const publicDir = join(process.cwd(), 'public')
    
    // Создаем директорию public, если она не существует
    await mkdir(publicDir, { recursive: true })
    
    const imageBuffer = Buffer.from(base64Image.split(',')[1], 'base64')
    const fileName = `${randomUUID()}.jpg`
    const filePath = join(publicDir, fileName)
    
    await writeFile(filePath, imageBuffer)
    return fileName
  } catch (error) {
    console.error('Ошибка при сохранении изображения:', error)
    throw new Error('Не удалось сохранить изображение')
  }
} 