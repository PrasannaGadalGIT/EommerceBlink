import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
        clientId: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET || "",
      }),
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // })
  ]
})

export {handler as GET, handler as POST}

function GoogleProvider(arg0: { clientId: string | undefined; clientSecret: string | undefined }): import("next-auth/providers/index").Provider {
    throw new Error('Function not implemented.')
}
