import aws from 'aws-sdk'
import { File, UploadFile } from './types'

const BUCKET_NAME = 'inventhora'

export const REGION = 'eu-west-1'

export const uploadFile = async ({
  file,
  name,
  mimeType,
  subDomain,
}: UploadFile) => {
  aws.config.setPromisesDependency({})
  aws.config.update({
    accessKeyId: process.env.AWS_SERVER_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SERVER_SECRET_ACCESS_KEY,
    region: REGION,
  })
  const s3 = new aws.S3()

  const path = `${subDomain}/${new Date().toISOString()}_${name}`

  s3.upload(
    {
      ACL: 'public-read',
      Bucket: BUCKET_NAME,
      Body: file,
      Key: path,
      ...(mimeType && { ContentType: mimeType }),
    },
    (err) => {
      if (err) {
        console.log('Error occured while trying to upload to S3 bucket', err)
      }
    }
  )

  return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${path}`
}

export const uploadImages = async ({
  images,
  name,
  subDomain,
}: {
  images: Promise<File>[]
  name: string
  subDomain: string
}) => {
  if (!images || images.length === 0) return []

  const resolvedImages = await Promise.all(images)

  const newImages: { url: string; name: string }[] = []

  for (const image of resolvedImages) {
    const url = await uploadFile({
      file: image.createReadStream(),
      name: `${name}_${image.filename}`,
      mimeType: image.mimetype,
      subDomain,
    })
    newImages.push({ url, name })
  }
  return newImages
}
