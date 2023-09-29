import mongoose, { Schema, InferSchemaType, model, Document } from 'mongoose'

interface IProduct extends Document {
  name: string,
  quantity: number,
  pricePerUnit: number,
  supplier: Schema.Types.ObjectId
  discounts: [Schema.Types.ObjectId]
}

const productSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    pricePerUnit: {
      type: Number,
      required: true
    },
    supplier: {
      type: Schema.Types.ObjectId,
      required: true
    },
    discounts: {
      type: [Schema.Types.ObjectId],
      required: true
    }
  }
)

export type ProductType = InferSchemaType<typeof productSchema>
export const Product = mongoose.models.Product || model('Product', productSchema)
