export interface File {
  filename: string
  mimetype: string
  encoding: string
  createReadStream: () => any
}

export interface UploadFile {
  file: Buffer
  mimeType?: string
  name: string
  subDomain: string
}

export interface User {
  iss: string
  sub: string //user id
  aud: string[]
  iat: number
  exp: number
  azp: string
  gty?: string
  scope: string
  permissions: string[]
}
