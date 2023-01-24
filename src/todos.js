export default function TodoFactory(title, desc, due, prior, done) {
  return {
    title,
    desc,
    due,
    prior,
    done,
  };
}
