import mongoose, { Schema, InferSchemaType, model } from 'mongoose'

const discountSchema = new Schema(
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

export type Discount = InferSchemaType<typeof discountSchema>
export const Discount = mongoose.models.Discount || model('Discount', discountSchema)
