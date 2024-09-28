const AWS = require('aws-sdk')
const { getUUIDFileName } = require('../utils/utils')
const { S3_MESSAGES } = require('../utils/constants')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const uploadFilesToS3 = async (req, res) => {
  const { filename, filetype } = req.query

  try {
    const fileBuffer = Buffer.isBuffer(req.body)
      ? req.body
      : Buffer.from(req.body)

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: getUUIDFileName(filename),
      Body: fileBuffer
    }

    const upload = await s3.upload(params).promise()
    console.log(upload)
    res.json({ message: 'ok' })
  } catch (error) {
    console.error(error)
    res.status(500).send(S3_MESSAGES.ERROR_UPLOADING_FILES)
  }
}

const getSignedUrl = (req, res) => {
  const { filename, filetype } = req.query

  const fileNameKey = getUUIDFileName(filename)

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileNameKey,
    Expires: 6000,
    ContentType: filetype
  }

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      console.error(S3_MESSAGES.ERROR_GENERATING_SIGNED_URL, err)
      return res
        .status(500)
        .json({ error: S3_MESSAGES.SIGNED_URL_NOT_GENERATED })
    }
    res.status(200).json({
      filename: `${process.env.AWS_S3_BUCKET_URL}${fileNameKey}`,
      url
    })
  })
}
module.exports = {
  getSignedUrl,
  uploadFilesToS3
}
