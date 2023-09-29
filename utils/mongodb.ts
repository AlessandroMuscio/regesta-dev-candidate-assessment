import mongoose from 'mongoose'

const uri = process.env.DATABASE_URI || ''

async function connect() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri)

      console.log('Connected to MongoDB')
    }

    return { db: mongoose.connection }
  } catch (error) {
    console.log('Error in connecting to MongoDB: ', error)
    throw error
  }
}

async function disconnect() {
  try {
    await mongoose.connection.close()

    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.log('Error in disconnecting from MongoDB: ', error)
    throw error
  }
}

['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM'].forEach(
  (eventType) => process.on(eventType, () => disconnect())
)

export { connect, disconnect }
