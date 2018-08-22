const Sequelize = require('sequelize');
const connection = new Sequelize(process.env.DATABASE_URL);

const User = connection.define('user', {
  name: {
    type: Sequelize.STRING,
  },
});

const Thing = connection.define('thing', {
  name: {
    type: Sequelize.STRING,
  },
});

const UserThing = connection.define('userthing', {
  userId: {
    type: Sequelize.INTEGER,
  },
  thingId: {
    type: Sequelize.INTEGER,
  },
});

UserThing.belongsTo(User);
User.hasMany(UserThing);
UserThing.belongsTo(Thing);
Thing.hasMany(UserThing);

const seed = async () => {
  const data = {};
  const users = [
    { name: 'moe' },
    { name: 'larry' },
    { name: 'shep' },
    { name: 'joe' },
    { name: 'curly' },
  ];
  const things = [
    { name: 'car' },
    { name: 'game' },
    { name: 'baz' },
    { name: 'foo' },
    { name: 'fax' },
  ];

  data.users = await Promise.all(
    users.map(function(user) {
      return User.create(user);
    })
  );
  data.things = await Promise.all(
    things.map(function(thing) {
      return Thing.create(thing);
    })
  );
  const [moe, larry, shep, joe, curly] = data.users;
  const [car, game, baz, foo, fax] = data.things;
  data.userthings = await Promise.all([
    UserThing.create({ userId: moe.id, thingId: game.id }),
    UserThing.create({ userId: larry.id, thingId: baz.id }),
    UserThing.create({ userId: moe.id, thingId: fax.id }),
    UserThing.create({ userId: larry.id, thingId: car.id }),
    UserThing.create({ userId: joe.id, thingId: foo.id }),
  ]);
  const d = await User.findAll({
    include: [
      {
        model: UserThing,
        include: [Thing],
      },
    ],
  });
  //  console.log(d[0].userthings[0].thing);
};

const sync = async () => {
  await connection.sync({ force: true });
};
module.exports = {
  sync,
  seed,
  connection,
  models: {
    User,
    Thing,
    UserThing,
  },
};
