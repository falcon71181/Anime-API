import type { GetRoot } from "../types/aniwatch/root";
import type { RequestHandler } from "express";
import { isSiteReachable } from "./isSiteReachable";

export const getRoot: RequestHandler = async (_req, res) => {
  try {
    const data: GetRoot = {
      docs: "",
      sites: {},
    };

    data.docs = "https://github.com/falcon71181/Anime-API/blob/main/README.md";

    const aniwatchStatus = await isSiteReachable("https://aniwatch.to");
    const aniwatchtvStatus = await isSiteReachable("https://aniwatchtv.to");

    data.sites["aniwatch"] = aniwatchStatus || aniwatchtvStatus;

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
