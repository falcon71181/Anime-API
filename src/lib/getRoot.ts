import type { GetRoot } from "../types/aniwatch/root";
import type { RequestHandler } from "express";
import { isSiteReachable } from "./isSiteReachable";

// TODO: make config json files , make it better in future
export const getRoot: RequestHandler = async (_req, res) => {
  try {
    const data: GetRoot = {
      docs: "",
      sites: {},
    };

    data.docs = "https://github.com/falcon71181/Anime-API/blob/main/README.md";

    const aniwatchStatus = await isSiteReachable("https://aniwatch.to");
    const aniwatchtvStatus = await isSiteReachable("https://aniwatchtv.to");

    const gogoanimeStatus = await isSiteReachable("https://gogoanime3.co");

    data.sites["aniwatch"] = aniwatchStatus || aniwatchtvStatus;
    data.sites["gogoanime"] = gogoanimeStatus;

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
