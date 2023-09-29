import mongoose, { Schema, InferSchemaType, model } from 'mongoose'

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    minDaysShipping: {
      type: Number,
      required: true
    }
  }
)

export type Supplier = InferSchemaType<typeof supplierSchema>
export const Supplier = mongoose.models.Supplier || model('Supplier', supplierSchema)
