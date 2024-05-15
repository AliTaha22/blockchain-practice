export default async function cookieValidator (cookies) {
    try {
      await externallyValidateCookie(cookies.testCookie)
    } catch {
    //   throw  Error('Invalid cookies')
    }
  }