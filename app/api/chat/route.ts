export async function POST(req: Request) {
  try {
    const body = await req.json()

    return Response.json({
      message: `OLLIVER recebeu: ${body.message}`,
    })
  } catch (error: any) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}