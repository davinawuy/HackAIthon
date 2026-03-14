const blockedTopics = [
  "self-harm",
  "suicide",
  "kill",
  "bomb",
  "terror",
  "hate",
  "racist",
  "violence",
];

export function validateChatInput(input: string) {
  const text = input.trim();

  if (!text) {
    return { ok: false as const, reason: "Please enter a question." };
  }

  if (text.length > 1000) {
    return { ok: false as const, reason: "Message is too long." };
  }

  const lower = text.toLowerCase();

  for (const word of blockedTopics) {
    if (lower.includes(word)) {
      return {
        ok: false as const,
        reason: "I can’t help with that request.",
      };
    }
  }

  return { ok: true as const };
}