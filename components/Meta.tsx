import Head from 'next/head'
import { SingletonRouter, withRouter } from 'next/router'
import React, { FC } from 'react'

const Meta: FC<Props> = ({ title = '' }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='apple-mobile-web-app-title' content={title} />
    </Head>
  )
}

export default withRouter(Meta)

interface Props {
  title?: string
  description?: string
  router: SingletonRouter
  homeCanonical?: boolean
  url?: string
}

export const DefaultMeta: FC<DefaultProps> = ({ themeColor = '#149270' }) => {
  const url = process.env.BASE_URL

  return (
    <Head>
      <meta charSet='utf-8' />
      <link rel='shortcut icon' href='/logo_small_32.png' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge'></meta>
      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
      />
      <meta name='description' content='' />
      <meta name='theme-color' content={themeColor} />

      <meta name='mobile-web-app-capable' content='yes' />

      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <link rel='apple-touch-icon' href='/logo_small_180.png'></link>

      <meta name='msapplication-navbutton-color' content='white' />
      <meta name='msapplication-TileColor' content={themeColor} />
      <meta name='msapplication-TileImage' content='logo_small_144.png' />
      <meta name='msapplication-config' content='none' />

      <meta name='application-name' content='' />
      <meta name='msapplication-tooltip' content='' />
      <meta name='msapplication-starturl' content='/' />

      <link rel='manifest' href='/manifest.json' />
    </Head>
  )
}

interface DefaultProps {
  themeColor?: string
}
