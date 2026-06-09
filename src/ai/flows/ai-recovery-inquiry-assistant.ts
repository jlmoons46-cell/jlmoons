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
  email: z.string().optional().describe('The email address of the user.'),
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
  prompt: `You are an expert AI forensic assistant designed to help users provide high-quality information for digital asset recovery assessments.

Your goal is to review the current (potentially partial) information provided by the user and suggest specific technical details or clarifying questions that would help a recovery specialist better understand their case.

Current Case Intake:
{{#if fullName}}Name: {{{fullName}}}{{/if}}
{{#if email}}Email: {{{email}}}{{/if}}
{{#if phone}}Phone: {{{phone}}}{{/if}}
{{#if recoveryType}}Case Type: {{{recoveryType}}}{{/if}}
{{#if estimatedValue}}Estimated Value: {{{estimatedValue}}}{{/if}}

User's Narrative:
"{{{message}}}"

Based on the above, provide 3-5 specific, technical suggestions or questions for the user. Focus on technical artifacts (e.g., transaction IDs, wallet versions, specific error messages, hardware types). Be encouraging and professional.`,
});

const aiRecoveryInquiryAssistantFlow = ai.defineFlow(
  {
    name: 'aiRecoveryInquiryAssistantFlow',
    inputSchema: AIRecoveryInquiryInputSchema,
    outputSchema: AIRecoveryInquiryOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await inquiryPrompt(input);
      if (!output) {
        throw new Error('AI failed to generate suggestions');
      }
      return output;
    } catch (error) {
      console.error('Genkit flow error:', error);
      throw error;
    }
  },
);
