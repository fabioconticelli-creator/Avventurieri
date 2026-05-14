export async function POST(req) {
  try {
    const { context, messages, message } = await req.json()

    const userMessages = messages?.length
      ? messages
      : [{ role: 'user', content: message || '' }]

    const systemContext = context || `
Sei l'Oracolo della Casata Valerius.
Parli in tono oscuro, profetico e fantasy.
Rispondi sempre in italiano.
`

    const prompt = `
${systemContext}

CONVERSAZIONE:
${userMessages
  .map(m => `${m.role === 'user' ? 'Viandante' : 'Oracolo'}: ${m.content}`)
  .join('\n')}

Rispondi all'ultimo messaggio del Viandante.
`

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    )

    const data = await res.json()

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "L'Oracolo rimane in silenzio."

    return Response.json({ reply })
  } catch (error) {
    return Response.json(
      { error: "Errore dell'Oracolo." },
      { status: 500 }
    )
  }
}
