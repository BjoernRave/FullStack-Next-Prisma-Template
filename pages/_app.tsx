import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange } from '@urql/exchange-graphcache'
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch'
import { DefaultMeta } from 'components/Meta'
import Notification, {
  NotificationProvider,
  NotificationType,
} from 'components/Notification'
import { getTheme, GlobalStyles } from 'lib/styles'
import { withUrqlClient } from 'next-urql'
import { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { dedupExchange } from 'urql'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [notification, setNotification] = useState<NotificationType>(null)

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles)
  }, [])

  return (
    <ThemeProvider theme={getTheme}>
      <CssBaseline />
      <DefaultMeta />
      <GlobalStyles />
      <NotificationProvider
        value={{
          notification,
          setNotification,
        }}>
        <Notification />
        <Component {...pageProps} />
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default withUrqlClient(
  (ssrExchange) => {
    return {
      url: `${process.env.BASE_URL}/api/graphql`,
      exchanges: [
        devtoolsExchange,
        dedupExchange,
        cacheExchange(),
        ssrExchange,
        multipartFetchExchange,
      ],
    }
  },
  { ssr: true }
)(MyApp as any)
