module.exports = () => {
  const data = {
    friends: [],
  }
  for (let i = 0; i < 500; i++) {
    data.friends.push({
      id: i + 1,
      likes: Number((Math.random() * 100).toFixed()),
      name: `Amigo ${i + 1}`
    })
  }
  return data;
}