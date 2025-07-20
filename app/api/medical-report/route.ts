import { NextRequest, NextResponse } from 'next/server';
import { openai } from "@/config/open-ai-model";
import { SessionChatTable } from '@/config/schema';
import { db } from '@/config/db';
import { eq } from 'drizzle-orm';

const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on doctor AI agent info and conversation between Ai medical voice agent and user and give medications(it is compulsory to suggest some), generate a structured report with the following fields:

1.sessionId: a unique session identifier

2.agent: the medical specialist name (e.g., "General Physician AI")

3.user: name of the patient or "Anonymous" if not provided

4.timestamp: current date and time in ISO format

5.chiefComplaint: one-sentence summary of the main health concern

6.summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations

7.symptoms: list of symptoms mentioned by the user

8.duration: how long the user has experienced the symptoms

9.severity: mild, moderate, or severe

10.medicationsMentioned: list of any medicines mentioned

11.recommendations: list of AI suggestions (e.g., rest, see a doctor)

Return the result in this JSON format:

{
  "sessionId": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "string",
  "severity": "string",
  "medicationsMentioned": ["med1", "med2"],
  "recommendations": ["rec1", "rec2"]
}
Only include valid fields. Respond with nothing else.
if there are no medication suggested, you should suggest some common medicine for relavent symptoms.
`;

export async function POST(req: NextRequest) {
    const { sessionId, sessionDetail, messages } = await req.json();

    try {
        const userInput = "AI Doctor Agent Info: " + JSON.stringify(sessionDetail) + ", Conversation: " + JSON.stringify(messages);
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-001",
            messages: [
                { 
                    role: "system", 
                    content: REPORT_GEN_PROMPT
                },  
                { 
                    role: "user", 
                    content: userInput
                },
            ],
            response_format: { type: "json_object" }
        });

        
        const rawResponse = completion.choices[0].message;

        // @ts-ignore
        const response = rawResponse.content.trim().replace("```json", "").replace("```", "");
        const JSONResponse = JSON.parse(response);

        // save to database
        const result = await db.update(SessionChatTable).set({
            report: JSONResponse,
            conversation: messages
        }).where(eq(SessionChatTable.sessionId, sessionId));

        if (!result) {
            console.log("Unable to update medical report in database");
        }

        return NextResponse.json(JSONResponse);
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function GET(req: NextRequest) {
    // download the medical report in pdf format
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    
    if (!sessionId) {
        return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }
    try {
        const result = await db.select().from(SessionChatTable)
            .where(eq(SessionChatTable.sessionId, sessionId))
            .limit(1);

        if (result.length === 0) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }

        const sessionData = result[0];
        if (!sessionData.report) {
            return NextResponse.json({ error: "Report not generated yet" }, { status: 404 });
        }

        // Here you would typically generate a PDF from the report data
        // For now, we will just return the report as JSON
        return NextResponse.json(sessionData.report);
    } catch (error) {
        console.error("Error fetching medical report:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}