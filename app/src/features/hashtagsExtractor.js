export function HashtagsExtrator(text) {
  return new Promise((resolve) => {
    const regex = /#(\w+)/g;
    const hashtags = text.match(regex);

    // Si des hashtags sont trouvés, renvoie-les dans un tableau, sinon renvoie un tableau vide
    resolve(hashtags ? hashtags : []);
  });
}
