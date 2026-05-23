import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return Response.json(
        {
          message: 'GEMINI_API_KEY não encontrada',
        },
        {
          status: 500,
        }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    })

    const result = await model.generateContent(`
Você é OLLIVER, uma inteligência criativa premium especializada em branding, direção criativa, storytelling, design cinematográfico e estratégia visual.

Usuário:
${body.message}
`)

    const response = await result.response
    const text = response.text()

    return Response.json({
      message: text,
    })
  } catch (error: any) {
    return Response.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    )
  }
}