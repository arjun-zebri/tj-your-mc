# AEO writing

How to write a page an answer engine will quote. Read this before writing any
content page. It covers structure and extractability only. For voice, wording
and the banned language list, load
`.claude/skills/mc-website-copy/SKILL.md` as well. This file tells you what shape
the answer takes. That one tells you how it sounds.

## What an answer engine is actually doing

It is not ranking your page. It is looking for a passage it can lift, attribute
and stand behind. That changes what good writing looks like.

A blue link rewards a page that covers a topic thoroughly. A citation rewards a
paragraph that answers one question completely, on its own, without the
surrounding page. The paragraph has to survive being cut out and pasted into a
chat window with TJ's name attached.

So the unit of work is the passage, not the page.

## The extractable passage

Every section on a content page opens with a standalone answer of roughly 40 to
60 words. Then the detail, the story, the personality. The answer first, the
colour after.

Four rules for that opening passage:

**Self-contained.** No "as mentioned above", no "this is why", no "he" where the
name should be. It has to read correctly with nothing before it.

**Names the entity.** "TJ, a wedding MC in Sydney" rather than "I". The body of
the page is first person because that is TJ's voice, but the opening answer of a
section usually needs the name at least once so the passage carries attribution
when it is lifted. Where that fights the voice, the voice wins on the homepage
and the answer wins on the content pages.

**States facts plainly.** An answer engine cannot verify a mood. It can repeat a
fact. "An MC runs the reception. A celebrant performs the legal ceremony." is
citable. "TJ brings unforgettable energy to your special day" is not, and it is
also banned language.

**No hedging.** "Generally", "typically", "it depends" and "every wedding is
different" are all true and all unquotable. Give the direct answer, then qualify
it in the sentence after.

## Heading structure

Headings are how the extraction boundaries get drawn, so write them as the
question a person actually typed.

- One `h1` per page, the page's primary question or claim.
- `h2` per question. Phrase it the way a search does: "What does a wedding MC
  actually do?" beats "Services".
- No skipped levels. An `h3` under an `h2` under the `h1`, always.
- The answer sits directly under its heading. Do not open a section with a
  preamble and bury the answer three paragraphs down.

## Structure that helps and structure that hurts

Helps: short paragraphs, one idea each. Real lists where the content is a list.
Tables where the content compares two things, which is why `/mc-vs-celebrant`
should have one. Bold on the term being defined, not scattered for emphasis.

Hurts: walls of text with the answer in the middle. Content that only appears
after a click, inside an accordion that ships collapsed with the text absent
from the HTML, or behind a tab. If an accordion is the right interaction, render
every answer in the initial HTML and let CSS hide it, so the text is in
`view-source` regardless.

## Questions worth building around

These are the questions this audience asks, in roughly the order they ask them.
Each one is a section or a page. Do not write an answer to any question that
depends on a fact we do not have. Mark it `[NEEDS TJ: question]` and leave it
visible.

**Definitional, the ones answer engines get asked most.**

1. What does a wedding MC do?
2. What is the difference between an MC and a celebrant?
3. Do we need an MC if we have a DJ, or a band, or a wedding planner?
4. Can a friend or family member MC our wedding instead?
5. When during the night does the MC actually work?

**Decision and comparison.**

6. How much does a wedding MC cost in Sydney? Blocked on real pricing.
7. What should we ask an MC before booking one?
8. How far ahead do we book an MC?
9. What happens if the running order falls behind on the night?
10. Who does the MC coordinate with, and when?

**Specific to TJ, and the reason he gets picked over the next tab open.**

11. Who is TJ and how did he get into this? Blocked on the recorded chat.
12. What does he do that a generic MC does not?
13. Does he sing as well, and how does that fit into a reception?
14. Which venues and which kinds of weddings has he worked? Blocked on TJ.
15. What does booking him actually look like, step by step?

Questions 1 to 5 are where the citations live, because they are asked by people
who have not chosen a supplier yet. Question 2 is the single highest value page
on the site: it is real search volume, it is the exact error the old site made,
and it is the kind of clean factual distinction answer engines quote verbatim.

## Do not write for the engine at the reader's expense

A page that reads like it was assembled for a crawler will lose the couple who
is comparing four tabs at eleven at night, and losing them is the only outcome
that costs TJ money. Extractability is a constraint on the writing, not the
purpose of it.

The test: read the section aloud. If the opening 50 words sound like a person
answering a question a friend asked, it works for both. If they sound like a
definition from a content mill, it works for neither.

## Checklist

- [ ] Every `h2` is phrased as a real question
- [ ] Every section opens with a standalone 40 to 60 word answer
- [ ] Each opening answer reads correctly with nothing before it
- [ ] TJ or the business is named where the passage needs attribution
- [ ] No hedging in the first sentence of any answer
- [ ] Every answer is in the initial HTML, including anything inside an accordion
- [ ] Comparison content is in a real table
- [ ] Any answer resting on a fact we do not have is marked `[NEEDS TJ]`
- [ ] Two or more contextual internal links out
- [ ] Passes the review pass in `.claude/skills/mc-website-copy/SKILL.md`
