import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Você é OLLIVER, uma inteligência criativa premium especializada em branding, direção criativa, storytelling e estratégia visual.',
        },
        {
          role: 'user',
          content: body.message,
        },
      ],
    })

    return Response.json({
      message: completion.choices[0].message.content,
    })
  } catch (error) {
    return Response.json(
      {
        error: 'Erro ao conectar com OpenAI',
      },
      {
        status: 500,
      }
    )
  }
}