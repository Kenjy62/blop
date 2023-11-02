export function HashtagsExtrator(text) {
  const regex = /#(\w+)/g;
  const hashtags = text.match(regex);

  // Si des hashtags sont trouvés, renvoie-les dans un tableau, sinon renvoie un tableau vide
  return hashtags ? hashtags : [];
}
