import { PAPER_URL } from "@/lib/site";

export interface GuideReading {
  author: string;
  title: string;
  /** Locus or edition hint — e.g. "Book II, chs. 5 & 12" */
  detail?: string;
  url?: string;
  /** One line on why this reading belongs at this station */
  why: string;
}

export interface GuideSection {
  /** Anchor slug; matches the faculty id where a station exists, so the app can link to /guide#<facultyId> */
  id: string;
  part: number;
  title: string;
  /** Where this material lives in the paper */
  paperRef: string;
  /** Deep link into the 3D view for this section */
  appHref: string;
  appLabel: string;
  color: string;
  body: string[];
  readFirst: GuideReading[];
  goDeeper: GuideReading[];
}

export const GUIDE_PATH = "/guide";

export const GUIDE_TITLE = "Reading Guide";

export const GUIDE_DESCRIPTION =
  "A station-by-station reading guide to the paper and its sources — Aristotle, Aquinas, and Gärdenfors, from formal reception in the senses to the immaterial intellect, with the LLM experiment as coda.";

/** Faculty ids that have a matching guide section anchor */
export const GUIDED_FACULTY_IDS = new Set([
  "reality",
  "senses",
  "common-sense",
  "imagination",
  "cogitative",
  "conceptual-space",
  "memory",
  "intellect",
]);

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "overview",
    part: 1,
    title: "One architecture, three layers",
    paperRef: "Paper §I–II",
    appHref: "/?step=1",
    appLabel: "Story step 1 — the whole tower",
    color: "#f4f4f5",
    body: [
      "The paper makes one move: Gärdenfors' conceptual spaces — a geometric theory in which concepts are convex regions in quality dimensions — are not wrong but incomplete. They occupy the middle of a cognitive hierarchy that Aristotle and Aquinas had already mapped whole: sense perception below, intellect above, and two gaps the modern framework leaves open at each boundary.",
      "Start with §I of the paper for the framework on its own terms, then §II for the unification claim. The 2-minute story mode in the 3D model walks the same arc.",
    ],
    readFirst: [
      {
        author: "Michael Mangialardi",
        title: "Beyond and Below Cognitive Space",
        detail: "The paper this guide accompanies",
        url: PAPER_URL,
        why: "§I introduces the geometry; §II makes the historical claim this guide unpacks station by station.",
      },
      {
        author: "Peter Gärdenfors",
        title: "Conceptual Spaces: The Geometry of Thought",
        detail: "MIT Press, 2000",
        why: "The canonical statement of the framework — dimensions, domains, convex regions, prototypes.",
      },
    ],
    goDeeper: [
      {
        author: "Robert E. Brennan",
        title: "Thomistic Psychology",
        detail: "1941; reprinted by Cluny Media",
        why: "The whole classical hierarchy — external senses to intellect — in one systematic volume.",
      },
      {
        author: "Stanford Encyclopedia of Philosophy",
        title: "Aristotle's Psychology",
        url: "https://plato.stanford.edu/entries/aristotle-psychology/",
        why: "A rigorous free overview of the De Anima framework the paper builds on.",
      },
    ],
  },
  {
    id: "reality",
    part: 2,
    title: "It starts in things",
    paperRef: "Paper §II",
    appHref: "/?step=2",
    appLabel: "Story step 2 — sensible reality",
    color: "#8b6914",
    body: [
      "Aristotle's account of sensation is formal reception: the sense organ takes on the form of the thing without its matter, as wax takes the shape of a signet ring without its gold. What reaches the mind is the thing's own sensible form — not a mere effect of it.",
      "This is the answer to the gap below the framework. Gärdenfors concedes his model structures perceptions rather than things; formal reception is what connects all the later geometry to reality.",
    ],
    readFirst: [
      {
        author: "Aristotle",
        title: "De Anima",
        detail: "Book II, chs. 5 & 12 — the wax and the signet ring",
        url: "http://classics.mit.edu/Aristotle/soul.html",
        why: "The two chapters that define sensation as reception of form without matter.",
      },
      {
        author: "Thomas Aquinas",
        title: "Commentary on De Anima",
        detail: "Book II, on chs. 5 & 12",
        why: "Aquinas' close reading of formal reception — the paper's grounding story in its source.",
      },
    ],
    goDeeper: [
      {
        author: "Robert E. Brennan",
        title: "Thomistic Psychology",
        detail: "Chapters on the external senses",
        why: "How the scholastic tradition systematized reception across the five senses.",
      },
    ],
  },
  {
    id: "senses",
    part: 3,
    title: "Five senses, five geometries",
    paperRef: "Paper §I–II",
    appHref: "/?step=3",
    appLabel: "Story step 3 — the external senses",
    color: "#c45c26",
    body: [
      "Each sense receives only its proper object — color, sound, savor, odor, heat. Aristotle calls these the per se sensibles; Gärdenfors calls them quality domains, each with its own geometry: color a spindle of hue, saturation, and brightness; taste a tetrahedron of sweet, sour, salty, bitter.",
      "This is the first place the two maps visibly coincide: the classical doctrine of proper sensibles and the modern doctrine of quality dimensions carve perception at the same joints.",
    ],
    readFirst: [
      {
        author: "Aristotle",
        title: "De Anima",
        detail: "Book II, chs. 6–11 — proper, common, and incidental sense-objects",
        url: "http://classics.mit.edu/Aristotle/soul.html",
        why: "The threefold division of sensibles that structures everything above it in the tower.",
      },
      {
        author: "Peter Gärdenfors",
        title: "Conceptual Spaces: The Geometry of Thought",
        detail: "Ch. 1, on quality dimensions",
        why: "The color spindle and taste tetrahedron as worked examples of domain geometry.",
      },
    ],
    goDeeper: [
      {
        author: "Thomas Aquinas",
        title: "Summa Theologiae",
        detail: "I, q. 78, a. 3 — the five external senses",
        url: "https://www.newadvent.org/summa/1078.htm",
        why: "Why there are exactly five, and what makes an object 'proper' to a sense.",
      },
    ],
  },
  {
    id: "common-sense",
    part: 4,
    title: "One world from five streams",
    paperRef: "Paper §II",
    appHref: "/?step=4",
    appLabel: "Story step 4 — the common sense",
    color: "#d4845c",
    body: [
      "The common sense (sensus communis) binds the separate quality streams into a single sensible gestalt — the white, sweet, cold thing is one thing. It also perceives what no single sense can: the common sensibles of shape, number, movement, and magnitude.",
      "In the paper's mapping, this binding is what makes a multi-domain conceptual space possible at all: without a faculty that unifies domains, there is no single space for a concept to be a region of.",
    ],
    readFirst: [
      {
        author: "Aristotle",
        title: "De Anima",
        detail: "Book III, chs. 1–2",
        url: "http://classics.mit.edu/Aristotle/soul.html",
        why: "The argument that binding and the common sensibles require a common power.",
      },
      {
        author: "Thomas Aquinas",
        title: "Summa Theologiae",
        detail: "I, q. 78, a. 4 — the four internal senses",
        url: "https://www.newadvent.org/summa/1078.htm",
        why: "The single article that lays out the internal-sense architecture the middle of the tower follows.",
      },
    ],
    goDeeper: [
      {
        author: "Pavel Gregoric",
        title: "Aristotle on the Common Sense",
        detail: "Oxford University Press, 2007",
        why: "The standard modern monograph on what the sensus communis does and doesn't do.",
      },
    ],
  },
  {
    id: "imagination",
    part: 5,
    title: "The image that stays",
    paperRef: "Paper §II",
    appHref: "/?step=5",
    appLabel: "Story step 5 — imagination",
    color: "#5b8a72",
    body: [
      "Imagination (phantasia) holds the sensible gestalt as a phantasm — an image that persists after the thing is gone. Aristotle compares it to a kind of light: it lets us see what was once sensed even after contact ends.",
      "The phantasm is the working material of everything higher. The cogitative power organizes it, memory retains it, and the intellect abstracts from it — which is why this small station carries so much weight.",
    ],
    readFirst: [
      {
        author: "Aristotle",
        title: "De Anima",
        detail: "Book III, ch. 3 — phantasia",
        url: "http://classics.mit.edu/Aristotle/soul.html",
        why: "The chapter that distinguishes imagination from both sensation and thought.",
      },
    ],
    goDeeper: [
      {
        author: "Stanford Encyclopedia of Philosophy",
        title: "Imagination",
        url: "https://plato.stanford.edu/entries/imagination/",
        why: "Situates phantasia against contemporary accounts of mental imagery.",
      },
    ],
  },
  {
    id: "cogitative",
    part: 6,
    title: "Perceiving things as things",
    paperRef: "Paper §II",
    appHref: "/?step=6",
    appLabel: "Story step 6 — the cogitative power",
    color: "#3d8b8b",
    body: [
      "This is the hinge of the paper. The cogitative power (vis cogitativa) perceives incidental sensibles — individual things as such, not just bundles of qualities. Following De Haan, its output is a gestalt percept with three faces: aspectual (what it looks like), actional (what it does), and affectional (what it means for me).",
      "The paper's central claim is that conceptual spaces formalize precisely this faculty: non-logical, categorical perception of individuals, organized by similarity — described seven centuries before the geometry existed to model it.",
    ],
    readFirst: [
      {
        author: "Daniel D. De Haan",
        title: "Perception and the Vis Cogitativa",
        detail:
          "American Catholic Philosophical Quarterly 88(3), 2014 — aspectual, actional, and affectional percepts",
        why: "The percept schema the paper adopts wholesale; the single most important secondary source.",
      },
      {
        author: "Thomas Aquinas",
        title: "Commentary on De Anima",
        detail: "Book II, lect. 13 — cogitative vs. estimative power",
        why: "The classic primary-text passage distinguishing the human cogitative from animal estimation.",
      },
    ],
    goDeeper: [
      {
        author: "Daniel D. De Haan",
        title:
          "The Interaction of Noetic and Psychosomatic Operations in a Thomist Hylomorphic Anthropology",
        why: "How cogitative percepts and intellectual operations cooperate — the vertical wiring of the tower.",
      },
      {
        author: "George P. Klubertanz",
        title: "The Discursive Power",
        detail: "1952 — sources and doctrine of the vis cogitativa",
        why: "The exhaustive historical monograph on this faculty, from Avicenna to Aquinas.",
      },
    ],
  },
  {
    id: "conceptual-space",
    part: 7,
    title: "The phantasm, organized geometrically",
    paperRef: "Paper §I",
    appHref: "/?step=7",
    appLabel: "Story step 7 — conceptual space",
    color: "#4a9eff",
    body: [
      "A conceptual space is the cogitative phantasm laid out as geometry: quality dimensions form domains, concepts are convex regions, the prototype sits at the core, and typicality is distance from it — robin near the center of BIRD, penguin out at the shell.",
      "Note the paper's precision here: the conceptual space is not a faculty but a representation — the product of the cogitative power, not a rival to it. That distinction is what lets the two frameworks nest rather than compete.",
    ],
    readFirst: [
      {
        author: "Peter Gärdenfors",
        title: "Conceptual Spaces: The Geometry of Thought",
        detail: "Chs. 3–4 — concepts as convex regions; prototypes",
        why: "The core of the framework: why convexity, and what prototypes buy you.",
      },
      {
        author: "Eleanor Rosch",
        title: "Cognitive Representations of Semantic Categories",
        detail: "Journal of Experimental Psychology: General 104(3), 1975",
        why: "The experimental typicality data — robins and penguins — that prototype geometry answers to.",
      },
    ],
    goDeeper: [
      {
        author: "Matías Osta-Vélez & Peter Gärdenfors",
        title: "Reasoning with Concepts: A Unifying Framework",
        detail: "Minds and Machines, 2022",
        why: "The framework extended to inference — cited in the paper's account of what the space can do.",
      },
      {
        author: "Stanford Encyclopedia of Philosophy",
        title: "Concepts",
        url: "https://plato.stanford.edu/entries/concepts/",
        why: "Where prototype theories sit among rival theories of concepts.",
      },
    ],
  },
  {
    id: "porphyry",
    part: 8,
    title: "Aristotle's tree, Gärdenfors' regions",
    paperRef: "Paper §II",
    appHref: "/?step=8",
    appLabel: "Story step 8 — the middle layer",
    color: "#818cf8",
    body: [
      "The Porphyry tree divides genus into species by differentia — discrete cuts down a hierarchy. Nested convex regions are the same classification made continuous: BIRD and MAMMAL sit side by side inside ANIMAL, separated by their differentiae.",
      "The paper pushes this into the five predicables — genus, species, differentia, proprium, accident — and maps each onto a Gärdenfors counterpart (superordinate and subordinate levels, defining versus characteristic properties). The legend panel in the 3D model tabulates the correspondence.",
    ],
    readFirst: [
      {
        author: "Porphyry",
        title: "Isagoge",
        detail: "The five predicables and the tree",
        why: "The three-page text that fixed the shape of classification for fifteen centuries.",
      },
      {
        author: "Aristotle",
        title: "Categories",
        why: "The substance/accident architecture underneath the tree.",
      },
    ],
    goDeeper: [
      {
        author: "Stanford Encyclopedia of Philosophy",
        title: "Porphyry",
        url: "https://plato.stanford.edu/entries/porphyry/",
        why: "Context on the Isagoge and its transmission into the medieval curriculum.",
      },
      {
        author: "Thomas Aquinas",
        title: "Commentary on the Posterior Analytics",
        why: "How definition by genus and differentia yields scientific knowledge — cited in §II.",
      },
    ],
  },
  {
    id: "memory",
    part: 9,
    title: "Experience accumulates",
    paperRef: "Paper §II",
    appHref: "/?step=9",
    appLabel: "Story step 9 — memory",
    color: "#7b6b9e",
    body: [
      "Memory retains gestalt percepts with their temporal index — not just the image but the pastness of it. It sits beside the flow rather than on the rise: repeated encounters gradually carve the regions of the conceptual space.",
      "This is how the space gets its shape over a lifetime. Prototypes are not innate; they are sedimented experience, which is why the classical pairing of memory with the cogitative power matters to the geometry.",
    ],
    readFirst: [
      {
        author: "Aristotle",
        title: "On Memory and Reminiscence",
        url: "http://classics.mit.edu/Aristotle/memory.html",
        why: "The short treatise on retention and the temporal index of images.",
      },
      {
        author: "Thomas Aquinas",
        title: "Commentary on De Memoria et Reminiscentia",
        why: "Aquinas on why memory of the past requires more than stored images — cited in §II.",
      },
    ],
    goDeeper: [
      {
        author: "David Bloch",
        title: "Aristotle on Memory and Recollection",
        detail: "Brill, 2007",
        why: "Text, translation, and the scholarly state of the art on the treatise.",
      },
    ],
  },
  {
    id: "intellect",
    part: 10,
    title: "Beyond typicality: necessity",
    paperRef: "Paper §III",
    appHref: "/?step=10",
    appLabel: "Story step 10 — the intellect",
    color: "#e8c547",
    body: [
      "Typicality is always defeasible — the penguin is still a bird. But humans also grasp necessary truths: that every bird is an animal is not a fact about distances in a space. The paper argues no amount of prototype geometry produces necessity and universality; that is the gap above the framework.",
      "The classical answer is the intellect, which abstracts the intelligible species — essence without matter — and classifies by predicables and categories rather than by degree. §III develops James Ross's argument that this determinate, formal thinking cannot be a material process at all.",
    ],
    readFirst: [
      {
        author: "James F. Ross",
        title: "Immaterial Aspects of Thought",
        detail: "Journal of Philosophy 89(3), 1992",
        why: "The modern argument for the intellect's immateriality that §III leans on.",
      },
      {
        author: "Aristotle",
        title: "De Anima",
        detail: "Book III, chs. 4–5 — the intellect",
        url: "http://classics.mit.edu/Aristotle/soul.html",
        why: "The famously compressed chapters on nous that the whole tradition interprets.",
      },
    ],
    goDeeper: [
      {
        author: "Joshua Lee Harris",
        title: "Indeterminacy and the Immateriality of Thought",
        detail: "Revista Portuguesa de Filosofia 80(3), 2024 — on Ross's natural and formal structures",
        url: "https://philpapers.org/rec/HARIAT-14",
        why: "The reading of Ross the paper works from, defending the argument against its main objection.",
      },
      {
        author: "Edward Feser",
        title: "Kripke, Ross, and the Immaterial Aspects of Thought",
        detail: "American Catholic Philosophical Quarterly 87(1), 2013",
        why: "Defends and extends Ross's argument against the main objections.",
      },
      {
        author: "Aristotle",
        title: "Posterior Analytics",
        detail: "Book I — demonstration and necessity",
        why: "What 'necessary and universal' knowledge means in the Aristotelian sense.",
      },
    ],
  },
  {
    id: "llm-coda",
    part: 11,
    title: "Coda: the geometry inside the machines",
    paperRef: "Paper §IV",
    appHref: "/",
    appLabel: "Open the 3D model",
    color: "#f472b6",
    body: [
      "The paper closes with an experiment: probing a frozen GPT-2 with explicitly ontological vocabulary. The result suggests Aristotle's predicables are latent in the embedding geometry — prompts naming genus, differentia, and proprium separate defining from characteristic properties where neutral scaffolding does not.",
      "The implication runs both ways: conceptual-space structure can be extracted from language models, and the vocabulary you probe with is not philosophically neutral. LLMs, on this view, are cogitative-level artifacts — geometry without intellect.",
    ],
    readFirst: [
      {
        author: "Michael Mangialardi",
        title: "Beyond and Below Cognitive Space",
        detail: "§IV — the GPT-2 probing experiment",
        url: PAPER_URL,
        why: "The experiment itself: setup, prompts, and the geometric separation result.",
      },
      {
        author: "Kumar, Chatterjee & Schockaert",
        title: "Extracting Conceptual Spaces from LLMs Using Prototype Embeddings",
        why: "The prior art the experiment builds on — conceptual spaces recovered from model embeddings.",
      },
    ],
    goDeeper: [
      {
        author: "Park, Choe & Veitch",
        title: "The Linear Representation Hypothesis and the Geometry of Large Language Models",
        detail: "arXiv, 2023",
        why: "The broader interpretability program: concepts as directions and regions in embedding space.",
      },
      {
        author: "Alexander Lerchner",
        title: "The Abstraction Fallacy: Why AI Can Simulate But Not Instantiate Consciousness",
        detail: "PhilArchive, 2026",
        url: "https://philarchive.org/rec/LERTAF",
        why: "Why simulating a cognitive structure may not be instantiating it — cited in the paper's conclusion.",
      },
    ],
  },
];
