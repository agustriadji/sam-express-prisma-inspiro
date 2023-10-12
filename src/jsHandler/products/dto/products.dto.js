// id Int @id @default(autoincrement())
// title String @db.VarChar(150) @unique
// description String @db.VarChar(250) @default("This Description")
// author User? @relation(fields: [authorId], references: [id])
// authorId Int
// price Int @default(0)
// quantity Int @default(0)
// status Status @default(active)

exports.CreateProductsDTO = {
  title: String,
  description: String,
  price: Number,
  quantity: Number,
  status: String,
  author_id: Number,
};

exports.EditProductsDTO = {
  productsId: Number,
  title: String,
  description: String,
  price: Number,
  quantity: Number,
  author_id: Number,
};

exports.UpdateStatusProductsDTO = {
  productsId: Number,
  status: String,
};

exports.ByIdProductsDTO = {
  productsId: Number,
};

exports.DetailProductsDTO = {
  productsId: Number,
};
