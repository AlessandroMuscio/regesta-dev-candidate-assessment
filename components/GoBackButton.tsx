'use client'

import { useRouter } from "next/navigation"

export default function GoBackButton() {
  const router = useRouter()

  return (
    <button className="block mx-auto mt-4 btn-primary" onClick={() => router.push('/')}>Go Back</button>
  )
}