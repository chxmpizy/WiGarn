import { db } from './db';
import { restaurantsTable, review, usersTable } from './schema'; // 💡 อย่าลืม import ตาราง users และ reviews เพิ่มเข้ามานะครับ
import { faker } from '@faker-js/faker';
import { InferInsertModel } from 'drizzle-orm';

type NewRestaurant = InferInsertModel<typeof restaurantsTable>;
type NewUser = InferInsertModel<typeof usersTable>;
type NewReview = InferInsertModel<typeof review>;

const cities = [
  'Bangkok',
  'Nonthaburi',
  'Pathum Thani',
  'Chiang Mai',
  'Chiang Rai',
  'Phuket',
  'Pattaya',
  'Khon Kaen',
  'Nakhon Ratchasima',
  'Hat Yai',
  'Udon Thani',
  'Ayutthaya',
  'Nakhon Pathom',
  'Surat Thani',
  'Hua Hin',
  'Rayong',
  'Lampang',
  'Nakhon Si Thammarat',
  'Krabi',
  'Samut Prakan',
];

const categories = [
  'Thai Food',
  'Japanese Sushi',
  'Japanese Ramen',
  'Premium Steak',
  'Cafe & Dessert',
  'Italian Pizza',
  'Italian Pasta',
  'Chinese Restaurant',
  'Seafood',
  'Korean BBQ',
  'Hot Pot',
  'Burger & Fast Food',
  'Healthy Food',
  'Vegetarian',
  'Bakery',
  'Brunch Cafe',
  'Fine Dining',
  'Buffet',
  'Street Food',
  'Fusion Food',
];

const positiveComments = [
  'อร่อยมากครับ วัตถุดิบพรีเมียมสมราคา',
  'บรรยากาศดี บริการประทับใจ แนะนำเลยครับร้านนี้',
  'รสชาติดีมาก มาซ้ำรอบที่สามแล้ว',
  'ของสดมาก สะอาด สะดวก มีที่จอดรถ',
  'เมนูหลากหลาย เหมาะกับการพาครอบครัวมาทาน',
  'พนักงานดูแลดีมาก เติมน้ำตลอด',
  'ร้านตกแต่งสวย ถ่ายรูปออกมาสวยทุกมุม',
  'อาหารออกไว รอไม่นาน',
  'คุ้มค่ากับราคาที่จ่าย',
  'วัตถุดิบสดใหม่ รสชาติได้มาตรฐาน',
  'ประทับใจตั้งแต่เข้าร้านจนกลับบ้าน',
  'เครื่องดื่มและของหวานอร่อยมาก',
  'เป็นร้านประจำไปแล้วครับ',
  'เหมาะกับการนัดเพื่อนหรือประชุมงาน',
  'เมนูซิกเนเจอร์อร่อยกว่าที่คาดไว้มาก',
  'บรรยากาศเงียบสงบ เหมาะกับการพักผ่อน',
  'พนักงานแนะนำเมนูได้ดี',
  'อาหารรสชาติจัดจ้านถูกปาก',
  'คุณภาพเกินราคา แนะนำให้ลอง',
  'สะอาดและจัดการร้านได้ดีมาก',
];
const negativeComments = [
  'รสชาติกลางๆ พอทานได้ แต่รอนานไปหน่อย',
  'ราคาแอบแรงเมื่อเทียบกับปริมาณ',
  'พนักงานบริการช้าไปนิดนึงครับ วันที่ไปคนเยอะ',
  'อาหารออกช้ามาก รอเกือบชั่วโมง',
  'วัตถุดิบบางอย่างไม่สดเท่าที่คาดหวัง',
  'รสชาติไม่คงที่ รอบนี้ไม่เหมือนครั้งก่อน',
  'โต๊ะและพื้นที่นั่งค่อนข้างแคบ',
  'สั่งอาหารผิดหลายรายการ',
  'เครื่องดื่มหวานเกินไป',
  'คุณภาพไม่สมกับราคาที่จ่าย',
  'ที่จอดรถหายากมาก',
  'พนักงานดูไม่ค่อยใส่ใจลูกค้า',
  'อาหารมาไม่ครบ ต้องตามหลายรอบ',
  'ร้านเสียงดังจนคุยกันลำบาก',
  'ผิดหวังกับเมนูที่เป็นจุดขายของร้าน',
];

async function main() {
  try {
    // 🧼 1. ล้างข้อมูลเก่าตามลำดับโครงสร้าง (ลบตารางลูกก่อนเสมอ)
    console.log('🧹 กำลังเคลียร์ข้อมูลเก่าออกจากตาราง...');
    await db.delete(review);
    await db.delete(restaurantsTable);
    await db.delete(usersTable);

    console.log('👤 กำลังสร้างข้อมูล Users จำลอง...');
    const mockUsers: NewUser[] = [];

    const foodPreferences = [
      'สายกินจุ',
      'ชอบคาเฟ่มินิมอล',
      'หลงรักชาบู',
      'รีวิวตามจริง',
      'เน้น street food อร่อยๆ',
    ];
    const randomPrefix = faker.helpers.arrayElement(foodPreferences);

    for (let i = 0; i < 20; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      mockUsers.push({
        uuid: faker.string.uuid(),
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        name: `${firstName} ${lastName}`,
        image_url: faker.image.avatar(), // สุ่มลิ้งค์รูป Avatar ของผู้ใช้
        emailVerifiedAt: faker.date.past(),
        handle: faker.internet.username({ firstName, lastName }).toLowerCase(),
        bio: `${randomPrefix} ✨ | ${faker.lorem.sentence({ min: 2, max: 4 })}`,
        location: `${faker.location.city()}, Thailand`,
        passwordHash: '',
      });
    }

    // บันทึก Users เข้าตาราง และคว้าค่า UUID ทั้งหมดกลับมาเก็บไว้ในความจำ
    const insertedUsers = await db
      .insert(usersTable)
      .values(mockUsers)
      .returning({ uuid: usersTable.uuid });

    // ==========================================
    // 🍽️ STEP 3: สุ่มสร้างข้อมูล RESTAURANTS (โค้ดเดิมของคุณ)
    // ==========================================
    console.log('⏳ เริ่มทำการ Seeding ข้อมูลร้านอาหาร...');
    const mockRestaurants: NewRestaurant[] = [];

    for (let i = 0; i < 50; i++) {
      const selectedCity = faker.helpers.arrayElement(cities);
      const cuisine = faker.helpers.arrayElement(categories);

      mockRestaurants.push({
        name: faker.company.name() + ' ' + cuisine,
        description: `Delicious ${cuisine} restaurant located in the heart of ${selectedCity}. Open daily with premium ingredients.`,
        address: faker.location.streetAddress(),
        city: selectedCity,
        state: selectedCity,
        postal_code: faker.location.zipCode('10###'),
        country: 'Thailand',
        category: cuisine,
        phone: faker.helpers.fromRegExp(/0[2,6,8,9]-\d{3}-\d{4}/),
        website: faker.internet.url(),
        image_url:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
      });
    }

    // บันทึกร้านอาหารเข้าตาราง และดึง ID ของร้านกลับมาผูกรีวิว
    const insertedRestaurants = await db
      .insert(restaurantsTable)
      .values(mockRestaurants)
      .returning({ id: restaurantsTable.id });

    // ==========================================
    // 💬 STEP 4: สุ่มสร้าง REVIEWS ผูกข้อมูลสองฝั่งเข้าด้วยกัน
    // ==========================================
    console.log('💬 กำลังสร้างข้อมูลรีวิวจากกลุ่มผู้ใช้จำลอง...');
    const mockReviews: NewReview[] = [];

    for (const rest of insertedRestaurants) {
      // สุ่มว่าแต่ละร้านจะมีคนมารีวิวกี่คน (เช่น 2 - 5 รีวิว)
      const reviewCount = faker.number.int({ min: 1, max: 5 });

      for (let j = 0; j < reviewCount; j++) {
        const rating = faker.number.int({ min: 1, max: 5 });
        const commentPool = rating >= 4 ? positiveComments : negativeComments;

        // 🎯 สุ่มดึงสุ่มหยิบ User 1 คนมาจากอาร์เรย์ insertedUsers ที่เราบันทึกไว้ในข้อ 2
        const randomUser = faker.helpers.arrayElement(insertedUsers) as {
          uuid: string;
        };

        mockReviews.push({
          rest_id: rest.id, // ผูกไอดีร้านอาหารแม่
          user_id: randomUser.uuid, // ⚡ สุ่มเอา UUID ของ User จริงๆ ใน DB มาสวมรอยรีวิว
          rating: rating,
          review_des: faker.helpers.arrayElement(commentPool),
        });
      }
    }

    // บันทึกรีวิวทั้งหมดลงตาราง
    await db.insert(review).values(mockReviews);

    console.log(`✅ Seeding สำเร็จภาพรวมทั้งหมด!`);
    console.log(`- สร้าง Users จำลอง: ${insertedUsers.length} รายการ`);
    console.log(`- สร้าง ร้านอาหาร: ${insertedRestaurants.length} ร้าน`);
    console.log(
      `- สร้าง รีวิวสุ่มผูกโครงสร้างระบบ: ${mockReviews.length} รายการ`,
    );
  } catch (error) {
    console.error('❌ Seeding ล้มเหลว:', error);
  } finally {
    process.exit(0);
  }
}

main();
