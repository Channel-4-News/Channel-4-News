const { db } = require('./db');
const {
  models: { WishListItem, WishList },
} = require('./models/associations');
const { Chore } = require('./models/Chore');
const Family = require('./models/Family');
const { Transaction } = require('./models/Transaction');
const User = require('./models/User');
const Allowance = require('./models/Allowance');

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
        imgUrl:
          'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
      },
      {
        username: 'hugohugo',
        email: 'hugo@test.com',
        password: 'password123',
        firstName: 'Hugo',
        lastName: 'Sanchez',
        status: 'Parent',
        imgUrl:
          'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
      },
      {
        username: 'aviandamien',
        email: 'damien@test.com',
        password: 'password123',
        firstName: 'Damien',
        lastName: 'Outar',
        status: 'Parent',
        imgUrl:
          'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
      },
      // {
      //   username: 'littlejoe',
      //   email: 'joe@test.com',
      //   password: 'password123',
      //   firstName: 'Joe',
      //   lastName: 'Kid',
      // },
      // {
      //   username: 'funnyfrancis',
      //   email: 'franny@test.com',
      //   password: 'password123',
      //   firstName: 'Francis',
      //   lastName: 'Haha',
      // },
      // {
      //   username: 'angryarchie',
      //   email: 'archie@test.com',
      //   password: 'password123',
      //   firstName: 'Archie',
      //   lastName: 'Ismadder',
      // },
      {
        username: 'tiredtalia',
        email: 'talia@test.com',
        password: 'password123',
        firstName: 'Talia',
        lastName: 'Asleep',
        imgUrl:
          'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
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

    const myFam = await Family.create({
      name: 'Bird',
      familySecret: 'password123',
    });

    const kid1 = await User.create({
      username: 'littlejoe',
      email: 'joe@test.com',
      password: 'password123',
      firstName: 'Joe',
      lastName: 'Kid',
      imgUrl:
        'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
      familyId: myFam.id,
    });

    const kid2 = await User.create({
      username: 'funnyfrancis',
      email: 'franny@test.com',
      password: 'password123',
      firstName: 'Francis',
      lastName: 'Haha',
      imgUrl:
        'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
      familyId: myFam.id,
    });

    const kid3 = await User.create({
      username: 'angryarchie',
      email: 'archie@test.com',
      password: 'password123',
      firstName: 'Archie',
      lastName: 'Ismadder',
      imgUrl:
        'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
      familyId: myFam.id,
    });

    const parent1 = await User.create({
      username: 'mamama',
      email: 'mom@test.com',
      password: 'password123',
      firstName: 'Mommie',
      lastName: 'Momster',
      imgUrl:
        'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
      familyId: myFam.id,
      status: 'Parent',
    });

    Chore.create({
      name: 'Water plants.',
      description: 'Water the plants in the living room and kitchen.',
      amount: 5,
      isRecurring: true,
      recurringInterval: 7,
      icon: '/public/images/choreIcons/watering-plants.png',
      familyId: myFam.id,
      userId: kid1.id,
      isComplete: true,
    });
    Chore.create({
      name: 'Fold clothes.',
      description: 'Take clothes out of dryer and fold.',
      amount: 3,
      isRecurring: false,
      due: '2022-01-20',
      icon: '/public/images/choreIcons/clean-clothes-2.png',
      familyId: myFam.id,
      userId: kid1.id,
      isComplete: true,
    });
    Chore.create({
      name: 'Empty dishwasher.',
      description: 'Empty dishwasher before dinner.',
      amount: 5,
      isRecurring: true,
      recurringInterval: 3,
      icon: '/public/images/choreIcons/dish-2.png',
      familyId: myFam.id,
      userId: kid1.id,
    });
    Chore.create({
      name: 'Feed dog.',
      description: 'Load dog bowl and water bowl before you leave to school.',
      amount: 2,
      isRecurring: true,
      recurringInterval: 1,
      icon: '/public/images/choreIcons/pets-2.png',
      familyId: myFam.id,
      userId: kid1.id,
    });
    Chore.create({
      name: 'Clean kitty litter.',
      description: 'Clean litter box into garbage.',
      amount: 4,
      isRecurring: true,
      recurringInterval: 5,
      icon: '/public/images/choreIcons/pets-2.png',
      familyId: myFam.id,
      userId: kid2.id,
      isComplete: true,
    });
    Chore.create({
      name: 'Make bed.',
      description:
        'Make bed every morning before you leave to school. Weekends not included.',
      amount: 7,
      isRecurring: true,
      recurringInterval: 7,
      icon: '/public/images/choreIcons/beds.png',
      familyId: myFam.id,
      userId: kid2.id,
      isComplete: true,
    });
    Chore.create({
      name: 'Wash car.',
      description:
        'Help mom wash the car on saturday. You are in charge of the hose. Do not spray mom!!',
      amount: 5,
      isRecurring: false,
      due: '2020-10-08',
      icon: '/public/images/choreIcons/car.png',
      familyId: myFam.id,
      userId: kid2.id,
    });
    Chore.create({
      name: 'Make a snack for your baby sister.',
      description: 'Help prepare guacomole for Lucy on Thursday after school.',
      amount: 2,
      isRecurring: false,
      due: '2020-05-03',
      icon: '/public/images/choreIcons/babysitter.png',
      familyId: myFam.id,
      userId: kid2.id,
      isComplete: true,
    });
    Chore.create({
      name: 'Brainstorm ideas for family movie night.',
      description:
        'Help to think of a movie to watch for family night that everyone will enjoy.',
      amount: 2,
      isRecurring: false,
      due: '2022-08-16',
      familyId: myFam.id,
      userId: kid2.id,
    });
    Chore.create({
      name: 'Take out trash.',
      description:
        'When the bins are full, take trash to the trash cans in the garage.',
      amount: 2,
      isRecurring: true,
      recurringInterval: 3,
      familyId: myFam.id,
      userId: kid3.id,
      icon: '/public/images/choreIcons/delete.png',
    });
    Chore.create({
      name: 'Wash windows.',
      description: 'Wash the windows in your room. Dad will help.',
      amount: 2,
      isRecurring: false,
      due: '2022-09-11',
      icon: '/public/images/choreIcons/window-cleaning.png',
      familyId: myFam.id,
      userId: kid3.id,
    });
    Chore.create({
      name: 'Cook dinner.',
      description: 'Help mom prepare the marinade for the salmon.',
      amount: 3,
      isRecurring: false,
      due: '2020-06-13',
      icon: '/public/images/choreIcons/soup.png',
      familyId: myFam.id,
      userId: kid3.id,
    });
    Chore.create({
      name: 'Wash clothes.',
      description:
        'Load clothes into washing machine and start cycle. Ask dad if you need help.',
      amount: 3,
      isRecurring: false,
      due: '2022-07-01',
      icon: '/public/images/choreIcons/clean-clothes-2.png',
      familyId: myFam.id,
      userId: kid3.id,
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
        userId: kid1.id,
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
        userId: kid1.id,
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
        userId: kid1.id,
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
        userId: kid1.id,
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
        userId: kid1.id,
      },
    ];
    await Promise.all(
      wishListItems.map((item) => {
        WishListItem.create(item);
      })
    );
    const transactions = [
      { cost: 299.99, category: 'Electronics', userId: kid1.id },
      { cost: 25.0, category: 'Clothing', userId: kid1.id },
      { cost: 15.5, category: 'Entertainment', userId: kid1.id },
      { cost: 68.99, category: 'Toys', userId: kid1.id },
      { cost: 20, category: 'Miscellaneous', userId: kid1.id },
      { cost: 114.87, category: 'Food', userId: kid1.id },
    ];

    await Promise.all(
      transactions.map(async (transaction) => {
        await Transaction.create(transaction);
      })
    );

    // await Allowance.create()
  } catch (err) {
    console.log(err);
  }
};

module.exports = syncAndSeed;
