import { test } from 'node:test'
import assert from 'node:assert/strict'
import { markTextAnswer } from '../src/writtenMarking.ts'
import { biologyWrittenQuestions, markBiologyWritten } from '../src/biologyWrittenQuestions.ts'
import { biologySuperTest } from '../src/biologySuperTest.ts'

test('written answers recognise subject-specific equivalents while keeping technical distinctions', () => {
  for (const [answer, equivalent, incorrect] of [
    ['Personal anecdote', 'a personal story', 'a newspaper story'],
    ['All-powerful', 'God is omnipotent', 'God is omniscient'],
    ['Previously developed land', 'brownfield land', 'greenfield land'],
    ['Carbon dioxide', 'CO₂', 'carbon monoxide'],
    ['The Duke', 'the Duke of Ferrara', 'the Duchess'],
    ['Anaerobic', 'anaerobic respiration', 'aerobic'],
    ['Copper', 'the copper wire', 'cop'],
    ['Power and control', 'controlling others and power', 'a power supply'],
    ['Fulcrum', 'the pivot point', 'handle'],
    ['it increases', 'it goes up', 'it does not increase'],
    ['Decreasing the angle at a joint', 'flexion', 'extension'],
    ['White blood cells', 'leukocytes', 'erythrocytes'],
  ]) {
    assert.equal(markTextAnswer({answer}, equivalent), true, equivalent)
    assert.equal(markTextAnswer({answer}, incorrect), false, incorrect)
  }
})

test('directions, signs, quantities, formulae and named alternatives matter', () => {
  for (const [answer, equivalent, incorrect] of [
    ['Movement from urban areas to rural areas', 'People move from cities to the countryside.', 'People move from rural areas to cities.'],
    ['Movement from high to low concentration', 'Particles diffuse down their concentration gradient.', 'From a low concentration to a high concentration.'],
    ['From alveoli into blood', 'It enters the blood from the air sacs.', 'It moves from the blood to the alveoli.'],
    ['Speed reduces and torque increases', 'Torque goes up and speed drops.', 'Torque drops and speed goes up.'],
    ['Carbon dioxide','Carbon dioxide, not oxygen.', 'Not carbon dioxide.'],
    ['10^-3', '0.001', '10^3'],
    ['distance ÷ time', 'distance divided by time', 'time / distance'],
    ['v² = u² + 2as', 'v^2 = u^2 + 2as', 'u² = v² + 2as'],
    ['1 hour 30 minutes', '90 mins', '30 mins'],
    ['-273°C', '−273 degrees Celsius', '273 degrees Celsius'],
    ['MgF₂', 'MgF2', 'MgF'],
    ['90 marks', '90 points', '95 marks'],
  ]) {
    assert.equal(markTextAnswer({answer}, equivalent), true, equivalent)
    assert.equal(markTextAnswer({answer}, incorrect), false, incorrect)
  }
  const gas = {answer:'Oxygen', options:['Oxygen','Hydrogen','Nitrogen']}
  assert.equal(markTextAnswer(gas,'oxygen or nitrogen'),false)
  for (const invalid of [undefined, {}, '', '  ']) assert.equal(markTextAnswer(gas, invalid),false)
})

test('all 72 authored Biology models satisfy their own rubrics', () => {
  const questions = [...Object.values(biologyWrittenQuestions).flat(), ...Object.values(biologySuperTest)]
  assert.equal(questions.length,72)
  for (const question of questions) {
    assert.equal(markBiologyWritten(question,question.answer),true,question.q)
    assert.equal(markBiologyWritten(question,'I cannot remember'),false,question.q)
  }
})

test('Biology credits equivalent explanations while requiring the requested ideas', () => {
  for (const [stage, index, equivalent, incorrect] of [
    ['bio-absorption',1,"It doesn't have to travel as far.",'The molecule travels further.'],
    ['bio-biological-molecules',1,'Heat escapes more slowly.','The fat does not insulate us.'],
    ['bio-chemical-digestion',0,'Proteolytic enzymes break it into amino acids.','Amino acids.'],
    ['bio-y11-t3-variation',0,'How much they ate while growing up.','A different gene for height.'],
    ['bio-y11-t3-alleles',0,'They both look the same but have different allele combinations.','They have the same genotype but different phenotypes.'],
    ['bio-y11-t3-crosses',0,'Half are tall and half are short.','3 to 1.'],
    ['bio-removing-waste',0,'The liver, not the kidneys.','The liver does not produce it.'],
    ['bio-y11-t3-dna',0,'The triplet is A U G.','A U C.'],
  ]) {
    const question = biologyWrittenQuestions[stage][index]
    assert.equal(markBiologyWritten(question,equivalent),true,equivalent)
    assert.equal(markBiologyWritten(question,incorrect),false,incorrect)
  }
  assert.equal(markBiologyWritten(biologySuperTest['bio-exercise'],'Take up O2 and release CO₂.'),true)
  assert.equal(markBiologyWritten(biologySuperTest['bio-exercise'],'Take up CO₂ and release O2.'),false)
})
