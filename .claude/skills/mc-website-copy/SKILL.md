---
name: mc-website-copy
description: Write and edit every user-facing word on the TJ Your MC website, including headings, body copy, buttons, form labels, alt text, meta descriptions, error states and FAQ answers. Use this skill whenever you are about to produce text a visitor will read, even a single button label or a one line tweak, and whenever you are reviewing or rewriting existing copy. Also use it when drafting copy for a new page or landing page, when writing schema descriptions, and any time someone mentions tone, voice, wording, headlines, or asks you to make something sound better.
---

# MC website copy

The product being sold on this site is a man's presence in a room. Copy that
sounds like a template tells the visitor he is a template. That is the whole game.

## Reference files

Load these when the situation calls for them, not upfront.

- `references/banned-language.md` The full list of banned words, phrases and
  sentence shapes, with replacements. Read it before writing any long-form copy,
  and use it as the checklist when reviewing.
- `references/voice-examples.md` Before and after pairs taken from the old site.
  Read it when you are unsure what the voice actually sounds like in practice.
- `scripts/check-dashes.py` Fails if an em or en dash appears anywhere in the
  repo. Run it before you finish.

## Who is speaking

First person, TJ himself. Not "we", not "our team", never "TJ Your MC is a
leading provider of". He is one bloke with a microphone.

The old site slid between "I" and "our" inside the same section, which is what
content mills do. Footer, legal text and booking admin can be neutral. Everything
else is TJ talking.

## The voice

TJ talks the way a confident host talks off stage. Warm, direct, a bit funny,
never performing. He is reassuring people who are nervous about a big day.

Short sentences, varied in length so the copy has a pulse. Read it aloud, and if
you would not say it standing next to someone at a bar, cut it.

**Say the specific thing, not the impressive thing.** "I keep the speeches moving
so Nan is not stuck in a chair until ten" beats "I ensure seamless coordination
of your reception timeline". The first proves he has done this. The second
proves nothing.

Address the reader as "you" and "your day". Never "the client" or "the couple"
while you are talking to them.

## The MC versus celebrant distinction

Get this wrong and TJ looks like he does not know his own job. The old site said
"I'm not just any civil celebrant", which is a factual error about the client.

- A **celebrant** performs the legal marriage ceremony. Registered with the
  Commonwealth, handles the Notice of Intended Marriage, says the legally
  required words, lodges the paperwork.
- An **MC** runs the event, usually the reception. Introductions, running order,
  speeches, timing, energy, handovers to the band or DJ.

TJ is an MC. He works alongside celebrants. He does not replace one. Never use
"celebrant", "officiant" or "legally marry" about TJ.

One inherited testimonial calls him "our celebrant". Leave the quote exactly as
written, because we do not edit people's words, but never build a claim on it.

## Headlines

A headline should be something only TJ could say. Test it by swapping in a
competitor's name. If it still works, it is filler, not a headline.

Weak, from the old site: "Your Trusted Professional MC in Sydney".

Aim at what the room feels like, or at the specific moment couples worry about,
which is the gap between the ceremony ending and the dance floor filling.

Draft several and pick the most concrete. Do not colour one word in the accent to
make a bland headline feel designed.

## Calls to action

Say what happens next. "Check my date" beats "Get A Quote Now" and "Submit". Keep
the same words on the button, the form heading and the confirmation message.

Confirmation copy is a real moment. Tell them when TJ will reply and what he will
ask.

## Facts we do not have

Never fill a gap with a plausible invention. Write the marker inline:

```
[NEEDS TJ: how many weddings roughly per year?]
```

Off limits until TJ confirms: years active, number of events, venues worked,
associations or memberships, languages spoken, which cultural weddings he has
hosted, service radius, phone number, package inclusions, prices.

## Alt text

Describe the scene for someone who cannot see it. "TJ holding a microphone
mid-speech while guests laugh at a reception table" is useful. "wedding reception
or formal event", the old site's filler, is useless to both screen readers and
search.

Do not guess at anything you cannot see. The old site guessed at a cultural
gathering in an alt tag. Describe the visible scene, not people's backgrounds.

## Review pass

Run this on anything you wrote, every time.

1. `python3 .claude/skills/mc-website-copy/scripts/check-dashes.py`. Zero tolerance.
2. Read it aloud. Rewrite anything you stumble on.
3. Check every claim against what TJ has actually told us.
4. Run it against `references/banned-language.md`. Should be zero hits.
5. Confirm first person is consistent throughout.
6. Swap a competitor's name in. If it still reads fine, rewrite it.
7. Australian spelling.
