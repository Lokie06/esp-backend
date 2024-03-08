import { Article } from "../models/article.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynHandler.js";

const getAllCompanies = asyncHandler(async (req, res) => {
  const allCompanies = await Article.find({ isVerified: true }).sort({
    companyName: 1,
  });

  const data = allCompanies.reduce((acc, article) => {
    const { companyName, companyDomainName } = article;
    const existingCompany = acc.find(d => d.company === companyName);

    if (existingCompany) {
      existingCompany.count++;
    } else {
      acc.push({
        company: companyName,
        domainName: companyDomainName,
        count: 1,
      });
    }

    return acc;
  }, []);

  return res.status(200).json(new ApiResponse(200, data, "Companies Fetched"));
});

const getCompanyArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({
    companyName: req.params.companyName,
    isVerified: true,
  }).sort({ _id: -1 });
    return res
      .status(200)
      .json(
        new ApiResponse(201, articles, `${req.params.companyName}'s articles`)
      );
});

export { getAllCompanies, getCompanyArticles };
