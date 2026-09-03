const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const Franchise = require("../models/Franchise");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// =====================================================
// AI CHAT
// =====================================================
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    // =================================================
    // GET FRANCHISE DATA FROM MONGODB
    // =================================================

    const franchises = await Franchise.find({})
      .select(
        "name category description fullDescription investment roi unitsOperating yearFounded territories support requirements"
      )
      .limit(50)
      .lean();

    // =================================================
    // CONVERT DATABASE DATA INTO AI CONTEXT
    // =================================================

    const franchiseContext = franchises
      .map(
        (franchise) => `
Franchise:
Name: ${franchise.name}
Category: ${franchise.category}
Investment: ${franchise.investment}
ROI: ${franchise.roi || "Not specified"}
Description: ${franchise.description}
Full Description: ${franchise.fullDescription || "Not specified"}
Units Operating: ${franchise.unitsOperating || 0}
Year Founded: ${franchise.yearFounded || "Not specified"}
Territories: ${franchise.territories || "Not specified"}
Support: ${
          franchise.support?.length
            ? franchise.support.join(", ")
            : "Not specified"
        }
Requirements: ${
          franchise.requirements?.length
            ? franchise.requirements.join(", ")
            : "Not specified"
        }
`
      )
      .join("\n-------------------------\n");

    // =================================================
    // SEND USER QUESTION + DATABASE DATA TO GEMINI
    // =================================================

    const prompt = `
You are Franchise AI, the official AI assistant for FranchiseHub.

The user is asking:

"${message}"

Below is the current franchise information stored in the FranchiseHub database:

${franchiseContext}

Your job is to answer the user's question using the database information above.

Rules:

1. Use the FranchiseHub database information whenever it is relevant.
2. Never invent franchise names, investment amounts, ROI figures, requirements, or other specific franchise information.
3. If the requested information is not available in the database, clearly say that.
4. If the user asks for recommendations, recommend only franchises that exist in the database.
5. If the user asks about investment, use the investment information stored in the database.
6. If the user asks about ROI, use the ROI information stored in the database.
7. If the user asks to compare franchises, compare actual franchises from the database.
8. If the user asks about a category, show relevant franchises from that category.
9. Keep answers easy to read.
10. Use bullet points when listing multiple franchises.
11. Do not guarantee profits or returns.
12. Do not provide financial guarantees.
13. Remind users to verify important investment and ROI information with the franchise brand.
14. If there are no matching franchises, say that no matching franchise was found in the current FranchiseHub database.
15. You can answer general franchise questions even when the database does not contain the answer, but clearly distinguish general advice from FranchiseHub-specific information.

Give the user a helpful and concise answer.
`;

    // =================================================
    // GEMINI
    // =================================================

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    const reply = response.text;

    // =================================================
    // SEND RESPONSE TO FRONTEND
    // =================================================

    res.status(200).json({
      reply,
    });
  } catch (error) {
    console.error("Gemini AI Error:", error);

    res.status(500).json({
      message: "Failed to get AI response",
      error: error.message,
    });
  }
});

module.exports = router; 
