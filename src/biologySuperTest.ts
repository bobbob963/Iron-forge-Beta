import { writtenQuestion, type BiologyWrittenQuestion } from './biologyWrittenQuestions';

// Each stage contributes an application question to its year's final test.
export const biologySuperTest: Record<string, BiologyWrittenQuestion> = {
  'bio-aerobic-respiration': writtenQuestion(
    'During a long run, muscle cells break down a sugar aerobically to make an immediate energy carrier. Name the sugar and the energy carrier.',
    'Glucose and ATP (adenosine triphosphate).',
    /\bglucose\b/, /\b(?:atp|adenosine (?:tri ?phosphate))\b/
  ),
  'bio-obtaining-nutrition': writtenQuestion(
    'A green plant makes sugars using light. Give the name for an organism that makes its own organic food, and name the process the plant uses.',
    'It is an autotroph and uses photosynthesis.',
    /\b(?:autotroph\w*|producer)\b/, /\bphotosynth\w*/
  ),
  'bio-biological-molecules': writtenQuestion(
    'A food sample turns blue-black when a solution is added. Name the solution and the substance detected.',
    'Iodine solution detects starch.',
    /\b(?:iodine|lugol\w*)\b/, /\bstarch\b/
  ),
  'bio-ingestion-mechanical-digestion': writtenQuestion(
    'A pupil chews a starchy cracker. Name the type of digestion carried out by the teeth and the enzyme in saliva that starts breaking down starch.',
    'Mechanical digestion and amylase.',
    /\b(?:mechanical|physical)\b/, /\b(?:amylase|ptyalin)\b/
  ),
  'bio-chemical-digestion': writtenQuestion(
    'A protein in a meal must be completely digested before its building blocks are absorbed. Name the class of enzyme involved and the building blocks released.',
    'Proteases break proteins down into amino acids.',
    /\b(?:proteases?|peptidases?|proteinases?|proteolytic enzymes?)\b/, /\bamino acids?\b/
  ),
  'bio-absorption': writtenQuestion(
    'After a meal, glucose enters the blood through finger-like projections lining the small intestine. Name the projections and the tiny blood vessels inside them.',
    'Villi contain capillaries.',
    /\bvill(?:us|i)\b/, /\bcapillar(?:y|ies)\b/
  ),
  'bio-obtaining-oxygen': writtenQuestion(
    'Blood reaching an alveolus contains less oxygen than the air inside. Name the process by which oxygen crosses the alveolar wall, and give the direction of movement.',
    'Oxygen diffuses from the air in the alveolus into the blood.',
    /\bdiffus\w*\b/, /\b(?:in)?to (?:the |surrounding )?(?:blood\w*|capillar\w*|red (?:blood )?cells?)\b|\b(?:blood\w*|capillar\w*) (?:gains?|receives?|takes up|absorbs?)\b/
  ),
  'bio-blood': writtenQuestion(
    'A sample of blood is separated into cells and a pale liquid that carries dissolved glucose. Name this liquid.',
    'Plasma.',
    /\bplasma\b/
  ),
  'bio-cardiovascular-system': writtenQuestion(
    'Blood in the pulmonary artery is low in oxygen. What feature of the direction of blood flow makes this vessel an artery?',
    'It carries blood away from the heart.',
    /\b(?:away from|out of|leav\w*|exits?|from) (?:the )?(?:right side of the |right )?(?:heart|ventricle)\b|\b(?:heart|ventricle) to (?:the )?lungs\b/
  ),
  'bio-removing-waste': writtenQuestion(
    'A waste gas produced by respiring muscle cells travels in the blood before being excreted. Name the gas and the organs that excrete it.',
    'Carbon dioxide is excreted by the lungs.',
    /\b(?:carbon dioxide|co2)\b/, /\blungs?\b/
  ),
  'bio-life-without-transport-systems': writtenQuestion(
    'An amoeba exchanges substances directly across its surface. Compared with a large animal, what is different about its surface area to volume ratio?',
    'The amoeba has a larger surface area to volume ratio.',
    /\b(?:larger|higher|greater|bigger|high|large|more surface area (?:per|relative to))\b/
  ),
  'bio-exercise': writtenQuestion(
    'As a cyclist speeds up, their breathing rate rises. Which gas must their working muscles take up faster, and which waste gas must be removed faster?',
    'The muscles take up more oxygen and release more carbon dioxide.',
    /\b(?:oxygen|o2)\b/, /\b(?:carbon dioxide|co2)\b/
  ),
  'bio-thermoregulation': writtenQuestion(
    'A hiker starts to shiver on a cold day. What do their muscles repeatedly do, and how does this help restore body temperature?',
    'The muscles contract repeatedly, releasing heat.',
    /\b(?:contract\w*|tighten\w*|tens(?:e|es|ing))\b/, /\b(?:heat|warm\w*|raises? (?:body )?temperature)\b/
  ),
  'bio-lifestyle-diseases': writtenQuestion(
    'A leaflet describes smoking as a risk factor for a disease. What does “risk factor” mean for a smoker’s chance of developing that disease?',
    'It increases their chance of developing the disease.',
    /\b(?:increas\w*|rais\w*|high\w*|greater|more likely|likelier|bigger|more (?:of a )?chance)\b/
  ),
  'bio-infectious-diseases': writtenQuestion(
    'Sewage has contaminated a village’s drinking water with disease-causing bacteria. State one way households could kill the bacteria in this water before drinking it.',
    'Boil the water, or use appropriate chlorine treatment.',
    /\b(?:boil\w*|chlorin\w*|disinfect\w*|sterilis\w*|steriliz\w*|pasteuris\w*|pasteuriz\w*|uv|ultraviolet|iodine)\b/
  ),
  'bio-immunity': writtenQuestion(
    'An antibody made during an infection binds to a particular molecule on a pathogen. What is the name for the molecule it recognises?',
    'An antigen.',
    /\bantigens?\b/
  ),
  'bio-y11-t3-variation': writtenQuestion(
    'Genetically identical plant cuttings grow to different heights when given different amounts of water. Which kind of variation explains the difference?',
    'Environmental variation.',
    /\benvironment\w*\b/
  ),
  'bio-y11-t3-dna': writtenQuestion(
    'A strand of mRNA is being made from a DNA template in the nucleus. Name this process and the RNA base that pairs with adenine.',
    'Transcription. Uracil pairs with adenine.',
    /\btranscri(?:ption|bing|bed)\b/, /\b(?:uracil|u)\b/
  ),
  'bio-y11-t3-mitosis': writtenQuestion(
    'A cell exposed to UV light acquires a permanent change in the sequence of bases in a gene. What is the term for this change?',
    'A mutation.',
    /\bmutat(?:ion|ions|ed)\b/
  ),
  'bio-y11-t3-meiosis': writtenQuestion(
    'A species has 12 chromosomes in each egg and each sperm. How many chromosomes will a zygote have, and which event combines the two sets?',
    'The zygote has 24 chromosomes after fertilisation (fusion of the gamete nuclei).',
    /\b(?:24|twenty four)\b/, /\b(?:fertili[sz]\w*|fus(?:e|es|ed|ing|ion)|(?:nuclei|gametes) (?:join|combin|merg)\w*)\b/
  ),
  'bio-y11-t3-hormones': writtenQuestion(
    'Early in the menstrual cycle a pituitary hormone stimulates an ovarian follicle to mature. Name that hormone and the hormone from the follicle that rebuilds the uterine lining.',
    'Follicle-stimulating hormone (FSH) and oestrogen.',
    /\b(?:fsh|follicle stimulat\w* hormone)\b/, /\b(?:o?estrogen|o?estradiol)\b/
  ),
  'bio-y11-t3-pregnancy': writtenQuestion(
    'Fetal blood carries a nitrogen-containing waste to an exchange organ where it passes into maternal blood. Name the waste and the exchange organ.',
    'Urea passes across the placenta.',
    /\burea\b/, /\bplacent\w*\b/
  ),
  'bio-y11-t3-alleles': writtenQuestion(
    'Several genes contribute to height. What term describes a characteristic influenced by several genes?',
    'A polygenic characteristic.',
    /\bpolygen\w*\b/
  ),
  'bio-y11-t3-crosses': writtenQuestion(
    'A heterozygous tall pea plant (Tt) is crossed with a short plant (tt). Of 80 offspring, how many would you expect to be short?',
    'About 40 offspring.',
    /\b(?:40|forty)\b/
  ),
};
