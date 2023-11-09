import urlModel from "../models/url.model.js";
import isUrl from "is-url";
import Apperror from "../utility/error.util.js";

const makeShortUrlInDB = async (req, res, next) => {
  let lengthOfUrls = 0;

  for (let num = 0; num < 10000; num++) {
    const combinationArray =
      "abcdefghkijklmnopqrstuvwxyx1234567890ABCDEFGHIJKLMOPQRSTUVWXYZ";
    let str = "";

    for (let i = 0; i < 6; i++) {
      str +=
        combinationArray[
          Math.floor((Math.random() * 100) % combinationArray.length)
        ];
    }
    const url = await urlModel.findOne({ shortUrl: str });
    if (url) {
      continue;
    } else {
      const smallUrl = await urlModel.create({
        urlID: lengthOfUrls,
        shortUrl: str,
      });

      await smallUrl.save();
    }
    lengthOfUrls = (await urlModel.find({})).length;
  }
  return res.status(200).json({
    success: true,
    data: (await urlModel.find({})).length,
  });
};
const linkShortUrL = async (req, res, next) => { 
    





  try {
    const { longUrl } = req.body;
    const validUrl = await isUrl(longUrl);
    if (!validUrl) {
      return next(new Apperror("Please provide Valid Url ", 400));
    }
    const url = await urlModel.findOne({ status: "INACTIVE" });
    if (!url) {
      return next(new Apperror("Url Cannot be Found", 400));
    }
    const authorId = req.user.id;
    if (!authorId) {
      return next(new Apperror("User is not Logged In ", 400));
    }
    url.linkShortUrl = `https://linkshorts.vercel.app/${url.shortUrl}`;
    url.userId = authorId;
    url.longUrl = longUrl;
    url.status = "ACTIVE";
    await url.save();
    return res.status(200).json({
      success: true,
      message: "Url Linked SuccessFully",
      shortUrl: `https://linkshorts.vercel.app/${url.shortUrl}`,
      longUrl: longUrl,
    });
  } catch (e) {
    return next(new Apperror(e.message, 400));
  }
};
const clickShortLink = async (req, res, next) => {
  console.log("Click on Short Link me Hu ");
  try {
    const hash = req.params["hash"];
    const longUrl = await urlModel.findOne({ shortUrl: hash });
    if (!longUrl) {
      return next(
        new Apperror("LongUrl Corresponding to Short Url Does Not Exists ", 500)
      );
    }
    longUrl.clicks++;

    await longUrl.save();
    res.redirect(longUrl.longUrl);
    res.status(200);

    if (!res.finished) {
      return res.json({
        success: true,
        message: "Redirected SUccessfully ",
      });
    }
  } catch (e) {
    return next(new Apperror(e.message, 400));
  }
};
const deleteUrl = async (req, res, next) => {
  try {
    console.log(req.body);

    const { shortUrl } = req.body;
    const url = await urlModel.findOne({ linkShortUrl: shortUrl });
    console.log(url);
    url.status = "INACTIVE";
    url.userId = null;
    url.clicks = 0;
    url.longUrl = null;

    await url.save();
    return res.status(200).json({
      success: true,
      message: "Url Deleted Successfully",
      shortUrl: url,
    });
  } catch (e) {
    return next(new Apperror(e.message, 400));
  }
};
const getAllUrls = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const urls = await urlModel
      .find({ userId: userId })
      .sort({ createdAt: -1 });

    if (!urls.length) {
      return next(new Apperror("User Does No tHave Any Urls", 400));
    }
    return res.status(200).json({
      success: true,
      urls,
    });
  } catch (e) {
    return next(new Apperror(e.message, 400));
  }
};
const generateQr = async (req, res, next) => {
  try {
    console.log("s.fbsdjkfbjadbfjoa");
    const { uid } = req.params;
    if (!uid) {
      return next(new Apperror("Please provide a valid Url ", 400));
    }
    console.log("s.fbsdjkfbjadbfjoa");
    const url = await urlModel.findById(uid);
    if (!url) {
      return next(new Apperror("Url Does not exists", 400));
    }

    try {
      const response = await fetch(
        `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${url.linkShortUrl}`
      );
      return res.status(200).json({
        success: true,
        message: "Qr fetched Successfully ",
        image: `<img  src=${await response.text()}  > </img>`,
      });
    } catch (error) {
      console.log(error);
    }
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new Apperror(error.message, 400));
  }
};

const makeCustomUrl = async (req, res, next) => {
  try {
    const { hash } = req.params;
    const {longUrl } = req.body;
    const validUrl = await isUrl(longUrl);
    if (!validUrl) {
      return next(new Apperror("Please provide Valid Url ", 400));
    }

    const existingHash  =await urlModel.findOne({shortUrl : hash})
    if(existingHash)  {
        return next(new Apperror("This Url Already Exists",400))
    }
    if (hash) {
      const url = await urlModel.findOne({ status: "INACTIVE" });
      const authorId = req.user.id;
        if (!authorId) {
          return next(new Apperror("User is not Logged In ", 400));
        }
        url.shortUrl =hash;

        url.linkShortUrl = `https://linkshorts.vercel.app/${hash}`;
        url.userId = authorId;
        url.longUrl = longUrl;
        url.status = "ACTIVE";
        await url.save();

      return res.status(200).json({
        success: true,
        message: "",
        shortUrl: `https://linkshorts.vercel.app/${url.shortUrl}`,
        longUrl: longUrl,
      });
    } else {
      return next(new Apperror("This Url already taken ", 400));
    }
  } catch (error) {
    return next(new Apperror(error.message, 400));
  }
};
export default {
  makeShortUrlInDB,
  linkShortUrL,
  clickShortLink,
  deleteUrl,
  getAllUrls,
  generateQr,
  makeCustomUrl
};
