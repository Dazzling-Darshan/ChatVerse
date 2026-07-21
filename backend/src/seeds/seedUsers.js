import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Load .env from backend root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../../.env") });

import User from "../models/user.model.js";

const seedUsers = [
  {
    clerkId: "user_seed_001",
    email: "alice.johnson@chatverse.dev",
    fullName: "Alice Johnson",
    profilePic: "https://api.dicebear.com/8.x/avataaars/svg?seed=Alice",
  },
  {
    clerkId: "user_seed_002",
    email: "bob.smith@chatverse.dev",
    fullName: "Bob Smith",
    profilePic: "https://api.dicebear.com/8.x/avataaars/svg?seed=Bob",
  },
  {
    clerkId: "user_seed_003",
    email: "carol.white@chatverse.dev",
    fullName: "Carol White",
    profilePic: "https://api.dicebear.com/8.x/avataaars/svg?seed=Carol",
  },
  {
    clerkId: "user_seed_004",
    email: "david.brown@chatverse.dev",
    fullName: "David Brown",
    profilePic: "https://api.dicebear.com/8.x/avataaars/svg?seed=David",
  },
  {
    clerkId: "user_seed_005",
    email: "emma.davis@chatverse.dev",
    fullName: "Emma Davis",
    profilePic: "https://api.dicebear.com/8.x/avataaars/svg?seed=Emma",
  },
  {
    clerkId: "user_seed_006",
    email: "frank.wilson@chatverse.dev",
    fullName: "Frank Wilson",
    profilePic: "https://api.dicebear.com/8.x/avataaars/svg?seed=Frank",
  },
  {
    clerkId: "user_seed_007",
    email: "grace.lee@chatverse.dev",
    fullName: "Grace Lee",
    profilePic: "https://api.dicebear.com/8.x/avataaars/svg?seed=Grace",
  },
  {
    clerkId: "user_seed_008",
    email: "henry.martin@chatverse.dev",
    fullName: "Henry Martin",
    profilePic: "https://api.dicebear.com/8.x/avataaars/svg?seed=Henry",
  },
  {
    clerkId: "user_seed_009",
    email: "isabella.clark@chatverse.dev",
    fullName: "Isabella Clark",
    profilePic: "https://api.dicebear.com/8.x/avataaars/svg?seed=Isabella",
  },
  {
    clerkId: "user_seed_010",
    email: "james.taylor@chatverse.dev",
    fullName: "James Taylor",
    profilePic: "https://api.dicebear.com/8.x/avataaars/svg?seed=James",
  },
];

const run = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error("MONGO_URI not found in .env");

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB:", mongoose.connection.host);

    // Remove any previously seeded users (clerkId starts with "user_seed_")
    const deleted = await User.deleteMany({
      clerkId: { $regex: /^user_seed_/ },
    });
    if (deleted.deletedCount > 0) {
      console.log(`🗑️  Removed ${deleted.deletedCount} previously seeded user(s).`);
    }

    // Insert fresh seed data
    const inserted = await User.insertMany(seedUsers);
    console.log(`\n🌱 Successfully seeded ${inserted.length} users:\n`);
    inserted.forEach((u, i) => {
      console.log(`  ${i + 1}. ${u.fullName} <${u.email}>`);
    });

    console.log("\n✅ Seeding complete!");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
    process.exit(0);
  }
};

run();
