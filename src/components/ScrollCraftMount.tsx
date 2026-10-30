'use client'

import { useEffect } from 'react'

export default function ScrollCraftMount() {
  useEffect(() => {
    const s = document.createElement('script')
    s.src = '/scrollcraft/scrollcraft.js'
    s.defer = true
    s.onload = () => {
      if ((window as any).ScrollCraft) {
        ;(window as any).ScrollCraft.mount(document.body)
      }
    }
    document.head.appendChild(s)
    return () => {
      document.head.removeChild(s)
    }
  }, [])
  return null
}