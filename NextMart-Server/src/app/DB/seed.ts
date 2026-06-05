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
      logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&auto=format&fit=crop',
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
      {
         name: 'Samsung',
         logo: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&auto=format&fit=crop',
      },
      {
         name: 'Apple',
         logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&auto=format&fit=crop',
      },
      {
         name: 'Sony',
         logo: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&auto=format&fit=crop',
      },
      {
         name: 'Nike',
         logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop',
      },
      {
         name: 'Adidas',
         logo: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&auto=format&fit=crop',
      },
      {
         name: 'Xiaomi',
         logo: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop',
      },
      {
         name: 'Puma',
         logo: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&auto=format&fit=crop',
      },
      {
         name: 'LG',
         logo: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&auto=format&fit=crop',
      },
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
      {
         name: 'Books',
         description: 'Textbooks, novels and educational materials',
         icon: '📚',
         slug: 'books',
      },
      {
         name: 'Health & Beauty',
         description: 'Personal care, wellness and beauty products',
         icon: '💊',
         slug: 'health-beauty',
      },
   ];

   const createdCategories: Record<string, mongoose.Types.ObjectId> = {};

   for (const c of categoriesData) {
      const existing = await Category.findOne({ name: c.name });
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
      // ── Electronics ─────────────────────────────────────────────────────────
      {
         name: 'Samsung Galaxy S24 Ultra',
         description: 'Flagship smartphone with 200MP camera, S Pen, and AI-powered features. 12GB RAM, 256GB storage. The ultimate mobile experience with titanium frame.',
         price: 1199,
         offerPrice: 1099,
         stock: 50,
         weight: 0.23,
         category: categories['Electronics'],
         brand: brands['Samsung'],
         imageUrls: [
            'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet'],
         keyFeatures: ['200MP Camera', 'S Pen Included', 'AI Features', '5000mAh Battery', '45W Fast Charging'],
         specification: { display: '6.8" QHD+ Dynamic AMOLED', processor: 'Snapdragon 8 Gen 3', ram: '12GB', storage: '256GB', os: 'Android 14' },
      },
      {
         name: 'Apple iPhone 15 Pro',
         description: 'Pro-grade titanium iPhone with A17 Pro chip, ProMotion display, and USB-C connectivity. Capture cinematic-quality video and stunning photos.',
         price: 999,
         offerPrice: 949,
         stock: 40,
         weight: 0.187,
         category: categories['Electronics'],
         brand: brands['Apple'],
         imageUrls: [
            'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1574755393849-623942496936?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
         keyFeatures: ['A17 Pro Chip', '48MP Camera System', 'Titanium Design', 'USB-C', 'ProMotion 120Hz'],
         specification: { display: '6.1" Super Retina XDR', chip: 'A17 Pro', storage: '256GB', battery: '3274mAh', os: 'iOS 17' },
      },
      {
         name: 'Sony WH-1000XM5 Headphones',
         description: 'Industry-leading noise canceling wireless headphones with 30-hour battery life and crystal-clear hands-free calling. Premium over-ear comfort.',
         price: 349,
         stock: 75,
         weight: 0.25,
         category: categories['Electronics'],
         brand: brands['Sony'],
         imageUrls: [
            'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Midnight Black', 'Platinum Silver'],
         keyFeatures: ['Industry-leading ANC', '30-hour Battery', 'Multipoint Connection', 'Quick Charge', 'Foldable Design'],
         specification: { type: 'Over-Ear', connectivity: 'Bluetooth 5.2', frequency: '4Hz-40,000Hz', weight: '250g', battery: '30 hours' },
      },
      {
         name: 'Xiaomi Mi 11T Pro',
         description: 'Powerful mid-range smartphone with 108MP camera and 120W HyperCharge technology. Full charge in just 17 minutes.',
         price: 549,
         offerPrice: 489,
         stock: 60,
         weight: 0.204,
         category: categories['Electronics'],
         brand: brands['Xiaomi'],
         imageUrls: [
            'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Celestial Blue', 'Meteorite Gray', 'Moonlight White'],
         keyFeatures: ['108MP Camera', '120W HyperCharge', '120Hz AMOLED', 'Snapdragon 888', '5000mAh Battery'],
         specification: { display: '6.67" AMOLED', processor: 'Snapdragon 888', ram: '8GB', storage: '128GB', charging: '120W' },
      },
      {
         name: 'Sony PlayStation 5',
         description: 'Next-gen gaming console with ultra-fast SSD, ray tracing, and 4K gaming. Experience the future of play.',
         price: 499,
         stock: 25,
         weight: 4.5,
         category: categories['Electronics'],
         brand: brands['Sony'],
         imageUrls: [
            'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&auto=format&fit=crop',
         ],
         availableColors: ['White', 'Midnight Black'],
         keyFeatures: ['4K Gaming', 'Ray Tracing', 'Ultra-fast SSD', 'DualSense Controller', 'Backward Compatible'],
         specification: { cpu: 'AMD Zen 2 8-core', gpu: 'RDNA 2 10.28 TFLOPS', ram: '16GB GDDR6', storage: '825GB SSD', resolution: '4K / 8K' },
      },
      {
         name: 'Apple MacBook Air M2',
         description: 'Completely redesigned MacBook Air with M2 chip, all-day battery, and a stunning Liquid Retina display — thinner than ever.',
         price: 1299,
         offerPrice: 1199,
         stock: 30,
         weight: 1.24,
         category: categories['Electronics'],
         brand: brands['Apple'],
         imageUrls: [
            'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
         keyFeatures: ['Apple M2 Chip', '18-hour Battery', 'Liquid Retina Display', 'MagSafe Charging', 'Fanless Design'],
         specification: { chip: 'Apple M2', ram: '8GB Unified Memory', storage: '256GB SSD', display: '13.6" Liquid Retina', battery: '52.6Wh' },
      },
      {
         name: 'Samsung 65" QLED 4K TV',
         description: 'Quantum dot display with Neo QLED technology, delivering breathtaking color and contrast. Smart TV with Tizen OS.',
         price: 1799,
         offerPrice: 1499,
         stock: 15,
         weight: 25.7,
         category: categories['Electronics'],
         brand: brands['Samsung'],
         imageUrls: [
            'https://picsum.photos/seed/tv1/800/800',
            'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Black'],
         keyFeatures: ['Neo QLED Technology', '4K 120Hz', 'Quantum HDR', 'Smart TV (Tizen)', 'Multiple HDMI 2.1'],
         specification: { size: '65"', resolution: '4K UHD (3840x2160)', hdr: 'Quantum HDR 32x', refreshRate: '120Hz', connectivity: 'Wi-Fi 5, BT 5.2' },
      },
      {
         name: 'LG OLED C3 55" TV',
         description: 'The world\'s best OLED display for gaming and movies. Self-lit pixels, perfect blacks, and a9 AI Processor Gen6.',
         price: 1399,
         offerPrice: 1199,
         stock: 18,
         weight: 17.3,
         category: categories['Electronics'],
         brand: brands['LG'],
         imageUrls: [
            'https://picsum.photos/seed/tv1/800/800',
            'https://images.unsplash.com/photo-1571415060716-baff5f717c09?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Black'],
         keyFeatures: ['OLED evo Panel', 'G-Sync & FreeSync', 'Dolby Vision IQ', 'a9 AI Processor', '4 HDMI 2.1 Ports'],
         specification: { size: '55"', panel: 'OLED evo', resolution: '4K UHD', refreshRate: '120Hz', processor: 'a9 Gen6 AI' },
      },

      // ── Fashion ──────────────────────────────────────────────────────────────
      {
         name: 'Nike Air Max 270',
         description: 'Iconic sneaker with the largest Air unit to date for all-day comfort and style. Breathable mesh upper with a foam midsole.',
         price: 150,
         stock: 120,
         weight: 0.35,
         category: categories['Fashion'],
         brand: brands['Nike'],
         imageUrls: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Triple Black', 'White Red', 'Blue Fury'],
         keyFeatures: ['Max Air Unit', 'Breathable Mesh', 'Foam Midsole', 'Rubber Outsole'],
         specification: { type: 'Lifestyle Sneaker', closure: 'Lace-Up', sole: 'Rubber', upper: 'Mesh/Synthetic' },
      },
      {
         name: 'Adidas Ultraboost 23',
         description: 'The most responsive running shoe ever, with BOOST midsole and Primeknit+ upper. For runners who want the best.',
         price: 190,
         stock: 90,
         weight: 0.31,
         category: categories['Fashion'],
         brand: brands['Adidas'],
         imageUrls: [
            'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Core Black', 'Cloud White', 'Pulse Olive'],
         keyFeatures: ['BOOST Midsole', 'Primeknit+ Upper', 'Continental Rubber', 'Linear Energy Push', 'Torsion System'],
         specification: { type: 'Running Shoe', drop: '10mm', weight: '310g', width: 'Regular', sole: 'Continental Rubber' },
      },
      {
         name: 'Nike Dri-FIT Training T-Shirt',
         description: 'Lightweight and breathable performance t-shirt designed for intense training sessions. Sweat-wicking fabric keeps you dry.',
         price: 35,
         stock: 200,
         weight: 0.15,
         category: categories['Fashion'],
         brand: brands['Nike'],
         imageUrls: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Black', 'White', 'Navy Blue', 'Red'],
         keyFeatures: ['Dri-FIT Technology', 'Sweat-Wicking', 'Anti-Odor', 'Regular Fit', 'Machine Washable'],
         specification: { material: '100% Polyester', fit: 'Regular', care: 'Machine Wash', sleeve: 'Short Sleeve' },
      },
      {
         name: 'Puma RS-X Sneakers',
         description: 'Chunky retro-inspired sneakers with premium leather and textile upper, combining bold design with everyday comfort.',
         price: 110,
         offerPrice: 89,
         stock: 85,
         weight: 0.38,
         category: categories['Fashion'],
         brand: brands['Puma'],
         imageUrls: [
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop',
         ],
         availableColors: ['White Red', 'Black Gold', 'Blue White'],
         keyFeatures: ['RS Cushioning', 'Leather/Textile Upper', 'Rubber Outsole', 'Padded Collar', 'Running System Heritage'],
         specification: { type: 'Lifestyle Sneaker', closure: 'Lace-Up', sole: 'Rubber', upper: 'Leather/Textile' },
      },

      // ── Home & Kitchen ────────────────────────────────────────────────────────
      {
         name: 'Samsung Smart Refrigerator 500L',
         description: 'Family Hub smart refrigerator with AI-powered food management and built-in display. Control your home from the kitchen.',
         price: 1499,
         stock: 20,
         weight: 85,
         category: categories['Home & Kitchen'],
         brand: brands['Samsung'],
         imageUrls: [
            'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Stainless Steel', 'Black Stainless'],
         keyFeatures: ['Family Hub Display', 'AI-Powered Cooling', 'Twin Cooling Plus', 'FlexZone Drawer', 'Smart Things App'],
         specification: { capacity: '500L', type: 'French Door', energyRating: '5 Star', compressor: 'Digital Inverter', warranty: '10 years' },
      },
      {
         name: 'Dyson V15 Detect Vacuum',
         description: 'Laser-illuminated root cyclone technology reveals microscopic dust. HEPA filtration captures allergens. Up to 60 minutes of runtime.',
         price: 749,
         offerPrice: 699,
         stock: 35,
         weight: 3.1,
         category: categories['Home & Kitchen'],
         brand: brands['Sony'],
         imageUrls: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Yellow Nickel', 'Copper Nickel'],
         keyFeatures: ['Laser Detect Technology', 'HEPA Filtration', '60-min Battery', 'LCD Screen', '7 Attachments'],
         specification: { suction: '230 AW', filtration: 'Advanced HEPA', bin: '0.76L', runtime: '60 minutes', weight: '3.1kg' },
      },
      {
         name: 'Instant Pot Duo 7-in-1',
         description: 'The #1 selling multi-cooker — pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker & warmer all in one.',
         price: 99,
         offerPrice: 79,
         stock: 150,
         weight: 5.4,
         category: categories['Home & Kitchen'],
         brand: brands['LG'],
         imageUrls: [
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Stainless Steel'],
         keyFeatures: ['7-in-1 Multi-Cooker', '14 Smart Programs', 'Safety Certified', '6-Qt Capacity', 'Delay Start'],
         specification: { capacity: '6 Qt', wattage: '1000W', programs: '14 One-Touch', material: 'Stainless Steel', warranty: '1 year' },
      },

      // ── Sports & Outdoors ─────────────────────────────────────────────────────
      {
         name: 'Adidas Tiro 23 Training Kit',
         description: 'Professional-grade football training kit used by top clubs worldwide. AEROREADY technology manages moisture so you stay dry.',
         price: 85,
         stock: 200,
         weight: 0.4,
         category: categories['Sports & Outdoors'],
         brand: brands['Adidas'],
         imageUrls: [
            'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Black White', 'Navy Blue', 'Red Black'],
         keyFeatures: ['AEROREADY Technology', 'Slim Fit', 'Recycled Materials', 'Moisture-Wicking', 'UV Protection'],
         specification: { material: '100% Recycled Polyester', fit: 'Slim', occasion: 'Training/Match', care: 'Machine Washable' },
      },
      {
         name: 'Nike Premier League Football',
         description: 'Official match ball of the Premier League, featuring ACC technology for consistent performance in all weather conditions.',
         price: 160,
         offerPrice: 139,
         stock: 100,
         weight: 0.45,
         category: categories['Sports & Outdoors'],
         brand: brands['Nike'],
         imageUrls: [
            'https://picsum.photos/seed/football1/800/800',
            'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop',
         ],
         availableColors: ['White Black', 'Crimson', 'Blue Yellow'],
         keyFeatures: ['ACC Technology', 'Premier League Official', 'All-Weather', 'Match Quality', 'Nike Aerow Trac Grooves'],
         specification: { size: 'Size 5', material: 'Polyurethane', panels: '12 panels', inflation: '0.6-0.8 bar', weight: '410-450g' },
      },
      {
         name: 'Garmin Forerunner 955 GPS Watch',
         description: 'Multisport GPS smartwatch with up to 15 days of battery, built-in maps, training load focus, and race predictor.',
         price: 499,
         offerPrice: 429,
         stock: 45,
         weight: 0.053,
         category: categories['Sports & Outdoors'],
         brand: brands['Sony'],
         imageUrls: [
            'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Black', 'Solar Gray', 'Whitestone'],
         keyFeatures: ['15-day Battery', 'Multi-band GPS', 'Built-in Maps', 'Training Load', 'Triathlon Mode'],
         specification: { battery: '15 days smartwatch / 49hrs GPS', waterproof: '5 ATM', display: '1.3" MIP', weight: '53g', connectivity: 'Bluetooth, Wi-Fi, ANT+' },
      },
      {
         name: 'Puma Football Goalkeeper Gloves',
         description: 'Professional goalkeeper gloves with latex contact zones for maximum grip and negative cut for a snug glove fit.',
         price: 55,
         stock: 80,
         weight: 0.25,
         category: categories['Sports & Outdoors'],
         brand: brands['Puma'],
         imageUrls: [
            'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop',
         ],
         availableColors: ['Yellow Black', 'Blue White', 'Red Black'],
         keyFeatures: ['Latex Contact Zones', 'Negative Cut', 'Wrist Strap', 'Finger Protection Spines', 'Match & Training Ready'],
         specification: { material: 'Latex Palm', cut: 'Negative Cut', sizes: '6-11', occasion: 'Match/Training', care: 'Hand Wash' },
      },
   ];

   let created = 0;
   let updated = 0;
   for (const p of productsData) {
      const existing = await Product.findOne({ name: p.name });
      if (existing) {
         // Force update the images so the broken Unsplash URLs are overwritten
         await Product.updateOne({ name: p.name }, { $set: { imageUrls: p.imageUrls } });
         updated++;
         continue;
      }
      await Product.create({ ...p, shop: shopId, slug: toSlug(p.name) });
      created++;
   }
   console.log(`  ✓ Products: ${created} created, ${updated} updated with fresh images`);
};

const seedCoupons = async (shopId: mongoose.Types.ObjectId) => {
   const now = new Date();
   const future = new Date(now.getFullYear(), now.getMonth() + 3, 1);

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
      {
         code: 'SPORT15',
         shop: shopId,
         discountType: 'Percentage',
         discountValue: 15,
         minOrderAmount: 80,
         maxDiscountAmount: 50,
         startDate: now,
         endDate: future,
      },
      {
         code: 'TECH50',
         shop: shopId,
         discountType: 'Flat',
         discountValue: 50,
         minOrderAmount: 500,
         maxDiscountAmount: null,
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
   // Pick first 6 products for flash sales
   const products = await Product.find().limit(6);
   const discounts = [15, 20, 30, 10, 25, 18];

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
