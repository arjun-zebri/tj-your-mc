/**
 * Question and answer pairs.
 *
 * This array feeds both the visible FAQ and the FAQPage schema, so the two can
 * never disagree. Never hand write a second copy alongside the rendered list.
 *
 * Every answer must stand on its own without the ones around it. An answer
 * engine lifts one of these at a time. See
 * .claude/skills/local-seo-pages/references/aeo-writing.md
 */

export type Faq = {
  question: string;
  /** Plain text. Kept free of markup so it can go straight into JSON-LD. */
  answer: string;
  /** Set false while an answer is still blocked on TJ, so it renders nowhere and emits no schema. */
  ready: boolean;
};

export const faqs: Faq[] = [
  {
    question: "What does a wedding MC actually do?",
    answer:
      "An MC runs your reception. That means introducing the wedding party, managing the running order, cueing the speeches and keeping them to time, coordinating with your venue and photographer, and keeping the energy up between the formal moments. The MC is the person who makes sure the night moves.",
    ready: true,
  },
  {
    question: "Is an MC the same as a Celebrant?",
    answer:
      "No. A Celebrant performs the legal marriage ceremony and lodges the paperwork. An MC hosts the event, usually the reception. Most Sydney weddings have both, and they are different people doing different jobs on the same day. I am an MC.",
    ready: true,
  },
  {
    question: "Can we just ask a friend to do it?",
    answer:
      "You can, and sometimes it works. The risk is that your funniest mate is also a guest, which means he is drinking, he wants to enjoy the night, and he has never run a room of two hundred people to a schedule. If it goes wrong it is awkward for everyone and he feels terrible about it.",
    ready: true,
  },
  {
    question: "What happens if the night runs behind?",
    answer:
      "It usually does, by a bit. Speeches run long, the kitchen shifts, someone is missing when they are needed. My job is to absorb that so you never feel it. I move the order around, buy time where it is cheap to lose, and protect the parts of the night that matter most to you.",
    ready: true,
  },
  {
    question: "Do you write the run sheet, or do we?",
    answer:
      "We do it together, off a call. You tell me who is speaking, what matters to you and what you would rather skip. I tell you what will run long, where the gaps will open up and what order actually works, and you decide. It stays your run sheet. Once it is settled I make sure your venue, photographer and band are all working from the same version.",
    ready: true,
  },
  {
    question: "What do you need from us before the day?",
    answer:
      "Not much, and none of it early. Your running order, the names of anyone being introduced with the pronunciations you use, who is speaking and in what order, and your venue contact. I chase the rest myself rather than adding another supplier to the list of people asking you questions.",
    ready: true,
  },
  {
    question: "Do we need an MC if we have a DJ?",
    // [NEEDS TJ: his answer. He works alongside DJs constantly and will have a
    // better one than we would write.]
    answer: "",
    ready: false,
  },
  {
    question: "How far in advance should we book?",
    // [NEEDS TJ: how far ahead does his diary usually fill?]
    answer: "",
    ready: false,
  },
  {
    question: "How much does a wedding MC cost in Sydney?",
    // [NEEDS TJ: blocked on pricing.]
    answer: "",
    ready: false,
  },
];

/** Only answered questions render and only answered questions get marked up. */
export const readyFaqs = faqs.filter((faq) => faq.ready && faq.answer.length > 0);
