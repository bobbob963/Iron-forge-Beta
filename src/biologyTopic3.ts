type Choices = [string, string, string, string]

function question(q: string, options: Choices, correctIndex: 0 | 1 | 2 | 3) {
  return { q, options, answer: options[correctIndex] }
}

function stage(
  slug: string,
  title: string,
  notes: string[],
  questions: ReturnType<typeof question>[],
) {
  return {
    id: 'bio-y11-t3-' + slug,
    title,
    section: 'Year 11',
    topicGroup: 'Topic 3 Revision',
    level: 'Revision Forge',
    status: 'Not forged',
    notes,
    questions,
  }
}

export const biologyTopic3Stages = [
  stage('variation', 'Variation and classification', [
    'Variation means differences between individuals of the same species. Alleles cause genetic variation. Conditions such as diet and light cause environmental variation. Height is influenced by both.',
    'Eukaryotes have cells with a nucleus. Animals have no cell walls and usually feed by ingestion. Plants have cellulose cell walls and photosynthetic tissues with chloroplasts.',
    'Fungi have chitin cell walls and absorb the products of external digestion. Many have hyphae that form a mycelium. Yeast is single-celled. Protoctists are mostly single-celled eukaryotes, such as Amoeba and Chlorella.',
    'Bacteria are single-celled prokaryotes. A typical bacterial cell has a cell wall, membrane, cytoplasm and ribosomes. Its circular chromosome lies in the cytoplasm. It may also contain small rings of DNA called plasmids.',
    'A virus consists of genetic material (DNA or RNA) inside a protein coat. It reproduces inside living cells. TMV infects tobacco plants, influenza virus infects animals and bacteriophages infect bacteria.',
  ], [
    question('Three differences are a blood group, a scar from a cut and adult height. Which causes best fit them, in that order?', ['Environment, genes, environment', 'Genes, environment, genes and environment', 'Genes, genes and environment, environment', 'Genes and environment, environment, genes'], 1),
    question('A cell has a nucleus, chloroplasts and a cellulose cell wall. Which group fits all three observations?', ['Animals', 'Fungi', 'Bacteria', 'Plants'], 3),
    question('Which comparison correctly distinguishes fungi from animals?', ['Fungi digest food externally and absorb it. Animals usually ingest food.', 'Fungi use chloroplasts. Animals use mitochondria.', 'Fungi lack nuclei. Animals have nuclei.', 'Fungi have cellulose walls. Animals have chitin walls.'], 0),
    question('A single-celled Amoeba has a nucleus. Which group does it belong to?', ['Bacteria', 'Viruses', 'Protoctists', 'Fungi'], 2),
    question('Which observation identifies a typical bacterial cell rather than a plant cell?', ['A cell membrane surrounds the cytoplasm.', 'Circular chromosomal DNA lies free in the cytoplasm.', 'Proteins are assembled at ribosomes.', 'A wall surrounds the cell membrane.'], 1),
    question('Which statement correctly describes a virus and its host?', ['TMV has its own ribosomes and reproduces in soil.', 'Influenza virus divides by mitosis inside a human cell.', 'A bacteriophage is a bacterial cell that feeds on viruses.', 'A bacteriophage carries genetic material in a protein coat and reproduces inside bacteria.'], 3),
  ]),
  stage('dna', 'DNA, RNA and protein synthesis', [
    'The genome is all the DNA of an organism. A gene is a length of DNA that codes for a protein. In eukaryotic cells, chromosomes in the nucleus carry genes. The sequence of bases in a gene specifies the sequence of amino acids.',
    'DNA has two strands coiled into a double helix. Complementary bases hold the strands together. Adenine (A) pairs with thymine (T), and cytosine (C) with guanine (G). RNA is usually single-stranded and has uracil (U) in place of thymine.',
    'During transcription, a complementary messenger RNA (mRNA) copy is made from the template strand of a gene. The mRNA leaves the nucleus and attaches to a ribosome.',
    'During translation, the ribosome reads mRNA bases in groups of three called codons. Transfer RNA (tRNA) with a complementary anticodon brings a specific amino acid. The ribosome joins the amino acids to form a polypeptide.',
  ], [
    question('Which statement correctly connects a genome, a chromosome and a gene?', ['A genome is one gene that codes for every protein.', 'Each chromosome is made of just one gene.', 'The genome is all the DNA, and a chromosome carries genes whose base sequences can code for proteins.', 'The genome includes proteins but excludes DNA outside genes.'], 2),
    question('Where are most chromosomes in a human cheek cell?', ['In the nucleus', 'At the cell membrane', 'Inside ribosomes', 'Dissolved in the cytoplasm'], 0),
    question('One DNA strand reads A–C–G–T. Reading directly across from each base, what is the complementary DNA sequence?', ['U–G–C–A', 'T–C–G–A', 'A–C–G–T', 'T–G–C–A'], 3),
    question('Which comparison of DNA and mRNA is correct?', ['DNA and mRNA are both double helices containing thymine.', 'DNA forms a double helix with thymine. mRNA is single-stranded and uses uracil.', 'DNA contains uracil. mRNA contains thymine.', 'DNA is single-stranded. mRNA is a double helix.'], 1),
    question('A DNA template triplet reads T–A–C. Which mRNA triplet forms opposite it during transcription?', ['T–A–C', 'U–A–C', 'A–U–G', 'A–T–G'], 2),
    question('What happens after mRNA attaches to a ribosome?', ['tRNAs match their anticodons to mRNA codons and deliver amino acids, which the ribosome joins.', 'mRNA delivers amino acids and tRNA copies the DNA.', 'The ribosome joins the codons into a new chromosome.', 'The ribosome translates amino acids into a strand of mRNA.'], 0),
  ]),
  stage('mitosis', 'Mitosis and mutations', [
    'Asexual reproduction involves one parent, no fusion of gametes and, in eukaryotes, mitosis. Offspring are genetically identical clones unless a mutation occurs. Sexual reproduction involves gamete fusion and produces variation in the offspring.',
    'Before mitosis, DNA is copied. Mitosis separates identical copies of each chromosome into two nuclei, and cell division produces two genetically identical daughter cells with the same chromosome number as the original cell.',
    'Mitosis produces cells for growth, replacement of damaged tissue and cloning. A mutation is a rare, random change in genetic material. A mutation in a gamete can be passed to an offspring if that gamete takes part in fertilisation.',
    'Most mutations have no effect on phenotype. Some have a small effect and a few have a significant effect. Ionising radiation such as gamma rays or X-rays, UV radiation and chemicals such as those in tobacco smoke can increase the mutation rate.',
  ], [
    question('What distinguishes sexual reproduction from asexual reproduction?', ['Sexual reproduction always involves two separate individuals.', 'Sexual reproduction combines genetic material when gametes fuse.', 'Asexual reproduction always involves gamete production.', 'Asexual reproduction always halves the chromosome number.'], 1),
    question('A skin cell with 46 chromosomes divides during wound repair. What does normal mitosis produce after cell division?', ['Four cells with 23 chromosomes each', 'Two cells with 23 chromosomes each', 'Two genetically different cells with 46 chromosomes each', 'Two genetically identical cells with 46 chromosomes each'], 3),
    question('Which set of processes all use mitosis?', ['Production of eggs, growth and fertilisation', 'Fertilisation, cloning and sperm production', 'Growth of a seedling, skin repair and production of a cloned plant from a cutting', 'Cloning, meiosis and fusion of gametes'], 2),
    question('Which mutation could a father pass to his child?', ['A random DNA change in the sperm that fertilises the egg', 'A DNA change in his scar tissue after a cut', 'A DNA change in one of his skin cells after sun exposure', 'A change in the size of a muscle cell after exercise'], 0),
    question('Which statement best describes the effects of mutations on phenotype?', ['All mutations have large harmful effects.', 'Most mutations cause a small visible change.', 'Most have no effect, some have a small effect and a few have a significant effect.', 'Only beneficial mutations affect phenotype.'], 2),
    question('Which group of exposures can increase the rate of mutation?', ['Visible light, sound and low temperature', 'X-rays, UV light and chemicals in tobacco smoke', 'Oxygen, water and sound', 'Exercise, daylight hours and dietary fibre'], 1),
  ]),
  stage('meiosis', 'Meiosis and fertilisation', [
    'Gametes are haploid sex cells. Meiosis involves two nuclear divisions after one round of DNA replication. It produces four genetically different haploid cells with half the original chromosome number.',
    'Human body cells are normally diploid with 46 chromosomes in 23 pairs. Gametes contain 23 individual chromosomes. At fertilisation the sperm and egg nuclei fuse, restoring 46 chromosomes in the zygote.',
    'In the usual human XX/XY pattern, eggs carry X. Sperm carry X or Y. An X-bearing sperm produces an XX zygote and a Y-bearing sperm an XY zygote. A cross gives an expected 1:1 ratio.',
    'The zygote divides by mitosis to form an embryo. As cells differentiate, they become specialised for their roles. A sperm has a tail for movement and an acrosome containing enzymes. An egg has a large cytoplasm with stored nutrients.',
  ], [
    question('A human cell with 46 chromosomes starts meiosis. What is the outcome after both divisions?', ['Two identical cells with 23 chromosomes each', 'Four different cells with 46 chromosomes each', 'Two identical cells with 46 chromosomes each', 'Four genetically different haploid cells with 23 chromosomes each'], 3),
    question('How does fertilisation restore the diploid chromosome number in humans?', ['A sperm copies its 23 chromosomes before entering the egg.', 'An egg nucleus and a sperm nucleus, each containing 23 chromosomes, fuse.', 'Two diploid cells lose half of their chromosomes.', 'The zygote divides twice to make 46 chromosomes.'], 1),
    question('An XX parent produces X-bearing eggs and an XY parent produces equal numbers of X- and Y-bearing sperm. Which outcome is expected?', ['All zygotes are XY.', 'One quarter of zygotes are XX.', 'Half are XX and half are XY because either type of sperm can fertilise an egg.', 'Half are XX because half the eggs contain Y.'], 2),
    question('Which process increases the number of cells as a zygote develops into an embryo?', ['Mitosis', 'Meiosis', 'Fertilisation', 'Diffusion'], 0),
    question('Which example shows cell differentiation producing a specialised structure?', ['Two gamete nuclei fuse to form one nucleus.', 'A developing sperm forms a tail that helps it swim.', 'Two daughter cells inherit copies of the same chromosomes.', 'A glucose molecule diffuses across a membrane.'], 1),
  ]),
  stage('hormones', 'Reproductive organs and hormones', [
    'The testes produce sperm and testosterone. The scrotum holds the testes below body temperature. Sperm ducts carry sperm, and the penis delivers semen through the urethra.',
    'The ovaries release eggs and produce hormones. Cilia in the oviduct move the egg towards the uterus. Fertilisation usually takes place in an oviduct. The embryo implants in the uterine lining. The cervix is the muscular opening to the uterus.',
    'At puberty oestrogen promotes secondary sexual characteristics such as breast development. Testosterone promotes facial hair growth and deepening of the voice.',
    'FSH from the pituitary stimulates an ovarian follicle containing an egg to mature. The follicle releases oestrogen, which rebuilds the uterine lining. High oestrogen helps trigger the LH surge.',
    'LH from the pituitary triggers ovulation. After ovulation the corpus luteum in the ovary produces progesterone to maintain the uterine lining. If pregnancy does not occur, progesterone levels fall and menstruation follows.',
  ], [
    question('Which route carries sperm from their site of production to the outside of the body?', ['Testis → ureter → bladder', 'Prostate → sperm duct → ureter', 'Testis → sperm duct → urethra', 'Scrotum → bladder → penis'], 2),
    question('Which structure normally carries a newly released egg towards the uterus, and how?', ['The oviduct, using cilia and muscle contractions', 'The cervix, using cilia', 'The ovary, using its thick muscle wall', 'The uterus, using the amniotic fluid'], 0),
    question('Which pairing links hormones to typical secondary sexual characteristics at puberty?', ['FSH and breast development, LH and a deeper voice', 'Progesterone and breast development, oestrogen and a deeper voice', 'Testosterone and breast development, oestrogen and facial hair', 'Oestrogen and breast development, testosterone and a deeper voice'], 3),
    question('Which gland releases FSH, and what does FSH stimulate in the ovary?', ['Ovary, release of a mature egg', 'Pituitary, maturation of a follicle containing an egg', 'Pituitary, breakdown of the uterine lining', 'Ovary, maintenance of the uterine lining'], 1),
    question('A sharp rise in LH occurs around the middle of a menstrual cycle. What usually follows?', ['Menstruation begins immediately.', 'The uterine lining is shed.', 'A mature egg is released from an ovary.', 'An egg implants in the uterine lining.'], 2),
    question('Which hormone pattern best explains the changes in the uterine lining?', ['Oestrogen rebuilds it, progesterone maintains it, and a fall in progesterone permits it to break down.', 'LH rebuilds it, FSH maintains it, and rising FSH causes menstruation.', 'Progesterone rebuilds it before ovulation, then oestrogen causes immediate menstruation.', 'Oestrogen breaks it down, and LH keeps it thin.'], 0),
  ]),
  stage('pregnancy', 'Pregnancy and exchange', [
    'The embryo develops inside the amnion. Amniotic fluid cushions it against knocks. The placenta exchanges substances between the maternal and fetal blood supplies, which normally remain separate.',
    'Oxygen and nutrients such as glucose pass from mother to fetus. Carbon dioxide and urea pass from fetus to mother. The umbilical cord carries fetal blood between the fetus and placenta.',
    'For diffusion, increasing the exchange surface area, the concentration gradient or the temperature increases the rate. A thinner barrier reduces the diffusion distance and speeds up exchange. Placental villi provide a large surface area and a thin exchange barrier.',
    'Energy needs differ with activity, age, growth and pregnancy. Physical activity requires energy for muscle contraction. Growing tissues and the developing fetus also require energy.',
  ], [
    question('What is the main protective role of amniotic fluid?', ['It digests waste made by the fetus.', 'It mixes the two blood supplies.', 'It transfers oxygen to the maternal lungs.', 'It cushions the developing fetus against impacts.'], 3),
    question('Which pair of transfers occurs at a healthy placenta?', ['Glucose to the mother and urea to the fetus', 'Glucose to the fetus and urea to the mother', 'Oxygen to the mother and carbon dioxide to the fetus', 'Urea and carbon dioxide both to the fetus'], 1),
    question('Which feature of placental villi helps oxygen diffuse rapidly from maternal blood to fetal blood?', ['A thick barrier and a small surface area', 'A shared blood vessel in which both blood supplies mix', 'A large surface area and a short diffusion distance', 'A small surface area and long diffusion distance'], 2),
    question('Two membranes have the same area and thickness. Which conditions give the faster diffusion rate?', ['Higher temperature and a steeper concentration gradient', 'Lower temperature and a shallower concentration gradient', 'Higher temperature and zero concentration gradient', 'Lower temperature and zero concentration gradient'], 0),
    question('Which explanation best accounts for differences in daily energy requirements?', ['Pregnancy always reduces energy requirements because the fetus respires slowly.', 'Energy need depends only on age.', 'Active muscle needs less energy than resting muscle.', 'More activity raises energy demand, while growth and pregnancy require energy to build tissue.'], 3),
  ]),
  stage('alleles', 'Alleles and inheritance', [
    'Alleles are different versions of a gene. The genotype is the combination of alleles an individual carries. The phenotype is an observable characteristic shaped by genotype and environment.',
    'Homozygous means two identical alleles (AA or aa). Heterozygous means two different alleles (Aa). A dominant allele is expressed in the heterozygote. A recessive allele is expressed when no dominant allele is present.',
    'Many phenotypes are polygenic, influenced by several genes. For example, human height is influenced by many genes and by environmental factors such as nutrition.',
    'With codominance, both alleles are expressed in the heterozygote. For example, a person with the blood group alleles Iᴬ and Iᴮ makes both A and B antigens and has blood group AB.',
  ], [
    question('A gene for flower colour has a purple version and a white version. What are these versions called?', ['Phenotypes', 'Alleles', 'Gametes', 'Chromatids'], 1),
    question('A pea plant carries Pp and has purple flowers. Which is its genotype and which is its phenotype?', ['Purple is its genotype and Pp is its phenotype.', 'P is its genotype and p is its phenotype.', 'Pp is its genotype and purple flowers are its phenotype.', 'The genotype and phenotype are both Pp.'], 2),
    question('Purple (P) is dominant to white (p). Which plant is homozygous and expresses the recessive phenotype?', ['pp', 'Pp', 'PP', 'Either PP or Pp'], 0),
    question('Why can human height vary continuously, even between people who live in the same country?', ['A single allele sets a fixed height at birth.', 'Height depends only on the amount of exercise taken.', 'Everyone with the same diet inherits identical height alleles.', 'Many genes influence height, and environmental conditions such as nutrition also affect it.'], 3),
    question('A person with blood group AB makes both A and B antigens. What does this illustrate?', ['Complete dominance of Iᴬ over Iᴮ', 'Codominance, because both alleles are expressed in the heterozygote', 'Blending of the alleles into one new allele', 'Recessiveness of both alleles in every genotype'], 1),
  ]),
  stage('crosses', 'Genetic diagrams and probability', [
    'For a monohybrid cross, write both parents’ genotypes. List the possible alleles in each parent’s gametes along the sides of a Punnett square. Combine one allele from each side in each box.',
    'In a Tt × Tt cross, the four equally likely outcomes are TT, Tt, Tt and tt. The genotype ratio is 1:2:1. With complete dominance, the phenotype ratio is 3 dominant to 1 recessive.',
    'A Tt × tt cross gives half Tt and half tt. Predicted probabilities apply independently to each offspring. A small family can differ from the expected ratio by chance.',
    'In a pedigree for a simple autosomal recessive trait, affected people have two recessive alleles. Two unaffected parents with an affected child must each have passed on a recessive allele, so both are carriers.',
  ], [
    question('Tall pea plants can be TT or Tt. What are the possible gametes of a Tt parent?', ['TT or tt', 'Tt only', 'T or t', 'TT, Tt or tt'], 2),
    question('Which four entries belong in a Punnett square for Tt × Tt?', ['TT, Tt, Tt, tt', 'TT, TT, tt, tt', 'Tt, Tt, Tt, Tt', 'TT, TT, Tt, tt'], 0),
    question('If T is dominant, which proportion of the offspring from Tt × Tt is expected to show the dominant phenotype?', ['One quarter', 'One half', 'All', 'Three quarters'], 3),
    question('A heterozygous tall plant is crossed with a short plant (Tt × tt). Of 200 seedlings, how many short plants would you expect on average?', ['50', '100', '150', '200'], 1),
    question('Two carriers (Aa × Aa) have already had one child with an autosomal recessive condition. What is the chance their next child is also affected?', ['Zero, because one child is already affected', 'One half', 'One quarter', 'Three quarters'], 2),
    question('In a family pedigree, two unaffected parents have a child with an autosomal recessive condition (aa). Assuming simple Mendelian inheritance, what must be true?', ['Both parents are Aa.', 'One parent must be aa.', 'Both parents are AA.', 'One parent must be AA and the other Aa.'], 0),
  ]),
]
