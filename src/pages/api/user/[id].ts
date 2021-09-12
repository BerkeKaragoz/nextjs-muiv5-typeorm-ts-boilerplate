// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ensureConnection from "../../../database";
import { User } from "../../../database/entities";

ensureConnection();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>,
) {
  const id = req.query.id as string;

  if (!id) res.status(500);

  const user = await User.findOne(id);

  if (!user) res.status(404);
  else res.status(200).json(user);
}
