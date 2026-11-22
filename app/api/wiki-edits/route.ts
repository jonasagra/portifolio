// Conta as edições do Corelakes na Minecraft Wiki em português (API do MediaWiki).
// Roda no servidor para evitar CORS e guarda o resultado por 1 hora.
export const revalidate = 3600;

const API =
  "https://pt.minecraft.wiki/api.php?action=query&list=users&ususers=Corelakes&usprop=editcount&format=json";

export async function GET() {
  try {
    const res = await fetch(API, {
      headers: { "User-Agent": "jonasagra.com.br portfolio (edit counter)" },
      next: { revalidate },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const editcount = data?.query?.users?.[0]?.editcount;
    if (typeof editcount !== "number") throw new Error("editcount ausente");
    return Response.json({ editcount });
  } catch {
    return Response.json({ editcount: null }, { status: 502 });
  }
}
