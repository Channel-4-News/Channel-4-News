const { db } = require('./db');
const {
  models: { WishListItem, WishList },
} = require('./models/associations');
const Family = require('./models/Family');
const User = require('./models/User');

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });

    const users = [
      {
        username: 'verykeri',
        email: 'keri@test.com',
        password: 'password123',
        firstName: 'Keri',
        lastName: 'Weiss',
        status: 'Parent',
      },
      {
        username: 'hugohugo',
        email: 'hugo@test.com',
        password: 'password123',
        firstName: 'Hugo',
        lastName: 'Sanchez',
        status: 'Parent',
      },
      {
        username: 'aviandamien',
        email: 'damien@test.com',
        password: 'password123',
        firstName: 'Damien',
        lastName: 'Outar',
        status: 'Parent',
      },
      {
        username: 'funnyfrancis',
        email: 'franny@test.com',
        password: 'password123',
        firstName: 'Francis',
        lastName: 'Haha',
      },
      {
        username: 'angryarchie',
        email: 'archie@test.com',
        password: 'password123',
        firstName: 'Archie',
        lastName: 'Ismadder',
      },
      {
        username: 'tiredtalia',
        email: 'talia@test.com',
        password: 'password123',
        firstName: 'Talia',
        lastName: 'Asleep',
      },
    ];
    await Promise.all(
      users.map((user) => {
        User.create(user);
      })
    );

    const families = [
      {
        name: 'Birdie',
        familySecret: 'password123',
      },
      {
        name: 'The Jacksons',
        familySecret: 'password123',
      },
      {
        name: 'Harris',
        familySecret: 'password123',
      },
      {
        name: 'Zimmerman',
        familySecret: 'password123',
      },
      {
        name: 'Frankenstein',
        familySecret: 'password123',
      },
      {
        name: 'The Oswaldos',
        familySecret: 'password123',
      },
      {
        name: 'Weiss',
        familySecret: 'password123',
      },
      {
        name: 'Sanchez',
        familySecret: 'password123',
      },
      {
        name: 'Outar',
        familySecret: 'password123',
      },
    ];
    await Promise.all(
      families.map((family) => {
        Family.create(family);
      })
    );

    // Anna's testing family
    const myFamily = await Family.create({
      name: 'Litovskaya',
      familySecret: 'password123',
    });
    const myUser = await User.create({
      username: 'annabanana',
      email: 'anna@test.com',
      password: 'password123',
      firstName: 'Anna',
      lastName: 'Litovskaya',
      status: 'Parent',
      familyId: myFamily.id,
    });
    const myChild = await User.create({
      username: 'littlejoe',
      email: 'joe@test.com',
      password: 'password123',
      firstName: 'Joe',
      lastName: 'Kid',
      familyId: myFamily.id,
    });

    const wishListItems = [
      {
        itemName: 'Nintendo Switch',
        description:
          'The Nintendo Switch system transforms from home console to handheld, letting you play your favorite games at home or on the go.',
        imgUrl:
          'https://assets.nintendo.com/image/upload/b_white,c_pad,f_auto,h_382,q_auto,w_573/ncom/en_US/hardware/switch/nintendo-switch-new-package/gallery/image01?v=2021052212',
        cost: 365.0,
        linkUrl:
          'https://www.walmart.com/ip/Nintendo-Switch-Console-with-Neon-Blue-Red-Joy-Con/709776123',
        category: 'Electronics',
        userId: myChild.id,
      },
      {
        itemName: 'Mongoose bike',
        description:
          'The Mongoose Excursion mountain bike was built for big adventures. It comes complete with a steel mountain bike frame and a front suspension fork that are perfect for rugged trail rides. The 21-speed twist shifters make it easy to adapt to your terrain, while the front disc brake and rear V-brake deliver crisp, controlled stops. Go out and conquer the trails with the Excursion by Mongoose.',
        imgUrl:
          'https://images.mountainbikeq.com/excursion-boys-mountain-bike-24-inch-wheel.jpg',
        cost: 165.0,
        linkUrl:
          'https://www.walmart.com/ip/Mongoose-Excursion-Mountain-Bike-24-inch-wheel-21-speeds-black-yellow/567158280',
        category: 'Miscellaneous',
        userId: myChild.id,
      },
      {
        itemName: 'JBL wireless headphones',
        description:
          'These JBL Headphones really rock! They sound fantastic, they look great and they feel very comfortable',
        imgUrl:
          'https://m.media-amazon.com/images/I/61q2zYSX7DL._AC_SS450_.jpg',
        cost: 50.0,
        linkUrl:
          'https://www.walmart.com/ip/JBL-T500BT-On-Ear-Wireless-Bluetooth-Headphone-Black/324029525',
        category: 'Electronics',
        userId: myChild.id,
      },
      {
        itemName: 'Insignia Mini Fridge',
        description:
          'Keep snacks and drinks at the ready with this 2.6 cu. ft. Insignia compact refrigerator. The adjustable thermostat ensures an ideal temperature, and the flat back fits flush with your wall to make the most of tight spaces. This Insignia compact refrigerator has three shelves, in addition to can and bottle storage in the door.',
        imgUrl:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6145/6145102_sd.jpg;maxHeight=640;maxWidth=550',
        cost: 120.0,
        linkUrl:
          'https://www.bestbuy.com/site/insignia-2-6-cu-ft-mini-fridge-black/6145102.p?skuId=6145102',
        category: 'Miscellaneous',
        userId: myChild.id,
      },
      {
        itemName: 'Gucci web slide sandal',
        description:
          'Gucci products are made with carefully selected materials. Please handle with care for longer product life.',
        imgUrl:
          'https://media.gucci.com/style/Transparent_Center_0_0_500x340/1459776608/429469_GIB10_9079_001_100_0000_Light.png',
        cost: 300.0,
        linkUrl:
          'https://www.gucci.com/us/en/pr/men/shoes-for-men/slides-sandals/web-slide-sandal-p-429469GIB109079?gclid=Cj0KCQjw16KFBhCgARIsALB0g8JepxFx4-E3Sz7VhlOU8JpTPQjIyOThMUK8zV4VpWzR74aqaQZe1RcaAspLEALw_wcB',
        category: 'Clothing',
        userId: myChild.id,
      },
    ];
    await Promise.all(
      wishListItems.map((item) => {
        WishListItem.create(item);
      })
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = syncAndSeed;
