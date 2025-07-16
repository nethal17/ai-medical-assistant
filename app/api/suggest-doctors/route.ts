import { openai } from "@/config/open-ai-model";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { notes } = await req.json();
    try {
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-001",
            messages: [
                { 
                    role: "system", 
                    content: `You are a medical assistant. Based on the user's symptoms, suggest which specialists from this list would be most appropriate. 
                    Only respond with an array of specialist names (exactly as written in the specialist field) in JSON format. 
                    Available specialists: ${AIDoctorAgents.map(d => d.specialist).join(', ')}` 
                },  
                { 
                    role: "user", 
                    content: `User Notes/Symptoms: ${notes}. Which specialists should they see? Return only a JSON array of specialist names.` 
                },
            ],
            response_format: { type: "json_object" }
        });

        
        const res = completion.choices[0].message.content;
        // @ts-ignore
        const suggestedSpecialists = JSON.parse(res);

        // Find the full doctor objects for the suggested specialists
        const suggestedDoctors = AIDoctorAgents.filter(doctor => 
            suggestedSpecialists.includes(doctor.specialist)
        );

        return NextResponse.json(suggestedDoctors);
    } catch (error) {
        return NextResponse.json(error);
    }
};