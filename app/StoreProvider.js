'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { makeStore } from '../lib/store'

export default function StoreProvider({ children, session }) {
  const storeRef = useRef(undefined)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return (
    <SessionProvider session={session}>
      <Provider store={storeRef.current}>{children}</Provider>
    </SessionProvider>
  )
}
