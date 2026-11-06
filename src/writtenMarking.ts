type WrittenItem = { answer: string; q?: string; options?: readonly string[] }

/** Keep quantities, formula signs and word boundaries intact when normalising input. */
function clean(text: string) {
  return text.toLowerCase()
    .replace(/10⁻³/g, '10^-3').replace(/10³/g, '10^3')
    .normalize('NFKC').replace(/[’‘]/g, "'").replace(/[−–—]/g, '-')
    .replace(/\b(?:cannot|can't|cant)\b/g, 'can not')
    .replace(/\b(can|could|should|would|is|are|was|were|do|does|did)n['’]?t\b/g, '$1 not')
    .replace(/\bwon'?t\b/g, 'will not')
    .replace(/\s+/g, ' ').trim().replace(/[.!?]+$/, '')
}

// Alternatives are tied to a model answer. A word can be a synonym in one
// subject without becoming interchangeable everywhere in the question bank.
const alternatives: Record<string, readonly string[]> = {
  'personal anecdote': ['personal story', 'story from the author’s own life', 'personal experience'],
  'the writer’s perspective': ['the author’s viewpoint', 'the writer’s point of view'],
  'public indifference': ['the public do not care', 'people are apathetic', 'public apathy'],
  'constant love': ['unchanging love', 'steadfast love', 'love that does not change'],
  'an unborn child': ['a fetus', 'a foetus', 'a baby before birth'],
  'decreasing the angle at a joint': ['bending a joint', 'flexion', 'the joint angle gets smaller'],
  'movement away from the midline': ['abduction', 'moving away from the centre line of the body'],
  'cardiovascular endurance': ['aerobic endurance', 'cardiorespiratory endurance', 'aerobic stamina'],
  'reducing friction': ['less resistance to motion', 'reduces rubbing between surfaces'],
  'lubricates the joint': ['reduces friction in the joint', 'helps the joint surfaces slide past each other'],
  'front of the thigh': ['anterior thigh', 'front of the upper leg'],
  'alveoli': ['air sacs', 'air sacs in the lungs', 'alveolus'],
  'white blood cells': ['leukocytes', 'leucocytes'],
  'carbon dioxide': ['co2'],
  'oxygen': ['o2'],
  'fulcrum': ['pivot', 'pivot point', 'point around which a lever turns'],
  'computer aided manufacture': ['computer aided manufacturing', 'computer assisted manufacturing'],
  'a twisting force': ['torsion', 'a force that twists'],
  'a pulling force': ['tension', 'a force that pulls'],
  'previously developed land': ['brownfield land', 'land that has been built on before'],
  'movement from urban areas to rural areas': ['people moving from cities to the countryside', 'migration from towns to rural areas', 'moving to the countryside from a city'],
  'separation of social or economic groups': ['segregation'],
  'mechanical weathering': ['physical weathering'],
  'erosion caused by water and air forced into cracks': ['waves compress air in cracks in the rock', 'water and trapped air pressurise cracks in the cliff'],
  'transport of sediment along the coast by swash and backwash': ['sediment moves along the beach as swash comes in at an angle and backwash runs straight down'],
  'non-living': ['abiotic'],
  'it increases': ['it goes up', 'it rises', 'it gets higher'],
  'it can decrease': ['it can go down', 'it can fall'],
  'they lose electrons': ['electrons are lost', 'donate electrons', 'give away electrons'],
  'they gain electrons': ['electrons are gained', 'accept electrons', 'take in electrons'],
  'to get a full outer shell': ['fill the valence shell', 'achieve a complete outer electron shell'],
  'exothermic change': ['exothermic reaction'],
  'an organism that gets food by eating other organisms': ['a heterotroph', 'a consumer'],
  'area under the graph': ['area beneath the curve', 'area between the line and the time axis'],
  'the universe is expanding': ['space is expanding', 'the universe is getting bigger'],
  'gravity': ['gravitation', 'gravitational force'],
  'internal tariffs': ['internal customs duties', 'taxes on trade between member states'],
  'the zollverein': ['the german customs union'],
  'all-powerful': ['omnipotent', 'omnipotence', 'having unlimited power'],
  'no fixed self': ['anatta', 'no permanent self'],
  'impermanence': ['anicca', 'nothing lasts forever'],
  'god becoming human in jesus': ['the incarnation', 'god took human form as jesus'],
  'jesus rising from the dead': ['the resurrection', 'jesus came back to life'],
  'father, son and holy spirit': ['father son and holy ghost'],
  '1 hour 30 minutes': ['90 minutes', '90 mins', 'one and a half hours', 'an hour and a half', '1.5 hours'],
  'distance ÷ time': ['distance / time', 'distance divided by time', 'distance over time'],
  'f = ma': ['force = mass times acceleration', 'mass multiplied by acceleration', 'f = m × a'],
  'w = mg': ['weight = mass times gravitational field strength', 'w = m × g'],
  'p = f/a': ['pressure = force divided by area', 'force per unit area'],
  'ρ = m/v': ['density = mass divided by volume', 'mass per unit volume'],
  '10^-3': ['0.001', 'one thousandth', '10 to the power of minus 3'],
  '10^3': ['1000', 'one thousand', '10 to the power of 3'],
  '+1': ['1+', 'positive one', 'plus one', 'positive 1'],
}
const variants = new Map(Object.entries(alternatives).map(([model, values]) => [clean(model), values]))

const vocabulary: [RegExp, string][] = [
  [/\b(?:authors?|writers?)\b/g, 'writer'], [/\b(?:points? of view|viewpoints?|perspectives?)\b/g, 'perspective'],
  [/\b(?:grows?|rises?|increas(?:e|es|ed|ing)|go(?:es)? up|gets? bigger|gets? higher)\b/g, 'increase'],
  [/\b(?:falls?|drops?|reduc(?:e|es|ed|ing)|decreas(?:e|es|ed|ing)|go(?:es)? down|gets? smaller)\b/g, 'decrease'],
  [/\b(?:speed|velocity)\s+slows?(?: down)?\b/g, 'speed decrease'],
  [/\b(?:mov(?:e|es|ement|ing)|motion)\b/g, 'move'],
  [/\b(?:cities|city|towns?|urban areas?)\b/g, 'urban'], [/\b(?:countryside|rural areas?)\b/g, 'rural'],
  [/\b(?:photos?|photographs?)\b/g, 'photograph'], [/\b(?:control|controlling|controls)\b/g, 'control'],
  [/\b(?:lung air sacs?|air sacs?|alveolus|alveoli)\b/g, 'alveoli'],
  [/\b(?:haemoglobin|hemoglobin)\b/g, 'haemoglobin'], [/\b(?:leucocytes?|leukocytes?|white blood cells?)\b/g, 'leucocyte'],
  [/\b(?:co2|carbon dioxide)\b/g, 'carbondioxide'], [/\b(?:o2|oxygen)\b/g, 'oxygen'],
  [/\b(?:centre|center)\b/g, 'centre'], [/\b(?:sulph|sulf)/g, 'sulf'],
  [/\b(?:repairing|repairs|repair)\b/g, 'repair'], [/\b(?:prevent|prevents|stop|stops)\b/g, 'prevent'],
]
const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine','ten']
const filler = new Set('a an and are as at be been by do does for from get has have in into is it its of on or that the their them they this to with which because some being will can such becomes'.split(' '))
const negative = /\b(?:not|never|no|neither|without|lack(?:s|ing)?|cannot)\b/

function concepts(value: string) {
  let text = value.replace(/\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten)\b/g, word => String(numbers.indexOf(word)))
  for (const [pattern, term] of vocabulary) text = text.replace(pattern, term)
  return [...new Set((text.match(/[a-z0-9]+/g) || []).filter(word => !filler.has(word)).map(word =>
    word.length > 4 && word.endsWith('s') && !word.endsWith('ss') && !word.endsWith('is') ? word.slice(0, -1) : word))]
}

function compact(value: string) {
  return value.replace(/\b(?:times|multiplied by)\b|[×*]/g, '*')
    .replace(/\b(?:divided by|over)\b|÷/g, '/').replace(/\bdegrees?\s*(?:celsius|c)\b/g, '°c')
    .replace(/\s+/g, '').replace(/(?<=\d),(?=\d{3}(?:$|[^0-9]))/g, '').replace(/([a-z])\^2/g, (_, letter) => letter + '2')
}

// Discard explicitly contrasted alternatives before testing an affirmative answer.
function positiveClauses(value: string) {
  return value.replace(/\bnot only\b/g, '').replace(/\b(?:rather than|instead of|but not)\b[^,;.!?]*/g, '')
    .split(/[,;!?\n]|\.(?!\d)|\bbut\b/).filter(clause => !negative.test(clause)).join(' ').trim()
}

/** Normalised phrases for the authored Biology mark schemes, with positive/negative meaning preserved. */
export function biologyResponse(value: string) {
  const text = clean(value)
    .replace(/\b(?:do(?:es)? not|need(?:s)? not) (?:have|need) to (?:travel|diffuse|move|go) (?:as |very |so )?far\b/g, 'short diffusion distance')
    .replace(/\b(?:not (?:as |very |so )?far to (?:travel|diffuse|go)|less far to (?:travel|diffuse|go))\b/g, 'short diffusion distance')
    .replace(/\b(?:fewer|less) (?:of the |body )?heat (?:escapes?|is lost)\b/g, 'less heat loss')
    .replace(/\b(?:heat|warmth) (?:cannot|can not|does not) (?:escape|leave)(?: as (?:easily|quickly))?\b/g, 'less heat loss')
    .replace(/[‐‑–—-]/g, ' ').replace(/\s+/g, ' ')
  return positiveClauses(text)
}

const relations: Record<string, RegExp[]> = {
  'movement from urban areas to rural areas': [/\burban\b.*\b(?:to|into|towards?)\b.*\brural\b|\brural\b.*\bfrom\b.*\burban\b/],
  'from alveoli into blood': [/\balveoli\b.*\b(?:into|to|enters?)\b.*\bblood\b|\bblood\b.*\bfrom\b.*\balveoli\b/],
  'carry blood away from the heart': [/\b(?:away from|out of|from|leav\w*|exits?)\s+(?:the )?heart\b|\bheart\b.*\bto\b.*\b(?:body|organ|lung|tissue)/],
  'movement from high to low concentration': [/\bhigh\w*\b.*\b(?:to|towards?|into)\b.*\blow\w*\b|\blow\w*\b.*\bfrom\b.*\bhigh\w*\b|\bdown\b.*\b(?:concentration )?gradient\b/],
  'speed reduces and torque increases': [/\b(?:speed decrease|decrease (?:in )?speed|slower)\b/, /\b(?:torque increase|increase (?:in )?torque|more torque)\b/],
  'speed increases and torque reduces': [/\b(?:speed increase|increase (?:in )?speed|faster)\b/, /\b(?:torque decrease|decrease (?:in )?torque|less torque)\b/],
}

export function markTextAnswer(question: WrittenItem, input: unknown) {
  if (typeof input !== 'string' || !input.trim()) return false
  const model = clean(question.answer), response = clean(input)
  if (!model) return false
  const accepted = [model, ...(variants.get(model) || []).map(clean)]
  if (accepted.some(value => compact(value) === compact(response))) return true
  const wrongOptions = question.options?.map(clean).filter(option => !accepted.includes(option)) || []
  if (wrongOptions.some(option => compact(option) === compact(response))) return false

  const scalar = model.match(/^(-?\d+(?:[.]\d+)?)\s*(marks?|°c)?$/)
  if (scalar) {
    const result = response.replace(/^(?:the answer (?:is|was)|it (?:is|was)|there (?:are|were)|in(?: the year)?)\s+/,'')
      .replace(/\bdegrees?(?: celsius| c)?\b/, '°c').match(/^(-?\d+(?:[.]\d+)?)\s*([a-z°]*)$/)
    if (!result || Number(result[1]) !== Number(scalar[1])) return false
    const unit = result[2]
    return !unit || unit === scalar[2] || (scalar[2] === 'marks' && /^(?:mark|points?)$/.test(unit)) ||
      (!scalar[2] && concepts(question.q || '').includes(concepts(unit)[0]))
  }

  // Exact operators, signs and order matter for numeric answers, chemical formulae and equations.
  if (/[=÷/^]|^[+-]\d|^\d[\d,]+$|^[a-z]+\d+[a-z\d]*$/i.test(model)) return false
  const asserted = negative.test(model) ? response : positiveClauses(response)
  const listed = asserted.split(/\s+(?:and|or)\s+/)
  if (listed.length > 1 && listed.some(part => wrongOptions.includes(part.replace(/^(?:an?|the) /, '').trim()))) return false
  let normalised = asserted
  for (const [pattern, term] of vocabulary) normalised = normalised.replace(pattern, term)
  if (relations[model]) return relations[model].every(point => point.test(normalised))

  return accepted.some(variant => {
    const claim = negative.test(variant) ? response : positiveClauses(response)
    if (!claim || negative.test(variant) !== negative.test(claim)) return false
    const supplied = new Set(concepts(claim))
    const expected = concepts(variant)
    if (!expected.length) return false
    const count = expected.filter(word => supplied.has(word)).length
    return count >= (expected.length <= 4 ? expected.length : Math.ceil(expected.length * .75))
  })
}
