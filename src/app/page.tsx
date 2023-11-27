import { sql } from "@vercel/postgres";

export default async function Home() {
  await sql`INSERT INTO ViewsTable (views) SELECT 0 WHERE NOT EXISTS(SELECT * FROM ViewsTable)`;
  await sql`UPDATE ViewsTable SET views = views + 1`;
  const result = await sql`SELECT views from ViewsTable`;

  console.log(result);

  return (
    <div>
      <p>Root route</p>
      <p>This has been viewed {result.rows[0].views} times</p>
    </div>
  );
}
