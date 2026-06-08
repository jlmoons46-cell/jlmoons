'use server';
/**
 * @fileOverview An AI assistant that helps users provide comprehensive and accurate information for crypto and digital asset recovery requests.
 *
 * - inquireRecoveryDetails - A function that leverages AI to ask clarifying questions and suggest important details for a recovery request.
 * - AIRecoveryInquiryInput - The input type for the inquireRecoveryDetails function.
 * - AIRecoveryInquiryOutput - The return type for the inquireRecoveryDetails function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIRecoveryInquiryInputSchema = z.object({
  fullName: z.string().optional().describe('The full name of the user submitting the request.'),
  email: z.string().email().optional().describe('The email address of the user.'),
  phone: z.string().optional().describe('The phone number of the user.'),
  recoveryType: z.string().optional().describe('The type of recovery requested (e.g., Wallet Recovery, Hacked Account Recovery).'),
  estimatedValue: z.string().optional().describe('The estimated value of the lost assets.'),
  message: z.string().min(20).describe('A detailed message from the user describing their recovery situation.'),
});
export type AIRecoveryInquiryInput = z.infer<typeof AIRecoveryInquiryInputSchema>;

const AIRecoveryInquiryOutputSchema = z.object({
  suggestions: z.string().describe('Clarifying questions and suggestions for the user to provide more details for their recovery request.'),
});
export type AIRecoveryInquiryOutput = z.infer<typeof AIRecoveryInquiryOutputSchema>;

export async function inquireRecoveryDetails(input: AIRecoveryInquiryInput): Promise<AIRecoveryInquiryOutput> {
  return aiRecoveryInquiryAssistantFlow(input);
}

const inquiryPrompt = ai.definePrompt({
  name: 'recoveryInquiryPrompt',
  input: { schema: AIRecoveryInquiryInputSchema },
  output: { schema: AIRecoveryInquiryOutputSchema },
  prompt: `You are an AI assistant designed to help users provide comprehensive and accurate information for a crypto and digital asset recovery request. Your goal is to review the provided information, identify any gaps, and then formulate helpful, encouraging questions and suggestions for the user to improve their request. This ensures recovery specialists have all necessary details for an efficient assessment.

Review the user's current recovery request details below:

Full Name: {{{fullName}}}
Email: {{{email}}}
Phone: {{{phone}}}
Recovery Type: {{{recoveryType}}}
Estimated Value: {{{estimatedValue}}}
Message: {{{message}}}

Based on this information, what further details would be beneficial, or what clarifying questions do you have for the user to help them provide the best possible information for their recovery case? Please respond directly with your questions and suggestions, structured clearly for the user.`,
});

const aiRecoveryInquiryAssistantFlow = ai.defineFlow(
  {
    name: 'aiRecoveryInquiryAssistantFlow',
    inputSchema: AIRecoveryInquiryInputSchema,
    outputSchema: AIRecoveryInquiryOutputSchema,
  },
  async (input) => {
    const { output } = await inquiryPrompt(input);
    return output!;
  },
);
