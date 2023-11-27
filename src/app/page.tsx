import { sql } from "@vercel/postgres";

export default async function Home() {
  let time = await fetch("http://worldtimeapi.org/api/timezone/Europe/London", {
    next: { revalidate: 5 },
  });
  const data = await time.json();

  const datetime = new Date(data.datetime); // returns an object
  const evenEasierToReadDate = datetime.toLocaleTimeString("en-GB"); // convert into a string

  await sql`INSERT INTO ViewsTable (views) SELECT 0 WHERE NOT EXISTS(SELECT * FROM ViewsTable)`;
  await sql`UPDATE ViewsTable SET views = views + 1`;
  const result = await sql`SELECT views from ViewsTable`;

  return (
    <div>
      <p>Root route</p>
      <p>This has been viewed {result.rows[0].views} times</p>
      <p>The time is: {evenEasierToReadDate}</p>
    </div>
  );
}
