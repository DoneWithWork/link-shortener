import { sql } from "@vercel/postgres";

export default async function Cart({
  params,
}: {
  params: { user: string };
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from LINKS`;

  return (
    <div>
      {rows.map((row) => (
        <div>{row.name}</div>
      ))}
    </div>
  );
}
