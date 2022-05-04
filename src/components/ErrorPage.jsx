export default function ErrorPage({ error }) {
  return (
    <main>
      <h3>{`${error.status}: ${error.msg}`}</h3>
    </main>
  );
}
