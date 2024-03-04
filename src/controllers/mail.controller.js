import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendMail } from "../utils/Mailer.js";
import { asyncHandler } from "../utils/asynHandler.js";

const sendConfirmation = asyncHandler(async (req, res) => {
  const { email, user, articleTitle, articleId } = req.body;
  const mailBody = {
    name: user,
    intro: `Your article titled "${articleTitle}" has been successfully reviewed and is now live on Raahi ESP!`,
    action: {
      instructions: "Click the button below to view your published article:",
      button: {
        color: "#22BC66",
        text: "View Article",
        link: `https://www.raahi-esp.com/articles/${articleId}`,
      },
    },
    outro:
      "Thank you for sharing your experience with our community. We look forward to your next submission!",
  };

  const subject = "Article Posted";
  try {
    const mailSent = await sendMail(email, subject, mailBody);
    if (mailSent) {
      res
        .status(200)
        .json(new ApiResponse(200, mailSent, "Confirmation Email Sent"));
    }
  } catch (error) {
    return next(new ApiError("Could not Send Email!!"));
  }
});

const sendDecline = asyncHandler(async (req, res) => {
  const { email, user, articleTitle, articleId } = req.body;
  const mailBody = {
    name: user,
    intro: `We appreciate your interest in sharing your experiences through Raahi ESP and the effort you've put into your article titled "${articleTitle}".`,
    outro: `After careful review, we've determined that the submission doesn't fully align with our publication standards. This isn't a reflection of your overall potential or capabilities. We encourage you to review our submission guidelines and consider submitting again in the future. For more detailed feedback or questions, please don't hesitate to reach out.`,
    action: {
      instructions: "You can review our submission guidelines here:",
      button: {
        color: "#1a73e8", // Adjust the color as needed
        text: "Submission Guidelines",
        link: `https://www.raahi-esp.com/submission-guidelines`, // Provide the actual link to your guidelines
      },
    },
    signature: "Best regards",
  };

  const subject = "Article Posted";
  try {
    const mailSent = await sendMail(email, subject, mailBody);
    if (mailSent) {
      res
        .status(200)
        .json(new ApiResponse(200, mailSent, "Confirmation Email Sent"));
    }
  } catch (error) {
    return next(new ApiError("Could not Send Email!!"));
  }
});

const mailReceived = async (email, user, articleTitle) => {
  // const { email, user, articleTitle } = req.body;

  const mailBody = {
    name: user,
    intro: `Thank you for submitting your article titled "${articleTitle}" to Raahi ESP. We are excited to review it!`,
    outro:
      "We will send a confirmation email after verification has been done.",
  };

  const subject = "Article Submission Received";
  try {
    const mailSent = await sendMail(email, subject, mailBody);
    if (mailSent) {
      return mailSent;
    }
  } catch (error) {
    return false;
  }
};

export { sendConfirmation, sendDecline, mailReceived };
