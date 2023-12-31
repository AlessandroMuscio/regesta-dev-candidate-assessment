import mongoose, { Schema, InferSchemaType, model, Document } from 'mongoose'

interface IDiscount extends Document {
  type: string,
  value: number,
  conditions: object
}

const discountSchema: Schema<IDiscount> = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    conditions: {
      type: Object,
      required: true
    }
  }
)

export type DiscountType = InferSchemaType<typeof discountSchema>
export const Discount = mongoose.models.Discount || model('Discount', discountSchema)
