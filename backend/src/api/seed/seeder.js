const fs = require("fs");
const path = require("path");
const seedData = require("./data.json");

async function uploadFile(strapi, filePath) {
  const fileName = path.basename(filePath);

  // Deduplication in v5: check if file already exists
  const existingFiles = await strapi.db.query("plugin::upload.file").findMany({
    where: { name: fileName },
  });

  if (existingFiles.length > 0) {
    return existingFiles[0];
  }

  const stats = fs.statSync(filePath);
  const [uploadedFile] = await strapi.plugins.upload.services.upload.upload({
    data: {},
    files: {
      filepath: filePath,
      originalFilename: fileName,
      mimetype: "image/png",
      size: stats.size,
    },
  });

  return uploadedFile;
}

const COMPONENT_MEDIA_MAP = {
  "sections.hero": "background",
  "sections.info-block": "image",
};

async function seed(strapi) {
  console.log("🚀 Starting Batuan Village content seeding...");

  const assetsDir = path.join(__dirname, "assets");

  // 1. Re-seed everything if count is matched but we need to fix relations?
  // For simplicity, we keep the Count checks to avoid over-running

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
  }

  // 5. Seed Global Settings
  console.log("🌍 Seeding Global Settings...");
  const globalDoc = await strapi.documents("api::global.global").findFirst();
  if (!globalDoc) {
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

  // 6. Seed Homepage
  console.log("🏠 Seeding Homepage...");
  const homepageDoc = await strapi
    .documents("api::homepage.homepage")
    .findFirst({ populate: "blocks" });

  if (!homepageDoc) {
    const { blocks, ...rest } = seedData.homepage;
    const processedBlocks = [];

    for (const block of blocks) {
      const { imageFile, ...blockData } = block;
      let imageId = null;
      if (imageFile) {
        const imgPath = path.join(assetsDir, imageFile);
        if (fs.existsSync(imgPath)) {
          const uploaded = await uploadFile(strapi, imgPath);
          imageId = uploaded.id;
        }
      }

      const mediaField = COMPONENT_MEDIA_MAP[block.__component] || "image";
      processedBlocks.push({ ...blockData, [mediaField]: imageId });
    }

    await strapi.documents("api::homepage.homepage").create({
      data: { ...rest, blocks: processedBlocks, status: "published" },
    });
  } else {
    // Check if hero background is missing
    const heroBlock = homepageDoc.blocks?.find(
      (b) => b.__component === "sections.hero",
    );
    if (heroBlock && !heroBlock.background) {
      console.log(
        "♻️  Fixing Homepage block relations (detected missing background)...",
      );
      await strapi.documents("api::homepage.homepage").delete({
        documentId: homepageDoc.documentId,
      });
      // Recursively call or just let it finish and re-run on next boot
      // But we want it fixed now, so we re-seed
      const { blocks, ...rest } = seedData.homepage;
      const processedBlocks = [];
      for (const block of blocks) {
        const { imageFile, ...blockData } = block;
        let imageId = null;
        if (imageFile) {
          const imgPath = path.join(assetsDir, imageFile);
          if (fs.existsSync(imgPath)) {
            const uploaded = await uploadFile(strapi, imgPath);
            imageId = uploaded.id;
          }
        }
        const mediaField = COMPONENT_MEDIA_MAP[block.__component] || "image";
        processedBlocks.push({ ...blockData, [mediaField]: imageId });
      }
      await strapi.documents("api::homepage.homepage").create({
        data: { ...rest, blocks: processedBlocks, status: "published" },
      });
    }
  }

  // Standard Publication Logic (Global, Homepage, Collections)
  const docsToPublish = [
    "api::global.global",
    "api::homepage.homepage",
    "api::attraction.attraction",
    "api::market-piece.market-piece",
    "api::article.article",
  ];

  for (const uid of docsToPublish) {
    const drafts = await strapi.documents(uid).findMany({ status: "draft" });
    for (const draft of drafts) {
      const published = await strapi.documents(uid).findOne({
        documentId: draft.documentId,
        status: "published",
      });
      if (!published) {
        console.log(`📢 Publishing ${uid} (ID: ${draft.documentId})...`);
        await strapi.documents(uid).publish({ documentId: draft.documentId });
      }
    }
  }

  console.log("✅ Batuan Village content seeding complete!");
}

module.exports = { seed };
