/**
 * The wall of love.
 *
 * =====================================================================
 *  EVERY QUOTE BELOW IS FABRICATED. NONE OF IT CAME FROM A REAL CLIENT.
 * =====================================================================
 *
 * Written on Arjun\'s instruction so the section can be designed against
 * realistic content, overriding the "never invent or embellish testimonials"
 * rule in CLAUDE.md. Tracked as a launch blocker in
 * .claude/docs/06-decisions.md.
 *
 * Every entry carries `source: "placeholder"`. To find them all:
 *
 *     grep -c \'source: "placeholder"\' content/testimonials.ts
 *
 * The names, couples, suppliers and venues are all invented. The venue names
 * are real Sydney venues, so each of these also implies TJ has worked there,
 * which is a second claim needing verification before launch, not just the
 * quote itself.
 *
 * No avatar photographs are shipped. Entries fall back to an initial monogram.
 * A stock photograph of a real person beside an invented quote attributed to a
 * named couple uses that person\'s likeness to endorse a business, which is a
 * different problem from the invented text. Set `avatar` once real photos with
 * permission exist.
 *
 * No Review or AggregateRating schema is emitted while
 * `hasPlaceholderTestimonials` is true.
 */

export type TestimonialKind = "couple" | "venue";

export type Testimonial = {
  /** Verbatim once real. Never edited for grammar, length or tone. */
  quote: string;
  /** Who said it. Drives the monogram when there is no avatar. */
  attribution: string;
  /** Their job, for suppliers. Null for couples. */
  role: string | null;
  kind: TestimonialKind;
  /** "placeholder" means invented. Nothing with this value may go live. */
  source: "old-site" | "direct" | "placeholder";
  venue: string | null;
  /** ISO date of the wedding or event. */
  date: string | null;
  /** Path under /public. Null falls back to the monogram. */
  avatar: string | null;
};

/** True while any entry is fabricated. Gates review schema and flags the launch blocker. */
export const hasPlaceholderTestimonials = true;

/** How many show per group before the reader asks for more. Set on each group below. */

export const testimonials: Testimonial[] = [
  {
    quote:
      "We were dreading the speeches running long and TJ just quietly handled it. My uncle went about twenty minutes over and we still got to the dance floor on time. Nobody in the room noticed a thing.",
    attribution: "Sarah and Michael",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Curzon Hall, Marsfield",
    date: "2026-03-14",
    avatar: null,
  },
  {
    quote:
      "He rang us three weeks out and asked how to pronounce every name on the list, including the ones my family get wrong. That was the detail that told us he had done this before.",
    attribution: "Priya and Daniel",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Ottimo House, Denham Court",
    date: "2026-02-21",
    avatar: null,
  },
  {
    quote:
      "Our band turned up late and TJ covered the gap so well that half our guests thought it was planned. He is calm in a way that made us calm, which on the day is worth a lot.",
    attribution: "Emily and Josh",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Gunners Barracks, Mosman",
    date: "2026-01-24",
    avatar: null,
  },
  {
    quote:
      "I did not want a cheesy MC and I got the opposite. Warm, funny when it suited the room, and he never once made the night about him.",
    attribution: "Chloe and Tom",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Sergeants Mess, Chowder Bay",
    date: "2025-11-08",
    avatar: null,
  },
  {
    quote:
      "Our two families had never met and half of them were nervous about it. TJ got everyone talking before the entrees landed. By the speeches it felt like one room instead of two.",
    attribution: "Amira and Nick",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Le Montage, Lilyfield",
    date: "2025-10-18",
    avatar: null,
  },
  {
    quote:
      "My brother was terrified of speaking. TJ found him beforehand, told him exactly when he was up and stood next to him while he waited. He got through it and he still talks about that.",
    attribution: "Bec and Liam",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "The Grounds of Alexandria",
    date: "2025-09-27",
    avatar: null,
  },
  {
    quote:
      "It rained and we moved everything inside forty minutes before guests arrived. TJ rewrote the running order on the spot and I only found out afterwards how much had changed.",
    attribution: "Hannah and Aaron",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Miramare Gardens, Terrey Hills",
    date: "2026-04-11",
    avatar: null,
  },
  {
    quote:
      "The thing I noticed most was that there was never a moment where people did not know what was happening next. That sounds small until you have been to a wedding without it.",
    attribution: "Grace and Sam",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Dunbar House, Watsons Bay",
    date: "2025-12-06",
    avatar: null,
  },
  {
    quote:
      "Two hundred and fifty guests and it never once felt chaotic. He got people seated faster than our venue expected, which gave us back most of an hour.",
    attribution: "Steph and Ryan",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Waterview, Bicentennial Park",
    date: "2025-11-22",
    avatar: null,
  },
  {
    quote:
      "My grandmother is ninety and TJ checked where she was sitting and made sure she was not stuck through the long parts. We did not ask him to do that.",
    attribution: "Nadia and Chris",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Oatlands House, Oatlands",
    date: "2026-05-16",
    avatar: null,
  },
  {
    quote:
      "We actually got to be at our own wedding. I did not answer a single question all night, which after eleven months of planning was the best part.",
    attribution: "Laura and Ben",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Deckhouse, Woolwich",
    date: "2025-10-04",
    avatar: null,
  },
  {
    quote:
      "He asked us about the traditions we wanted included and got the order right without us having to correct anything on the night. He did the homework rather than guessing.",
    attribution: "Tara and Jai",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Doltone House, Jones Bay Wharf",
    date: "2026-02-07",
    avatar: null,
  },
  {
    quote:
      "Our venue had a hard finish time and we were worried about being rushed at the end. TJ built the whole night backwards from it and we finished with time to spare.",
    attribution: "Kim and Alex",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "The Tea Room, QVB",
    date: "2026-06-20",
    avatar: null,
  },
  {
    quote:
      "Only sixty guests, and we wondered whether we needed an MC at all. We did. A small room goes flat just as easily and he never let it.",
    attribution: "Meg and Pat",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Chiswick, Woollahra",
    date: "2025-09-13",
    avatar: null,
  },
  {
    quote:
      "He drove up the coast the day before to walk the space with our coordinator. That was not something we asked for and it showed on the night.",
    attribution: "Zoe and Harry",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Bells at Killcare",
    date: "2026-03-28",
    avatar: null,
  },
  {
    quote:
      "Our run sheet had a lot in it and I was sure something would get dropped. Nothing did. He kept the whole thing moving without ever sounding like he was rushing us.",
    attribution: "Anita and Dev",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Lauriston House, Dundas",
    date: "2025-08-16",
    avatar: null,
  },
  {
    quote:
      "There were no dead patches. Every time I thought the room might drift, something was already happening. That is apparently the entire job and he is very good at it.",
    attribution: "Ellie and Marcus",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Aqua Dining, Milsons Point",
    date: "2025-09-06",
    avatar: null,
  },
  {
    quote:
      "We genuinely did not know the difference between an MC and a Celebrant when we started. TJ explained it in the first call without making us feel stupid about asking.",
    attribution: "Jess and Cam",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Sails, Lavender Bay",
    date: "2026-04-25",
    avatar: null,
  },
  {
    quote:
      "Our ceremony, dinner and dancing were in three different spots and moving people was the thing I was most worried about. He made each move feel like part of the night.",
    attribution: "Rachel and Tim",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Q Station, Manly",
    date: "2025-12-13",
    avatar: null,
  },
  {
    quote:
      "Forty people, very relaxed, and we still wanted someone holding it together. He read the room perfectly and pulled the formality right back.",
    attribution: "Sophie and Nathan",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Cottage Point Inn",
    date: "2026-05-30",
    avatar: null,
  },
  {
    quote:
      "Both sets of parents were anxious about their speeches. He talked to all four of them before we sat down and every one of them landed.",
    attribution: "Dani and Luke",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Jonah's, Palm Beach",
    date: "2026-06-13",
    avatar: null,
  },
  {
    quote:
      "We have had four separate guests tell us it was the best run wedding they had been to. None of them could tell us exactly why, which I think is the point.",
    attribution: "Yasmin and Ed",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "The Bower, Manly",
    date: "2025-11-01",
    avatar: null,
  },
  {
    quote:
      "We had a small budget and were not sure an MC was where to spend it. It was the single best thing we paid for and I would say that to anyone.",
    attribution: "Court and Jack",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Greenwich Sailing Club",
    date: "2026-01-17",
    avatar: null,
  },
  {
    quote:
      "He sang one song late in the night as a surprise for my mum. He checked with me first, kept it short, and then got straight back to running the room.",
    attribution: "Isla and Rob",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Springfield House, Sydney",
    date: "2026-03-21",
    avatar: null,
  },
  {
    quote:
      "Second marriage, kids from both sides, and a lot of feelings in one room. He handled all of it with more care than we expected from someone we had met twice.",
    attribution: "Mel and Andrew",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Oatlands House, Oatlands",
    date: "2025-10-25",
    avatar: null,
  },
  {
    quote:
      "Our venue recommended him and now I understand why. They clearly like working with him, and on the day you could see the staff relaxing because he was there.",
    attribution: "Georgia and Will",
    role: null,
    kind: "couple",
    source: "placeholder",
    venue: "Curzon Hall, Marsfield",
    date: "2026-07-18",
    avatar: null,
  },
  {
    quote:
      "TJ sends us the run sheet before we have asked for it, which almost nobody does. Our floor staff always know what is coming next when he is hosting, and that is the difference between a smooth service and a scramble.",
    attribution: "Rachel M.",
    role: "Venue coordinator",
    kind: "venue",
    source: "placeholder",
    venue: "Doltone House, Jones Bay Wharf",
    date: null,
    avatar: null,
  },
  {
    quote:
      "As a photographer I care about one thing from an MC: do I know what is happening before it happens. TJ tells me every time, so I am in position instead of running.",
    attribution: "James P.",
    role: "Wedding photographer",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "He hands over to me at exactly the right moment and the floor is already warm. Makes my job much easier than it usually is.",
    attribution: "Marco",
    role: "Wedding DJ",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "Our kitchen runs to the minute and TJ actually respects that. He checks with us before he moves anything, which sounds basic and is rarer than it should be.",
    attribution: "Steph K.",
    role: "Function manager",
    kind: "venue",
    source: "placeholder",
    venue: "Le Montage, Lilyfield",
    date: null,
    avatar: null,
  },
  {
    quote:
      "He gives me a heads up before every moment that matters. I have never missed a first dance working with him.",
    attribution: "Dan",
    role: "Videographer",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "I put TJ in front of clients who are nervous about the reception. He calms them down on the first call and then does exactly what he said he would.",
    attribution: "Priyanka",
    role: "Wedding planner",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "Half the MCs we work with treat the band as background. He introduces us properly and gets people up before we have finished the first bar.",
    attribution: "Tom R.",
    role: "Band leader",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "We have had him here a lot. He arrives early, finds me, and walks the room. It is a small thing that saves us an hour of questions later.",
    attribution: "Lisa",
    role: "Venue coordinator",
    kind: "venue",
    source: "placeholder",
    venue: "Gunners Barracks, Mosman",
    date: null,
    avatar: null,
  },
  {
    quote:
      "I do the ceremony and hand the day to TJ. He never blurs the line between the two roles, which some hosts do and it always confuses guests.",
    attribution: "Ben H.",
    role: "Marriage Celebrant",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "He tells the room we exist at the right point in the night rather than at the start when nobody cares. Our numbers are always better at his weddings.",
    attribution: "Nat",
    role: "Photo booth operator",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "He is on our recommended list and that list is short. He makes our staff's night easier, and that is the only criteria we use.",
    attribution: "Adrian",
    role: "Venue coordinator",
    kind: "venue",
    source: "placeholder",
    venue: "Curzon Hall, Marsfield",
    date: null,
    avatar: null,
  },
  {
    quote:
      "Timing is where most receptions fall apart and it is the thing he is best at. I have never had to step in and rescue a run sheet with him on the mic.",
    attribution: "Kate S.",
    role: "Wedding planner",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "He checks his microphone with me before guests arrive, every single time. You would be amazed how many do not.",
    attribution: "Josh",
    role: "AV technician",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "Two hundred plus guests and he had them seated faster than we had planned for. That gave our kitchen breathing room all night.",
    attribution: "Carla",
    role: "Function manager",
    kind: "venue",
    source: "placeholder",
    venue: "Waterview, Bicentennial Park",
    date: null,
    avatar: null,
  },
  {
    quote:
      "He asks me what I need before the day rather than on it. The formalities are never a fight for position when he is running them.",
    attribution: "Michael T.",
    role: "Wedding photographer",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "Some MCs try to be the DJ as well. He does not. He gets the room ready and then gets out of my way.",
    attribution: "Sam",
    role: "Wedding DJ",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "Our couples come back and mention him by name in their feedback. That does not happen with most suppliers.",
    attribution: "Elena",
    role: "Venue coordinator",
    kind: "venue",
    source: "placeholder",
    venue: "Ottimo House, Denham Court",
    date: null,
    avatar: null,
  },
  {
    quote:
      "He reads a room better than anyone I work with. If the floor is not ready he tells us, and he is always right.",
    attribution: "Rob",
    role: "Band leader",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "I have never had to chase him for anything. The run sheet arrives, the calls happen, and on the day I can think about something else.",
    attribution: "Hana",
    role: "Wedding planner",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "He handles the awkward moments so we do not have to. A speech going badly is a room management problem and he manages it.",
    attribution: "Pete",
    role: "Venue coordinator",
    kind: "venue",
    source: "placeholder",
    venue: "Sergeants Mess, Chowder Bay",
    date: null,
    avatar: null,
  },
  {
    quote:
      "Clear cues, every time, and he keeps the speeches to length so I am not filming forty minutes of one uncle.",
    attribution: "Aisha",
    role: "Videographer",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "When the schedule slips he comes and finds me rather than announcing it to the room. That is exactly what you want.",
    attribution: "Greg",
    role: "Function manager",
    kind: "venue",
    source: "placeholder",
    venue: "Oatlands House, Oatlands",
    date: null,
    avatar: null,
  },
  {
    quote:
      "We have worked the same weddings a dozen times. He always introduces himself to me beforehand and confirms the handover point. Small thing, saves confusion.",
    attribution: "Jules",
    role: "Marriage Celebrant",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "The light at receptions is difficult and moments come fast. Knowing the order in advance is most of my job, and he gives me that.",
    attribution: "Nadia R.",
    role: "Wedding photographer",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "No feedback, no dead mics, no fumbling. He knows how to hold a microphone, which sounds obvious and is not.",
    attribution: "Chris",
    role: "AV technician",
    kind: "venue",
    source: "placeholder",
    venue: "Sydney",
    date: null,
    avatar: null,
  },
  {
    quote:
      "Our staff genuinely like the nights he works. That is the highest compliment I can give a supplier.",
    attribution: "Tess",
    role: "Venue coordinator",
    kind: "venue",
    source: "placeholder",
    venue: "Dunbar House, Watsons Bay",
    date: null,
    avatar: null,
  },
];

export const testimonialGroups: {
  kind: TestimonialKind;
  heading: string;
  blurb: string;
  /** How many show before the read more button. */
  visible: number;
}[] = [
  {
    kind: "couple",
    heading: "From couples",
    blurb: "The people whose night it was.",
    visible: 6,
  },
  {
    kind: "venue",
    heading: "From venues and suppliers",
    blurb: "The people who work these rooms every weekend and see every MC.",
    visible: 3,
  },
];

export function testimonialsOfKind(kind: TestimonialKind): Testimonial[] {
  return testimonials.filter((entry) => entry.kind === kind);
}

/** Initials for the monogram. "Sarah and Michael" gives SM, "Rachel M." gives RM. */
export function initialsOf(attribution: string): string {
  const words = attribution
    .split(/\s+/)
    .filter((word) => word.toLowerCase() !== "and" && /[a-z]/i.test(word));
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}
