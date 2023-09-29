import mongoose, { Schema, InferSchemaType, model } from 'mongoose'

const productSchema = new Schema(
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
      type: Schema.ObjectId,
      required: true
    },
    discounts: {
      type: [Schema.ObjectId],
      required: true
    }
  }
)

export type Product = InferSchemaType<typeof productSchema>
export const Product = mongoose.models.Product || model('Product', productSchema)
