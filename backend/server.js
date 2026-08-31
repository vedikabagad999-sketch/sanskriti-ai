const express = require("express");
const cors =require("cors");
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const path = require("path");


const app = express();
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
app.use(cors());

const PORT = process.env.PORT || 5000;


// Allow server to receive JSON data
app.use(express.json());


// Home route
app.get("/", (req, res) => {

    res.send("Sanskriti AI Backend is running!");

});

function loadCulturalKnowledge(state) {

    if (!state) {
        console.error("No destination state provided.");
        return null;
    }

    const knowledgeFolder = path.join(__dirname, "knowledge");

    const normalizedState =
        state
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");

    const possibleFileNames = [
        `${normalizedState}.json`,
        `${normalizedState.replace(/-/g, "")}.json`,
        `${normalizedState.replace(/-/g, "_")}.json`
    ];

    for (const fileName of possibleFileNames) {

        const filePath =
            path.join(knowledgeFolder, fileName);

        if (fs.existsSync(filePath)) {

            try {

                const data =
                    fs.readFileSync(filePath, "utf-8");

                console.log(
                    `Cultural knowledge loaded: ${fileName}`
                );

                return JSON.parse(data);

            } catch (error) {

                console.error(
                    `Error reading ${fileName}:`,
                    error.message
                );

                return null;
            }
        }
    }

    console.error(
        `No cultural knowledge file found for "${state}".`
    );

    console.error(
        `Tried: ${possibleFileNames.join(", ")}`
    );

    return null;
}


// Generate Guide route
app.post("/generate-guide", async (req, res) => {

    // Get travel information from frontend

    const {
        fromState,
        destinationState,
        city,
        purpose,
        situation
    } = req.body;

    // Load trusted cultural knowledge for the destination

const culturalKnowledge =
    loadCulturalKnowledge(destinationState);
    console.log("Destination State:", destinationState);
console.log("Cultural Knowledge Loaded:", culturalKnowledge ? "YES" : "NO");
   const culturalSources = [];

if (culturalKnowledge) {

    function collectSources(obj) {

        if (!obj || typeof obj !== "object") {
            return;
        }

        // If the current object contains a source
        if (
            obj.source &&
            typeof obj.source === "object" &&
            obj.source.url
        ) {
            culturalSources.push(obj.source);
        }

        // Continue searching through nested objects/arrays
        if (Array.isArray(obj)) {

            obj.forEach(item => {
                collectSources(item);
            });

        } else {

            Object.values(obj).forEach(value => {
                if (value && typeof value === "object") {
                    collectSources(value);
                }
            });

        }
    }

    // Collect every source present anywhere
    // inside the cultural knowledge JSON
    collectSources(culturalKnowledge);
}
const uniqueSources = Array.from(
    new Map(
        culturalSources.map(source => [source.url, source])
    ).values()
);


    // Create the prompt for Gemini

const prompt = `
You are Sanskriti AI, an AI-powered cultural travel companion for Indian domestic travelers.

Your task is to create a highly relevant, destination-specific cultural guide using the Trusted Cultural Knowledge provided below.

TRAVELER INFORMATION

From State: ${fromState}
Destination State: ${destinationState}
City: ${city}
Purpose: ${purpose}
Traveler's Situation: ${situation}

TRUSTED CULTURAL KNOWLEDGE

${JSON.stringify(culturalKnowledge, null, 2)}

IMPORTANT SOURCE RULES

1. The Trusted Cultural Knowledge is your PRIMARY and AUTHORITATIVE source for destination-specific cultural information.

2. Carefully read ALL relevant parts of the Trusted Cultural Knowledge before generating the guide.

3. Use specific facts from the knowledge base whenever they are available.

4. Do NOT replace specific knowledge-base information with generic Indian cultural advice.

5. Do NOT assume that customs are the same throughout India.

6. Do NOT invent:
   - local greetings
   - local phrases
   - food customs
   - religious practices
   - festivals
   - clothing traditions
   - transportation information
   - rental prices
   - housing areas
   - local lifestyle claims
   - cultural traditions

7. If information for a section is not supported by the knowledge base, clearly say that verified information is limited for that particular topic.

8. You may connect information from different parts of the knowledge base when the connection is reasonable and useful.

9. Always distinguish verified facts from practical interpretation.

10. Cultural practices may differ between communities, families, regions, generations and individuals. Do not make universal claims.

GUIDE STYLE

GUIDE STYLE

Create a practical guide specifically for the traveler visiting ${city} in ${destinationState}.

Prioritize information that is directly relevant to ${city}.

If the knowledge base contains information about other cities,
districts, tribes, or regions of ${destinationState}, do not
present that information as if it specifically describes ${city}.

Use broader ${destinationState} information only when it is
genuinely applicable to the selected city.

Do not use unrelated information simply to fill a section.

If reliable information for ${city} is not available for a
particular topic, clearly state that verified information is
limited rather than inventing information.

The guide should feel like a knowledgeable local cultural companion, NOT like a generic AI answer.
For example, if the knowledge base contains information about:
- specific festivals → mention those festivals
- traditional dances → mention those dances
- traditional clothing → mention those traditions
- regional cuisines → mention relevant cuisines
- cultural values → explain how they may matter to the traveler
- visitor guidance → use it for practical cultural behavior
- historical or cultural context → use it where relevant

Keep every section concise and useful.

Use approximately 2–4 bullet points per section.

Avoid long paragraphs.

Do not repeat the same information in multiple sections unless it is necessary.

FORMAT REQUIREMENTS

You MUST generate EXACTLY these 14 sections in EXACTLY this order:

## 👋 Greetings & Communication

## 🗣️ Useful Local Phrases

## 👗 Dress & Appearance

## 🍛 Food & Dining Etiquette

## 🙏 Spiritual & Cultural Practices

## 🤝 Social Etiquette

## 🎉 Festivals & Traditions

## 👀 Things You May Notice

## ✅ Do's

## ❌ Don'ts

## ⚠️ Common Mistake Outsiders Make

## 🏠 Living & Local Tips

## 💰 Affordable Stay / Rental Guidance

## 🌟 Personalized Tip for This Traveler

FORMATTING RULES

- Start directly with the first section.
- Do NOT write an introduction before the first section.
- Do NOT write a conclusion after the final section.
- Do NOT use numbered headings.
- Do NOT use bold formatting.
- Do NOT use italic formatting.
- Do NOT use tables.
- Use simple bullet points beginning with "-".
- Keep the wording beginner-friendly.
- Do not include HTML.
- Do not include markdown bold markers such as **.
- Do not include source URLs inside the guide.
- Do not mention that you are an AI.

For each section, prioritize concrete information from the knowledge base.

For the personalized section, specifically connect the destination's verified cultural information with the traveler's origin, city, purpose and situation.

Remember:

SPECIFIC VERIFIED DESTINATION INFORMATION > GENERIC ADVICE.

Generate the final guide now.
`;

    try {

        // Ask Gemini to generate the guide

        const response = await ai.models.generateContent({

            model: "gemini-3.5-flash-lite",

            contents: prompt

        });


        // Get the generated text

       const guide = response.text;


        // Send the guide back to frontend

        res.json({

            success: true,

            guide: guide,

            sources: uniqueSources

        });


    } catch (error) {

        console.error("Gemini API Error:", error);

        res.status(500).json({

            success: false,

            message: "Unable to generate the Sanskriti Guide."

        });

    }

});


// Start server
app.listen(PORT, "0.0.0.0", () => {

    console.log(`Sanskriti AI server is running on port ${PORT}`);

});