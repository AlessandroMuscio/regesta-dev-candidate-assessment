import mongoose, { Schema, InferSchemaType, model, Document } from 'mongoose'

interface ISupplier extends Document {
  name: string,
  minDaysShipping: number
}

const supplierSchema: Schema<ISupplier> = new Schema(
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
