import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config';
import { UserRole } from '../modules/user/user.interface';
import User from '../modules/user/user.model';
import Shop from '../modules/shop/shop.model';
import { Category } from '../modules/category/category.model';
import { Brand } from '../modules/brand/brand.model';
import { Product } from '../modules/product/product.model';
import { Coupon } from '../modules/coupon/coupon.model';
import { FlashSale } from '../modules/flashSell/flashSale.model';

// ─── Helper ───────────────────────────────────────────────────────────────────
const toSlug = (str: string) =>
   str.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

const clientInfo = {
   device: 'pc' as const,
   browser: 'Seed Script',
   ipAddress: '127.0.0.1',
   pcName: 'localhost',
   os: 'Unknown',
   userAgent: 'Seed Script',
};

// ─── Seed Data ─────────────────────────────────────────────────────────────────

const seedAdmin = async () => {
   const existing = await User.findOne({ role: UserRole.ADMIN });
   if (existing) {
      console.log('  ✓ Admin already exists – skipping');
      return existing;
   }

   const hashedPassword = await bcrypt.hash('admin123', Number(config.bcrypt_salt_rounds));
   const admin = await User.create({
      name: 'Admin',
      email: 'admin@ezmart.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
      hasShop: false,
      clientInfo,
   });
   console.log('  ✓ Admin created:', admin.email);
   return admin;
};

const seedVendorUser = async () => {
   const existing = await User.findOne({ email: 'vendor@ezmart.com' });
   if (existing) {
      console.log('  ✓ Vendor user already exists – skipping');
      return existing;
   }

   const hashedPassword = await bcrypt.hash('vendor123', Number(config.bcrypt_salt_rounds));
   const vendor = await User.create({
      name: 'EzMart Vendor',
      email: 'vendor@ezmart.com',
      password: hashedPassword,
      role: UserRole.USER,
      hasShop: true,
      clientInfo,
   });
   console.log('  ✓ Vendor user created:', vendor.email);
   return vendor;
};

const seedShop = async (vendorId: mongoose.Types.ObjectId) => {
   const existing = await Shop.findOne({ user: vendorId });
   if (existing) {
      console.log('  ✓ Shop already exists – skipping');
      return existing;
   }

   const shop = await Shop.create({
      shopName: 'EzMart Official Store',
      businessLicenseNumber: 'BL-EZMART-2024',
      address: '123 Commerce Street, Dhaka, Bangladesh',
      contactNumber: '+8801700000001',
      website: 'https://ezmart.com',
      user: vendorId,
      servicesOffered: ['Electronics', 'Fashion', 'Home & Kitchen', 'Sports'],
      establishedYear: 2020,
      taxIdentificationNumber: 'TIN-EZMART-2024',
      logo: 'https://placehold.co/200x200/6366f1/white?text=EzMart',
      socialMediaLinks: new Map([
         ['facebook', 'https://facebook.com/ezmart'],
         ['instagram', 'https://instagram.com/ezmart'],
      ]),
   });
   console.log('  ✓ Shop created:', shop.shopName);
   return shop;
};

const seedBrands = async (adminId: mongoose.Types.ObjectId) => {
   const brandsData = [
      { name: 'Samsung', logo: 'https://placehold.co/200x200/1428A0/white?text=Samsung' },
      { name: 'Apple', logo: 'https://placehold.co/200x200/555555/white?text=Apple' },
      { name: 'Sony', logo: 'https://placehold.co/200x200/000000/white?text=Sony' },
      { name: 'Nike', logo: 'https://placehold.co/200x200/111111/white?text=Nike' },
      { name: 'Adidas', logo: 'https://placehold.co/200x200/000000/white?text=Adidas' },
      { name: 'Xiaomi', logo: 'https://placehold.co/200x200/FF6900/white?text=Xiaomi' },
   ];

   const createdBrands: Record<string, mongoose.Types.ObjectId> = {};

   for (const b of brandsData) {
      const existing = await Brand.findOne({ name: b.name });
      if (existing) {
         console.log(`  ✓ Brand "${b.name}" already exists – skipping`);
         createdBrands[b.name] = existing._id as mongoose.Types.ObjectId;
      } else {
         const brand = await Brand.create({ ...b, createdBy: adminId });
         console.log(`  ✓ Brand created: ${brand.name}`);
         createdBrands[brand.name] = brand._id as mongoose.Types.ObjectId;
      }
   }

   return createdBrands;
};

const seedCategories = async (adminId: mongoose.Types.ObjectId) => {
   const categoriesData = [
      {
         name: 'Electronics',
         description: 'Gadgets, devices and electronics',
         icon: '💻',
         slug: 'electronics',
      },
      {
         name: 'Fashion',
         description: 'Clothing, shoes and accessories',
         icon: '👗',
         slug: 'fashion',
      },
      {
         name: 'Home & Kitchen',
         description: 'Furniture, appliances and kitchen tools',
         icon: '🏠',
         slug: 'home-kitchen',
      },
      {
         name: 'Sports & Outdoors',
         description: 'Sportswear, equipment and outdoor gear',
         icon: '⚽',
         slug: 'sports-outdoors',
      },
   ];

   const createdCategories: Record<string, mongoose.Types.ObjectId> = {};

   for (const c of categoriesData) {
      const existing = await Category.findOne({ slug: c.slug });
      if (existing) {
         console.log(`  ✓ Category "${c.name}" already exists – skipping`);
         createdCategories[c.name] = existing._id as mongoose.Types.ObjectId;
      } else {
         const category = await Category.create({ ...c, createdBy: adminId });
         console.log(`  ✓ Category created: ${category.name}`);
         createdCategories[category.name] = category._id as mongoose.Types.ObjectId;
      }
   }

   return createdCategories;
};

const seedProducts = async (
   shopId: mongoose.Types.ObjectId,
   categories: Record<string, mongoose.Types.ObjectId>,
   brands: Record<string, mongoose.Types.ObjectId>
) => {
   const productsData = [
      // Electronics
      {
         name: 'Samsung Galaxy S24 Ultra',
         description: 'Flagship smartphone with 200MP camera, S Pen, and AI-powered features. 12GB RAM, 256GB storage.',
         price: 1199,
         stock: 50,
         weight: 0.23,
         category: categories['Electronics'],
         brand: brands['Samsung'],
         imageUrls: [
            'https://placehold.co/600x600/1428A0/white?text=Galaxy+S24+Ultra',
            'https://placehold.co/600x600/1428A0/white?text=S24+Side',
         ],
         availableColors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet'],
         keyFeatures: ['200MP Camera', 'S Pen Included', 'AI Features', '5000mAh Battery', '45W Fast Charging'],
         specification: { display: '6.8" QHD+ Dynamic AMOLED', processor: 'Snapdragon 8 Gen 3', ram: '12GB', storage: '256GB', os: 'Android 14' },
      },
      {
         name: 'Apple iPhone 15 Pro',
         description: 'Pro-grade titanium iPhone with A17 Pro chip, ProMotion display, and USB-C connectivity.',
         price: 999,
         stock: 40,
         weight: 0.187,
         category: categories['Electronics'],
         brand: brands['Apple'],
         imageUrls: [
            'https://placehold.co/600x600/555555/white?text=iPhone+15+Pro',
         ],
         availableColors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
         keyFeatures: ['A17 Pro Chip', '48MP Camera System', 'Titanium Design', 'USB-C', 'ProMotion 120Hz'],
         specification: { display: '6.1" Super Retina XDR', chip: 'A17 Pro', storage: '256GB', battery: '3274mAh', os: 'iOS 17' },
      },
      {
         name: 'Sony WH-1000XM5 Headphones',
         description: 'Industry-leading noise canceling wireless headphones with 30-hour battery life.',
         price: 349,
         stock: 75,
         weight: 0.25,
         category: categories['Electronics'],
         brand: brands['Sony'],
         imageUrls: [
            'https://placehold.co/600x600/000000/white?text=Sony+WH1000XM5',
         ],
         availableColors: ['Midnight Black', 'Platinum Silver'],
         keyFeatures: ['Industry-leading ANC', '30-hour Battery', 'Multipoint Connection', 'Quick Charge', 'Foldable Design'],
         specification: { type: 'Over-Ear', connectivity: 'Bluetooth 5.2', frequency: '4Hz-40,000Hz', weight: '250g', battery: '30 hours' },
      },
      {
         name: 'Xiaomi Mi 11T Pro',
         description: 'Powerful mid-range smartphone with 108MP camera and 120W HyperCharge technology.',
         price: 549,
         stock: 60,
         weight: 0.204,
         category: categories['Electronics'],
         brand: brands['Xiaomi'],
         imageUrls: [
            'https://placehold.co/600x600/FF6900/white?text=Mi+11T+Pro',
         ],
         availableColors: ['Celestial Blue', 'Meteorite Gray', 'Moonlight White'],
         keyFeatures: ['108MP Camera', '120W HyperCharge', '120Hz AMOLED', 'Snapdragon 888', '5000mAh Battery'],
         specification: { display: '6.67" AMOLED', processor: 'Snapdragon 888', ram: '8GB', storage: '128GB', charging: '120W' },
      },
      // Fashion
      {
         name: 'Nike Air Max 270',
         description: 'Iconic sneaker with the largest Air unit to date for all-day comfort and style.',
         price: 150,
         stock: 120,
         weight: 0.35,
         category: categories['Fashion'],
         brand: brands['Nike'],
         imageUrls: [
            'https://placehold.co/600x600/111111/white?text=Air+Max+270',
         ],
         availableColors: ['Triple Black', 'White Red', 'Blue Fury'],
         keyFeatures: ['Max Air Unit', 'Breathable Mesh', 'Foam Midsole', 'Rubber Outsole'],
         specification: { type: 'Lifestyle Sneaker', closure: 'Lace-Up', sole: 'Rubber', upper: 'Mesh/Synthetic' },
      },
      {
         name: 'Adidas Ultraboost 23',
         description: 'The most responsive running shoe ever, with BOOST midsole and Primeknit+ upper.',
         price: 190,
         stock: 90,
         weight: 0.31,
         category: categories['Fashion'],
         brand: brands['Adidas'],
         imageUrls: [
            'https://placehold.co/600x600/000000/white?text=Ultraboost+23',
         ],
         availableColors: ['Core Black', 'Cloud White', 'Pulse Olive'],
         keyFeatures: ['BOOST Midsole', 'Primeknit+ Upper', 'Continental Rubber', 'Linear Energy Push', 'Torsion System'],
         specification: { type: 'Running Shoe', drop: '10mm', weight: '310g', width: 'Regular', sole: 'Continental Rubber' },
      },
      // Home & Kitchen
      {
         name: 'Samsung Smart Refrigerator 500L',
         description: 'Family Hub smart refrigerator with AI-powered food management and built-in display.',
         price: 1499,
         stock: 20,
         weight: 85,
         category: categories['Home & Kitchen'],
         brand: brands['Samsung'],
         imageUrls: [
            'https://placehold.co/600x600/1428A0/white?text=Samsung+Fridge',
         ],
         availableColors: ['Stainless Steel', 'Black Stainless'],
         keyFeatures: ['Family Hub Display', 'AI-Powered Cooling', 'Twin Cooling Plus', 'FlexZone Drawer', 'Smart Things App'],
         specification: { capacity: '500L', type: 'French Door', energyRating: '5 Star', compressor: 'Digital Inverter', warranty: '10 years' },
      },
      // Sports
      {
         name: 'Adidas Tiro 23 Training Kit',
         description: 'Professional-grade football training kit used by top clubs worldwide.',
         price: 85,
         stock: 200,
         weight: 0.4,
         category: categories['Sports & Outdoors'],
         brand: brands['Adidas'],
         imageUrls: [
            'https://placehold.co/600x600/000000/white?text=Tiro+23+Kit',
         ],
         availableColors: ['Black White', 'Navy Blue', 'Red Black'],
         keyFeatures: ['AEROREADY Technology', 'Slim Fit', 'Recycled Materials', 'Moisture-Wicking', 'UV Protection'],
         specification: { material: '100% Recycled Polyester', fit: 'Slim', occasion: 'Training/Match', care: 'Machine Washable' },
      },
   ];

   let created = 0;
   let skipped = 0;
   for (const p of productsData) {
      const existing = await Product.findOne({ name: p.name });
      if (existing) {
         skipped++;
         continue;
      }
      await Product.create({ ...p, shop: shopId, slug: toSlug(p.name) });
      created++;
   }
   console.log(`  ✓ Products: ${created} created, ${skipped} already existed`);
};

const seedCoupons = async (shopId: mongoose.Types.ObjectId) => {
   const now = new Date();
   const future = new Date(now.getFullYear(), now.getMonth() + 3, 1); // 3 months from now

   const couponsData = [
      {
         code: 'WELCOME10',
         shop: shopId,
         discountType: 'Percentage',
         discountValue: 10,
         minOrderAmount: 50,
         maxDiscountAmount: 30,
         startDate: now,
         endDate: future,
      },
      {
         code: 'FLAT20OFF',
         shop: shopId,
         discountType: 'Flat',
         discountValue: 20,
         minOrderAmount: 100,
         maxDiscountAmount: null,
         startDate: now,
         endDate: future,
      },
      {
         code: 'SUMMER25',
         shop: shopId,
         discountType: 'Percentage',
         discountValue: 25,
         minOrderAmount: 200,
         maxDiscountAmount: 75,
         startDate: now,
         endDate: future,
      },
   ];

   let created = 0;
   let skipped = 0;
   for (const c of couponsData) {
      const existing = await Coupon.findOne({ code: c.code });
      if (existing) { skipped++; continue; }
      await Coupon.create(c);
      created++;
   }
   console.log(`  ✓ Coupons: ${created} created, ${skipped} already existed`);
};

const seedFlashSales = async (adminId: mongoose.Types.ObjectId) => {
   // Pick the first 3 products for flash sales
   const products = await Product.find().limit(3);
   const discounts = [15, 20, 30];

   let created = 0;
   let skipped = 0;
   for (let i = 0; i < products.length; i++) {
      const existing = await FlashSale.findOne({ product: products[i]._id });
      if (existing) { skipped++; continue; }
      await FlashSale.create({
         product: products[i]._id,
         discountPercentage: discounts[i],
         createdBy: adminId,
      });
      created++;
   }
   console.log(`  ✓ Flash Sales: ${created} created, ${skipped} already existed`);
};

// ─── Main ─────────────────────────────────────────────────────────────────────

const seedAll = async () => {
   console.log('\n🌱 Starting database seed...\n');

   try {
      console.log('👤 Seeding users...');
      const admin = await seedAdmin();
      const vendor = await seedVendorUser();

      console.log('\n🏪 Seeding shop...');
      const shop = await seedShop(vendor._id as mongoose.Types.ObjectId);

      console.log('\n🏷️  Seeding brands...');
      const brands = await seedBrands(admin._id as mongoose.Types.ObjectId);

      console.log('\n📂 Seeding categories...');
      const categories = await seedCategories(admin._id as mongoose.Types.ObjectId);

      console.log('\n📦 Seeding products...');
      await seedProducts(shop._id as mongoose.Types.ObjectId, categories, brands);

      console.log('\n🎟️  Seeding coupons...');
      await seedCoupons(shop._id as mongoose.Types.ObjectId);

      console.log('\n⚡ Seeding flash sales...');
      await seedFlashSales(admin._id as mongoose.Types.ObjectId);

      console.log('\n✅ Database seeded successfully!\n');
      console.log('─────────────────────────────────────');
      console.log('🔑 Admin Login:  admin@ezmart.com / admin123');
      console.log('🔑 Vendor Login: vendor@ezmart.com / vendor123');
      console.log('─────────────────────────────────────\n');
   } catch (error) {
      console.error('❌ Error during seeding:', error);
   }
};

export default seedAll;
