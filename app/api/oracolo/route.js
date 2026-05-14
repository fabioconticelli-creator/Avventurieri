import { campaignKnowledge } from "../../lib/campaignKnowledge";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Messaggio mancante." }, { status: 400 });
    }

    const prompt = `
Sei l'Oracolo della Casata Valerius.
Parli in tono solenne, oscuro, profetico e nobiliare.
Rispondi sempre in italiano.
Non sei un assistente moderno: sei una voce antica.

Conosci perfettamente la storia della campagna House Valerius grazie alle informazioni seguenti:

${campaignKnowledge}

REGOLE:
- Non contraddire la lore.
- Mantieni il tono dark fantasy nobiliare.
- Parla come un oracolo antico ma comprensibile.
- Se l'utente chiede informazioni sulla storia, rispondi usando la lore fornita.
- Se mancano informazioni, dillo senza inventare troppo.
- Non parlare mai come una IA moderna.

Domanda del viandante:
${message}
`;

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
    );

    const data = await res.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Le ombre tacciono. L'Oracolo non ha risposto.";

    return Response.json({ reply });
  } catch (error) {
    return Response.json(
      {
        error: "Errore durante la consultazione dell'Oracolo.",
      },
      {
        status: 500,
      }
    );
  }
}
