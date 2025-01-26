"use client"
import { SessionProvider } from "next-auth/react"
import React from "react"

interface SessionWrapper{
  children : any
}

const SessionWrapper : React.FC<SessionWrapper> = ({children}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionWrapper