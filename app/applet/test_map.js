const fs = require("fs");

const provincesData = JSON.parse(fs.readFileSync("public/geojson/provinces.json", "utf-8"));
console.log("Provinces features count:", provincesData.features.length);
provincesData.features.forEach((f, i) => {
  console.log(`Province ${i}:`, f.properties.name, "code:", f.properties.code);
});

const sigunguData = JSON.parse(fs.readFileSync("public/geojson/municipalities.json", "utf-8"));
console.log("\nMunicipalities features count:", sigunguData.features.length);
sigunguData.features.slice(0, 15).forEach((f, i) => {
  console.log(`Sigungu ${i}:`, f.properties.name, "code:", f.properties.code);
});
