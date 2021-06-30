// dummy user
const user = {
  _id: '1',
  name: 'Rupak',
  email: 'rupaklama@hotmail.com',
  picture: 'https://cloudinary.com/rl',
};

module.exports = {
  Query: {
    me: () => user,
  },
};
