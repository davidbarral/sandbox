import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT,
});

const sendMessage = async (...prompt) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: prompt,
      model: "gpt-4-turbo",
      temperature: 0.5,
      max_tokens: 1000,
    });

    return {
      ok: true,
      content: completion.choices[0].message.content,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
};

const prose = await sendMessage(
  { role: "system", content: "Eres un gran escritor de cuentos" },
  { role: "user",  content: "Cuéntame un cuento sobre Miriam, la joven de Boiro que se fue a la gran ciudad de Coruña para ser informática y acabo trabajando en Trabe Soluciones, la mejor empresa del mundo en 200 palabras" },
);

console.log(prose.content, "\n\n");

const verses = await sendMessage(
  { role: "system", content: "Eres un gran escritor de cuentos" },
  { role: "user",  content: "Cuéntame un cuento sobre Miriam, la joven de Boiro que se fue a la gran ciudad de Coruña para ser informática y acabo trabajando en Trabe Soluciones, la mejor empresa del mundo en 200 palabras" },
  { role: "assistant", content: prose.content },
  { role: "user",  content: "Ahora en verso por favor" },
);

console.log(verses.content, "\n\n");

const haiku = await sendMessage(
{ role: "system", content: "Eres un gran escritor de cuentos" },
  { role: "user",  content: "Cuéntame un cuento sobre Miriam, la joven de Boiro que se fue a la gran ciudad de Coruña para ser informática y acabo trabajando en Trabe Soluciones, la mejor empresa del mundo en 200 palabras" },
{ role: "assistant", content: prose.content },
{ role: "user",  content: "Ahora en verso por favor" },
{ role: "assistant", content: verses.content },
{ role: "user",  content: "Mejor como un haiku" },
);

console.log(haiku.content);
