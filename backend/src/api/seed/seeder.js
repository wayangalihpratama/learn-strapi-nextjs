const fs = require("fs");
const path = require("path");
const seedData = require("./data.json");

async function uploadFile(strapi, filePath) {
  const fileName = path.basename(filePath);
  const stats = fs.statSync(filePath);

  const [uploadedFile] = await strapi.plugins.upload.services.upload.upload({
    data: {},
    files: {
      filepath: filePath,
      originalFilename: fileName,
      mimetype: "image/png", // Assuming PNG based on extension
      size: stats.size,
    },
  });

  return uploadedFile;
}

async function seed(strapi) {
  console.log("🚀 Starting Batuan Village content seeding...");

  const assetsDir = path.join(__dirname, "assets");

  // 2. Seed Attractions
  console.log("🏗️ Seeding Attractions...");
  const attractionCount = await strapi
    .documents("api::attraction.attraction")
    .count();
  if (attractionCount === 0) {
    for (const data of seedData.attractions) {
      const { imageFile, ...rest } = data;
      let images = [];

      if (imageFile) {
        const imgPath = path.join(assetsDir, imageFile);
        if (fs.existsSync(imgPath)) {
          const uploaded = await uploadFile(strapi, imgPath);
          images = [uploaded.id];
        }
      }

      await strapi.documents("api::attraction.attraction").create({
        data: { ...rest, images, status: "published" },
      });
    }
  } else {
    console.log("ℹ️ Attractions already exist. Skipping.");
  }

  // 3. Seed Market Pieces
  console.log("🎨 Seeding Market Pieces...");
  const marketPiecesCount = await strapi
    .documents("api::market-piece.market-piece")
    .count();
  if (marketPiecesCount === 0) {
    for (const data of seedData.marketPieces) {
      const { imageFile, ...rest } = data;
      let images = [];

      if (imageFile) {
        const imgPath = path.join(assetsDir, imageFile);
        if (fs.existsSync(imgPath)) {
          const uploaded = await uploadFile(strapi, imgPath);
          images = [uploaded.id];
        }
      }

      await strapi.documents("api::market-piece.market-piece").create({
        data: { ...rest, images, status: "published" },
      });
    }
  } else {
    console.log("ℹ️ Market Pieces already exist. Skipping.");
  }

  // 4. Seed Articles
  console.log("📚 Seeding Articles...");
  const articlesCount = await strapi.documents("api::article.article").count();
  if (articlesCount === 0) {
    for (const data of seedData.articles) {
      const { imageFile, ...rest } = data;
      let banner = null;

      if (imageFile) {
        const imgPath = path.join(assetsDir, imageFile);
        if (fs.existsSync(imgPath)) {
          const uploaded = await uploadFile(strapi, imgPath);
          banner = uploaded.id;
        }
      }

      await strapi.documents("api::article.article").create({
        data: { ...rest, banner, status: "published" },
      });
    }
  } else {
    console.log("ℹ️ Articles already exist. Skipping.");
  }

  // 5. Seed Global Settings
  console.log("🌍 Seeding Global Settings...");
  const globalCount = await strapi.documents("api::global.global").count();
  if (globalCount === 0) {
    const { imageFile, ...rest } = seedData.global;
    let logo = null;
    if (imageFile) {
      const imgPath = path.join(assetsDir, imageFile);
      if (fs.existsSync(imgPath)) {
        const uploaded = await uploadFile(strapi, imgPath);
        logo = uploaded.id;
      }
    }
    await strapi.documents("api::global.global").create({
      data: { ...rest, logo, status: "published" },
    });
  }

  // Double check publication for Global in v5 (ensure it's published if it was draft)
  const globalDoc = await strapi.documents("api::global.global").findFirst();
  if (globalDoc && !globalDoc.publishedAt) {
    console.log("📢 Publishing Global Settings...");
    await strapi.documents("api::global.global").publish({
      documentId: globalDoc.documentId,
    });
  }

  // 6. Seed Homepage
  console.log("🏠 Seeding Homepage...");
  const homepageCount = await strapi
    .documents("api::homepage.homepage")
    .count();
  if (homepageCount === 0) {
    const { blocks, ...rest } = seedData.homepage;
    const processedBlocks = [];

    for (const block of blocks) {
      const { imageFile, ...blockData } = block;
      let image = null;
      if (imageFile) {
        const imgPath = path.join(assetsDir, imageFile);
        if (fs.existsSync(imgPath)) {
          const uploaded = await uploadFile(strapi, imgPath);
          image = uploaded.id;
        }
      }
      processedBlocks.push({ ...blockData, image });
    }

    await strapi.documents("api::homepage.homepage").create({
      data: { ...rest, blocks: processedBlocks, status: "published" },
    });
  }

  // Double check publication for Homepage in v5
  const homepageDoc = await strapi
    .documents("api::homepage.homepage")
    .findFirst();
  if (homepageDoc && !homepageDoc.publishedAt) {
    console.log("📢 Publishing Homepage...");
    await strapi.documents("api::homepage.homepage").publish({
      documentId: homepageDoc.documentId,
    });
  }

  // Double check publication for Collections in v5
  const collections = [
    "api::attraction.attraction",
    "api::market-piece.market-piece",
    "api::article.article",
  ];

  for (const uid of collections) {
    const drafts = await strapi.documents(uid).findMany({
      status: "draft",
    });

    for (const draft of drafts) {
      // If no published version exists for this documentId, publish it
      const published = await strapi.documents(uid).findOne({
        documentId: draft.documentId,
        status: "published",
      });

      if (!published) {
        console.log(`📢 Publishing ${uid} (ID: ${draft.documentId})...`);
        await strapi.documents(uid).publish({
          documentId: draft.documentId,
        });
      }
    }
  }

  console.log("✅ Batuan Village content seeding complete!");
}

module.exports = { seed };
