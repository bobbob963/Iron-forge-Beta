export interface BiologyWrittenQuestion {
  type: 'written'
  q: string
  answer: string
  marks: RegExp[]
}

/** Each expression covers alternative ways to express one required idea. */
export function writtenQuestion(q: string, answer: string, ...marks: RegExp[]): BiologyWrittenQuestion {
  return { type: 'written', q, answer, marks }
}

export function markBiologyWritten(question: Pick<BiologyWrittenQuestion, 'marks'>, response: unknown) {
  if (typeof response !== 'string') return false
  const text = response.normalize('NFKC').toLowerCase()
    .replace(/[‐‑–—-]/g, ' ').replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim()
  if (!text || !question.marks.length) return false
  return question.marks.every(mark => {
    // A learner can distinguish two terms, e.g. "the liver, not the kidney".
    // Count a concept only when the learner actually asserts it.
    const matches = text.matchAll(new RegExp(mark.source, 'gi'))
    for (const match of matches) {
      const preceding = text.slice(0, match.index)
      if (!/\b(?:not|never|no|isn't|aren't)(?:\s+(?:the|a|an))?\s+$/.test(preceding)) return true
    }
    return false
  })
}

export const biologyWrittenQuestions: Record<string, BiologyWrittenQuestion[]> = {
  'bio-aerobic-respiration': [
    writtenQuestion('In aerobic respiration, which sugar is broken down and which molecule then transfers energy to processes such as muscle contraction?',
      'Glucose is broken down and ATP transfers energy.', /\b(?:glucose|c6h12o6)\b/, /\b(?:atp|adenosine triphosphate)\b/),
    writtenQuestion('A muscle cell has many organelles where most of its ATP is made during aerobic respiration. Name the organelle.',
      'Mitochondrion.', /\bmitochondri(?:on|a)\b/),
  ],
  'bio-obtaining-nutrition': [
    writtenQuestion('A sunflower makes sugars from carbon dioxide and water in the light. Name this process.',
      'Photosynthesis.', /\bphotosynthesis\b/),
    writtenQuestion('A growing child needs material to build and repair muscle tissue. Which nutrient supplies the amino acids?',
      'Protein.', /\bproteins?\b/),
  ],
  'bio-biological-molecules': [
    writtenQuestion('A student tests a potato for starch. Name the reagent and give its final colour if starch is present.',
      'Iodine solution turns blue-black.', /\b(?:iodine|lugol'?s?)\b/, /\b(?:blue\s*black|black\s*blue)\b/),
    writtenQuestion('Fat beneath the skin stores energy. State one other function of this fat in a cold environment.',
      'It insulates the body, reducing heat loss.', /\b(?:insulat\w*|(?:reduc\w*|slow\w*|prevent\w*|limit\w*|less)\s+(?:the\s+)?heat\s+loss|(?:keep\w*|trap\w*|retain\w*|conserv\w*)\s+(?:(?:the|body|us|you|it|our|in)\s+)*(?:heat|warmth|warm))\b/),
  ],
  'bio-ingestion-mechanical-digestion': [
    writtenQuestion('Two equal masses of food are given the same enzyme. Why is the finely chewed food digested faster?',
      'Chewing gives the enzyme a larger surface area to act on.',
      /\b(?:(?:larg\w*|increas\w*|great\w*|more|bigger|higher)\s+(?:exposed\s+|total\s+)?surface(?:\s+area)?|surface area (?:is |has )?(?:increas\w*|larg\w*|greater|bigger|higher))\b/),
    writtenQuestion('The tongue rolls chewed food into a ball ready to swallow. What is this ball called?',
      'A bolus.', /\bbolus\b/),
  ],
  'bio-chemical-digestion': [
    writtenQuestion('A protein molecule is too large to absorb. Which class of enzymes digests protein, and what small molecules can be absorbed after it is completely digested?',
      'Proteases digest proteins into amino acids.', /\b(?:proteases?|peptidases?|proteinases?)\b/, /\bamino acids?\b/),
    writtenQuestion('An enzyme breaks starch into maltose in the mouth. Name the enzyme.',
      'Salivary amylase.', /\b(?:amylase|ptyalin)\b/),
  ],
  'bio-absorption': [
    writtenQuestion('What do the many villi of the small intestine increase, allowing more nutrients to be absorbed at once?',
      'The surface area available for absorption.', /\b(?:surface area|absorptive area|area (?:available )?for absorption)\b/),
    writtenQuestion('A villus has a lining only one cell thick. What does this mean for the distance a molecule travels to reach the blood?',
      'It has a short diffusion distance.', /\b(?:short(?:er|ened)?|small(?:er)?|reduc(?:ed|es)|less|minim(?:al|i[sz]ed)|decreas(?:ed|es))\b/),
  ],
  'bio-obtaining-oxygen': [
    writtenQuestion('Oxygen moves from the air in an alveolus into the blood without using ATP. Name the process.',
      'Diffusion.', /\bdiffus(?:ion|es?)\b/),
    writtenQuestion('Name the gas that moves from the blood into an alveolus to be breathed out.',
      'Carbon dioxide.', /\b(?:carbon dioxide|co2)\b/),
  ],
  'bio-blood': [
    writtenQuestion('Which protein in red blood cells binds oxygen reversibly?',
      'Haemoglobin.', /\bha?emoglobin\b/),
    writtenQuestion('Name the blood cell fragments that gather at a cut and help a clot to form.',
      'Platelets.', /\b(?:platelets?|thrombocytes?)\b/),
  ],
  'bio-cardiovascular-system': [
    writtenQuestion('A vessel carries deoxygenated blood away from the heart to the lungs. Name this vessel.',
      'The pulmonary artery.', /\bpulmonary arter(?:y|ies)\b/),
    writtenQuestion('Name the smallest blood vessels, where substances are exchanged between blood and body tissues.',
      'Capillaries.', /\bcapillar(?:y|ies)\b/),
  ],
  'bio-removing-waste': [
    writtenQuestion('An excess of amino acids leads to urea production. Name the organ that produces the urea.',
      'The liver.', /\bliver\b/),
    writtenQuestion('Urea is carried in the blood. Which organs remove it, and in which liquid does it leave these organs?',
      'The kidneys remove urea and it leaves in urine.', /\bkidneys?\b/, /\burine\b/),
  ],
  'bio-life-without-transport-systems': [
    writtenQuestion('Oxygen diffuses into an amoeba. Is its concentration higher just inside or just outside the cell?',
      'Outside the cell.', /\b(?:outside|external|surround(?:ing|s)|environment|water around)\b/),
    writtenQuestion('As a cube-shaped cell gets bigger, does its surface area to volume ratio increase or decrease?',
      'It decreases.', /\b(?:decreas\w*|fall\w*|smaller|lower|drops?|reduc\w*|goes down|gets less)\b/),
  ],
  'bio-exercise': [
    writtenQuestion('During aerobic exercise the blood delivers two reactants for respiration to the leg muscles. Name both.',
      'Glucose and oxygen.', /\b(?:glucose|c6h12o6)\b/, /\b(?:oxygen|o2)\b/),
    writtenQuestion('A sprinter’s muscles respire anaerobically. Name the substance that accumulates in those muscles.',
      'Lactate (lactic acid).', /\b(?:lactate|lactic acid)\b/),
  ],
  'bio-thermoregulation': [
    writtenQuestion('A drop of sweat sits on the skin. What has to happen to the sweat for it to cool the skin?',
      'The sweat must evaporate.', /\b(?:evaporat\w*|vapouri[sz]\w*|vapori[sz]\w*|(?:becom\w*|turn\w*|chang\w*)\s+(?:in)?to\s+(?:a\s+)?(?:vapou?r|gas))\b/),
    writtenQuestion('Arterioles supplying the skin widen in hot conditions. Give the biological term for this widening.',
      'Vasodilation.', /\bvaso\s*dilat(?:at)?ion\b/),
  ],
  'bio-lifestyle-diseases': [
    writtenQuestion('A study finds that two variables are associated. What term describes this relationship without claiming that one causes the other?',
      'Correlation.', /\bcorrelat(?:ion|ed|e)\b/),
    writtenQuestion('Which type of diabetes is linked to obesity and low physical activity? Include the type number.',
      'Type 2 diabetes.', /\b(?:2|two|ii)\b/),
  ],
  'bio-infectious-diseases': [
    writtenQuestion('What is the biological term for an agent that causes infectious disease?',
      'A pathogen.', /\b(?:pathogens?|infectious agents?)\b/),
    writtenQuestion('A mosquito carries the malaria parasite from one person to another. What term describes the mosquito’s role in transmission?',
      'A vector.', /\bvectors?\b/),
  ],
  'bio-immunity': [
    writtenQuestion('A lymphocyte produces a protein that binds to a particular antigen. Name the protein.',
      'An antibody.', /\b(?:antibod(?:y|ies)|immunoglobulins?)\b/),
    writtenQuestion('After vaccination, which long-lived cells allow a faster response when the same pathogen enters again?',
      'Memory lymphocytes.', /\bmemory\s+(?:(?:b|t|blood)\s+)?(?:cells?|lymphocytes?)\b|\b(?:b|t)\s+(?:cells?|lymphocytes?)\s+(?:with\s+)?memory\b/),
  ],
  'bio-y11-t3-variation': [
    writtenQuestion('Identical twins inherit the same alleles for height but grow to different heights. Give one environmental factor that could explain this.',
      'They may have had different diets while growing.',
      /\b(?:diet\w*|nutrition\w*|malnourish\w*|food|protein|illness\w*|disease\w*|infection\w*|sleep|nutrients?|healthcare)\b/),
    writtenQuestion('A virus infects a bacterium and uses the bacterium to make new virus particles. What name is given to a virus with this type of host?',
      'A bacteriophage.', /\b(?:bacteriophages?|phages?)\b/),
  ],
  'bio-y11-t3-dna': [
    writtenQuestion('A DNA template is read from 3′ to 5′ and has the base triplet TAC. Write only the three complementary mRNA bases in order.',
      'AUG.', /^a[\s,.]*u[\s,.]*g[.!]?$/),
    writtenQuestion('During translation, which molecule carries a specific amino acid to the ribosome?',
      'Transfer RNA (tRNA).', /\b(?:t\s*rna|transfer\s*(?:rna|ribonucleic acid))\b/),
  ],
  'bio-y11-t3-mitosis': [
    writtenQuestion('A cell with 18 chromosomes divides by mitosis to repair a cut. How many chromosomes are in each new nucleus, and how does its genetic information compare with the parent’s?',
      'Each has 18 chromosomes and the same genetic information as the parent.', /\b(?:18|eighteen)\b/, /\b(?:identical|(?:the )?same|clone|unchanged|copies? of (?:the |its )?parent)\b/),
    writtenQuestion('A person’s skin cell and sperm cell both acquire a mutation. Which cell could pass its mutation to the person’s child?',
      'The sperm cell.', /\b(?:sperm(?:atozoon|atozoa)?|gamete|sex cell)\b/),
  ],
  'bio-y11-t3-meiosis': [
    writtenQuestion('A flowering plant has 28 chromosomes in a diploid leaf cell. How many will a gamete have after meiosis?',
      '14 chromosomes.', /\b(?:14|fourteen)\b/),
    writtenQuestion('At fertilisation, two haploid nuclei fuse. What term describes the number of chromosome sets in the resulting zygote?',
      'Diploid (two sets).', /\b(?:diploid|2n|(?:two|2|double)\s+(?:complete\s+)?sets?)\b/),
  ],
  'bio-y11-t3-hormones': [
    writtenQuestion('An ovary releases an egg after a sharp rise in a pituitary hormone. Name this hormone.',
      'Luteinising hormone (LH).', /\b(?:lh|luteini[sz]ing hormone)\b/),
    writtenQuestion('After ovulation the corpus luteum makes a hormone that maintains the uterine lining. Name the hormone and state what happens to its level just before menstruation.',
      'Progesterone levels fall.', /\bprogesterone\b/, /\b(?:falls?|fell|drops?|decreas\w*|declin\w*|reduc\w*|lower\w*|go(?:es)? down)\b/),
  ],
  'bio-y11-t3-pregnancy': [
    writtenQuestion('Name the fluid around the developing fetus that cushions it against impacts.',
      'Amniotic fluid.', /\b(?:amniotic (?:fluid|liquid)|liquor amnii)\b/),
    writtenQuestion('Name the waste gas that diffuses from fetal blood into maternal blood at the placenta.',
      'Carbon dioxide.', /\b(?:carbon dioxide|co2)\b/),
  ],
  'bio-y11-t3-alleles': [
    writtenQuestion('Two pea plants are both tall but one is TT and the other Tt. In genetic terms, what do they have in common, and what is different?',
      'They share the same phenotype but have different genotypes.',
      /\b(?:same|identical|share\w*|common|matching)\b.{0,20}\bphenotypes?\b|\bphenotypes?\b.{0,18}\b(?:same|identical|shared|match\w*)\b/,
      /\b(?:different|distinct|differing)\b.{0,14}\bgenotypes?\b|\bgenotypes?\b.{0,20}\b(?:differ\w*|distinct|vary|varies)\b/),
    writtenQuestion('An organism carries two different alleles of one gene. Give the genetic term for this genotype.',
      'Heterozygous.', /\bheterozyg(?:ous|ote)\b/),
  ],
  'bio-y11-t3-crosses': [
    writtenQuestion('A heterozygous tall pea plant is crossed with a short plant (Tt × tt). Write the expected ratio of tall offspring to short offspring.',
      '1:1.', /\b(?:1\s*(?::|to)\s*1(?!\d)|one\s+to\s+one|(?:equal|even)\s+(?:numbers|proportions|ratio|split)|50\s*%?\s*(?:to|and|:|\/)\s*50\s*%?)\b/),
    writtenQuestion('Two unaffected parents have a child with a simple autosomal recessive condition. What term describes the genotype of each parent?',
      'Each is a heterozygous carrier.', /\b(?:heterozyg(?:ous|ote)s?|carriers?)\b/),
  ],
}
