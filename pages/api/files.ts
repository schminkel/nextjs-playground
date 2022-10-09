import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  name: string,
  url: string
}[]

let dummyJson: ResponseData = [
  { name: 'dummyTest1.pdf', url: 'dummyTest1.pdf' },
  { name: 'dummyTest2.pdf', url: 'dummyTest2.pdf' },
  { name: 'dummyTest3.pdf', url: 'dummyTest3.pdf' }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json(dummyJson)
}