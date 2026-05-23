import OpenAI from 'openai'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return Response.json(
        {
          message: 'OPENAI_API_KEY não encontrada',
        },
        {
          status: 500,
        }
      )
    }

    const openai = new OpenAI({
      apiKey,
    })

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