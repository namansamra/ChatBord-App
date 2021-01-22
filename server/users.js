const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const exist = users.find((user) => user.name === name && user.room === room);
  if (exist) {
    return { err: "username already exist" };
  }
  const user = { id, name, room };
  users.push(user);
  return { user: user };
};

const removeUser = (id) => {
  const idx = users.find((user) => user.id == id);
  if (idx !== -1) {
   return users.splice(idx, 1)[0];
  } else {
    return { err: "user doesn't not exist" };
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
