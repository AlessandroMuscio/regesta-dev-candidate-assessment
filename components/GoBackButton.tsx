'use client'

import { useRouter, usePathname } from "next/navigation"

export default function GoBackButton() {
  const router = useRouter()

  return (
    <button className="block mx-auto btn-primary" onClick={() => router.push('/')}>Go Back</button>
  )
}