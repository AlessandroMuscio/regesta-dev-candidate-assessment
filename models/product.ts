import mongoose, { Schema, InferSchemaType, model, Document } from 'mongoose'
import { Supplier } from './supplier'
import { Discount } from './discount'

interface IProduct extends Document {
  name: string,
  quantity: number,
  pricePerUnit: number,
  supplier: typeof Supplier
  discounts: [typeof Discount]
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
      type: Supplier,
      required: true
    },
    discounts: {
      type: [Discount],
      required: true
    }
  }
)

export type Product = InferSchemaType<typeof productSchema>
export const Product = mongoose.models.Product || model('Product', productSchema)
