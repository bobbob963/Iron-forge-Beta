import React, { useEffect, useMemo, useState } from "react";
import { Flame, Hammer, Lock, ShieldCheck, RotateCcw, Trophy, BookOpen, Timer, Dumbbell, Microscope, Shuffle, ArrowLeft, Home, Palette, Medal, LibraryBig, ListChecks, ChevronDown, Check, X, Cpu, Settings } from "lucide-react";

const subjects = [
  {
    id: 'english-language',
    title: 'English Language',
    icon: BookOpen,
    group: 'Year 10',
    yearGroup: 'Year 10',
    category: 'Year 10',
    description:
      'Year 10 Language — Section A non-fiction anthology, unseen comparison, writers’ ideas and perspectives.',
    topics: [
      makeTopic(
        'lang-section-a-overview',
        'Language Section A Overview',
        'Foundation Forge',
        'Not forged',
        [
          'The End of Year Language exam is a condensed version of Section A.',
          'It focuses on one non-fiction anthology text and one unseen non-fiction text.',
          'Question 1 is quick comprehension and is worth 2 marks.',
          'Question 2 asks you to summarise part of the unseen text in your own words and is worth 4 marks.',
          'Question 3 asks what type of text something is and needs repeated points with evidence.',
          'Question 4 is not in the End of Year exam.',
          'Question 5 is the big comparison question and is worth 22 marks.'
        ],
        [
          ['What section is the Language paper focused on?', 'Section A', ['Section A', 'Section B', 'Coursework', 'Speaking exam']],
          ['What does Question 5 test?', 'Comparison between the unseen and anthology text', ['Comparison between the unseen and anthology text', 'Creative writing', 'Spelling only', 'Poetry comparison']],
          ['Which question is not in the End of Year?', 'Question 4', ['Question 4', 'Question 1', 'Question 2', 'Question 5']]
        ]
      ),
      makeTopic(
        'lang-question-5-comparison',
        'Question 5 Comparative Paragraph',
        'Foundation Forge',
        'Not forged',
        [
          'Question 5 asks you to compare the unseen text with an anthology text.',
          'You need to explore links and connections between writers’ ideas and perspectives.',
          'A strong paragraph can follow PETALCPETAL: Point, Evidence, Technique, Analysis, Link, Comparative phrase, Point, Evidence, Technique, Analysis, Link.',
          'Use comparison phrases such as similarly, equally, in contrast, however, alternatively and on the other hand.',
          'Top answers compare both what the writers think and how they present it through language and structure.',
          'Aim for a range of comparisons rather than only one obvious link.'
        ],
        [
          ['What does AO3 focus on?', 'Links between writers’ ideas and perspectives', ['Links between writers’ ideas and perspectives', 'Only spelling', 'Only punctuation', 'Only context']],
          ['Which phrase shows contrast?', 'However', ['However', 'Similarly', 'Equally', 'Both']],
          ['What does PETAL help with?', 'Paragraph structure', ['Paragraph structure', 'Paragraph length only', 'Handwriting', 'Title choice']]
        ]
      ),
      makeTopic(
        'lang-danger-single-story',
        'The Danger of a Single Story',
        'Steel Forge',
        'Not forged',
        [
          'Adichie explores how single stories create narrow and often damaging stereotypes.',
          'She uses personal anecdotes to show how stories shaped her view of the world when she was younger.',
          'The text argues that many stories matter because they can restore dignity and complexity to people.',
          'A key idea is that reducing people to one story removes their humanity.',
          'For comparison, link this text to ideas about perspective, identity, misunderstanding and power.'
        ],
        [
          ['What is the main danger Adichie warns about?', 'Stereotypes from a single story', ['Stereotypes from a single story', 'Reading too slowly', 'Not travelling', 'Writing fiction']],
          ['What method does Adichie often use?', 'Personal anecdote', ['Personal anecdote', 'Rhyming couplets', 'Stage directions', 'Dramatic monologue']],
          ['What do many stories help to restore?', 'Dignity', ['Dignity', 'Silence', 'Confusion', 'Jealousy']]
        ]
      ),
      makeTopic(
        'lang-h-is-for-hawk',
        'H is for Hawk',
        'Steel Forge',
        'Not forged',
        [
          'This text focuses on the writer’s intense connection with a hawk.',
          'It often explores observation, control, nature and emotional tension.',
          'The writer uses precise descriptive language to make the hawk seem powerful and difficult to fully control.',
          'For comparison, link it to texts about nature, fear, identity, isolation or human control.',
          'A good answer should explain how language creates the writer’s attitude towards the hawk.'
        ],
        [
          ['What is the text mainly connected to?', 'Nature and control', ['Nature and control', 'War photography', 'School rules', 'Poetry rhyme']],
          ['What should you analyse in this text?', 'Descriptive language', ['Descriptive language', 'Only punctuation', 'Only title', 'Only paragraph numbers']],
          ['What does the hawk often seem?', 'Powerful', ['Powerful', 'Weak', 'Comic', 'Ordinary']]
        ]
      ),
      makeTopic(
        'lang-passage-to-africa',
        'A Passage to Africa',
        'Iron Forge',
        'Not forged',
        [
          'Alagiah reflects on reporting famine in Somalia and the effect it has on him as a journalist.',
          'The text explores suffering, guilt, pity, revulsion and human dignity.',
          'The face and smile he remembers changes his understanding of the people he reports on.',
          'The writer questions the relationship between journalist and subject.',
          'For comparison, link it to texts about suffering, responsibility, perspective and how outsiders view others.'
        ],
        [
          ['Where is the writer reporting from?', 'Somalia', ['Somalia', 'Nigeria', 'Bhutan', 'China']],
          ['What does the remembered smile make him question?', 'The relationship between journalist and subject', ['The relationship between journalist and subject', 'His school life', 'The weather', 'A poem’s rhyme scheme']],
          ['Which idea is central to the text?', 'Human dignity', ['Human dignity', 'Romantic love', 'Jealousy', 'Sport']]
        ]
      ),
      makeTopic(
        'lang-chinese-cinderella',
        'Chinese Cinderella',
        'Iron Forge',
        'Not forged',
        [
          'Chinese Cinderella is autobiographical and focuses on childhood experience and family treatment.',
          'The text can be linked to identity, memory, unfairness and emotional resilience.',
          'Writers’ feelings are often shown through personal detail and reflection.',
          'For comparison, link it to texts about childhood, being misunderstood, family expectations or disadvantage.',
          'A strong answer should track how the writer’s feelings develop across the extract.'
        ],
        [
          ['What type of writing is Chinese Cinderella?', 'Autobiographical', ['Autobiographical', 'A poem', 'A play', 'A newspaper report']],
          ['Which theme fits the text?', 'Childhood and unfairness', ['Childhood and unfairness', 'War reporting', 'Space travel', 'Nature only']],
          ['What should you track across the extract?', 'How the writer’s feelings develop', ['How the writer’s feelings develop', 'Only the first line', 'Only the title', 'Only punctuation marks']]
        ]
      ),
      makeTopic(
        'lang-explorers-daughter',
        "The Explorer's Daughter",
        'Steel Forge',
        'Not forged',
        [
          'This text focuses on travel, landscape, culture and the writer’s perspective on the natural world.',
          'It can explore the tension between admiration for nature and human exploitation of it.',
          'The writer’s descriptive language is important because it presents place vividly.',
          'For comparison, link it to texts about journeys, nature, cultural identity and human impact.',
          'Good answers should connect language choices to the writer’s attitude.'
        ],
        [
          ['Which idea is important in The Explorer’s Daughter?', 'Nature and human impact', ['Nature and human impact', 'Poetry comparison', 'Romantic jealousy', 'School exams']],
          ['What type of language is useful to analyse?', 'Descriptive language', ['Descriptive language', 'Only dialogue', 'Only rhyme', 'Only stage directions']],
          ['What should comparison focus on?', 'Writers’ attitudes', ['Writers’ attitudes', 'Font size', 'Page numbers', 'Only spelling']]
        ]
      ),
      makeTopic(
        'lang-bhutan',
        'Beyond the Sky and the Earth',
        'Iron Forge',
        'Not forged',
        [
          'This text is about a journey into Bhutan and the writer’s response to a new place and culture.',
          'It can be linked to travel, discovery, uncertainty and changing perspective.',
          'The writer’s feelings may shift as they experience the unfamiliar setting.',
          'For comparison, link it to texts about journeys, culture, identity or learning from experience.',
          'A good paragraph should compare how both writers present their reactions to unfamiliar places.'
        ],
        [
          ['Where is the journey into?', 'Bhutan', ['Bhutan', 'Somalia', 'Nigeria', 'England']],
          ['Which theme fits this text?', 'Travel and changing perspective', ['Travel and changing perspective', 'War trauma only', 'Jealousy', 'Dramatic monologue']],
          ['What should you compare?', 'How writers react to unfamiliar places', ['How writers react to unfamiliar places', 'Only the number of paragraphs', 'Only punctuation', 'Only the title']]
        ]
      ),
      makeTopic(
        'lang-young-dyslexic',
        'Young and Dyslexic',
        'Foundation Forge',
        'Not forged',
        [
          'Young and Dyslexic focuses on education, identity, difficulty and how people respond to challenges.',
          'The text can be linked to being misunderstood and overcoming barriers.',
          'A strong analysis should look at how the writer presents personal experience and perspective.',
          'For comparison, link it to texts about childhood, identity, learning, resilience or social judgement.',
          'Use precise evidence to show how the writer creates sympathy or challenges assumptions.'
        ],
        [
          ['What is a key focus of Young and Dyslexic?', 'Education and identity', ['Education and identity', 'War and famine', 'Marriage', 'A tiger']],
          ['Which idea links well to this text?', 'Overcoming barriers', ['Overcoming barriers', 'Romantic love', 'Violence only', 'Nature worship']],
          ['What should evidence show?', 'The writer’s perspective', ['The writer’s perspective', 'Only page number', 'Only font choice', 'Only spelling']]
        ]
      )
    ]
  },
  {
    id: 'english-literature',
    title: 'English Literature',
    icon: BookOpen,
    group: 'Year 10',
    yearGroup: 'Year 10',
    category: 'Year 10',
    description:
      'Year 10 Literature — poetry comparison, poem structure, themes, speakers and key techniques.',
    topics: [
      makeTopic(
        'lit-my-last-duchess',
        'My Last Duchess',
        'Foundation Forge',
        'Not forged',
        [
          'The Duke shows a visitor a portrait of his dead wife and slowly reveals his controlling nature.',
          'It is a dramatic monologue, so only the Duke’s version of events is heard.',
          'Main ideas include power, control, jealousy, relationships and violence.',
          'The poem presents male power as dangerous because the Duke treats his wife like an object.',
          'The ending suggests the Duchess was removed because the Duke could not control her behaviour.'
        ],
        [
          ['Who is the main speaker in the poem?', 'The Duke', ['The Duke', 'The Duchess', 'A soldier', 'A photographer']],
          ['What form is the poem?', 'Dramatic monologue', ['Dramatic monologue', 'Sonnet', 'Ballad', 'Free verse']],
          ['Which theme is strongest in the poem?', 'Power and control', ['Power and control', 'Nature', 'Childhood', 'Comedy']]
        ]
      ),
      makeTopic(
        'lit-the-tyger',
        'The Tyger',
        'Foundation Forge',
        'Not forged',
        [
          'The speaker questions who could create something as powerful and terrifying as the tiger.',
          'The tiger is used to explore creation, power, danger and mystery.',
          'The repeated questioning makes the poem feel intense and uncertain.',
          'The poem contrasts beauty with violence because the tiger is impressive but frightening.',
          'The ending repeats the opening idea, showing that the mystery has not been solved.'
        ],
        [
          ['What is the poem mainly questioning?', 'Who created the tiger', ['Who created the tiger', 'Where the tiger lives', 'How to hunt the tiger', 'Why the tiger is asleep']],
          ['Which theme fits The Tyger best?', 'Power and mystery', ['Power and mystery', 'Romantic love', 'War guilt', 'Old age']],
          ['What does repeated questioning create?', 'Uncertainty', ['Uncertainty', 'A clear answer', 'A comic mood', 'A simple story']]
        ]
      ),
      makeTopic(
        'lit-la-belle-dame',
        'La Belle Dame',
        'Steel Forge',
        'Not forged',
        [
          'A knight meets a mysterious woman and is left alone, weak and trapped by the memory of her.',
          'The poem uses a ballad form, which makes it feel like an old supernatural story.',
          'The woman appears beautiful but dangerous, linking love with control and suffering.',
          'The knight’s physical state shows how badly he has been affected.',
          'The ending is circular because he remains isolated and unchanged.'
        ],
        [
          ['Who is the central male figure?', 'A knight', ['A knight', 'A duke', 'A photographer', 'A priest']],
          ['What form does the poem use?', 'Ballad', ['Ballad', 'Sonnet', 'Dramatic monologue', 'Haiku']],
          ['What mood best fits the poem?', 'Haunting', ['Haunting', 'Cheerful', 'Relaxed', 'Comic']]
        ]
      ),
      makeTopic(
        'lit-war-photographer',
        'War Photographer',
        'Steel Forge',
        'Not forged',
        [
          'A photographer develops images from war zones and reflects on the suffering he has witnessed.',
          'The poem contrasts the safety of ordinary life with the violence of conflict.',
          'The speaker shows how people often look briefly at suffering and then move on.',
          'The ordered structure reflects the photographer trying to control traumatic memories.',
          'Main ideas include war, suffering, guilt, memory and public indifference.'
        ],
        [
          ['What is the photographer doing?', 'Developing war photographs', ['Developing war photographs', 'Writing a love letter', 'Preparing for battle', 'Painting a portrait']],
          ['Which contrast is important in the poem?', 'Safety and war', ['Safety and war', 'Summer and winter', 'Comedy and romance', 'Youth and sport']],
          ['What does the poem criticise?', 'Public indifference', ['Public indifference', 'School rules', 'Romantic jealousy', 'Religious belief']]
        ]
      ),
      makeTopic(
        'lit-prayer-before-birth',
        'Prayer Before Birth',
        'Iron Forge',
        'Not forged',
        [
          'An unborn speaker asks to be protected from the cruelty and corruption of the world.',
          'The poem presents the world as threatening before the speaker has even entered it.',
          'Repetition makes the voice sound desperate and urgent.',
          'The poem explores innocence, fear, control, violence and human nature.',
          'The speaker fears being shaped or destroyed by society.'
        ],
        [
          ['Who is speaking in the poem?', 'An unborn child', ['An unborn child', 'A duke', 'A knight', 'A photographer']],
          ['What does repetition create?', 'Urgency', ['Urgency', 'Comedy', 'Certainty', 'Silence']],
          ['Which theme fits the poem?', 'Fear of human cruelty', ['Fear of human cruelty', 'Celebration of wealth', 'Romantic marriage', 'Sporting success']]
        ]
      ),
      makeTopic(
        'lit-sonnet-116',
        'Sonnet 116',
        'Iron Forge',
        'Not forged',
        [
          'The speaker argues that true love is constant and does not change when circumstances change.',
          'The poem is a sonnet, so its controlled form supports the idea of stable love.',
          'Love is presented as strong, guiding and resistant to time.',
          'The poem contrasts ideal love with weaker forms of love that alter or fade.',
          'The final couplet strongly defends the speaker’s argument.'
        ],
        [
          ['What is the poem mainly about?', 'Constant love', ['Constant love', 'War trauma', 'Jealous control', 'Supernatural danger']],
          ['What form is Sonnet 116?', 'Sonnet', ['Sonnet', 'Ballad', 'Dramatic monologue', 'Epic']],
          ['What does the poem say true love does?', 'It stays constant', ['It stays constant', 'It disappears quickly', 'It becomes violent', 'It depends on money']]
        ]
      )
    ]
  },
  {
    id: "pe",
    title: "PE",
    icon: Dumbbell,
    description: "GCSE PE — body systems, training, injury prevention and sports psychology.",
    topics: [
      makeTopic("pe-skeletal-structure", "Structure and Function of the Skeleton", "Foundation Forge", "Forged — 8/10", [
        "The skeleton gives the body support and structure.",
        "It protects vital organs, for example the skull protects the brain and the ribs protect the heart and lungs.",
        "Bones help movement because muscles pull on bones.",
        "Bone marrow produces blood cells.",
        "Bones store minerals such as calcium and phosphorus."
      ], [
        ["Which organ does the skull protect?", "Brain", ["Brain", "Heart", "Lungs", "Stomach"]],
        ["Which one is a function of the skeleton?", "Support", ["Support", "Digestion", "Breathing", "Cooling the body"]],
        ["Where are blood cells produced?", "Bone marrow", ["Bone marrow", "Cartilage", "Tendons", "Ligaments"]]
      ]),
      makeTopic("pe-synovial-structure", "Structure of a Synovial Joint", "Foundation Forge", "In progress", [
        "A synovial joint is a freely movable joint containing synovial fluid.",
        "Cartilage covers the ends of bones and reduces friction while absorbing shock.",
        "Synovial fluid lubricates the joint and reduces friction.",
        "The synovial membrane produces synovial fluid.",
        "Ligaments connect bone to bone and stabilise the joint. Tendons connect muscle to bone."
      ], [
        ["What does synovial fluid do?", "Lubricates the joint", ["Lubricates the joint", "Connects bone to bone", "Produces blood cells", "Absorbs oxygen"]],
        ["What connects bone to bone?", "Ligaments", ["Ligaments", "Tendons", "Cartilage", "Muscles"]],
        ["What mainly absorbs shock in a synovial joint?", "Cartilage", ["Cartilage", "Synovial fluid", "Bone marrow", "Ligament"]]
      ]),
      makeTopic("pe-types-synovial-joint", "Types of Synovial Joint", "Steel Forge", "Not forged", [
        "Different synovial joints allow different types of movement.",
        "A hinge joint mainly allows movement backwards and forwards, for example the knee and elbow.",
        "A ball and socket joint allows movement in many directions, for example the hip and shoulder.",
        "A pivot joint allows rotation, for example the neck.",
        "A condyloid joint allows movement in two planes, for example the wrist."
      ], [
        ["Which type of joint is the knee?", "Hinge", ["Hinge", "Ball and socket", "Pivot", "Fixed"]],
        ["Which type of joint is the shoulder?", "Ball and socket", ["Ball and socket", "Hinge", "Pivot", "Gliding"]],
        ["Which joint type mainly allows rotation?", "Pivot", ["Pivot", "Hinge", "Saddle", "Fixed"]]
      ]),
      makeTopic("pe-ranges-of-movement", "Ranges of Movement Allowed by Joints", "Steel Forge", "Not forged", [
        "Flexion means decreasing the angle at a joint, for example bending the elbow.",
        "Extension means increasing the angle at a joint, for example straightening the knee.",
        "Abduction means moving a limb away from the midline of the body.",
        "Adduction means moving a limb back towards the midline of the body.",
        "Rotation is turning around an axis. Circumduction is a circular movement."
      ], [
        ["What is flexion?", "Decreasing the angle at a joint", ["Decreasing the angle at a joint", "Moving away from the body", "Turning around an axis", "Increasing the angle at a joint"]],
        ["What is abduction?", "Movement away from the midline", ["Movement away from the midline", "Movement towards the midline", "Bending a joint", "Straightening a joint"]],
        ["What is circumduction?", "Circular movement", ["Circular movement", "Straightening", "Bending", "Moving towards the body"]]
      ]),
      makeTopic("pe-muscular-location", "Location of Muscles", "Iron Forge", "Not forged", [
        "The biceps are found at the front of the upper arm.",
        "The triceps are found at the back of the upper arm.",
        "The quadriceps are found at the front of the thigh.",
        "The hamstrings are found at the back of the thigh.",
        "The gastrocnemius is the main calf muscle."
      ], [
        ["Where are the quadriceps found?", "Front of the thigh", ["Front of the thigh", "Back of the thigh", "Chest", "Back of the upper arm"]],
        ["Which muscle is found at the back of the upper arm?", "Triceps", ["Triceps", "Biceps", "Deltoid", "Pectorals"]],
        ["Which muscle is commonly called the calf muscle?", "Gastrocnemius", ["Gastrocnemius", "Hamstrings", "Latissimus dorsi", "Abdominals"]]
      ]),
      makeTopic("pe-muscles-movement", "Roles of Muscles in Movement", "Iron Forge", "Not forged", [
        "Muscles work in antagonistic pairs because muscles can only pull, not push.",
        "The agonist is the muscle that contracts to create movement.",
        "The antagonist relaxes to allow the movement to happen.",
        "The fixator stabilises the body while movement takes place.",
        "For elbow flexion, the biceps are the agonist and the triceps are the antagonist."
      ], [
        ["What is the agonist?", "The muscle that contracts", ["The muscle that contracts", "The muscle that relaxes", "The bone that moves", "The joint capsule"]],
        ["Why do muscles work in pairs?", "Muscles can only pull", ["Muscles can only pull", "Muscles can only push", "Bones can contract", "Ligaments create movement"]],
        ["During elbow flexion, which muscle is the agonist?", "Biceps", ["Biceps", "Triceps", "Quadriceps", "Hamstrings"]]
      ]),
      makeTopic("pe-cardiovascular-system", "Cardiovascular System", "Bronze Forge", "Not forged", [
        "The cardiovascular system includes the heart, blood and blood vessels.",
        "The heart pumps blood around the body.",
        "Arteries carry blood away from the heart.",
        "Veins carry blood back to the heart.",
        "Capillaries allow gas exchange between the blood and muscles."
      ], [
        ["What does the heart do?", "Pumps blood", ["Pumps blood", "Produces oxygen", "Stores calcium", "Protects the brain"]],
        ["What do arteries do?", "Carry blood away from the heart", ["Carry blood away from the heart", "Carry blood to the heart", "Join bone to bone", "Lubricate joints"]],
        ["Where does gas exchange happen?", "Capillaries", ["Capillaries", "Ligaments", "Tendons", "Cartilage"]]
      ]),
      makeTopic("pe-respiratory-system", "Respiratory System", "Bronze Forge", "Not forged", [
        "The respiratory system brings oxygen into the body and removes carbon dioxide.",
        "Air travels through the trachea, bronchi, bronchioles and into the alveoli.",
        "The alveoli are where gaseous exchange takes place.",
        "Oxygen diffuses into the blood and carbon dioxide diffuses out of the blood.",
        "During exercise, breathing rate increases to supply more oxygen to working muscles."
      ], [
        ["Where does gaseous exchange happen?", "Alveoli", ["Alveoli", "Trachea", "Ribs", "Heart"]],
        ["Which gas is removed when breathing out?", "Carbon dioxide", ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"]],
        ["Why does breathing rate increase during exercise?", "To supply more oxygen", ["To supply more oxygen", "To reduce movement", "To cool the bones", "To stop blood flow"]]
      ]),
      makeTopic("pe-aerobic-anaerobic", "Aerobic and Anaerobic Exercise", "Bronze Forge", "Not forged", [
        "Aerobic exercise uses oxygen to release energy.",
        "Anaerobic exercise releases energy without enough oxygen.",
        "Aerobic exercise is usually lower intensity and longer duration.",
        "Anaerobic exercise is usually higher intensity and shorter duration.",
        "Anaerobic exercise can cause lactic acid build-up."
      ], [
        ["Which type of exercise uses oxygen?", "Aerobic", ["Aerobic", "Anaerobic", "Static", "Passive"]],
        ["Which type is usually high intensity and short duration?", "Anaerobic", ["Anaerobic", "Aerobic", "Cool down", "Flexibility"]],
        ["What can build up during anaerobic exercise?", "Lactic acid", ["Lactic acid", "Synovial fluid", "Cartilage", "Calcium only"]]
      ]),
      makeTopic("pe-short-term-effects", "Short-Term Effects of Exercise", "Silver Forge", "Not forged", [
        "Heart rate increases to pump more blood to working muscles.",
        "Breathing rate increases to take in more oxygen and remove more carbon dioxide.",
        "Body temperature increases because muscles produce heat.",
        "Sweating increases to help cool the body down.",
        "Muscle fatigue can occur after repeated contractions."
      ], [
        ["What happens to heart rate during exercise?", "It increases", ["It increases", "It stops", "It always decreases", "It has no change"]],
        ["Why does breathing rate increase?", "To get more oxygen in", ["To get more oxygen in", "To make bones stronger instantly", "To reduce blood flow", "To stop sweating"]],
        ["Why does sweating increase?", "To cool the body", ["To cool the body", "To lubricate joints", "To produce blood cells", "To strengthen ligaments"]]
      ]),
      makeTopic("pe-long-term-effects", "Long-Term Effects of Exercise", "Silver Forge", "Not forged", [
        "Regular training can make the heart stronger.",
        "Resting heart rate can decrease after endurance training.",
        "Muscles can increase in size and strength after resistance training.",
        "Bones can become stronger due to weight-bearing exercise.",
        "Flexibility and muscular endurance can improve with suitable training."
      ], [
        ["What can happen to resting heart rate after endurance training?", "It can decrease", ["It can decrease", "It must increase", "It disappears", "It becomes random"]],
        ["Which training type can increase muscle size and strength?", "Resistance training", ["Resistance training", "Only stretching", "Only sleeping", "Only warming up"]],
        ["Weight-bearing exercise can help strengthen what?", "Bones", ["Bones", "Synovial fluid", "Airways only", "Skin only"]]
      ]),
      makeTopic("pe-components-fitness", "Components of Fitness and Fitness Testing", "Gold Forge", "Not forged", [
        "Fitness components include speed, strength, power, agility, flexibility, balance, coordination and cardiovascular endurance.",
        "The bleep test measures cardiovascular endurance.",
        "The 30m sprint test measures speed.",
        "The vertical jump test measures power.",
        "The sit and reach test measures flexibility."
      ], [
        ["What does the bleep test measure?", "Cardiovascular endurance", ["Cardiovascular endurance", "Flexibility", "Power", "Agility"]],
        ["What does the vertical jump test measure?", "Power", ["Power", "Speed", "Balance", "Reaction time"]],
        ["What does the sit and reach test measure?", "Flexibility", ["Flexibility", "Strength", "Speed", "Coordination"]]
      ]),
      makeTopic("pe-spor-fitt", "Principles of Training: SPOR and FITT", "Gold Forge", "Not forged", [
        "SPOR stands for Specificity, Progressive overload, Overload and Reversibility.",
        "Specificity means training should match the sport or fitness goal.",
        "Progressive overload means gradually increasing training difficulty.",
        "Reversibility means fitness can be lost if training stops.",
        "FITT stands for Frequency, Intensity, Time and Type."
      ], [
        ["What does specificity mean?", "Training matches the goal", ["Training matches the goal", "Training gets easier", "Training stops", "Training is random"]],
        ["What does reversibility mean?", "Fitness can be lost if training stops", ["Fitness can be lost if training stops", "Fitness always stays forever", "Training only affects bones", "Intensity never changes"]],
        ["What does FITT stand for?", "Frequency, Intensity, Time, Type", ["Frequency, Intensity, Time, Type", "Force, Impact, Tension, Tempo", "Flexion, Injury, Tendon, Training", "Fast, Intense, Tough, Timed"]]
      ]),
      makeTopic("pe-optimising-training", "Optimising Training", "Gold Forge", "Not forged", [
        "Training should be matched to the performer and their sport.",
        "Training should be challenging enough to improve fitness but not so hard that it causes injury.",
        "Rest and recovery allow adaptations to happen.",
        "Training programmes should include progression over time.",
        "Monitoring performance helps show whether training is working."
      ], [
        ["Why is rest important?", "It allows recovery and adaptation", ["It allows recovery and adaptation", "It stops all progress", "It replaces training", "It removes oxygen"]],
        ["Why should training include progression?", "To keep improving", ["To keep improving", "To make it easier forever", "To avoid all movement", "To stop overload"]],
        ["What should training be matched to?", "The performer and sport", ["The performer and sport", "A random plan", "Only the weather", "Only the equipment"]]
      ]),
      makeTopic("pe-warm-up-cool-down", "Warm Up and Cool Down", "Gold Forge", "Not forged", [
        "A warm up prepares the body for exercise.",
        "A warm up increases heart rate, breathing rate and muscle temperature.",
        "A cool down helps the body return gradually to resting state.",
        "A cool down can include low-intensity movement and stretching.",
        "Warming up can reduce injury risk and improve performance readiness."
      ], [
        ["What does a warm up do?", "Prepares the body for exercise", ["Prepares the body for exercise", "Stops blood flow", "Lowers muscle temperature", "Removes the need for training"]],
        ["What does a cool down help with?", "Returning the body to resting state", ["Returning the body to resting state", "Making the heart stop", "Instantly building muscle", "Preventing breathing"]],
        ["Which one can be part of a cool down?", "Low-intensity movement", ["Low-intensity movement", "Maximum sprinting only", "Heavy lifting only", "No movement at all"]]
      ]),
      makeTopic("pe-injury-prevention", "Prevention of Injury", "Platinum Forge", "Not forged", [
        "Injury prevention includes using correct technique, suitable equipment and appropriate clothing.",
        "A warm up can prepare muscles and joints for exercise.",
        "Following the rules helps keep performers safe.",
        "Training should match the performer’s ability level.",
        "Rest and recovery reduce the risk of overuse injuries."
      ], [
        ["Which one helps prevent injury?", "Correct technique", ["Correct technique", "Ignoring rules", "Skipping warm ups always", "Using broken equipment"]],
        ["Why is rest important for injury prevention?", "It reduces overuse risk", ["It reduces overuse risk", "It causes injuries", "It removes fitness instantly", "It stops recovery"]],
        ["Why should equipment be suitable?", "To keep performers safe", ["To keep performers safe", "To make sport harder", "To reduce movement", "To avoid rules"]]
      ]),
      makeTopic("pe-risk-assessment", "Risk Assessment", "Platinum Forge", "Not forged", [
        "A risk assessment identifies possible hazards before physical activity.",
        "Hazards can include unsafe surfaces, poor weather, faulty equipment or overcrowding.",
        "The risk level depends on how likely harm is and how serious it could be.",
        "Control measures reduce the chance of injury.",
        "Risk assessments help activities take place safely."
      ], [
        ["What does a risk assessment identify?", "Hazards", ["Hazards", "Only winners", "Only muscles", "Only heart rate"]],
        ["Which one could be a hazard?", "Faulty equipment", ["Faulty equipment", "Correct technique", "Good warm up", "Clear space"]],
        ["What do control measures do?", "Reduce risk", ["Reduce risk", "Increase danger", "Remove rules", "Stop all sport forever"]]
      ]),
      makeTopic("pe-facep", "Characteristics of Skilful Movement: FACEP", "Master Forge", "Not forged", [
        "FACEP stands for Fluent, Aesthetic, Consistent, Efficient and Predetermined.",
        "Fluent means the movement flows smoothly.",
        "Aesthetic means the movement looks controlled and pleasing.",
        "Consistent means the performer can repeat the skill successfully.",
        "Efficient means the movement uses the least wasted energy. Predetermined means the action has a clear goal."
      ], [
        ["What does the F in FACEP stand for?", "Fluent", ["Fluent", "Fast", "Force", "Fitness"]],
        ["What does efficient mean?", "Minimal wasted energy", ["Minimal wasted energy", "Maximum wasted energy", "Random movement", "No goal"]],
        ["What does consistent mean?", "Repeated successfully", ["Repeated successfully", "Always accidental", "Only done once", "Completely random"]]
      ]),
      makeTopic("pe-classification-skills", "Classification of Skills", "Master Forge", "Not forged", [
        "Skills can be classified on continua.",
        "An open skill is affected by the environment, for example a tackle in rugby.",
        "A closed skill is performed in a stable environment, for example a free throw in basketball.",
        "A basic skill is simple and requires little information processing.",
        "A complex skill is difficult and requires lots of decision making."
      ], [
        ["What is an open skill?", "A skill affected by the environment", ["A skill affected by the environment", "A skill in a stable environment", "A skill with no decisions", "A skill that cannot improve"]],
        ["What is a closed skill?", "A skill in a stable environment", ["A skill in a stable environment", "A skill affected by opponents", "A skill with no technique", "A skill that is always random"]],
        ["Which one is more complex?", "A skill with lots of decision making", ["A skill with lots of decision making", "A simple repeated action", "A movement with no pressure", "A movement with no information processing"]]
      ]),
      makeTopic("pe-smart-goals", "Goal Setting: SMART", "Master Forge", "Not forged", [
        "SMART goals help performers set clear targets.",
        "SMART stands for Specific, Measurable, Achievable, Realistic and Time-bound.",
        "Specific means the goal is clear and focused.",
        "Measurable means progress can be tracked.",
        "Time-bound means the goal has a deadline."
      ], [
        ["What does SMART stand for?", "Specific, Measurable, Achievable, Realistic, Time-bound", ["Specific, Measurable, Achievable, Realistic, Time-bound", "Speed, Movement, Agility, Reaction, Timing", "Strength, Muscle, Aerobic, Rest, Training", "Simple, Massive, Active, Ready, Tough"]],
        ["What does measurable mean?", "Progress can be tracked", ["Progress can be tracked", "The goal is random", "There is no deadline", "It is impossible"]],
        ["What does time-bound mean?", "The goal has a deadline", ["The goal has a deadline", "The goal has no time limit", "The goal cannot be measured", "The goal is vague"]]
      ])
    ]
  },
  {
    id: "bio",
    title: "Bio",
    icon: Microscope,
    description: "Biology — What is life, respiration, nutrition, transport, disease and immunity.",
    topics: [
      makeTopic("bio-aerobic-respiration", "Aerobic Respiration", "Foundation Forge", "Not forged", [
        "Aerobic respiration releases energy from glucose using oxygen.",
        "Word equation: glucose + oxygen → carbon dioxide + water.",
        "Balanced symbol equation: C6H12O6 + 6O2 → 6CO2 + 6H2O.",
        "The energy released is used to make ATP.",
        "Aerobic respiration mainly happens in the mitochondria."
      ], [
        ["What gas is needed for aerobic respiration?", "Oxygen", ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"]],
        ["Where does aerobic respiration mainly happen?", "Mitochondria", ["Mitochondria", "Nucleus", "Ribosome", "Cell membrane"]],
        ["What is ATP used for?", "Energy for cell processes", ["Energy for cell processes", "Making bones longer", "Digesting food", "Carrying genetic code"]]
      ]),
      makeTopic("bio-obtaining-nutrition", "Obtaining Nutrition", "Foundation Forge", "Not forged", [
        "Nutrition is how organisms obtain useful substances from food.",
        "Food provides energy, materials for growth and substances needed for repair.",
        "Humans are heterotrophs because they get food by eating other organisms.",
        "Plants are autotrophs because they make their own food by photosynthesis.",
        "A balanced diet includes carbohydrates, proteins, lipids, vitamins, minerals, fibre and water."
      ], [
        ["What does food provide?", "Energy and materials for growth", ["Energy and materials for growth", "Only oxygen", "Only water", "Only carbon dioxide"]],
        ["What is a heterotroph?", "An organism that gets food by eating other organisms", ["An organism that gets food by eating other organisms", "An organism that makes food from sunlight", "A type of blood cell", "A disease"]],
        ["Which nutrient is mainly used for energy?", "Carbohydrates", ["Carbohydrates", "Fibre", "Water", "Minerals"]]
      ]),
      makeTopic("bio-biological-molecules", "Biological Molecules", "Foundation Forge", "Not forged", [
        "Carbohydrates, proteins and lipids are important biological molecules.",
        "Carbohydrates are used as an energy source.",
        "Proteins are needed for growth, repair and enzymes.",
        "Lipids are used for energy storage and insulation.",
        "Food tests can be used to identify biological molecules."
      ], [
        ["Which molecule is mainly used as an energy source?", "Carbohydrate", ["Carbohydrate", "Protein", "Water", "DNA only"]],
        ["What are proteins needed for?", "Growth and repair", ["Growth and repair", "Only insulation", "Only breathing", "Only movement of joints"]],
        ["What are lipids used for?", "Energy storage and insulation", ["Energy storage and insulation", "Making oxygen", "Destroying enzymes", "Carrying nerve impulses only"]]
      ]),
      makeTopic("bio-ingestion-mechanical-digestion", "Ingestion and Mechanical Digestion", "Steel Forge", "Not forged", [
        "Ingestion is taking food into the mouth.",
        "Mechanical digestion is the physical breakdown of food into smaller pieces.",
        "Teeth break food down by chewing.",
        "The tongue helps move food around the mouth and forms a bolus.",
        "Mechanical digestion increases the surface area of food for enzymes to work on."
      ], [
        ["What is ingestion?", "Taking food into the mouth", ["Taking food into the mouth", "Absorbing food into blood", "Removing waste", "Breathing in oxygen"]],
        ["What is mechanical digestion?", "Physical breakdown of food", ["Physical breakdown of food", "Chemical breakdown by enzymes", "Absorption into blood", "Excretion from the body"]],
        ["Why is mechanical digestion useful?", "It increases surface area for enzymes", ["It increases surface area for enzymes", "It makes oxygen", "It stops digestion", "It kills all bacteria"]]
      ]),
      makeTopic("bio-chemical-digestion", "Chemical Digestion", "Steel Forge", "Not forged", [
        "Chemical digestion uses enzymes to break large insoluble molecules into small soluble molecules.",
        "Amylase breaks starch into sugars.",
        "Protease breaks proteins into amino acids.",
        "Lipase breaks lipids into fatty acids and glycerol.",
        "Small soluble molecules can then be absorbed into the blood."
      ], [
        ["What does amylase break down?", "Starch", ["Starch", "Protein", "Lipids", "DNA"]],
        ["What does protease break proteins into?", "Amino acids", ["Amino acids", "Fatty acids", "Glucose", "Glycerol"]],
        ["What does lipase break lipids into?", "Fatty acids and glycerol", ["Fatty acids and glycerol", "Amino acids", "Sugars", "Water and oxygen"]]
      ]),
      makeTopic("bio-absorption", "Absorption", "Steel Forge", "Not forged", [
        "Absorption is the movement of small soluble food molecules into the blood.",
        "Absorption mainly happens in the small intestine.",
        "The small intestine has villi to increase surface area.",
        "Villi have thin walls to shorten the diffusion distance.",
        "Villi have a good blood supply to carry absorbed molecules away."
      ], [
        ["Where does most absorption happen?", "Small intestine", ["Small intestine", "Stomach", "Mouth", "Large intestine"]],
        ["What do villi do?", "Increase surface area", ["Increase surface area", "Make oxygen", "Pump blood", "Produce bile"]],
        ["Why do villi have a good blood supply?", "To carry absorbed molecules away", ["To carry absorbed molecules away", "To make food bigger", "To stop diffusion", "To produce teeth"]]
      ]),
      makeTopic("bio-obtaining-oxygen", "Obtaining Oxygen", "Bronze Forge", "Not forged", [
        "Oxygen is needed for aerobic respiration.",
        "Air enters through the mouth or nose and travels to the lungs.",
        "Gas exchange happens in the alveoli.",
        "Oxygen diffuses from the alveoli into the blood.",
        "Carbon dioxide diffuses from the blood into the alveoli to be breathed out."
      ], [
        ["Why do humans need oxygen?", "For aerobic respiration", ["For aerobic respiration", "To make bones directly", "To digest fibre", "To produce bile"]],
        ["Where does gas exchange happen?", "Alveoli", ["Alveoli", "Stomach", "Kidney", "Small intestine"]],
        ["Which direction does oxygen diffuse?", "From alveoli into blood", ["From alveoli into blood", "From blood into alveoli", "From stomach into lungs", "From kidney into mouth"]]
      ]),
      makeTopic("bio-blood", "Blood", "Bronze Forge", "Not forged", [
        "Blood is a tissue that transports substances around the body.",
        "Red blood cells carry oxygen using haemoglobin.",
        "White blood cells help defend the body against pathogens.",
        "Platelets help blood clot.",
        "Plasma transports dissolved substances such as carbon dioxide, glucose and urea."
      ], [
        ["What do red blood cells carry?", "Oxygen", ["Oxygen", "Bile", "Enzymes only", "Bones"]],
        ["What do white blood cells do?", "Defend against pathogens", ["Defend against pathogens", "Carry oxygen", "Clot blood", "Pump blood"]],
        ["What do platelets help with?", "Blood clotting", ["Blood clotting", "Oxygen transport", "Digestion", "Breathing"]]
      ]),
      makeTopic("bio-cardiovascular-system", "Cardiovascular System", "Bronze Forge", "Not forged", [
        "The cardiovascular system includes the heart, blood and blood vessels.",
        "The heart pumps blood around the body.",
        "Arteries carry blood away from the heart.",
        "Veins carry blood back to the heart.",
        "Capillaries allow exchange of substances between blood and cells."
      ], [
        ["What does the heart do?", "Pumps blood", ["Pumps blood", "Makes oxygen", "Stores urine", "Digests food"]],
        ["What do arteries do?", "Carry blood away from the heart", ["Carry blood away from the heart", "Carry blood to the heart", "Make antibodies", "Break down food"]],
        ["Where does exchange of substances happen?", "Capillaries", ["Capillaries", "Veins only", "Arteries only", "Platelets"]]
      ]),
      makeTopic("bio-removing-waste", "Removing Waste", "Silver Forge", "Not forged", [
        "Excretion is the removal of waste products of metabolism from the body.",
        "Carbon dioxide is removed by the lungs.",
        "Urea is made in the liver from excess amino acids.",
        "The kidneys remove urea from the blood and produce urine.",
        "Excretion is important because waste substances can become toxic if they build up."
      ], [
        ["What is excretion?", "Removal of metabolic waste", ["Removal of metabolic waste", "Taking in food", "Mechanical digestion", "Absorption of glucose"]],
        ["Which organ removes carbon dioxide?", "Lungs", ["Lungs", "Kidneys", "Liver", "Stomach"]],
        ["Which organs remove urea from the blood?", "Kidneys", ["Kidneys", "Lungs", "Heart", "Small intestine"]]
      ]),
      makeTopic("bio-life-without-transport-systems", "Life Without Transport Systems", "Silver Forge", "Not forged", [
        "Small organisms can rely on diffusion because they have a large surface area to volume ratio.",
        "Diffusion is the movement of particles from high concentration to low concentration.",
        "Larger organisms need transport systems because diffusion alone is too slow.",
        "Transport systems move substances like oxygen, glucose and waste products around the body.",
        "Surface area to volume ratio affects how efficiently substances can move in and out."
      ], [
        ["Why can small organisms rely on diffusion?", "Large surface area to volume ratio", ["Large surface area to volume ratio", "They have no cells", "They have no need for oxygen", "They cannot respire"]],
        ["What is diffusion?", "Movement from high to low concentration", ["Movement from high to low concentration", "Movement from low to high concentration only", "Pumping blood", "Breaking down food"]],
        ["Why do larger organisms need transport systems?", "Diffusion alone is too slow", ["Diffusion alone is too slow", "They do not need glucose", "They have no waste", "They have no cells"]]
      ]),
      makeTopic("bio-exercise", "Exercise", "Silver Forge", "Not forged", [
        "During exercise, muscles need more energy for contraction.",
        "Heart rate increases to deliver more oxygen and glucose to muscles.",
        "Breathing rate increases to take in more oxygen and remove carbon dioxide.",
        "If oxygen supply is not enough, anaerobic respiration can happen.",
        "Anaerobic respiration can cause lactic acid build-up."
      ], [
        ["Why do muscles need more oxygen during exercise?", "For more aerobic respiration", ["For more aerobic respiration", "To make bones longer", "To stop blood flow", "To digest food"]],
        ["What happens to heart rate during exercise?", "It increases", ["It increases", "It stops", "It always decreases", "It has no change"]],
        ["What can build up after anaerobic respiration?", "Lactic acid", ["Lactic acid", "Oxygen", "Bile", "Fibre"]]
      ]),
      makeTopic("bio-thermoregulation", "Thermoregulation", "Gold Forge", "Not forged", [
        "Thermoregulation is the control of body temperature.",
        "Enzymes work best at an optimum temperature.",
        "If too hot, sweating increases and blood vessels near the skin widen.",
        "If too cold, shivering can occur and blood vessels near the skin narrow.",
        "Thermoregulation uses negative feedback to return body temperature to normal."
      ], [
        ["What is thermoregulation?", "Control of body temperature", ["Control of body temperature", "Control of blood sugar only", "Digestion of starch", "Making antibodies"]],
        ["What happens when the body is too hot?", "Sweating increases", ["Sweating increases", "Shivering increases", "Blood vessels narrow only", "No response happens"]],
        ["Why is temperature control important?", "Enzymes need the right temperature", ["Enzymes need the right temperature", "Bones need to melt", "Blood must stop moving", "Cells do not need enzymes"]]
      ]),
      makeTopic("bio-lifestyle-diseases", "Lifestyle Diseases", "Gold Forge", "Not forged", [
        "Lifestyle diseases can be linked to choices such as diet, smoking, alcohol intake and physical activity levels.",
        "Risk factors increase the chance of developing disease.",
        "A poor diet and low physical activity can increase the risk of obesity and type 2 diabetes.",
        "Smoking increases the risk of lung disease and cardiovascular disease.",
        "Correlation does not always prove causation, but it can show a relationship between factors."
      ], [
        ["What is a risk factor?", "Something that increases the chance of disease", ["Something that increases the chance of disease", "Something that guarantees health", "A type of blood cell", "A digestive enzyme"]],
        ["Smoking increases the risk of which disease type?", "Lung disease", ["Lung disease", "Only broken bones", "Only tooth growth", "Only cartilage damage"]],
        ["What does correlation show?", "A relationship between factors", ["A relationship between factors", "Definite proof of causation every time", "No link at all", "A type of enzyme"]]
      ]),
      makeTopic("bio-infectious-diseases", "Infectious Diseases", "Master Forge", "Not forged", [
        "Infectious diseases are caused by pathogens.",
        "Pathogens include bacteria, viruses, fungi and protists.",
        "Pathogens can spread through air, water, direct contact or vectors.",
        "Good hygiene can reduce the spread of infectious disease.",
        "Vaccination can help protect populations from some infectious diseases."
      ], [
        ["What causes infectious disease?", "Pathogens", ["Pathogens", "Only exercise", "Only bones", "Only oxygen"]],
        ["Which one is a pathogen?", "Virus", ["Virus", "Red blood cell", "Platelet", "Alveolus"]],
        ["Which one can reduce disease spread?", "Good hygiene", ["Good hygiene", "Sharing dirty equipment", "Ignoring symptoms", "No hand washing"]]
      ]),
      makeTopic("bio-immunity", "Immunity", "Master Forge", "Not forged", [
        "The immune system defends the body against pathogens.",
        "White blood cells can destroy pathogens.",
        "Some white blood cells produce antibodies.",
        "Antibodies are specific to antigens on pathogens.",
        "Memory cells allow a faster response if the same pathogen enters again."
      ], [
        ["Which cells are important in immunity?", "White blood cells", ["White blood cells", "Red blood cells only", "Platelets only", "Muscle cells only"]],
        ["What do antibodies bind to?", "Antigens", ["Antigens", "Cartilage", "Synovial fluid", "Glucose only"]],
        ["What do memory cells allow?", "A faster response next time", ["A faster response next time", "No immune response", "Less oxygen transport", "Mechanical digestion"]]
      ])
    ]
  },
  {
    id: "dt",
    title: "DT Theory",
    icon: Cpu,
    description: "Design Technology — CAM, electronics, structures and mechanisms.",
    topics: [
      makeTopic("dt-cam", "Computer Aided Manufacture", "Foundation Forge", "Not forged", [
        "Computer Aided Manufacture means using computer-controlled machines to make products or parts.",
        "Machines operated by computer can be more accurate and repeatable than hand production.",
        "CAM is useful for batch production because the same design can be made again and again.",
        "CAM can reduce human error and improve consistency.",
        "A limitation is that CAM machinery can be expensive to set up."
      ], [
        ["What does CAM stand for?", "Computer Aided Manufacture", ["Computer Aided Manufacture", "Computer Added Material", "Controlled Automatic Motion", "Computer Aided Marketing"]],
        ["Which one is a benefit of CAM?", "Accurate repeat production", ["Accurate repeat production", "Always cheaper to set up", "No need for electricity", "Only works by hand"]],
        ["What type of machines are used in CAM?", "Computer-controlled machines", ["Computer-controlled machines", "Only hand tools", "Only natural materials", "Only levers"]]
      ]),
      makeTopic("dt-electronics-materials", "Electronics: Conductors and Insulators", "Foundation Forge", "Not forged", [
        "Conductors allow electricity to flow through them easily.",
        "Metals such as copper and aluminium are good conductors.",
        "Insulators do not allow electricity to flow through them easily.",
        "Plastics, rubber and ceramics are common insulating materials.",
        "Insulators are used to make electrical products safer."
      ], [
        ["What does a conductor do?", "Allows electricity to flow", ["Allows electricity to flow", "Stops all movement", "Increases friction", "Stores only heat"]],
        ["Which material is usually a good conductor?", "Copper", ["Copper", "Rubber", "Plastic", "Wood"]],
        ["Why are insulators useful?", "They improve electrical safety", ["They improve electrical safety", "They always conduct better", "They make circuits faster only", "They remove the need for wires"]]
      ]),
      makeTopic("dt-systems-diagrams", "Systems Diagrams", "Steel Forge", "Not forged", [
        "A system diagram shows input, process, output and feedback.",
        "The input is the signal, energy or material that enters the system.",
        "The process is what happens inside the system.",
        "The output is what the system produces.",
        "Feedback is information sent back to help control or improve the system."
      ], [
        ["What are the main parts of a systems diagram?", "Input, process, output and feedback", ["Input, process, output and feedback", "Mass, frame and shell", "Tension, compression and torsion", "Linear, rotary and reciprocating"]],
        ["What is an output?", "What the system produces", ["What the system produces", "What enters the system", "The material cost", "The force only"]],
        ["What does feedback do?", "Sends information back into the system", ["Sends information back into the system", "Removes the input", "Stops the circuit", "Changes volts into amps"]]
      ]),
      makeTopic("dt-circuit-symbols", "Circuit Symbols", "Steel Forge", "Not forged", [
        "Circuit symbols are standard drawings used to represent components in a circuit.",
        "They make circuit diagrams clearer and quicker to draw.",
        "You need to recognise common symbols from the exam board sheet.",
        "Examples include cell, battery, lamp, switch, resistor, LED and motor.",
        "Circuit diagrams show how components are connected, not what the product physically looks like."
      ], [
        ["Why are circuit symbols used?", "To represent components clearly", ["To represent components clearly", "To decorate the product", "To calculate density", "To show only materials"]],
        ["What does a circuit diagram show?", "How components are connected", ["How components are connected", "The exact product shape", "Only the packaging", "The mass of a structure"]],
        ["Which one is an electronic component?", "Resistor", ["Resistor", "Fulcrum", "Beam", "Rack"]]
      ]),
      makeTopic("dt-units-prefixes", "Units and Prefixes", "Steel Forge", "Not forged", [
        "Prefixes show the size of a unit, such as milli, micro, kilo and mega.",
        "pico is 10^-12, nano is 10^-9, micro is 10^-6 and milli is 10^-3.",
        "kilo is 10^3, mega is 10^6, giga is 10^9 and tera is 10^12.",
        "V means volts, A means amps, W means watts, F means farads and Ω means ohms.",
        "Correct units are important in electronics questions."
      ], [
        ["What does milli mean?", "10^-3", ["10^-3", "10^3", "10^-9", "10^9"]],
        ["What does kilo mean?", "10^3", ["10^3", "10^-3", "10^-6", "10^12"]],
        ["What unit is represented by Ω?", "Ohms", ["Ohms", "Volts", "Amps", "Watts"]]
      ]),
      makeTopic("dt-structures-types", "Types of Structure", "Bronze Forge", "Not forged", [
        "A mass structure is solid and relies on its own weight and material strength.",
        "A frame structure is made from joined members, such as beams or rods.",
        "A shell structure has a thin outer skin that gives it strength and shape.",
        "Natural structures occur in nature, such as trees or bones.",
        "Man-made structures are designed and built by humans."
      ], [
        ["What is a frame structure made from?", "Joined members", ["Joined members", "Only liquid", "A single solid block", "Only gears"]],
        ["What is a shell structure?", "A thin outer skin structure", ["A thin outer skin structure", "A solid heavy block", "A type of circuit", "A lever class"]],
        ["Which one is natural?", "Bone", ["Bone", "Bridge", "Chair", "Gear train"]]
      ]),
      makeTopic("dt-forces", "Forces in Structures", "Bronze Forge", "Not forged", [
        "Tension is a pulling force that stretches a material.",
        "Compression is a pushing force that squashes a material.",
        "Bending combines tension and compression as a material curves.",
        "Torsion is a twisting force.",
        "Shear is a force that tries to slide layers of material past each other."
      ], [
        ["What is tension?", "A pulling force", ["A pulling force", "A twisting force", "A sliding force", "A squashing force"]],
        ["What is compression?", "A pushing or squashing force", ["A pushing or squashing force", "A pulling force", "A circuit symbol", "A type of gear"]],
        ["What is torsion?", "A twisting force", ["A twisting force", "A pulling force", "A bending moment", "A friction type"]]
      ]),
      makeTopic("dt-motion-types", "Conversion of Motion", "Silver Forge", "Not forged", [
        "Linear motion moves in a straight line.",
        "Rotary motion moves in a circle around an axis.",
        "Reciprocating motion moves backwards and forwards in a straight line.",
        "Oscillating motion moves backwards and forwards in an arc.",
        "Mechanisms often convert one type of motion into another."
      ], [
        ["What is rotary motion?", "Circular movement around an axis", ["Circular movement around an axis", "Straight line movement", "Back and forward in a line", "Back and forward in an arc"]],
        ["What is reciprocating motion?", "Backwards and forwards in a straight line", ["Backwards and forwards in a straight line", "Circular motion", "Twisting force", "A type of structure"]],
        ["What is oscillating motion?", "Backwards and forwards in an arc", ["Backwards and forwards in an arc", "Straight line movement", "A circuit output", "A unit prefix"]]
      ]),
      makeTopic("dt-friction", "Reduction of Friction", "Silver Forge", "Not forged", [
        "Friction is a force that resists movement between surfaces.",
        "Friction can cause heat, wear and energy loss.",
        "Bearings reduce friction between moving parts.",
        "Lubrication reduces friction by placing a slippery layer between surfaces.",
        "Reducing friction can make mechanisms more efficient."
      ], [
        ["What does friction do?", "Resists movement", ["Resists movement", "Stores current", "Increases voltage", "Creates a shell structure"]],
        ["Which component reduces friction?", "Bearings", ["Bearings", "Insulators", "Fulcrums", "Resistors"]],
        ["What is lubrication used for?", "Reducing friction", ["Reducing friction", "Increasing shear", "Making circuits open", "Changing amps into volts"]]
      ]),
      makeTopic("dt-levers", "Levers", "Gold Forge", "Not forged", [
        "Levers use a pivot point called a fulcrum.",
        "In a first class lever, the fulcrum is in the middle.",
        "In a second class lever, the load is in the middle.",
        "In a third class lever, the effort is in the middle.",
        "Levers can make it easier to move a load by giving mechanical advantage."
      ], [
        ["What is the pivot point of a lever called?", "Fulcrum", ["Fulcrum", "Load", "Effort", "Bearing"]],
        ["In a first class lever, what is in the middle?", "Fulcrum", ["Fulcrum", "Load", "Effort", "Spring"]],
        ["In a second class lever, what is in the middle?", "Load", ["Load", "Fulcrum", "Effort", "Rack"]]
      ]),
      makeTopic("dt-gear-trains", "Simple Gear Trains", "Gold Forge", "Not forged", [
        "Gears transmit rotary motion from one shaft to another.",
        "A small driver gear turning a larger driven gear reduces speed and increases torque.",
        "A large driver gear turning a smaller driven gear increases speed and reduces torque.",
        "Idler gears are used to change direction or transfer motion without changing the ratio.",
        "Gear trains are used where controlled speed and torque are needed."
      ], [
        ["What happens when a small driver turns a larger driven gear?", "Speed reduces and torque increases", ["Speed reduces and torque increases", "Speed increases and torque reduces", "Both stop", "Only friction changes"]],
        ["What happens when a large driver turns a smaller driven gear?", "Speed increases and torque reduces", ["Speed increases and torque reduces", "Speed reduces and torque increases", "No motion is transmitted", "It becomes linear motion only"]],
        ["What can an idler gear be used for?", "Changing direction", ["Changing direction", "Insulating wires", "Reducing voltage", "Making a shell structure"]]
      ]),
      makeTopic("dt-mechanisms", "Common Mechanisms", "Master Forge", "Not forged", [
        "Rack and pinion converts rotary motion into linear motion.",
        "Crank and piston converts rotary motion and reciprocating motion.",
        "Linkages transfer movement and can change the direction or type of motion.",
        "Spur gears transmit motion from one shaft to another.",
        "Chain and sprockets, and belts and pulleys, also transmit motion between shafts."
      ], [
        ["What does rack and pinion convert?", "Rotary motion into linear motion", ["Rotary motion into linear motion", "Electricity into heat", "Tension into compression", "Current into voltage"]],
        ["What does a crank and piston involve?", "Rotary and reciprocating motion", ["Rotary and reciprocating motion", "Only insulation", "Only shell structures", "Only unit prefixes"]],
        ["Which mechanism uses sprockets?", "Chain and sprockets", ["Chain and sprockets", "Belt and pulley", "Rack and pinion", "Lever"]]
      ])
    ]
  },
  {
    id: "chemistry",
    title: "Chemistry",
    icon: Microscope,
    description: "Chemistry — bonding, crude oil, energetics and chemical tests.",
    topics: [
      makeTopic("chem-electronic-configuration", "Electronic Configuration and Ions", "Foundation Forge", "Not forged", [
        "Electronic configuration shows how electrons are arranged in shells around the nucleus.",
        "Calcium has electronic configuration 2,8,8,2.",
        "Atoms form ions by losing or gaining electrons to get a full outer shell.",
        "Metal atoms usually lose electrons to form positive ions.",
        "Non-metal atoms usually gain electrons to form negative ions."
      ], [
        ["What is the electronic configuration of calcium?", "2,8,8,2", ["2,8,8,2", "2,8,5", "2,7", "2,8,6"]],
        ["How do metals usually form ions?", "They lose electrons", ["They lose electrons", "They gain electrons", "They lose protons", "They gain neutrons"]],
        ["What charge does a metal ion usually have?", "Positive", ["Positive", "Negative", "Neutral", "No charge possible"]],
        ["How do non-metals usually form ions?", "They gain electrons", ["They gain electrons", "They lose electrons", "They gain protons", "They lose neutrons"]],
        ["Why do atoms form ions?", "To get a full outer shell", ["To get a full outer shell", "To remove the nucleus", "To become larger only", "To change into a compound automatically"]]
      ]),
      makeTopic("chem-covalent-bonding", "Covalent Bonding", "Foundation Forge", "Not forged", [
        "Covalent bonding happens when non-metal atoms share pairs of electrons.",
        "Hydrogen sulfide, phosphine and chloromethane can be shown using dot-and-cross diagrams.",
        "Shared electrons count towards the outer shell of both bonded atoms.",
        "A single covalent bond is one shared pair of electrons.",
        "Dot-and-cross diagrams help show which atom each electron came from."
      ], [
        ["What happens in covalent bonding?", "Atoms share pairs of electrons", ["Atoms share pairs of electrons", "Atoms transfer protons", "Metals lose electrons to a sea", "Neutrons are exchanged"]],
        ["What type of elements usually form covalent bonds?", "Non-metals", ["Non-metals", "Metals only", "Noble gases only", "Transition metals only"]],
        ["What is one single covalent bond?", "One shared pair of electrons", ["One shared pair of electrons", "Two lost protons", "One gained neutron", "A metal lattice"]],
        ["Why are dot-and-cross diagrams useful?", "They show outer electrons and shared pairs", ["They show outer electrons and shared pairs", "They show boiling points only", "They show speed", "They show pressure"]],
        ["In a covalent bond, the shared electrons count towards which atoms?", "Both bonded atoms", ["Both bonded atoms", "Only the larger atom", "Only the smaller atom", "Neither atom"]]
      ]),
      makeTopic("chem-ionic-bonding", "Ionic Bonding", "Steel Forge", "Not forged", [
        "Ionic bonding happens when electrons are transferred from a metal to a non-metal.",
        "Lithium fluoride forms when lithium loses one electron and fluorine gains one electron.",
        "Magnesium fluoride forms MgF₂ because magnesium loses two electrons and two fluorine atoms each gain one.",
        "Positive and negative ions attract strongly to form an ionic compound.",
        "Ionic compounds are shown with square brackets and charges around the ions."
      ], [
        ["What happens in ionic bonding?", "Electrons are transferred", ["Electrons are transferred", "Electrons are shared only", "Protons are shared", "Neutrons are removed"]],
        ["Which type of atom usually loses electrons in ionic bonding?", "Metal", ["Metal", "Non-metal", "Noble gas", "Halogen only"]],
        ["What charge does lithium form in lithium fluoride?", "+1", ["+1", "-1", "+2", "0"]],
        ["What is the formula of magnesium fluoride?", "MgF₂", ["MgF₂", "MgF", "Mg₂F", "Mg₂F₂"]],
        ["Why do ionic compounds hold together?", "Oppositely charged ions attract", ["Oppositely charged ions attract", "They have no charge", "They repel each other", "They contain only gases"]]
      ]),
      makeTopic("chem-crude-oil", "Crude Oil", "Steel Forge", "Not forged", [
        "Crude oil is a mixture of hydrocarbons.",
        "Fractional distillation separates crude oil into fractions with different boiling points.",
        "Main fractions include refinery gases, gasoline, kerosene, diesel, fuel oil and bitumen.",
        "Complete combustion of hydrocarbons produces carbon dioxide and water.",
        "Incomplete combustion can produce carbon monoxide, which is poisonous because it reduces the blood's ability to carry oxygen."
      ], [
        ["What is crude oil a mixture of?", "Hydrocarbons", ["Hydrocarbons", "Salts", "Metals", "Noble gases"]],
        ["What process separates crude oil into fractions?", "Fractional distillation", ["Fractional distillation", "Electrolysis", "Filtration", "Crystallisation"]],
        ["What are the products of complete combustion of hydrocarbons?", "Carbon dioxide and water", ["Carbon dioxide and water", "Hydrogen and oxygen", "Salt and water", "Carbon monoxide only"]],
        ["Why is carbon monoxide dangerous?", "It reduces the blood's ability to carry oxygen", ["It reduces the blood's ability to carry oxygen", "It is completely harmless", "It turns limewater cloudy only", "It makes fuels burn faster"]],
        ["Why is cracking needed?", "To make shorter useful hydrocarbons from long-chain hydrocarbons", ["To make shorter useful hydrocarbons from long-chain hydrocarbons", "To remove all carbon", "To make crude oil from water", "To stop combustion"]]
      ]),
      makeTopic("chem-energetics", "Heat, Temperature and Energetics", "Bronze Forge", "Not forged", [
        "Heat is a type of energy, while temperature is a measure of hotness linked to average kinetic energy.",
        "Exothermic reactions give out heat energy.",
        "Endothermic reactions take in energy.",
        "A negative ΔH means an exothermic change and a positive ΔH means an endothermic change.",
        "Energy level diagrams show the energy change during exothermic and endothermic reactions."
      ], [
        ["What is temperature linked to?", "Average kinetic energy", ["Average kinetic energy", "Mass only", "Number of protons", "Volume only"]],
        ["What type of reaction gives out heat energy?", "Exothermic", ["Exothermic", "Endothermic", "Neutral only", "Ionic only"]],
        ["What type of reaction takes in energy?", "Endothermic", ["Endothermic", "Exothermic", "Combustion only", "Precipitation only"]],
        ["What does a negative ΔH mean?", "Exothermic change", ["Exothermic change", "Endothermic change", "No reaction", "A gas test"]],
        ["What can energy level diagrams show?", "Energy changes in reactions", ["Energy changes in reactions", "Atomic number only", "Flame colours only", "Crude oil fractions only"]]
      ]),
      makeTopic("chem-gas-tests", "Gas Tests", "Bronze Forge", "Not forged", [
        "Hydrogen gas makes a squeaky pop with a lit splint.",
        "Oxygen relights a glowing splint.",
        "Chlorine bleaches damp litmus paper.",
        "Ammonia turns damp red litmus paper blue and has a pungent smell.",
        "Carbon dioxide turns limewater cloudy due to calcium carbonate forming."
      ], [
        ["What is the test for hydrogen gas?", "Squeaky pop with a lit splint", ["Squeaky pop with a lit splint", "Relights a glowing splint", "Turns limewater cloudy", "Bleaches damp litmus"]],
        ["What gas relights a glowing splint?", "Oxygen", ["Oxygen", "Hydrogen", "Carbon dioxide", "Ammonia"]],
        ["What is the test for chlorine gas?", "Bleaches damp litmus paper", ["Bleaches damp litmus paper", "Turns limewater cloudy", "Squeaky pop", "Turns red litmus blue"]],
        ["What gas turns damp red litmus paper blue?", "Ammonia", ["Ammonia", "Oxygen", "Hydrogen", "Carbon dioxide"]],
        ["What does carbon dioxide do to limewater?", "Turns it cloudy", ["Turns it cloudy", "Relights it", "Bleaches it", "Makes a squeaky pop"]]
      ]),
      makeTopic("chem-flame-tests", "Flame Tests", "Silver Forge", "Not forged", [
        "Flame tests use a sample on a nichrome wire placed into a roaring blue flame.",
        "The yellow safety flame is not used because it is difficult to see the colour change.",
        "Lithium ions give a crimson red flame.",
        "Sodium ions give a yellow flame and potassium ions give a lilac flame.",
        "Calcium ions give a brick red flame and copper ions give a blue-green flame."
      ], [
        ["What colour is lithium in a flame test?", "Crimson red", ["Crimson red", "Yellow", "Lilac", "Blue-green"]],
        ["What colour is sodium in a flame test?", "Yellow", ["Yellow", "Crimson red", "Brick red", "Green"]],
        ["What colour is potassium in a flame test?", "Lilac", ["Lilac", "Yellow", "Blue-green", "Brown"]],
        ["What colour is calcium in a flame test?", "Brick red", ["Brick red", "Lilac", "Yellow", "White"]],
        ["What colour is copper in a flame test?", "Blue-green", ["Blue-green", "Crimson red", "Lilac", "Yellow"]]
      ]),
      makeTopic("chem-cation-tests", "Cation Tests", "Silver Forge", "Not forged", [
        "Ammonium ions are tested by warming with sodium hydroxide solution.",
        "Ammonia gas turns damp red litmus paper blue and has a pungent smell.",
        "Copper(II) ions form a blue precipitate with sodium hydroxide.",
        "Iron(II) ions form a green precipitate with sodium hydroxide.",
        "Iron(III) ions form a brown precipitate with sodium hydroxide."
      ], [
        ["How do you test for ammonium ions?", "Warm with sodium hydroxide solution", ["Warm with sodium hydroxide solution", "Add silver nitrate only", "Use limewater", "Use a glowing splint"]],
        ["What does ammonia do to damp red litmus paper?", "Turns it blue", ["Turns it blue", "Bleaches it white", "Turns it cloudy", "Relights it"]],
        ["What colour precipitate does Cu²⁺ form with sodium hydroxide?", "Blue", ["Blue", "Green", "Brown", "White"]],
        ["What colour precipitate does Fe²⁺ form with sodium hydroxide?", "Green", ["Green", "Blue", "Brown", "Yellow"]],
        ["What colour precipitate does Fe³⁺ form with sodium hydroxide?", "Brown", ["Brown", "Green", "Blue", "White"]]
      ]),
      makeTopic("chem-anion-tests", "Anion Tests", "Gold Forge", "Not forged", [
        "Halide ions are tested using dilute nitric acid followed by silver nitrate solution.",
        "Chloride ions form a white silver chloride precipitate.",
        "Bromide ions form a cream silver bromide precipitate.",
        "Iodide ions form a yellow silver iodide precipitate.",
        "Sulfate ions form a dense white barium sulfate precipitate with barium chloride after acidifying. Carbonate ions produce carbon dioxide with dilute hydrochloric acid."
      ], [
        ["What colour precipitate do chloride ions form with silver nitrate?", "White", ["White", "Cream", "Yellow", "Blue"]],
        ["What colour precipitate do bromide ions form with silver nitrate?", "Cream", ["Cream", "White", "Yellow", "Brown"]],
        ["What colour precipitate do iodide ions form with silver nitrate?", "Yellow", ["Yellow", "White", "Cream", "Green"]],
        ["What precipitate shows sulfate ions are present?", "Dense white barium sulfate", ["Dense white barium sulfate", "Blue copper hydroxide", "Brown iron hydroxide", "Yellow sodium chloride"]],
        ["What gas is produced when carbonate ions react with dilute hydrochloric acid?", "Carbon dioxide", ["Carbon dioxide", "Hydrogen", "Oxygen", "Chlorine"]]
      ])
    ]
  },
  {
    id: "physics",
    title: "Physics",
    icon: Microscope,
    description: "Physics — motion, forces, energy, electricity, radioactivity, space, states of matter and magnetism.",
    topics: [
      makeTopic("phys-motion-position", "Movement and Position", "Foundation Forge", "Not forged", [
        "Distance-time graphs show how distance changes over time. The gradient gives speed.",
        "Velocity-time graphs show how velocity changes over time. The gradient gives acceleration.",
        "Distance travelled from a velocity-time graph is found from the area under the graph.",
        "Average speed = distance ÷ time.",
        "Acceleration = change in velocity ÷ time taken."
      ], [
        ["What does the gradient of a distance-time graph show?", "Speed", ["Speed", "Mass", "Force", "Energy"]],
        ["What does the gradient of a velocity-time graph show?", "Acceleration", ["Acceleration", "Density", "Pressure", "Weight"]],
        ["How do you find distance from a velocity-time graph?", "Area under the graph", ["Area under the graph", "Highest point only", "Lowest point only", "Gradient of a distance-time graph"]],
        ["What is the equation for average speed?", "distance ÷ time", ["distance ÷ time", "mass X acceleration", "force ÷ area", "current X resistance"]],
        ["Which equation links final velocity, initial velocity, acceleration and displacement?", "v² = u² + 2as", ["v² = u² + 2as", "F = ma", "W = mg", "V = IR"]]
      ]),
      makeTopic("phys-force-shape", "Forces and Shape", "Foundation Forge", "Not forged", [
        "Scalar quantities have magnitude only, while vector quantities have magnitude and direction.",
        "Forces are vector quantities and can be added or subtracted along a line.",
        "Stopping distance is thinking distance plus braking distance.",
        "Friction opposes motion.",
        "Newton's third law states that forces come in equal and opposite pairs."
      ], [
        ["What is the difference between a scalar and a vector?", "A vector has magnitude and direction", ["A vector has magnitude and direction", "A scalar has direction only", "A vector has no size", "They are the same"]],
        ["What is stopping distance made from?", "Thinking distance plus braking distance", ["Thinking distance plus braking distance", "Speed plus mass", "Force plus pressure", "Voltage plus current"]],
        ["What force opposes motion?", "Friction", ["Friction", "Weight", "Current", "Radiation"]],
        ["What is Newton's third law about?", "Equal and opposite forces", ["Equal and opposite forces", "Energy stores", "Density", "Half-life"]],
        ["What is a force classified as?", "A vector quantity", ["A vector quantity", "A scalar quantity", "An energy store", "A circuit component"]]
      ]),
      makeTopic("phys-force-equations", "Force Equations", "Steel Forge", "Not forged", [
        "Force = mass X acceleration, written as F = ma.",
        "Weight = mass X gravitational field strength, written as W = mg.",
        "Pressure = force ÷ area, written as p = F ÷ A.",
        "Density = mass ÷ volume, written as ρ = m ÷ V.",
        "Pressure difference in a liquid can be found using height X density X gravitational field strength."
      ], [
        ["What is the equation for force?", "F = ma", ["F = ma", "V = IR", "E = QV", "p = F/A"]],
        ["What is the equation for weight?", "W = mg", ["W = mg", "F = ma", "v² = u² + 2as", "E = QV"]],
        ["What is the equation for pressure?", "p = F/A", ["p = F/A", "V = IR", "Q = It", "ρ = m/V"]],
        ["What is the equation for density?", "ρ = m/V", ["ρ = m/V", "W = mg", "F = ma", "V = IR"]],
        ["What does gravitational field strength help calculate?", "Weight", ["Weight", "Current", "Voltage", "Half-life"]]
      ]),
      makeTopic("phys-energy-transfers", "Energy Sources and Transfers", "Steel Forge", "Not forged", [
        "Energy stores include chemical, kinetic, gravitational, elastic, thermal, magnetic, electrostatic and nuclear.",
        "Energy can be transferred mechanically, electrically, by heating, or by radiation.",
        "Energy is conserved, meaning it cannot be created or destroyed, only transferred.",
        "Efficiency = useful energy output ÷ total energy input X 100.",
        "Thermal energy transfer can happen by conduction, convection and radiation."
      ], [
        ["Which statement describes conservation of energy?", "Energy cannot be created or destroyed", ["Energy cannot be created or destroyed", "Energy disappears in machines", "Energy only exists in batteries", "Energy is always wasted"]],
        ["What is the efficiency equation?", "useful energy output ÷ total energy input X 100", ["useful energy output ÷ total energy input X 100", "force X mass", "current X time", "distance ÷ time"]],
        ["Name one method of thermal energy transfer.", "Conduction", ["Conduction", "Ionisation", "Fission only", "Condensation only"]],
        ["Which energy store is found in food and fuels?", "Chemical", ["Chemical", "Magnetic only", "Nuclear only", "Electrostatic only"]],
        ["What type of transfer happens in electrical circuits?", "Electrical transfer", ["Electrical transfer", "No transfer", "Only mechanical transfer", "Only sound transfer"]]
      ]),
      makeTopic("phys-electricity", "Energy and Voltage in Circuits", "Bronze Forge", "Not forged", [
        "A series circuit is more appropriate for some applications, while parallel circuits allow components to work independently.",
        "Current depends on voltage and resistance.",
        "Voltage = current X resistance, written as V = IR.",
        "Charge = current X time, written as Q = It.",
        "Energy transferred = charge X voltage, written as E = QV."
      ], [
        ["What is the equation linking voltage, current and resistance?", "V = IR", ["V = IR", "F = ma", "W = mg", "ρ = m/V"]],
        ["What is the equation linking charge, current and time?", "Q = It", ["Q = It", "E = mc²", "p = F/A", "v = u + at"]],
        ["What is the equation linking energy, charge and voltage?", "E = QV", ["E = QV", "V = IR", "F = ma", "W = mg"]],
        ["What is the unit of charge?", "Coulomb", ["Coulomb", "Volt", "Newton", "Pascal"]],
        ["What is the current through components in series like?", "The same through each component", ["The same through each component", "Zero in every component", "Always different", "Only in the battery"]]
      ]),
      makeTopic("phys-radioactivity", "Radioactivity", "Bronze Forge", "Not forged", [
        "Atoms contain protons, neutrons and electrons.",
        "Atomic number is the number of protons. Mass number is the number of protons plus neutrons.",
        "Alpha, beta and gamma are ionising radiations emitted from unstable nuclei.",
        "Activity decreases over time and is measured in becquerels.",
        "Half-life is the time taken for the activity of a radioactive source to halve."
      ], [
        ["What particles are found in the nucleus?", "Protons and neutrons", ["Protons and neutrons", "Electrons only", "Photons only", "Alpha particles only"]],
        ["What does atomic number tell you?", "Number of protons", ["Number of protons", "Number of shells", "Number of neutrons only", "Mass of the atom in kg"]],
        ["What unit is activity measured in?", "Becquerels", ["Becquerels", "Newtons", "Volts", "Pascals"]],
        ["What is half-life?", "Time for activity to halve", ["Time for activity to halve", "Time for mass to double", "Time for voltage to halve", "Time for speed to reach zero"]],
        ["Which detector can detect ionising radiation?", "Geiger-Müller detector", ["Geiger-Müller detector", "Thermometer", "Ammeter only", "Ruler"]]
      ]),
      makeTopic("phys-astronomy-cosmology", "Astronomy and Cosmology", "Silver Forge", "Not forged", [
        "The universe is made up of billions of galaxies, and each galaxy contains billions of stars.",
        "Gravitational field strength varies on different planets.",
        "The gravitational force causes orbits.",
        "Orbital speed can be calculated using distance travelled per orbit divided by time period.",
        "Red-shift of galaxies provides evidence for the expansion of the universe."
      ], [
        ["What force causes orbits?", "Gravity", ["Gravity", "Friction", "Static electricity", "Nuclear radiation"]],
        ["What does red-shift show?", "The universe is expanding", ["The universe is expanding", "The universe is shrinking only", "Atoms have no nucleus", "Planets do not orbit"]],
        ["What is a galaxy?", "A collection of billions of stars", ["A collection of billions of stars", "One single planet", "A type of radiation", "A circuit component"]],
        ["What does a star's colour relate to?", "Surface temperature", ["Surface temperature", "Its mass only", "Its country", "Its voltage"]],
        ["Which diagram shows star classification?", "HR diagram", ["HR diagram", "Circuit diagram", "Distance-time graph", "Free-body diagram"]]
      ]),
      makeTopic("phys-states-of-matter", "States of Matter and Gas Molecules", "Silver Forge", "Not forged", [
        "Heating a system changes the energy stored within it and can change its temperature or state.",
        "Specific heat capacity is the energy required to change the temperature of 1 kg of a substance by 1°C.",
        "Change in thermal energy = mass X specific heat capacity X change in temperature.",
        "Particles in gases move randomly and exert pressure on container walls.",
        "For a fixed mass of gas, pressure, volume and temperature are related."
      ], [
        ["What is specific heat capacity?", "Energy needed to raise 1 kg by 1°C", ["Energy needed to raise 1 kg by 1°C", "Force per unit area", "Charge per second", "Mass per volume"]],
        ["What is the equation for change in thermal energy?", "ΔE = mcΔT", ["ΔE = mcΔT", "V = IR", "F = ma", "Q = It"]],
        ["What temperature is absolute zero?", "-273°C", ["-273°C", "0°C", "100°C", "273°C"]],
        ["Why do gases exert pressure?", "Particles collide with container walls", ["Particles collide with container walls", "Particles stop moving", "Particles disappear", "Particles become radioactive"]],
        ["What happens to gas molecule speed when temperature increases?", "Average speed increases", ["Average speed increases", "Average speed decreases", "Particles stop", "Pressure must become zero"]]
      ]),
      makeTopic("phys-magnetism-electromagnetism", "Magnetism and Electromagnetism", "Gold Forge", "Not forged", [
        "Magnets repel and attract other magnets and magnetic substances.",
        "Magnetic field lines show the direction and shape of a magnetic field.",
        "An electric current in a conductor produces a magnetic field around it.",
        "Electromagnets are made using coils of wire, current and often an iron core.",
        "A current-carrying wire in a magnetic field experiences a force, which is used in motors and loudspeakers."
      ], [
        ["What do magnets do to other magnets?", "Attract or repel", ["Attract or repel", "Only heat them", "Only melt them", "Only ionise them"]],
        ["What does an electric current produce around a wire?", "A magnetic field", ["A magnetic field", "A nuclear reaction", "A red-shift", "A vacuum"]],
        ["What is often used inside an electromagnet to make it stronger?", "Iron core", ["Iron core", "Plastic core", "Glass core", "Wood core"]],
        ["What device uses the force on a current-carrying wire in a magnetic field?", "Electric motor", ["Electric motor", "Geiger counter only", "Thermometer", "Barometer"]],
        ["What rule predicts the direction of force on a wire?", "Left-hand rule", ["Left-hand rule", "Right-hand grip rule only", "Ohm's law", "Hooke's law"]]
      ])
    ]
  },
  {
    id: "history",
    title: "History",
    icon: BookOpen,
    description: "History — German Unification, Bismarck and the 1848 revolutions across Europe.",
    topics: [
      makeTopic("hist-german-unification-1848-50", "Why Germany Was Not Unified, 1848–50", "Foundation Forge", "Not forged", [
        "After 1815, Germany was reorganised into 39 states in the German Confederation, dominated by Austria.",
        "German nationalism grew after the Napoleonic Wars, but it was limited and heavily repressed by conservative rulers.",
        "The Frankfurt Parliament aimed to unite Germany and create a liberal constitution, but it lacked real power, money and military support.",
        "Frederick William IV refused the imperial crown because he would not accept a crown from an elected assembly.",
        "Austria restored its influence by 1850 through the Punctuation of Olmütz, forcing Prussia to abandon the Erfurt Union."
      ], [
        ["How many states made up the German Confederation after 1815?", "39", ["39", "25", "12", "52"]],
        ["Which power dominated the German Confederation after 1815?", "Austria", ["Austria", "France", "Britain", "Italy"]],
        ["Why did the Frankfurt Parliament fail?", "It lacked army, money and support from rulers", ["It lacked army, money and support from rulers", "It was supported by Austria", "It had too much military power", "It wanted to keep Germany divided"]],
        ["What crown did Frederick William IV refuse in 1849?", "The imperial crown of a united Germany", ["The imperial crown of a united Germany", "The Austrian crown", "The French crown", "The Russian crown"]],
        ["What did the Punctuation of Olmütz do?", "Forced Prussia to back down and restored Austrian influence", ["Forced Prussia to back down and restored Austrian influence", "Created the German Empire", "Removed Austria from Germany", "Started the Franco-Prussian War"]]
      ]),
      makeTopic("hist-zollverein-nationalism", "German Nationalism and the Zollverein", "Foundation Forge", "Not forged", [
        "The Zollverein was a customs union led by Prussia and established in 1834.",
        "It removed internal tariffs and encouraged free trade between many German states.",
        "It improved transport, railways and economic links, making German states more connected.",
        "Austria was excluded from the Zollverein, which helped Prussia grow stronger economically.",
        "Nationalist festivals such as Wartburg and Hambach showed that liberal and nationalist ideas continued despite repression."
      ], [
        ["What was the Zollverein?", "A Prussian-led customs union", ["A Prussian-led customs union", "An Austrian army", "A French parliament", "A failed Italian republic"]],
        ["When was the Zollverein established?", "1834", ["1834", "1815", "1848", "1871"]],
        ["Which major German power was excluded from the Zollverein?", "Austria", ["Austria", "Prussia", "Bavaria", "Saxony"]],
        ["What did the Zollverein remove between member states?", "Internal tariffs", ["Internal tariffs", "All monarchies", "All armies", "All railways"]],
        ["Which festival in 1832 showed growing nationalism?", "Hambach Festival", ["Hambach Festival", "Congress of Vienna", "Treaty of Prague", "Battle of Sedan"]]
      ]),
      makeTopic("hist-bismarck-austria-1866", "How Bismarck Defeated Austria in 1866", "Steel Forge", "Not forged", [
        "Bismarck became Minister-President of Prussia in 1862 and used Realpolitik to strengthen Prussia.",
        "Prussia's economy, railways and army reforms gave it a major advantage over Austria.",
        "The Schleswig-Holstein issue increased tension between Austria and Prussia after joint control became difficult.",
        "The Convention of Gastein split control: Austria managed Holstein and Prussia managed Schleswig.",
        "Bismarck isolated Austria diplomatically by securing Italian support and keeping other powers neutral."
      ], [
        ["When was Bismarck appointed Minister-President of Prussia?", "1862", ["1862", "1848", "1866", "1871"]],
        ["What type of politics did Bismarck use?", "Realpolitik", ["Realpolitik", "Communism", "Isolationism", "Absolutism only"]],
        ["What did the Convention of Gastein do?", "Split control of Schleswig and Holstein", ["Split control of Schleswig and Holstein", "United Germany", "Gave Alsace-Lorraine to Germany", "Created the Frankfurt Parliament"]],
        ["Which country allied with Prussia against Austria?", "Italy", ["Italy", "France", "Britain", "Russia"]],
        ["Which battle showed Prussian superiority in 1866?", "Königgrätz", ["Königgrätz", "Sedan", "Waterloo", "Novara"]]
      ]),
      makeTopic("hist-bismarck-france-1870", "How Bismarck Defeated France in 1870", "Steel Forge", "Not forged", [
        "After Austria's defeat, France felt humiliated because Prussia gained power while France gained little.",
        "The Luxembourg Crisis increased tension between France and Prussia.",
        "Bismarck used the Spanish Succession Crisis to provoke France into declaring war.",
        "The edited Ems Telegram made the meeting between William I and the French ambassador appear more hostile.",
        "The southern German states rallied behind Prussia, helping complete German unification."
      ], [
        ["What crisis did Bismarck use to provoke France?", "The Spanish Succession Crisis", ["The Spanish Succession Crisis", "The Crimean War", "The Punctuation of Olmütz", "The March Laws"]],
        ["What did Bismarck edit to provoke France?", "The Ems Telegram", ["The Ems Telegram", "The Treaty of Prague", "The Carlsbad Decrees", "The Zollverein"]],
        ["Which battle led to Napoleon III being captured?", "Sedan", ["Sedan", "Königgrätz", "Novara", "Sadowa"]],
        ["What land did France lose after the Franco-Prussian War?", "Alsace-Lorraine", ["Alsace-Lorraine", "Schleswig", "Holstein", "Bavaria"]],
        ["Why was the Franco-Prussian War important for unification?", "It united the southern German states behind Prussia", ["It united the southern German states behind Prussia", "It restored Austria's control", "It ended the Zollverein", "It made France part of Germany"]]
      ]),
      makeTopic("hist-bismarck-responsibility", "How Far Was Bismarck Responsible for German Unification?", "Bronze Forge", "Not forged", [
        "One view is that Bismarck was a master planner who deliberately used war and diplomacy to unify Germany.",
        "Another view is that Bismarck was an opportunist who reacted cleverly to events as they happened.",
        "Bismarck used diplomacy to isolate Austria and France before war.",
        "However, other factors mattered too, such as nationalism, the Zollverein, Prussian economic strength and military reform.",
        "Von Roon strengthened the army, while von Moltke improved military strategy and railway mobilisation."
      ], [
        ["What were the three main views of Bismarck's role?", "Master planner, opportunist, or less important than other factors", ["Master planner, opportunist, or less important than other factors", "King, emperor and soldier", "Liberal, socialist and communist", "French, Austrian and Italian"]],
        ["What speech showed Bismarck believed force would matter?", "Blood and Iron", ["Blood and Iron", "Peace and Freedom", "Crown from the Gutter", "March Laws"]],
        ["Who reorganised and strengthened the Prussian army?", "Von Roon", ["Von Roon", "Metternich", "Louis Philippe", "Mazzini"]],
        ["Who improved Prussian military strategy?", "Von Moltke", ["Von Moltke", "Guizot", "Charles Albert", "Kossuth"]],
        ["Which economic factor helped German unification?", "The Zollverein", ["The Zollverein", "The June Days", "The Banquets", "The National Workshops"]]
      ]),
      makeTopic("hist-france-1848", "France in 1848", "Silver Forge", "Not forged", [
        "A terrible corn harvest and economic problems caused food prices to surge in France.",
        "The political system was seen as corrupt because only a tiny percentage of the population could vote.",
        "Banquets were used as a way to discuss political reform despite restrictions on open political meetings.",
        "In February 1848, protests escalated in Paris and Louis-Philippe abdicated on 24 February.",
        "The June Days showed the failure of hopes for a more democratic and social republic."
      ], [
        ["What caused prices to surge in 1846?", "A terrible corn harvest", ["A terrible corn harvest", "A successful war", "The Zollverein", "The Ems Telegram"]],
        ["Why was the French political system seen as corrupt?", "Only a small percentage could vote", ["Only a small percentage could vote", "Everyone could vote", "There was no king", "France had no newspapers"]],
        ["What was the purpose of the banquets?", "To discuss political views and reforms", ["To discuss political views and reforms", "To crown Bismarck", "To start the Zollverein", "To elect the Pope"]],
        ["When did Louis-Philippe abdicate?", "24 February 1848", ["24 February 1848", "18 March 1848", "3 April 1849", "1 August 1870"]],
        ["Why were the June Days important?", "They marked the end of hopes for a democratic and social republic", ["They marked the end of hopes for a democratic and social republic", "They created the German Empire", "They defeated Austria", "They created the Zollverein"]]
      ]),
      makeTopic("hist-italy-1848", "Italy in 1848", "Silver Forge", "Not forged", [
        "Italy was divided and partly controlled by Austria, especially Lombardy and Venetia.",
        "Piedmont-Sardinia was ruled by Charles-Albert and became important in the revolutions.",
        "The revolutions were encouraged by food price rises, liberal ideas and nationalism.",
        "Piedmont led war against Austria but was defeated at Novara.",
        "The revolutions failed because of weak coordination, divisions between groups and Austria's military superiority."
      ], [
        ["Which Italian states were under Austrian control?", "Lombardy and Venetia", ["Lombardy and Venetia", "Bavaria and Saxony", "Alsace and Lorraine", "Schleswig and Holstein"]],
        ["Who ruled Piedmont-Sardinia?", "Charles-Albert", ["Charles-Albert", "Metternich", "Bismarck", "Louis Philippe"]],
        ["What happened in January 1848 in Italy?", "The Sicilian uprising", ["The Sicilian uprising", "The Ems Telegram", "The Battle of Sedan", "The Punctuation of Olmütz"]],
        ["Which Italian state was defeated at Novara?", "Piedmont", ["Piedmont", "Venice", "Prussia", "France"]],
        ["Why did the Italian revolutions fail?", "Lack of unity and Austrian strength", ["Lack of unity and Austrian strength", "Too much support from Austria", "Germany was already united", "France had no role"]]
      ]),
      makeTopic("hist-germany-1848", "Germany in 1848", "Gold Forge", "Not forged", [
        "The February Revolution in France helped spark revolution in the German states.",
        "In Berlin, protests escalated and troops fired on demonstrators in March 1848.",
        "The Frankfurt Parliament met in May 1848 and aimed to unite Germany, create a constitution and protect liberal rights.",
        "The Parliament was dominated by middle-class professionals such as lawyers and professors.",
        "It failed because it lacked an army, faced opposition from rulers and Frederick William IV refused the crown."
      ], [
        ["What sparked revolution in Germany in 1848?", "The February Revolution in France", ["The February Revolution in France", "The Treaty of Frankfurt", "The Battle of Sedan", "The Convention of Gastein"]],
        ["When did the Frankfurt Parliament meet?", "May 1848", ["May 1848", "January 1848", "August 1849", "December 1871"]],
        ["What were the Frankfurt Parliament's main goals?", "Unite Germany and create a liberal constitution", ["Unite Germany and create a liberal constitution", "Restore Austria completely", "Abolish all German states", "Make France stronger"]],
        ["Who dominated the Frankfurt Parliament?", "Middle-class professionals", ["Middle-class professionals", "Peasants only", "Foreign kings", "Factory children"]],
        ["What did many peasants gain during the revolution?", "Abolition of feudal dues", ["Abolition of feudal dues", "Control of Austria", "The French crown", "The Ems Telegram"]]
      ]),
      makeTopic("hist-austrian-empire-1848", "Austrian Empire in 1848", "Gold Forge", "Not forged", [
        "The Austrian Empire was unstable because it contained many nationalities, languages and cultures.",
        "It was ruled by the Habsburg family and controlled by Metternich's conservative system.",
        "Nationalism, liberal demands, poor harvests and economic problems all helped cause revolt.",
        "Different groups such as Hungarians, Czechs, Croats and Italians wanted different rights or power.",
        "Metternich tried to keep control using censorship, spies, secret police and strict conservative rule."
      ], [
        ["Who ruled the Austrian Empire?", "The Habsburg family", ["The Habsburg family", "The Hohenzollerns", "The Bonapartes", "The Romanovs only"]],
        ["Why was the Austrian Empire unstable?", "It had many nationalities, languages and cultures", ["It had many nationalities, languages and cultures", "It had no army", "It had no monarchy", "It was already united with Germany"]],
        ["Who controlled Austria's conservative system before 1848?", "Metternich", ["Metternich", "Bismarck", "Mazzini", "Napoleon III"]],
        ["Where did Metternich flee?", "England", ["England", "Prussia", "Italy", "Russia"]],
        ["How did Metternich try to keep control?", "Censorship, spies and secret police", ["Censorship, spies and secret police", "Universal suffrage", "Free elections", "German unification"]]
      ])
    ]
  }
];

const themes = [
  {
    id: "forge",
    name: "Default Forge",
    unlockAt: 0,
    bg: "bg-zinc-950",
    panel: "bg-zinc-900",
    soft: "bg-orange-400/10",
    border: "border-orange-400/40",
    accent: "text-orange-300",
    button: "bg-orange-500 hover:bg-orange-600",
    description: "The original black and orange Iron Forge look."
  },
  {
    id: "cherry",
    name: "Cherry Blossom",
    unlockAt: 3,
    bg: "bg-[#17101d]",
    panel: "bg-zinc-950/72",
    soft: "bg-pink-200/10",
    border: "border-pink-200/25",
    accent: "text-pink-100",
    button: "bg-pink-500 hover:bg-pink-400",
    description: "Unlocked after forging 3 stages in a subject."
  },
  {
    id: "ocean",
    name: "Ocean Forge",
    unlockAt: 6,
    bg: "bg-slate-950",
    panel: "bg-cyan-950/40",
    soft: "bg-cyan-300/10",
    border: "border-cyan-300/50",
    accent: "text-cyan-200",
    button: "bg-cyan-600 hover:bg-cyan-700",
    description: "Unlocked after forging 6 stages in a subject."
  },
  {
    id: "royal",
    name: "Royal Purple",
    unlockAt: 9,
    bg: "bg-purple-950",
    panel: "bg-purple-950/70",
    soft: "bg-violet-300/10",
    border: "border-violet-300/50",
    accent: "text-violet-200",
    button: "bg-violet-600 hover:bg-violet-700",
    description: "Unlocked after forging 9 stages in a subject."
  },
  {
    id: "gold",
    name: "Gold Forge",
    unlockAt: 12,
    bg: "bg-yellow-950",
    panel: "bg-yellow-950/60",
    soft: "bg-yellow-300/10",
    border: "border-yellow-300/50",
    accent: "text-yellow-200",
    button: "bg-yellow-600 hover:bg-yellow-700",
    description: "Unlocked after forging 12 stages in a subject."
  },
  {
    id: "valentine",
    name: "Valentine Forge",
    unlockAt: 15,
    bg: "bg-rose-950",
    panel: "bg-rose-950/70",
    soft: "bg-pink-300/10",
    border: "border-pink-300/50",
    accent: "text-pink-200",
    button: "bg-pink-600 hover:bg-pink-700",
    description: "Unlocked after forging 15 stages in a subject."
  },
  {
    id: "japan",
    name: "Japan Forge",
    unlockAt: 18,
    unlockAction: "subjectSwitches5",
    unlockTask: "Switch subjects 5 times using the Subjects menu.",
    bg: "bg-red-950",
    panel: "bg-red-950/65",
    soft: "bg-red-300/10",
    border: "border-red-200/50",
    accent: "text-red-100",
    button: "bg-red-600 hover:bg-red-700",
    description: "Unlocked by switching subjects 5 times."
  },
  {
    id: "cyber",
    name: "Cyber Forge",
    unlockAt: 21,
    unlockAction: "dailyTestsStarted3",
    unlockTask: "Start the Daily Test 3 times.",
    bg: "bg-emerald-950",
    panel: "bg-emerald-950/65",
    soft: "bg-emerald-300/10",
    border: "border-emerald-300/50",
    accent: "text-emerald-200",
    button: "bg-emerald-500 hover:bg-emerald-600",
    description: "Unlocked by opening the Daily Test 3 times."
  },
  {
    id: "arctic",
    name: "Arctic Forge",
    unlockAt: 24,
    unlockAction: "revisionClockReset",
    unlockTask: "Reset the revision clock once in Settings.",
    bg: "bg-sky-950",
    panel: "bg-sky-950/65",
    soft: "bg-sky-200/10",
    border: "border-sky-200/50",
    accent: "text-sky-100",
    button: "bg-sky-500 hover:bg-sky-600",
    description: "Unlocked by resetting the revision clock."
  },
  {
    id: "volcano",
    name: "Volcano Forge",
    unlockAt: 27,
    unlockAction: "failedStageOnce",
    unlockTask: "Fail any stage test once.",
    bg: "bg-red-950",
    panel: "bg-red-950/70",
    soft: "bg-red-400/10",
    border: "border-red-400/50",
    accent: "text-red-200",
    button: "bg-red-600 hover:bg-red-700",
    description: "Unlocked by failing any stage test once."
  },
  {
    id: "god",
    name: "God Forge",
    unlockAt: 100,
    requiresRecall100: true,
    bg: "bg-yellow-50",
    panel: "bg-yellow-100/80",
    soft: "bg-yellow-200/30",
    border: "border-yellow-200/70",
    accent: "text-yellow-700",
    button: "bg-yellow-300 hover:bg-yellow-400",
    description: "Only unlocked when your selected subject recall hits 100%."
  }
];

const generalContent = {
  pe: [
    {
      title: "Body Systems",
      points: [
        "Know the skeletal, muscular, cardiovascular and respiratory systems separately.",
        "For skeleton questions, focus on support, protection, movement, blood cell production and mineral storage.",
        "For joint questions, separate structure from movement: cartilage absorbs shock, synovial fluid lubricates, ligaments stabilise.",
        "For cardiovascular and respiratory questions, always link oxygen delivery to working muscles."
      ]
    },
    {
      title: "Training and Exercise",
      points: [
        "Short-term effects happen during exercise, like increased heart rate, breathing rate and sweating.",
        "Long-term effects happen after repeated training, like a stronger heart, lower resting heart rate and stronger muscles.",
        "Use SPOR and FITT to explain how training is planned and progressed.",
        "Warm ups prepare the body; cool downs gradually return the body to resting state."
      ]
    },
    {
      title: "Sports Psychology",
      points: [
        "FACEP describes skilful movement: Fluent, Aesthetic, Consistent, Efficient and Predetermined.",
        "Open skills are affected by the environment; closed skills happen in a stable setting.",
        "SMART goals are Specific, Measurable, Achievable, Realistic and Time-bound.",
        "For longer answers, always link the theory to a sporting example."
      ]
    }
  ],
  bio: [
    {
      title: "Life Processes",
      points: [
        "Living organisms need energy, nutrition, gas exchange, transport and waste removal.",
        "Aerobic respiration releases energy using glucose and oxygen, mainly in mitochondria.",
        "ATP is the useful energy source for cell processes such as muscle contraction.",
        "Small organisms can rely on diffusion, but larger organisms need transport systems."
      ]
    },
    {
      title: "Nutrition and Digestion",
      points: [
        "Mechanical digestion physically breaks food into smaller pieces, increasing surface area.",
        "Chemical digestion uses enzymes to break large insoluble molecules into small soluble molecules.",
        "Amylase breaks starch, protease breaks protein, and lipase breaks lipids.",
        "Absorption mainly happens in the small intestine using villi."
      ]
    },
    {
      title: "Transport, Disease and Immunity",
      points: [
        "Blood transports oxygen, carbon dioxide, glucose, urea and other substances.",
        "The heart pumps blood, arteries carry blood away, veins carry blood back, and capillaries allow exchange.",
        "Infectious diseases are caused by pathogens such as bacteria and viruses.",
        "White blood cells defend the body; antibodies are specific to antigens and memory cells give a faster second response."
      ]
    }
  ],
  dt: [
    {
      title: "CAM and Electronics",
      points: [
        "CAM uses computer-controlled machines to manufacture products accurately and repeatedly.",
        "Conductors allow electricity to flow, while insulators resist electrical flow and improve safety.",
        "Systems diagrams are built from input, process, output and feedback.",
        "Circuit symbols represent components clearly in circuit diagrams."
      ]
    },
    {
      title: "Structures and Forces",
      points: [
        "Mass structures are solid, frame structures are made from joined members, and shell structures use a thin outer skin.",
        "Natural structures occur in nature, while man-made structures are designed and built by humans.",
        "Key forces include tension, compression, bending, torsion and shear.",
        "Forces explain how and why structures fail or stay strong."
      ]
    },
    {
      title: "Mechanisms and Motion",
      points: [
        "Linear motion moves in a straight line, rotary motion moves in a circle, reciprocating motion moves back and forth, and oscillating motion moves in an arc.",
        "Bearings and lubrication reduce friction in mechanisms.",
        "Levers use a fulcrum, load and effort, with different classes depending on what is in the middle.",
        "Gears, rack and pinion, crank and piston, linkages, chains, sprockets, belts and pulleys transmit or convert motion."
      ]
    }
  ],
  chemistry: [
    {
      title: "Bonding Core",
      points: [
        "Covalent bonding means non-metal atoms share pairs of electrons.",
        "Ionic bonding means electrons transfer from a metal to a non-metal.",
        "Metals form positive ions by losing electrons; non-metals form negative ions by gaining electrons.",
        "Dot-and-cross diagrams show outer shell electrons and where shared or transferred electrons come from."
      ]
    },
    {
      title: "Crude Oil Core",
      points: [
        "Crude oil is a mixture of hydrocarbons separated by fractional distillation.",
        "Fractions include refinery gases, gasoline, kerosene, diesel, fuel oil and bitumen.",
        "Complete combustion forms carbon dioxide and water.",
        "Incomplete combustion can form poisonous carbon monoxide."
      ]
    },
    {
      title: "Energetics Core",
      points: [
        "Heat is energy; temperature is linked to average kinetic energy.",
        "Exothermic reactions give out heat and have negative ΔH.",
        "Endothermic reactions take in energy and have positive ΔH.",
        "Energy level diagrams show whether the products have more or less energy than the reactants."
      ]
    },
    {
      title: "Chemical Tests Core",
      points: [
        "Hydrogen: squeaky pop. Oxygen: relights glowing splint. Chlorine: bleaches damp litmus. Carbon dioxide: turns limewater cloudy.",
        "Flame tests: Li⁺ crimson red, Na⁺ yellow, K⁺ lilac, Ca²⁺ brick red, Cu²⁺ blue-green.",
        "Cation tests with sodium hydroxide: Cu²⁺ blue, Fe²⁺ green, Fe³⁺ brown. NH₄⁺ gives ammonia when warmed with sodium hydroxide.",
        "Halide tests with nitric acid and silver nitrate: Cl⁻ white, Br⁻ cream, I⁻ yellow."
      ]
    }
  ],
  physics: [
    {
      title: "Physics Equation Core",
      points: [
        "Motion: average speed = distance ÷ time; acceleration = change in velocity ÷ time taken; v² = u² + 2as.",
        "Forces: F = ma, W = mg, pressure = force ÷ area, density = mass ÷ volume.",
        "Electricity: V = IR, Q = It, E = QV.",
        "Thermal physics: ΔE = mcΔT."
      ]
    },
    {
      title: "Graph Skills",
      points: [
        "Distance-time graph gradient gives speed. A flat line means the object is stationary.",
        "Velocity-time graph gradient gives acceleration. A horizontal line means constant velocity.",
        "Area under a velocity-time graph gives distance travelled.",
        "Force-extension graphs show elastic behaviour and Hooke's law in the initial linear region."
      ]
    },
    {
      title: "Forces and Motion",
      points: [
        "A resultant force causes acceleration, deceleration or a change in direction.",
        "Balanced forces mean the object is stationary or moving at constant speed.",
        "Stopping distance = thinking distance + braking distance.",
        "Friction acts against motion and can produce unwanted heating."
      ]
    },
    {
      title: "Energy Transfers",
      points: [
        "Energy is conserved: it cannot be created or destroyed, only transferred between stores.",
        "Energy transfers can happen mechanically, electrically, by heating, or by radiation.",
        "Efficiency tells you how much input energy is usefully transferred.",
        "Insulation reduces unwanted energy transfer by conduction, convection or radiation."
      ]
    },
    {
      title: "Electricity Quick Core",
      points: [
        "Current is the rate of flow of charge. Charge = current X time.",
        "Voltage is energy transferred per unit charge. Energy = charge X voltage.",
        "Resistance affects current: increasing resistance lowers current if voltage stays the same.",
        "In parallel circuits, voltage across components is the same."
      ]
    },
    {
      title: "Radioactivity Quick Core",
      points: [
        "Alpha, beta and gamma are ionising radiations emitted from unstable nuclei.",
        "Alpha is strongly ionising but weakly penetrating. Gamma is weakly ionising but highly penetrating.",
        "Half-life is the time taken for activity to halve.",
        "Contamination means radioactive material is on or inside something; irradiation means exposure to radiation."
      ]
    },
    {
      title: "Space and Cosmology",
      points: [
        "Gravity causes planets, moons and satellites to orbit.",
        "Stars can be classified by colour, temperature and brightness.",
        "Red-shift gives evidence that galaxies are moving away and the universe is expanding.",
        "The Big Bang theory is supported by red-shift and cosmic microwave background radiation."
      ]
    },
    {
      title: "States of Matter",
      points: [
        "Heating a substance increases the energy stored by its particles and can cause a change of state.",
        "Specific heat capacity is the energy needed to raise 1 kg of a substance by 1°C.",
        "Gas pressure is caused by particles colliding with the walls of a container.",
        "Increasing temperature increases the average kinetic energy of gas molecules."
      ]
    },
    {
      title: "Magnetism and Electromagnetism",
      points: [
        "A magnetic field is the region where a magnetic material or moving charge experiences a force.",
        "Current in a wire produces a magnetic field around the wire.",
        "Electromagnets can be made stronger by increasing current, adding more turns, or using an iron core.",
        "The motor effect happens when a current-carrying wire experiences a force in a magnetic field."
      ]
    }
  ],
  history: [
    {
      title: "German Unification Overview",
      points: [
        "Germany was not unified in 1848–50 because the Frankfurt Parliament lacked power and Austria regained control.",
        "The Zollverein helped Prussia by creating economic links and excluding Austria.",
        "Bismarck used Realpolitik, diplomacy and war to defeat Denmark, Austria and France.",
        "Judgement questions should balance Bismarck against nationalism, Prussian economic strength, the army, von Roon, von Moltke and Austrian weakness."
      ]
    },
    {
      title: "1848 Revolutions",
      points: [
        "France, Germany, Italy and Austria were affected by liberalism, nationalism, economic hardship and anger at conservative rule.",
        "Many revolutions began with high hopes for reform, constitutions and greater rights.",
        "Most failed because revolutionaries were divided, rulers recovered control and armies stayed loyal to monarchs.",
        "Some changes lasted, such as the abolition of feudal obligations in parts of Europe and the spread of nationalist ideas."
      ]
    },
    {
      title: "Key Exam Judgement",
      points: [
        "For 1848, the strongest failure factor is usually lack of power and unity among revolutionaries.",
        "For Bismarck, avoid saying he did everything alone; he was important because he exploited existing Prussian strengths.",
        "For Austria, link weakness to nationalism, economic problems, military pressure and the difficulty of ruling a multi-ethnic empire.",
        "For France in 1870, link the Ems Telegram to French isolation and German nationalist unity."
      ]
    }
  ]
};

function shuffleOptions(options) {
  return [...options]
    .map((option) => ({ option, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ option }) => option);
}

function makeTopic(id, title, level, status, notes, rawQuestions) {
  return {
    id,
    title,
    section: "Year 10 EOYs",
    level,
    status,
    notes,
    questions: rawQuestions.map(([q, answer, options]) => ({ q, answer, options: shuffleOptions(options) }))
  };
}

function getDailyQuestions(subject, count = 8) {
  const all = subject.topics.flatMap((topic) =>
    topic.questions.map((question) => ({ ...question, topicTitle: topic.title }))
  );

  const today = new Date().toDateString();
  const seedText = `${today}-${subject.id}`;
  let seed = 0;
  for (let i = 0; i < seedText.length; i++) seed += seedText.charCodeAt(i) * (i + 1);

  const shuffled = [...all].sort((a, b) => {
    const aScore = Math.sin(seed + a.q.length * 999) % 1;
    const bScore = Math.sin(seed + b.q.length * 999) % 1;
    return aScore - bScore;
  });

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function CherryBlossomBackground() {
  const clouds = [
    { left: "56%", top: "10%", width: "280px", height: "76px", opacity: 0.32 },
    { left: "70%", top: "22%", width: "360px", height: "98px", opacity: 0.26 },
    { left: "36%", top: "32%", width: "250px", height: "68px", opacity: 0.18 }
  ];

  const bushBlobs = [
    { left: "-8%", top: "42%", width: "320px", height: "260px", opacity: 0.9 },
    { left: "6%", top: "30%", width: "300px", height: "240px", opacity: 0.84 },
    { left: "18%", top: "42%", width: "260px", height: "210px", opacity: 0.72 },
    { left: "0%", top: "62%", width: "330px", height: "230px", opacity: 0.82 },
    { left: "24%", top: "58%", width: "210px", height: "165px", opacity: 0.62 },
    { left: "14%", top: "18%", width: "210px", height: "165px", opacity: 0.6 }
  ];

  const blossomDots = [
    { left: "8%", top: "40%", size: "18px" },
    { left: "14%", top: "28%", size: "14px" },
    { left: "20%", top: "36%", size: "16px" },
    { left: "27%", top: "31%", size: "13px" },
    { left: "10%", top: "58%", size: "14px" },
    { left: "19%", top: "52%", size: "17px" },
    { left: "29%", top: "55%", size: "12px" },
    { left: "13%", top: "69%", size: "15px" },
    { left: "25%", top: "68%", size: "12px" }
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 cherry-clean-sky" />
      <div className="absolute inset-0 cherry-clean-overlay" />

      {clouds.map((cloud, i) => (
        <div
          key={`cloud-${i}`}
          className="cherry-soft-cloud absolute rounded-full bg-white blur-2xl"
          style={{
            left: cloud.left,
            top: cloud.top,
            width: cloud.width,
            height: cloud.height,
            opacity: cloud.opacity,
            animationDelay: `${i * 1.8}s`
          }}
        />
      ))}

      <div className="absolute left-0 bottom-0 h-[78%] w-[34rem]">
        {bushBlobs.map((blob, i) => (
          <div
            key={`bush-${i}`}
            className="absolute rounded-full blur-xl cherry-bush-blob"
            style={{
              left: blob.left,
              top: blob.top,
              width: blob.width,
              height: blob.height,
              opacity: blob.opacity
            }}
          />
        ))}

        {blossomDots.map((dot, i) => (
          <span
            key={`dot-${i}`}
            className="absolute block rounded-full cherry-blossom-dot"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size
            }}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[34%] cherry-ground-fade" />
      <div className="absolute left-[18%] right-[12%] top-[56%] h-px bg-white/20" />
      <div className="absolute left-[20%] right-[20%] top-[58%] h-px bg-pink-100/12" />
    </div>
  );
}

function CherryPetalsOverlay() {
  const petals = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {petals.map((_, i) => (
        <span
          key={`petal-${i}`}
          className="cherry-petal absolute block"
          style={{
            left: `${-8 + i * 5.2}%`,
            top: `${-16 - (i % 4) * 7}vh`,
            width: `${7 + (i % 3)}px`,
            height: `${11 + (i % 4)}px`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${11 + (i % 5) * 1.4}s`
          }}
        />
      ))}
    </div>
  );
}

function OceanThemeBackground() {
  const bubbles = Array.from({ length: 16 }, (_, i) => i);

  const fishBase = [
    { top: "18%", size: 1, delay: "0s", duration: "18s", opacity: 0.58 },
    { top: "31%", size: 0.78, delay: "4s", duration: "22s", opacity: 0.45 },
    { top: "44%", size: 1.15, delay: "8s", duration: "20s", opacity: 0.5 },
    { top: "62%", size: 0.86, delay: "2s", duration: "24s", opacity: 0.38 },
    { top: "74%", size: 0.68, delay: "11s", duration: "21s", opacity: 0.34 }
  ];

  const fishColours = [
    { body: "#7dd3fc", tail: "#38bdf8", shadow: "rgba(125, 211, 252, 0.35)" },
    { body: "#86efac", tail: "#22c55e", shadow: "rgba(134, 239, 172, 0.35)" },
    { body: "#f9a8d4", tail: "#ec4899", shadow: "rgba(249, 168, 212, 0.35)" },
    { body: "#c4b5fd", tail: "#8b5cf6", shadow: "rgba(196, 181, 253, 0.35)" },
    { body: "#fdba74", tail: "#f97316", shadow: "rgba(253, 186, 116, 0.35)" },
    { body: "#fde68a", tail: "#eab308", shadow: "rgba(253, 230, 138, 0.35)" }
  ];

  const fish = useMemo(() => {
    const rainbowIndex = Math.floor(Math.random() * fishBase.length);

    return fishBase.map((item, i) => {
      const colour = fishColours[Math.floor(Math.random() * fishColours.length)];
      return {
        ...item,
        ...colour,
        rainbow: i === rainbowIndex
      };
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 ocean-theme-sky" />
      <div className="absolute inset-x-0 bottom-0 h-[46%] ocean-theme-water" />
      <div className="absolute inset-x-0 top-[48%] h-px bg-cyan-100/25" />
      <div className="absolute left-[8%] top-[18%] h-52 w-52 rounded-full bg-cyan-300/12 blur-3xl" />
      <div className="absolute right-[12%] top-[14%] h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />
      <div className="absolute bottom-[14%] left-[-8%] h-32 w-[120%] rounded-[100%] border-t border-cyan-200/18" />
      <div className="absolute bottom-[20%] left-[-12%] h-24 w-[130%] rounded-[100%] border-t border-sky-200/12" />

      {fish.map((item, i) => (
        <span
          key={`fish-${i}`}
          className={`ocean-fish absolute block ${item.rainbow ? "ocean-fish-rainbow" : ""}`}
          style={{
            top: item.top,
            animationDelay: item.delay,
            animationDuration: item.duration,
            opacity: item.opacity,
            transform: `scale(${item.size})`,
            ["--fish-body" as any]: item.body,
            ["--fish-tail" as any]: item.tail,
            ["--fish-shadow" as any]: item.shadow
          }}
        >
          <span className="ocean-fish-body" />
          <span className="ocean-fish-tail" />
          <span className="ocean-fish-eye" />
        </span>
      ))}

      {bubbles.map((_, i) => (
        <span
          key={`bubble-${i}`}
          className="ocean-bubble absolute block rounded-full border border-cyan-100/40 bg-cyan-100/10"
          style={{
            left: `${8 + i * 5.8}%`,
            bottom: `${-10 - (i % 4) * 6}%`,
            width: `${7 + (i % 4) * 4}px`,
            height: `${7 + (i % 4) * 4}px`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${9 + (i % 5) * 1.3}s`
          }}
        />
      ))}
    </div>
  );
}

function RoyalThemeBackground() {
  const stars = Array.from({ length: 24 }, (_, i) => i);
  const bolts = [
    { side: "left", delay: "1.2s", duration: "8s" },
    { side: "right", delay: "5.6s", duration: "10s" }
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 royal-theme-bg" />
      <div className="absolute left-[12%] top-[12%] h-72 w-72 rounded-full bg-purple-400/16 blur-3xl" />
      <div className="absolute right-[10%] top-[18%] h-80 w-80 rounded-full bg-fuchsia-400/12 blur-3xl" />
      <div className="absolute bottom-[-12%] left-[30%] h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />
      <div className="absolute left-[4%] top-[18%] h-[70%] w-px bg-gradient-to-b from-transparent via-purple-200/20 to-transparent" />
      <div className="absolute right-[8%] top-[12%] h-[76%] w-px bg-gradient-to-b from-transparent via-fuchsia-200/16 to-transparent" />

      {bolts.map((bolt, i) => (
        <span
          key={`royal-bolt-${i}`}
          className={`royal-lightning royal-lightning-${bolt.side}`}
          style={{ animationDelay: bolt.delay, animationDuration: bolt.duration }}
        />
      ))}

      {stars.map((_, i) => (
        <span
          key={`star-${i}`}
          className="royal-star absolute block rounded-full bg-purple-100"
          style={{
            left: `${5 + ((i * 37) % 88)}%`,
            top: `${9 + ((i * 19) % 78)}%`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            animationDelay: `${i * 0.35}s`
          }}
        />
      ))}
    </div>
  );
}

function GoldThemeBackground() {
  const embers = Array.from({ length: 22 }, (_, i) => i);
  const money = Array.from({ length: 14 }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 gold-theme-bg" />
      <div className="absolute left-[10%] top-[16%] h-72 w-72 rounded-full bg-amber-400/12 blur-3xl" />
      <div className="absolute right-[12%] top-[12%] h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl" />
      <div className="absolute bottom-[-16%] left-[18%] h-[26rem] w-[64%] rounded-[100%] bg-amber-500/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-[26%] h-px bg-amber-200/18" />
      <div className="absolute inset-x-0 bottom-[24%] h-px bg-yellow-200/10" />

      {money.map((_, i) => (
        <span
          key={`money-${i}`}
          className="gold-money absolute flex items-center justify-center rounded-md border border-yellow-200/70 bg-yellow-300 text-[10px] font-black text-yellow-950 shadow-lg shadow-yellow-900/30"
          style={{
            left: `${4 + ((i * 13) % 92)}%`,
            top: `${-18 - (i % 5) * 8}vh`,
            animationDelay: `${i * 0.85}s`,
            animationDuration: `${7 + (i % 4) * 1.4}s`
          }}
        >
          £
        </span>
      ))}

      {embers.map((_, i) => (
        <span
          key={`ember-${i}`}
          className="gold-ember absolute block rounded-full bg-amber-200"
          style={{
            left: `${3 + i * 4.8}%`,
            bottom: `${-8 - (i % 3) * 5}%`,
            width: `${3 + (i % 4)}px`,
            height: `${3 + (i % 4)}px`,
            animationDelay: `${i * 0.45}s`,
            animationDuration: `${7 + (i % 5) * 1.2}s`
          }}
        />
      ))}
    </div>
  );
}

function GoldThiefOverlay({ mousePosition }) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [taskbarVisible, setTaskbarVisible] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsedMs((previous) => (previous + 30) % 15000);
    }, 30);

    function checkTaskbarVisible() {
      setTaskbarVisible(window.scrollY < 92);
    }

    checkTaskbarVisible();
    window.addEventListener("scroll", checkTaskbarVisible);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("scroll", checkTaskbarVisible);
    };
  }, []);

  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
  const taskbarBottom = 108;
  const runDuration = 5200;
  const isRunning = elapsedMs < runDuration;
  const runProgress = Math.min(1, elapsedMs / runDuration);
  const thiefX = isRunning ? -120 + runProgress * (screenWidth + 260) : -260;
  const mouseBlocking = isRunning && taskbarVisible && mousePosition && mousePosition.y < taskbarBottom + 85 && Math.abs(mousePosition.x - thiefX) < 90;
  const jumpY = mouseBlocking ? 34 : 0;

  return (
    <div
      className="pointer-events-none fixed left-0 z-[31] h-28 w-screen overflow-visible"
      style={{
        top: taskbarBottom,
        opacity: isRunning && taskbarVisible ? 1 : 0
      }}
    >
      <div
        className="gold-thief gold-thief-under-taskbar"
        style={{
          transform: `translateX(${thiefX}px) translateY(${jumpY}px) rotate(180deg) scaleX(-1) scale(0.62)`
        }}
      >
        <div className="gold-thief-head">
          <span className="gold-thief-mask" />
          <span className="gold-thief-eye eye-left" />
          <span className="gold-thief-eye eye-right" />
        </div>
        <div className="gold-thief-body">
          <span className="gold-thief-bag">£</span>
        </div>
        <span className="gold-thief-leg leg-left" />
        <span className="gold-thief-leg leg-right" />
      </div>
    </div>
  );
}

function ValentineThemeBackground() {
  const hearts = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 valentine-theme-bg" />
      <div className="absolute left-[12%] top-[14%] h-72 w-72 rounded-full bg-pink-300/18 blur-3xl" />
      <div className="absolute right-[10%] top-[20%] h-80 w-80 rounded-full bg-rose-300/14 blur-3xl" />
      {hearts.map((_, i) => (
        <span
          key={`heart-${i}`}
          className="valentine-heart absolute"
          style={{
            left: `${4 + ((i * 17) % 92)}%`,
            top: `${-12 - (i % 5) * 9}vh`,
            animationDelay: `${i * 0.55}s`,
            animationDuration: `${8 + (i % 5) * 1.3}s`
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function JapanThemeBackground() {
  const leaves = Array.from({ length: 26 }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 japan-theme-bg" />
      <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-red-800/95 shadow-2xl shadow-red-950/40" />

      {leaves.map((_, i) => (
        <span
          key={`leaf-${i}`}
          className="japan-leaf absolute"
          style={{
            left: `${5 + ((i * 7) % 90)}%`,
            top: `${-20 - i * 8}px`,
            animationDelay: `${i * 0.45}s`,
            animationDuration: `${5.6 + (i % 5) * 0.65}s`
          }}
        />
      ))}
    </div>
  );
}

function JapanCarOverlay({ mousePosition, onJumpUnlock }) {
  const [run, setRun] = useState({
    active: false,
    startTime: 0,
    duration: 4200,
    nextStart: Date.now() + 900,
    x: -260,
    blockedSince: null,
    jumped: false
  });

  useEffect(() => {
    let frameId;

    function tick() {
      const now = Date.now();
      const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;

      setRun((previous) => {
        if (!previous.active) {
          if (now >= previous.nextStart) {
            return {
              active: true,
              startTime: now,
              duration: 2400 + Math.random() * 2200,
              nextStart: previous.nextStart,
              x: -260,
              blockedSince: null,
              jumped: false
            };
          }
          return previous;
        }

        const carCenterX = previous.x + 44;
        const isMouseBlocking =
          previous.active &&
          mousePosition &&
          mousePosition.y >= 34 &&
          mousePosition.y <= 92 &&
          Math.abs(mousePosition.x - carCenterX) < 52;

        const blockedSince = isMouseBlocking ? previous.blockedSince || now : null;
        const blockedLongEnough = blockedSince && now - blockedSince >= 5000;
        if (blockedLongEnough && !previous.jumped) {
          onJumpUnlock?.();
        }

        const shouldPause = isMouseBlocking && !blockedLongEnough;
        const frozenStartTime = previous.startTime + ((previous.x + 260) / (screenWidth + 520)) * previous.duration;
        const elapsed = Math.max(0, now - (shouldPause ? frozenStartTime : previous.startTime));
        const progress = Math.min(1, elapsed / previous.duration);
        const nextX = shouldPause ? previous.x : -260 + progress * (screenWidth + 520);

        if (progress >= 1) {
          return {
            active: false,
            startTime: 0,
            duration: 4200,
            nextStart: now + 2000 + Math.random() * 25000,
            x: -260,
            blockedSince: null,
            jumped: false
          };
        }

        return {
          ...previous,
          startTime: shouldPause ? frozenStartTime : previous.startTime,
          x: nextX,
          blockedSince,
          jumped: previous.jumped || Boolean(blockedLongEnough)
        };
      });

      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [mousePosition, onJumpUnlock]);

  const blockedFor = run.blockedSince ? Date.now() - run.blockedSince : 0;
  const burnout = run.active && run.blockedSince && blockedFor < 5000;
  const jumping = run.active && run.blockedSince && blockedFor >= 5000;
  const jumpY = jumping ? 18 : 0;

  return (
    <div className="pointer-events-none fixed left-0 top-[42px] z-[31] h-16 w-screen overflow-visible">
      <div
        className={`japan-supra-run ${burnout ? "japan-supra-burnout" : ""} ${jumping ? "japan-supra-jumping" : ""}`}
        style={{
          transform: `translateX(${run.x}px) translateY(${jumpY}px)`,
          opacity: run.active ? 1 : 0
        }}
      >
        {burnout && (
          <div className="japan-smoke-pack">
            <span className="japan-smoke smoke-one" />
            <span className="japan-smoke smoke-two" />
            <span className="japan-smoke smoke-three" />
            <span className="japan-smoke smoke-four" />
          </div>
        )}
        <div className="japan-supra-hanger">
          <div className="japan-supra">
            <div className="japan-supra-green-splash splash-one" />
            <div className="japan-supra-green-splash splash-two" />
            <div className="japan-supra-wing" />
            <div className="japan-supra-roof" />
            <div className="japan-supra-window front" />
            <div className="japan-supra-window rear" />
            <div className="japan-supra-door-line" />
            <div className="japan-supra-graphic" />
            <div className="japan-supra-light front" />
            <div className="japan-supra-light rear" />
            <div className="japan-supra-wheel wheel-front" />
            <div className="japan-supra-wheel wheel-rear" />
            <div className="japan-supra-skirt" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CyberThemeBackground() {
  const codeRain = Array.from({ length: 26 }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 cyber-theme-bg" />
      <div className="absolute inset-0 cyber-grid" />
      {codeRain.map((_, i) => (
        <span
          key={`code-${i}`}
          className="cyber-code absolute font-mono text-xs font-black text-emerald-300/45"
          style={{
            left: `${2 + i * 4}%`,
            top: `${-25 - (i % 6) * 12}vh`,
            animationDelay: `${i * 0.32}s`,
            animationDuration: `${6 + (i % 5) * 0.8}s`
          }}
        >
          {i % 3 === 0 ? "101" : i % 3 === 1 ? "011" : "IFM"}
        </span>
      ))}
    </div>
  );
}

function ArcticThemeBackground() {
  const snow = Array.from({ length: 32 }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 arctic-theme-bg" />
      <div className="absolute bottom-[-8%] left-[-10%] h-40 w-[120%] rounded-[100%] bg-white/18 blur-xl" />
      {snow.map((_, i) => (
        <span
          key={`snow-${i}`}
          className="arctic-snow absolute block rounded-full bg-white/80"
          style={{
            left: `${2 + ((i * 11) % 96)}%`,
            top: `${-10 - (i % 7) * 8}vh`,
            width: `${3 + (i % 4)}px`,
            height: `${3 + (i % 4)}px`,
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${8 + (i % 6) * 1.2}s`
          }}
        />
      ))}
    </div>
  );
}

function VolcanoThemeBackground() {
  const sparks = Array.from({ length: 26 }, (_, i) => i);
  const eruptionParticles = Array.from({ length: 70 }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 volcano-theme-bg" />
      <div className="absolute bottom-[-14%] left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-[100%] bg-red-600/22 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 volcano-mountain" />

      <div className="volcano-eruption-core absolute left-1/2 top-1/2" />
      <div className="volcano-eruption-shockwave absolute left-1/2 top-1/2" />
      {eruptionParticles.map((_, i) => {
        const angle = (i / eruptionParticles.length) * Math.PI * 2;
        const distance = 360 + (i % 8) * 72;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        return (
          <span
            key={`eruption-particle-${i}`}
            className="volcano-eruption-particle absolute left-1/2 top-1/2 block rounded-full"
            style={{
              ["--eruption-x" as any]: `${x}px`,
              ["--eruption-y" as any]: `${y}px`,
              ["--eruption-delay" as any]: `${i * 0.025}s`,
              width: `${8 + (i % 5) * 4}px`,
              height: `${8 + (i % 5) * 4}px`
            }}
          />
        );
      })}

      {sparks.map((_, i) => (
        <span
          key={`spark-${i}`}
          className="volcano-spark absolute block rounded-full bg-orange-300"
          style={{
            left: `${38 + ((i * 7) % 24)}%`,
            bottom: `${12 + (i % 4) * 2}%`,
            width: `${4 + (i % 3)}px`,
            height: `${4 + (i % 3)}px`,
            animationDelay: `${i * 0.22}s`,
            animationDuration: `${4 + (i % 5) * 0.7}s`
          }}
        />
      ))}
    </div>
  );
}

function GodThemeBackground() {
  const rays = Array.from({ length: 16 }, (_, i) => i);
  const doves = Array.from({ length: 7 }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 god-theme-bg" />

      <div className="absolute left-[6%] top-[14%] h-28 w-52 rounded-full bg-white/35 blur-2xl" />
      <div className="absolute right-[10%] top-[18%] h-24 w-44 rounded-full bg-sky-100/30 blur-2xl" />
      <div className="absolute left-[18%] bottom-[18%] h-24 w-48 rounded-full bg-white/20 blur-2xl" />

      <div className="absolute left-1/2 top-[16%] -translate-x-1/2 god-sun-wrap">
        {rays.map((_, i) => (
          <span
            key={`god-ray-${i}`}
            className="god-rotating-ray"
            style={{ transform: `rotate(${i * 22.5}deg)` }}
          />
        ))}
        <div className="god-sun-core" />
      </div>

      {doves.map((_, i) => (
        <div
          key={`god-dove-${i}`}
          className="god-dove"
          style={{
            top: `${12 + (i % 4) * 14}%`,
            animationDelay: `${i * 4.6}s`,
            animationDuration: `${18 + (i % 3) * 3}s`
          }}
        >
          <span className="god-dove-wing left" />
          <span className="god-dove-body" />
          <span className="god-dove-wing right" />
        </div>
      ))}
    </div>
  );
}

function ThemeBackground({ activeThemeId, volcanoEruptionKey }) {
  if (activeThemeId === "cherry") return <CherryBlossomBackground />;
  if (activeThemeId === "ocean") return <OceanThemeBackground />;
  if (activeThemeId === "royal") return <RoyalThemeBackground />;
  if (activeThemeId === "gold") return <GoldThemeBackground />;
  if (activeThemeId === "valentine") return <ValentineThemeBackground />;
  if (activeThemeId === "japan") return <JapanThemeBackground />;
  if (activeThemeId === "cyber") return <CyberThemeBackground />;
  if (activeThemeId === "arctic") return <ArcticThemeBackground />;
  if (activeThemeId === "volcano") return <VolcanoThemeBackground key={volcanoEruptionKey} />;
  if (activeThemeId === "god") return <GodThemeBackground />;
  return null;
}

function AchievementCard({ theme, unlocked, onSelect, selected }) {
  const lockedLabel = theme.requiresRecall100
    ? "Unlock at 100% recall"
    : theme.unlockTask
      ? "Secret unlock"
      : `Unlock at ${theme.unlockAt} stages`;

  return (
    <button
      onClick={() => unlocked && onSelect(theme.id)}
      className={`rounded-3xl border p-5 text-left transition active:scale-[0.99] ${selected ? theme.border + " " + theme.soft : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"} ${!unlocked ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-sm font-bold uppercase tracking-widest ${unlocked ? theme.accent : "text-zinc-500"}`}>{unlocked ? "Unlocked" : lockedLabel}</p>
          <h3 className="mt-1 text-xl font-black text-white">{theme.name}</h3>
          <p className="mt-2 text-sm text-zinc-400">{unlocked || !theme.unlockTask ? theme.description : theme.unlockTask}</p>
        </div>
        {unlocked ? <Medal className={`h-6 w-6 ${theme.accent}`} /> : <Lock className="h-6 w-6 text-zinc-500" />}
      </div>
    </button>
  );
}

function GeneralHub({ selectedSubject, sections = [] }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 md:p-6">
      <div className="flex items-center gap-2">
        <LibraryBig className="h-6 w-6 text-orange-400" />
        <h2 className="text-2xl font-black text-white">General {selectedSubject.title} Knowledge</h2>
      </div>
      <p className="mt-2 text-sm text-zinc-400">This is the broader knowledge you need before attacking the locked stages.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <div key={section.title} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <h3 className="text-xl font-black text-white">{section.title}</h3>
            <div className="mt-4 space-y-3">
              {section.points.map((point, index) => (
                <div key={index} className="flex gap-3 text-sm leading-6 text-zinc-300">
                  <ListChecks className="mt-1 h-4 w-4 shrink-0 text-orange-300" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressRing({ value, label = "Recall" }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg className="h-28 w-28 -rotate-90" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={radius} fill="none" stroke="currentColor" strokeWidth="10" className="text-zinc-800" />
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-orange-400 transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-xl font-black">{value}%</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{label}</span>
      </div>
    </div>
  );
}

function QuizBlock({ questions, answers, setAnswers, submitted, titlePrefix = "" }) {
  return (
    <div className="mt-5 space-y-5">
      {questions.map((item, index) => (
        <div key={`${item.q}-${index}`} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
          {item.topicTitle && <p className="mb-2 text-xs font-bold uppercase tracking-widest text-orange-300">{item.topicTitle}</p>}
          <p className="font-bold text-white">{titlePrefix}{index + 1}. {item.q}</p>
          <div className="mt-3 grid gap-2">
            {item.options.map((option) => {
              const chosen = answers[index] === option;
              const isCorrectAnswer = option === item.answer;
              const showCorrect = submitted && isCorrectAnswer;
              const showWrong = submitted && chosen && !isCorrectAnswer;
              const neutralChosen = chosen && !submitted;

              return (
                <button
                  key={option}
                  onClick={() => !submitted && setAnswers((prev) => ({ ...prev, [index]: option }))}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-3 text-left text-sm transition active:scale-[0.99] ${
                    neutralChosen ? "border-orange-400 bg-orange-400/10 text-white" : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                  } ${showCorrect ? "border-green-400 bg-green-400/15 text-green-100" : ""} ${showWrong ? "border-red-400 bg-red-400/15 text-red-100" : ""}`}
                >
                  <span>{option}</span>

                  {showCorrect && (
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-300">
                      <Check className="h-4 w-4" />
                    </span>
                  )}

                  {showWrong && (
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-300">
                      <X className="h-4 w-4" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

const STORAGE_KEY = "ironForgeProgressV1";
const PROGRESS_VERSION = 2;

const defaultUnlockedStages = {
  "pe-skeletal-structure": true,
  "bio-aerobic-respiration": true,
  "dt-cam": true,
  "hist-german-unification-1848-50": true,
  "phys-motion-position": true,
  "chem-electronic-configuration": true
};

function loadSavedProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (parsed?.version !== PROGRESS_VERSION && parsed?.unlocked) {
      delete parsed.unlocked["pe-synovial-structure"];
    }

    return parsed;
  } catch {
    return null;
  }
}

export default function App() {
  const savedProgress = typeof window !== "undefined" ? loadSavedProgress() : null;
  const [username, setUsername] = useState(savedProgress?.username || "");
  const [usernameInput, setUsernameInput] = useState("");
  const [saveEnabled, setSaveEnabled] = useState(savedProgress?.saveEnabled ?? false);
  const [showSavePrompt, setShowSavePrompt] = useState(!savedProgress);
  const [showSubjectSetupPrompt, setShowSubjectSetupPrompt] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(savedProgress?.workMinutes || 30);
  const [breakMinutes, setBreakMinutes] = useState(savedProgress?.breakMinutes || 5);
  const [revisionSeconds, setRevisionSeconds] = useState(savedProgress?.revisionSeconds || 0);
  const [breakAlarm, setBreakAlarm] = useState(false);
  const [lastBreakMarker, setLastBreakMarker] = useState(savedProgress?.lastBreakMarker || 0);
  const [subjectSlots, setSubjectSlots] = useState(savedProgress?.subjectSlots || Array(9).fill(""));
  const [selectedSection, setSelectedSection] = useState(savedProgress?.selectedSection || "Year 10 EOYs");
  const [selectedTopicId, setSelectedTopicId] = useState(savedProgress?.selectedTopicId || subjects[0].topics[0].id);
  const [superTestAnswers, setSuperTestAnswers] = useState({});
  const [superTestSubmitted, setSuperTestSubmitted] = useState(false);
  const [themeUnlockCodeOpen, setThemeUnlockCodeOpen] = useState(false);
  const [themeUnlockCode, setThemeUnlockCode] = useState("");
  const [allThemesUnlocked, setAllThemesUnlocked] = useState(savedProgress?.allThemesUnlocked || false);
  const [themeActions, setThemeActions] = useState(savedProgress?.themeActions || {});
  const [themeUnlockError, setThemeUnlockError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: -999, y: -999 });
  const [volcanoEruptionKey, setVolcanoEruptionKey] = useState(0);

  const [selectedSubjectId, setSelectedSubjectId] = useState(savedProgress?.selectedSubjectId || subjects[0].id);
  const visibleSubjects = useMemo(() => subjects, []);

  const selectedSubject = visibleSubjects.find((subject) => subject.id === selectedSubjectId) || visibleSubjects[0] || subjects[0];

  const subjectSections = ["Year 10 EOYs", "Year 11"];

  const sectionTopics = useMemo(() => {
    return selectedSubject.topics.filter((topic) => topic.section === selectedSection);
  }, [selectedSubject, selectedSection]);

  const sectionGeneralContent = selectedSection === "Year 10 EOYs" ? generalContent[selectedSubject.id] || [] : [];

  useEffect(() => {
    if (sectionTopics.length > 0 && !sectionTopics.some((topic) => topic.id === selectedTopicId)) {
      setSelectedTopicId(sectionTopics[0].id);
    }
  }, [selectedSubjectId, selectedSection, sectionTopics, selectedTopicId]);
  const selectedTopic = sectionTopics.find((topic) => topic.id === selectedTopicId) || sectionTopics[0] || selectedSubject.topics[0];

  const [view, setView] = useState("home");

  useEffect(() => {
    if (view !== "home") {
      setShowSubjectSetupPrompt(false);
    }
    if (view !== "settings") {
      setThemeUnlockCodeOpen(false);
    }
  }, [view]);
  const [stageTab, setStageTab] = useState("test");
  const [activeThemeId, setActiveThemeId] = useState(savedProgress?.activeThemeId || "forge");
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [dailyAnswers, setDailyAnswers] = useState({});
  const [dailySubmitted, setDailySubmitted] = useState(false);
  const [unlocked, setUnlocked] = useState({ ...defaultUnlockedStages, ...(savedProgress?.unlocked || {}) });

  const allTopics = subjects.flatMap((subject) => subject.topics);
  const sectionSubject = useMemo(() => ({ ...selectedSubject, topics: sectionTopics }), [selectedSubject, sectionTopics]);

  const dailyQuestions = useMemo(() => getDailyQuestions(sectionSubject, 8), [sectionSubject]);

  const subjectSuperTestReady = sectionTopics.length > 0 && sectionTopics.every((topic) => unlocked[topic.id]);

  const superTestQuestions = useMemo(() => {
    return sectionTopics
      .flatMap((topic) => topic.questions.map((question) => ({ ...question, topicTitle: topic.title })))
      .slice(0, 12);
  }, [sectionTopics]);

  function openSuperTest() {
    setSuperTestAnswers({});
    setSuperTestSubmitted(false);
    setView("superTest");
  }

  function resetSelectedSubjectProgress() {
    const firstTopicId = sectionTopics[0]?.id;
    const nextUnlocked = { ...unlocked };

    sectionTopics.forEach((topic) => {
      delete nextUnlocked[topic.id];
    });

    if (firstTopicId) {
      nextUnlocked[firstTopicId] = true;
      setSelectedTopicId(firstTopicId);
    }

    setUnlocked(nextUnlocked);
    setSuperTestAnswers({});
    setSuperTestSubmitted(false);
    setView("stages");
  }

  const formattedRevisionTime = useMemo(() => {
    const minutes = Math.floor(revisionSeconds / 60);
    const seconds = revisionSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, [revisionSeconds]);

  useEffect(() => {
    if (view !== "stages") return;

    const timer = window.setInterval(() => {
      setRevisionSeconds((previous) => {
        const next = previous + 1;
        const workSeconds = Math.max(1, Number(workMinutes) || 30) * 60;
        const currentMarker = Math.floor(next / workSeconds);

        if (currentMarker > 0 && currentMarker > lastBreakMarker) {
          setLastBreakMarker(currentMarker);
          setBreakAlarm(true);
        }

        return next;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [view, workMinutes, lastBreakMarker]);

  useEffect(() => {
    if (!saveEnabled) return;

    const progress = {
      version: PROGRESS_VERSION,
      username,
      saveEnabled,
      selectedSubjectId,
      selectedTopicId,
      activeThemeId,
      unlocked,
      workMinutes,
      breakMinutes,
      revisionSeconds,
      lastBreakMarker,
      subjectSlots,
      selectedSection,
      allThemesUnlocked,
      themeActions
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [saveEnabled, username, selectedSubjectId, selectedTopicId, activeThemeId, unlocked, workMinutes, breakMinutes, revisionSeconds, lastBreakMarker, subjectSlots, selectedSection, allThemesUnlocked, themeActions]);

  const score = useMemo(() => {
    const correct = selectedTopic.questions.filter((item, index) => answers[index] === item.answer).length;
    return Math.round((correct / selectedTopic.questions.length) * 100);
  }, [answers, selectedTopic]);

  const dailyScore = useMemo(() => {
    const correct = dailyQuestions.filter((item, index) => dailyAnswers[index] === item.answer).length;
    return dailyQuestions.length ? Math.round((correct / dailyQuestions.length) * 100) : 0;
  }, [dailyAnswers, dailyQuestions]);

  const subjectTopicIndex = sectionTopics.findIndex((topic) => topic.id === selectedTopic.id);
  const nextTopic = sectionTopics[subjectTopicIndex + 1];
  const passed = submitted && score === 100;
  const unlockedCount = allTopics.filter((topic) => unlocked[topic.id]).length;
  const totalProgress = Math.round((unlockedCount / allTopics.length) * 100);
  const subjectUnlockedCount = sectionTopics.filter((topic) => unlocked[topic.id]).length;
  const maxForgedInAnySubject = Math.max(...visibleSubjects.map((subject) => subject.topics.filter((topic) => unlocked[topic.id]).length));

  const recallPercentage = useMemo(() => {
    const unlockedInSubject = sectionTopics.filter((topic) => unlocked[topic.id]).length;
    const unlockScore = sectionTopics.length ? Math.round((unlockedInSubject / sectionTopics.length) * 100) : 0;
    if (dailySubmitted) return Math.round((unlockScore + dailyScore) / 2);
    if (submitted) return Math.round((unlockScore + score) / 2);
    return unlockScore;
  }, [sectionTopics, unlocked, dailySubmitted, dailyScore, submitted, score]);

  function unlockThemeAction(actionKey) {
    if (!actionKey) return;
    setThemeActions((previous) => ({ ...previous, [actionKey]: true }));
  }

  function incrementThemeAction(actionKey) {
    if (!actionKey) return;
    setThemeActions((previous) => ({ ...previous, [actionKey]: (previous[actionKey] || 0) + 1 }));
  }

  function isThemeUnlocked(theme) {
    if (allThemesUnlocked) return true;
    if (theme.requiresRecall100) return recallPercentage === 100;
    if (theme.unlockAction === "dailyTestsStarted3") return (themeActions.dailyTestsStarted3 || 0) >= 3;
    if (theme.unlockAction === "subjectSwitches5") return (themeActions.subjectSwitches5 || 0) >= 5;
    if (theme.unlockAction) return Boolean(themeActions[theme.unlockAction]);
    return maxForgedInAnySubject >= theme.unlockAt;
  }

  const activeTheme = themes.find((theme) => theme.id === activeThemeId && isThemeUnlocked(theme)) || themes[0];

  function changeSubject(subject) {
    incrementThemeAction("subjectSwitches5");
    setSelectedSubjectId(subject.id);
    const firstUnlockedTopic = subject.topics.find((topic) => unlocked[topic.id]) || subject.topics[0];
    setSelectedTopicId(firstUnlockedTopic.id);
    setAnswers({});
    setSubmitted(false);
    setDailyAnswers({});
    setDailySubmitted(false);
    setView("home");
  }

  function switchSubject(subject) {
    incrementThemeAction("subjectSwitches5");
    setSelectedSubjectId(subject.id);
    const firstUnlockedTopic = subject.topics.find((topic) => unlocked[topic.id]) || subject.topics[0];
    setSelectedTopicId(firstUnlockedTopic.id);
    setAnswers({});
    setSubmitted(false);
    setDailyAnswers({});
    setDailySubmitted(false);
    setSubjectsOpen(false);
    if (view === "topic") setView("stages");
  }

  function openTopic(topic) {
    if (!unlocked[topic.id]) return;
    setSelectedTopicId(topic.id);
    if (activeThemeId === "volcano") {
      setVolcanoEruptionKey((previous) => previous + 1);
    }
    setAnswers({});
    setSubmitted(false);
    setStageTab("test");
    setView("topic");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitQuiz() {
    setSubmitted(true);
    if (score === 100 && nextTopic) {
      setUnlocked((prev) => ({ ...prev, [nextTopic.id]: true }));
    }
    if (score < 100) {
      unlockThemeAction("failedStageOnce");
    }
  }

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
  }

  function startDailyTest() {
    incrementThemeAction("dailyTestsStarted3");
    setDailyAnswers({});
    setDailySubmitted(false);
    setView("daily");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToStages() {
    setView("stages");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startSavingProgress() {
    const cleanName = usernameInput.trim() || "Student";

    const progress = {
      version: PROGRESS_VERSION,
      username: cleanName,
      saveEnabled: true,
      selectedSubjectId,
      selectedTopicId,
      activeThemeId,
      unlocked,
      workMinutes,
      breakMinutes,
      revisionSeconds,
      lastBreakMarker,
      subjectSlots,
      selectedSection,
      allThemesUnlocked
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    setUsername(cleanName);
    setSaveEnabled(true);
    setShowSavePrompt(false);
    setShowSubjectSetupPrompt(true);
  }

  function skipSavingProgress() {
    setSaveEnabled(false);
    setShowSavePrompt(false);
    setShowSubjectSetupPrompt(true);
  }

  return (
    <div
      onMouseMove={(event) => setMousePosition({ x: event.clientX, y: event.clientY })}
      className={`relative min-h-screen overflow-hidden ${activeTheme.bg} text-zinc-100 ${
        activeThemeId === "cherry" ? "cherry-theme" : activeThemeId === "ocean" ? "ocean-theme" : activeThemeId === "royal" ? "royal-theme" : activeThemeId === "gold" ? "gold-theme" : activeThemeId === "valentine" ? "valentine-theme" : activeThemeId === "japan" ? "japan-theme" : activeThemeId === "cyber" ? "cyber-theme" : activeThemeId === "arctic" ? "arctic-theme" : activeThemeId === "volcano" ? "volcano-theme" : activeThemeId === "god" ? "god-theme" : ""
      }`}
    >
      <ThemeBackground activeThemeId={activeThemeId} volcanoEruptionKey={volcanoEruptionKey} />
      {activeThemeId === "cherry" && <CherryPetalsOverlay />}
      {activeThemeId === "gold" && <GoldThiefOverlay mousePosition={mousePosition} />}
      {activeThemeId === "japan" && <JapanCarOverlay mousePosition={mousePosition} onJumpUnlock={() => unlockThemeAction("japanCarJumped")} />}
      {themeUnlockCodeOpen && view === "settings" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black px-4 backdrop-blur-md" style={{ zIndex: 99999 }}>
          <div className="w-full max-w-md rounded-3xl border border-orange-400/30 bg-zinc-950 p-6 shadow-2xl shadow-orange-950/40">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-orange-300">Creator access</p>
            <h2 className="mt-2 text-3xl font-black text-white">Theme unlock code</h2>
            <p className="mt-2 text-sm text-zinc-400">Enter the creator code to unlock every theme.</p>

            <input
              type="password"
              value={themeUnlockCode}
              onChange={(event) => {
                setThemeUnlockCode(event.target.value);
                setThemeUnlockError("");
              }}
              placeholder="Enter code..."
              className="mt-5 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-400"
            />

            {themeUnlockError && <p className="mt-3 text-sm font-bold text-red-300">{themeUnlockError}</p>}

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                onClick={() => {
                  setThemeUnlockCodeOpen(false);
                  setThemeUnlockCode("");
                  setThemeUnlockError("");
                }}
                className="rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 font-bold text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (themeUnlockCode === "Tilly2025!") {
                    setAllThemesUnlocked(true);
                    setThemeUnlockCodeOpen(false);
                    setThemeUnlockCode("");
                    setThemeUnlockError("");
                  } else {
                    setThemeUnlockError("Wrong code.");
                  }
                }}
                className="rounded-2xl bg-orange-500 px-5 py-3 font-black text-white hover:bg-orange-600"
              >
                Unlock themes
              </button>
            </div>
          </div>
        </div>
      )}

      {breakAlarm && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black/78 px-4 backdrop-blur-sm">
          <div className="absolute inset-0 break-burst" />
          <div className="relative w-full max-w-lg rounded-3xl border border-orange-300/40 bg-zinc-950/92 p-8 text-center shadow-2xl shadow-orange-950/50">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/20 text-orange-200">
              <Flame className="h-10 w-10" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-orange-300">Break unlocked</p>
            <div className="real-alarm-clock mx-auto mb-6">
              <div className="alarm-bell alarm-bell-left" />
              <div className="alarm-bell alarm-bell-right" />
              <div className="alarm-handle" />
              <div className="alarm-face">
                <div className="alarm-number alarm-12">12</div>
                <div className="alarm-number alarm-3">3</div>
                <div className="alarm-number alarm-6">6</div>
                <div className="alarm-number alarm-9">9</div>
                <div className="alarm-centre" />
                <div className="alarm-hand alarm-hour" />
                <div className="alarm-hand alarm-minute" />
              </div>
              <div className="alarm-leg alarm-leg-left" />
              <div className="alarm-leg alarm-leg-right" />
            </div>
            <h2 className="mt-3 text-5xl font-black text-white md:text-6xl">BREAK TIME</h2>
            <p className="mt-2 text-xl font-black uppercase tracking-[0.32em] text-orange-200">Alarm triggered</p>
            <p className="mt-3 text-zinc-300">
              You have revised for {workMinutes} minutes. Take a {breakMinutes} minute break, then come back and keep forging.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setBreakAlarm(false)}
                className="rounded-2xl bg-orange-500 px-6 py-3 font-black text-white hover:bg-orange-600"
              >
                Start break
              </button>
              <button
                onClick={() => {
                  setBreakAlarm(false);
                  setView("settings");
                }}
                className="rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-bold text-zinc-200 hover:bg-zinc-800"
              >
                Timer settings
              </button>
            </div>
          </div>
        </div>
      )}

      {showSavePrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-orange-400/40 bg-zinc-950 p-6 shadow-2xl shadow-orange-950/40">
            <button
              onClick={skipSavingProgress}
              className="absolute right-4 top-4 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm font-black text-zinc-400 hover:bg-zinc-800 hover:text-white"
              aria-label="Skip saving progress"
            >
              X
            </button>

            <div className="mb-4 inline-flex rounded-2xl bg-orange-400/10 p-3 text-orange-300">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <h2 className="text-3xl font-black text-white">Save your progress?</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Enter a username so this device can remember your unlocked stages, selected theme and subject progress.
            </p>

            <label className="mt-5 block text-xs font-bold uppercase tracking-widest text-orange-300">Username</label>
            <input
              value={usernameInput}
              onChange={(event) => setUsernameInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") startSavingProgress();
              }}
              placeholder="e.g. Teddy"
              className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-orange-400"
            />

            <button
              onClick={startSavingProgress}
              className="mt-5 w-full rounded-2xl bg-orange-500 px-5 py-3 font-black text-white hover:bg-orange-600 active:scale-[0.99]"
            >
              Start Saving
            </button>

            <button
              onClick={skipSavingProgress}
              className="mt-3 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm font-bold text-zinc-300 hover:bg-zinc-800"
            >
              Continue without saving
            </button>
          </div>
        </div>
      )}

      {showSubjectSetupPrompt && view === "home" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md" style={{ zIndex: 9999 }}>
          <div className="relative max-h-[86vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-orange-400/40 bg-zinc-950 p-6 shadow-2xl shadow-orange-950/40">
            <button
              onClick={() => setShowSubjectSetupPrompt(false)}
              className="absolute right-4 top-4 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm font-black text-zinc-400 hover:bg-zinc-800 hover:text-white"
              aria-label="Close subject setup"
            >
              X
            </button>

            <div className="mb-4 inline-flex rounded-2xl bg-orange-400/10 p-3 text-orange-300">
              <ListChecks className="h-7 w-7" />
            </div>

            <h2 className="text-3xl font-black text-white">Choose your subject slots</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              Pick the subjects you want in your taskbar. This uses the same subject slots as Settings. Empty every slot to show every subject.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {subjectSlots.map((slotSubjectId, index) => (
                <label key={`startup-slot-${index}`} className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4">
                  <span className="text-xs font-black uppercase tracking-widest text-orange-300">Slot {index + 1}</span>
                  <select
                    value={slotSubjectId}
                    onChange={(event) => {
                      const nextSlots = [...subjectSlots];
                      nextSlots[index] = event.target.value;
                      setSubjectSlots(nextSlots);
                      if (event.target.value) setSelectedSubjectId(event.target.value);
                    }}
                    className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-400"
                  >
                    <option value="">Empty</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>{subject.title}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <button
                onClick={() => setSubjectSlots(Array(9).fill(""))}
                className="rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 font-bold text-zinc-300 hover:bg-zinc-800"
              >
                Show all subjects
              </button>
              <button
                onClick={() => {
                  const firstPickedSubject = subjectSlots.find(Boolean);
                  if (firstPickedSubject) setSelectedSubjectId(firstPickedSubject);
                  setShowSubjectSetupPrompt(false);
                }}
                className="rounded-2xl bg-orange-500 px-6 py-3 font-black text-white hover:bg-orange-600 active:scale-[0.99]"
              >
                Save subject setup
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        :where(*, ::before, ::after) {
          border-color: rgb(39 39 42);
        }

        button {
          outline: none;
        }

        button:focus,
        button:focus-visible {
          outline: none;
        }

        button:focus-visible {
          box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.65);
        }

        .ocean-theme {
          background: #dff6ff !important;
          color: #0f3b57;
        }

        .ocean-theme .text-white,
        .ocean-theme .text-zinc-100,
        .ocean-theme .text-zinc-200 {
          color: #0f3b57 !important;
        }

        .ocean-theme .text-zinc-300,
        .ocean-theme .text-zinc-400,
        .ocean-theme .text-zinc-500 {
          color: rgba(15, 59, 87, 0.72) !important;
        }

        .ocean-theme .bg-black,
        .ocean-theme .bg-black\/70,
        .ocean-theme .bg-black\/78,
        .ocean-theme .bg-zinc-950,
        .ocean-theme .bg-zinc-950\/70,
        .ocean-theme .bg-zinc-950\/72,
        .ocean-theme .bg-zinc-950\/80,
        .ocean-theme .bg-zinc-950\/84,
        .ocean-theme .bg-zinc-950\/90,
        .ocean-theme .bg-zinc-950\/92,
        .ocean-theme .bg-zinc-900,
        .ocean-theme .bg-zinc-900\/70,
        .ocean-theme .bg-zinc-900\/80,
        .ocean-theme .bg-zinc-900\/85 {
          background-color: rgba(186, 230, 253, 0.92) !important;
          backdrop-filter: blur(14px);
        }

        .ocean-theme .hover\:bg-zinc-800:hover,
        .ocean-theme .hover\:bg-black\/80:hover {
          background-color: rgba(147, 197, 253, 0.96) !important;
        }

        .ocean-theme .border-zinc-700,
        .ocean-theme .border-zinc-800 {
          border-color: rgba(59, 130, 246, 0.28) !important;
        }

        .ocean-theme .text-orange-100,
        .ocean-theme .text-orange-200,
        .ocean-theme .text-orange-300,
        .ocean-theme .text-orange-400,
        .ocean-theme .text-orange-500 {
          color: #0284c7 !important;
        }

        .ocean-theme .bg-orange-400\/10,
        .ocean-theme .bg-orange-400\/15,
        .ocean-theme .bg-orange-400\/20,
        .ocean-theme .bg-orange-500\/10,
        .ocean-theme .bg-orange-500\/15,
        .ocean-theme .bg-orange-500\/20,
        .ocean-theme .bg-orange-500\/25 {
          background-color: rgba(56, 189, 248, 0.18) !important;
        }

        .ocean-theme .bg-orange-500,
        .ocean-theme .hover\:bg-orange-500:hover,
        .ocean-theme .hover\:bg-orange-600:hover {
          background: linear-gradient(135deg, #38bdf8, #0ea5e9) !important;
          color: #eff8ff !important;
        }

        .ocean-theme .border-orange-300,
        .ocean-theme .border-orange-300\/40,
        .ocean-theme .border-orange-400\/30,
        .ocean-theme .border-orange-400\/40,
        .ocean-theme .border-orange-400\/80,
        .ocean-theme .border-orange-500\/30 {
          border-color: rgba(56, 189, 248, 0.42) !important;
        }

        .ocean-theme input,
        .ocean-theme textarea,
        .ocean-theme select {
          background-color: rgba(224, 242, 254, 0.95) !important;
          border-color: rgba(56, 189, 248, 0.3) !important;
          color: #0f3b57 !important;
        }

        .ocean-theme input::placeholder,
        .ocean-theme textarea::placeholder {
          color: rgba(15, 59, 87, 0.45) !important;
        }

        .ocean-theme .shadow-orange-500\/20,
        .ocean-theme .shadow-orange-950\/20,
        .ocean-theme .shadow-orange-950\/30,
        .ocean-theme .shadow-orange-950\/40,
        .ocean-theme .shadow-orange-950\/50 {
          box-shadow: 0 18px 44px rgba(56, 189, 248, 0.14) !important;
        }

        .ocean-theme-bg {
          background:
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 20%),
            radial-gradient(circle at 80% 18%, rgba(125,211,252,0.28), transparent 22%),
            linear-gradient(180deg, #e0f2fe 0%, #bae6fd 52%, #7dd3fc 100%);
        }

        .mini-alarm-clock {
          position: relative;
          display: inline-flex;
          height: 38px;
          width: 38px;
          align-items: center;
          justify-content: center;
          animation: alarm-small-ring 0.55s ease-in-out infinite;
        }

        .mini-alarm-face {
          position: relative;
          height: 30px;
          width: 30px;
          border-radius: 9999px;
          border: 3px solid rgba(255, 235, 210, 0.95);
          background: radial-gradient(circle, #fff7ed 0%, #fed7aa 72%, #fb923c 100%);
          box-shadow: inset 0 0 0 2px rgba(124, 45, 18, 0.25), 0 0 18px rgba(251, 146, 60, 0.35);
        }

        .mini-alarm-bell {
          position: absolute;
          top: 1px;
          height: 14px;
          width: 16px;
          border-radius: 16px 16px 5px 5px;
          background: #fb923c;
          border: 2px solid rgba(255, 237, 213, 0.85);
        }

        .mini-alarm-bell.left {
          left: 2px;
          transform: rotate(-28deg);
        }

        .mini-alarm-bell.right {
          right: 2px;
          transform: rotate(28deg);
        }

        .mini-alarm-hand {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 3px;
          border-radius: 9999px;
          background: #7c2d12;
          transform-origin: bottom center;
        }

        .mini-alarm-hand.hour {
          height: 8px;
          transform: translate(-50%, -100%) rotate(310deg);
        }

        .mini-alarm-hand.minute {
          height: 11px;
          transform: translate(-50%, -100%) rotate(40deg);
        }

        @keyframes alarm-small-ring {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }

        .real-alarm-clock {
          position: relative;
          height: 210px;
          width: 230px;
          animation: real-alarm-ring 0.38s ease-in-out infinite;
          filter: drop-shadow(0 24px 34px rgba(249, 115, 22, 0.34));
        }

        .alarm-face {
          position: absolute;
          left: 50%;
          top: 52%;
          height: 156px;
          width: 156px;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          border: 9px solid #fdba74;
          background: radial-gradient(circle at 35% 30%, #ffffff 0%, #ffedd5 52%, #fed7aa 100%);
          box-shadow: inset 0 0 0 5px rgba(124, 45, 18, 0.16), 0 0 42px rgba(251, 146, 60, 0.46);
        }

        .alarm-bell {
          position: absolute;
          top: 12px;
          height: 62px;
          width: 78px;
          border-radius: 78px 78px 20px 20px;
          border: 7px solid #ffedd5;
          background: linear-gradient(135deg, #fb923c, #f97316);
          box-shadow: 0 0 28px rgba(251, 146, 60, 0.5);
        }

        .alarm-bell-left {
          left: 18px;
          transform: rotate(-24deg);
        }

        .alarm-bell-right {
          right: 18px;
          transform: rotate(24deg);
        }

        .alarm-handle {
          position: absolute;
          left: 50%;
          top: 12px;
          height: 46px;
          width: 86px;
          transform: translateX(-50%);
          border-top: 9px solid #ffedd5;
          border-radius: 9999px 9999px 0 0;
        }

        .alarm-number {
          position: absolute;
          color: #7c2d12;
          font-size: 18px;
          font-weight: 1000;
          line-height: 1;
        }

        .alarm-12 { left: 50%; top: 15px; transform: translateX(-50%); }
        .alarm-3 { right: 18px; top: 50%; transform: translateY(-50%); }
        .alarm-6 { left: 50%; bottom: 15px; transform: translateX(-50%); }
        .alarm-9 { left: 18px; top: 50%; transform: translateY(-50%); }

        .alarm-centre {
          position: absolute;
          left: 50%;
          top: 50%;
          height: 14px;
          width: 14px;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background: #7c2d12;
          z-index: 3;
        }

        .alarm-hand {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 7px;
          border-radius: 9999px;
          background: #7c2d12;
          transform-origin: bottom center;
          z-index: 2;
        }

        .alarm-hour {
          height: 45px;
          transform: translate(-50%, -100%) rotate(305deg);
        }

        .alarm-minute {
          height: 62px;
          transform: translate(-50%, -100%) rotate(38deg);
        }

        .alarm-leg {
          position: absolute;
          bottom: 2px;
          height: 42px;
          width: 12px;
          border-radius: 9999px;
          background: #ffedd5;
        }

        .alarm-leg-left {
          left: 60px;
          transform: rotate(28deg);
        }

        .alarm-leg-right {
          right: 60px;
          transform: rotate(-28deg);
        }

        @keyframes real-alarm-ring {
          0%, 100% { transform: translateX(-5px) rotate(-4deg) scale(1); }
          50% { transform: translateX(5px) rotate(4deg) scale(1.03); }
        }

        .break-burst {
          background:
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.35), transparent 10%),
            radial-gradient(circle at 50% 50%, rgba(255, 92, 28, 0.46), transparent 24%),
            repeating-conic-gradient(from 0deg, rgba(255, 185, 60, 0.42) 0deg 7deg, transparent 7deg 16deg);
          animation: break-explode 0.55s ease-out infinite alternate;
        }

        .break-burst::before,
        .break-burst::after {
          content: "";
          position: absolute;
          inset: -20%;
          background: repeating-conic-gradient(from 25deg, rgba(255,255,255,0.18) 0deg 4deg, transparent 4deg 14deg);
          animation: break-spin 1.1s linear infinite;
        }

        .break-burst::after {
          animation-direction: reverse;
          opacity: 0.45;
        }

        @keyframes break-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes break-explode {
          0% {
            transform: scale(0.92) rotate(0deg);
            opacity: 0.55;
          }
          100% {
            transform: scale(1.12) rotate(8deg);
            opacity: 0.95;
          }
        }

        .cherry-theme {
          background: #17101d;
        }

        .ocean-theme-sky {
          background:
            linear-gradient(
              180deg,
              rgba(31, 160, 226, 0.58) 0%,
              rgba(67, 190, 229, 0.38) 38%,
              rgba(15, 34, 52, 0.78) 100%
            );
        }

        .ocean-theme-water {
          background:
            linear-gradient(180deg, rgba(50, 200, 230, 0.14), rgba(6, 26, 42, 0.78)),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 12px);
        }

        @keyframes bubble-rise {
          0% {
            transform: translate3d(0, 0, 0) scale(0.8);
            opacity: 0;
          }
          16% {
            opacity: 0.7;
          }
          100% {
            transform: translate3d(20px, -110vh, 0) scale(1.2);
            opacity: 0;
          }
        }

        .ocean-bubble {
          animation-name: bubble-rise;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .ocean-fish {
          left: -90px;
          height: 28px;
          width: 74px;
          animation-name: fish-swim;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          filter: drop-shadow(0 0 12px var(--fish-shadow, rgba(125, 211, 252, 0.28)));
        }

        .ocean-fish-body {
          position: absolute;
          left: 14px;
          top: 5px;
          height: 20px;
          width: 42px;
          border-radius: 9999px 70% 70% 9999px;
          background: linear-gradient(135deg, color-mix(in srgb, white 28%, var(--fish-body, #7dd3fc)), var(--fish-body, #7dd3fc));
          border: 1px solid rgba(236, 254, 255, 0.55);
        }

        .ocean-fish-tail {
          position: absolute;
          left: 0;
          top: 5px;
          height: 20px;
          width: 22px;
          clip-path: polygon(100% 50%, 0 0, 25% 50%, 0 100%);
          background: var(--fish-tail, #38bdf8);
          animation: fish-tail-wiggle 0.55s ease-in-out infinite;
          transform-origin: right center;
        }

        .ocean-fish-rainbow .ocean-fish-body {
          background: linear-gradient(90deg, #ff4d4d, #ff9f1c, #ffe66d, #2ec4b6, #3a86ff, #a259ff, #ff4dcb);
          background-size: 220% 100%;
          animation: rainbow-fish-shift 2.8s linear infinite;
        }

        .ocean-fish-rainbow .ocean-fish-tail {
          background: linear-gradient(180deg, #ff4d4d, #ff9f1c, #ffe66d, #2ec4b6, #3a86ff, #a259ff);
          background-size: 100% 220%;
          animation: fish-tail-wiggle 0.55s ease-in-out infinite, rainbow-fish-tail 2.2s linear infinite;
        }

        .ocean-fish-rainbow {
          filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.35));
        }

        @keyframes rainbow-fish-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @keyframes rainbow-fish-tail {
          0% { background-position: 50% 0%; }
          100% { background-position: 50% 100%; }
        }

        .ocean-fish-eye {
          position: absolute;
          right: 14px;
          top: 10px;
          height: 4px;
          width: 4px;
          border-radius: 9999px;
          background: rgba(8, 47, 73, 0.85);
        }

        @keyframes fish-swim {
          0% {
            transform: translateX(-8vw) translateY(0px) scale(var(--fish-scale, 1));
          }
          28% {
            transform: translateX(32vw) translateY(-12px) scale(var(--fish-scale, 1));
          }
          62% {
            transform: translateX(72vw) translateY(10px) scale(var(--fish-scale, 1));
          }
          100% {
            transform: translateX(112vw) translateY(-4px) scale(var(--fish-scale, 1));
          }
        }

        @keyframes fish-tail-wiggle {
          0%, 100% {
            transform: rotate(-9deg);
          }
          50% {
            transform: rotate(9deg);
          }
        }

        .royal-theme {
          color: #eadcff;
        }

        .royal-theme .text-white,
        .royal-theme .text-zinc-100,
        .royal-theme .text-zinc-200 {
          color: #eadcff !important;
        }

        .royal-theme .text-zinc-300,
        .royal-theme .text-zinc-400,
        .royal-theme .text-zinc-500 {
          color: rgba(226, 201, 255, 0.76) !important;
        }

        .royal-theme .text-orange-100,
        .royal-theme .text-orange-200,
        .royal-theme .text-orange-300,
        .royal-theme .text-orange-400,
        .royal-theme .text-orange-500 {
          color: #c084fc !important;
        }

        .royal-theme .bg-orange-400\/10,
        .royal-theme .bg-orange-400\/15,
        .royal-theme .bg-orange-400\/20,
        .royal-theme .bg-orange-500\/10,
        .royal-theme .bg-orange-500\/15,
        .royal-theme .bg-orange-500\/20,
        .royal-theme .bg-orange-500\/25 {
          background-color: rgba(168, 85, 247, 0.2) !important;
        }

        .royal-theme .bg-orange-500,
        .royal-theme .hover\:bg-orange-600:hover,
        .royal-theme .hover\:bg-orange-500:hover {
          background: linear-gradient(135deg, #7c3aed, #c084fc) !important;
          color: #f3e8ff !important;
        }

        .royal-theme .border-orange-300,
        .royal-theme .border-orange-300\/40,
        .royal-theme .border-orange-400\/30,
        .royal-theme .border-orange-400\/40,
        .royal-theme .border-orange-400\/80,
        .royal-theme .border-orange-500\/30 {
          border-color: rgba(192, 132, 252, 0.58) !important;
        }

        .royal-theme .shadow-orange-500\/20,
        .royal-theme .shadow-orange-950\/20,
        .royal-theme .shadow-orange-950\/30,
        .royal-theme .shadow-orange-950\/40,
        .royal-theme .shadow-orange-950\/50 {
          box-shadow: 0 18px 45px rgba(168, 85, 247, 0.22) !important;
        }

        .royal-theme input,
        .royal-theme textarea,
        .royal-theme select {
          border-color: rgba(192, 132, 252, 0.28) !important;
          color: #eadcff !important;
        }

        .royal-theme input::placeholder,
        .royal-theme textarea::placeholder {
          color: rgba(226, 201, 255, 0.48) !important;
        }

        .royal-theme-bg {
          background:
            radial-gradient(circle at 20% 12%, rgba(185, 120, 255, 0.20), transparent 24%),
            radial-gradient(circle at 82% 18%, rgba(255, 110, 210, 0.14), transparent 22%),
            linear-gradient(180deg, rgba(35, 18, 60, 0.96), rgba(13, 10, 26, 0.98));
        }

        .royal-lightning {
          position: absolute;
          top: -8vh;
          height: 72vh;
          width: 34vw;
          opacity: 0;
          filter: drop-shadow(0 0 16px rgba(233, 213, 255, 0.95)) drop-shadow(0 0 34px rgba(168, 85, 247, 0.7));
          animation-name: royal-lightning-flash;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .royal-lightning::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #ffffff, #d8b4fe 42%, transparent 78%);
          clip-path: polygon(44% 0%, 58% 0%, 47% 24%, 63% 24%, 38% 58%, 53% 36%, 38% 36%);
        }

        .royal-lightning::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 18%, rgba(255,255,255,0.5), transparent 18%), radial-gradient(circle at 50% 36%, rgba(168,85,247,0.28), transparent 28%);
          opacity: 0.7;
        }

        .royal-lightning-left {
          left: -4vw;
          transform: rotate(-16deg);
        }

        .royal-lightning-right {
          right: -4vw;
          transform: scaleX(-1) rotate(-16deg);
        }

        @keyframes royal-lightning-flash {
          0%, 72%, 100% { opacity: 0; }
          73% { opacity: 0.95; }
          74% { opacity: 0.18; }
          75% { opacity: 1; }
          76.5% { opacity: 0; }
        }

        @keyframes royal-twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.85);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.25);
          }
        }

        .royal-star {
          animation-name: royal-twinkle;
          animation-duration: 3.6s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          box-shadow: 0 0 12px rgba(235, 210, 255, 0.5);
        }

        .gold-theme {
          color: #fff7c2;
        }

        .gold-theme .text-white,
        .gold-theme .text-zinc-100,
        .gold-theme .text-zinc-200 {
          color: #fff7c2 !important;
        }

        .gold-theme .text-zinc-300,
        .gold-theme .text-zinc-400,
        .gold-theme .text-zinc-500 {
          color: rgba(254, 240, 138, 0.78) !important;
        }

        .gold-theme .text-orange-100,
        .gold-theme .text-orange-200,
        .gold-theme .text-orange-300,
        .gold-theme .text-orange-400,
        .gold-theme .text-orange-500 {
          color: #fde047 !important;
        }

        .gold-theme .bg-orange-400\/10,
        .gold-theme .bg-orange-400\/15,
        .gold-theme .bg-orange-400\/20,
        .gold-theme .bg-orange-500\/10,
        .gold-theme .bg-orange-500\/15,
        .gold-theme .bg-orange-500\/20,
        .gold-theme .bg-orange-500\/25 {
          background-color: rgba(250, 204, 21, 0.2) !important;
        }

        .gold-theme .bg-orange-500,
        .gold-theme .hover\:bg-orange-600:hover,
        .gold-theme .hover\:bg-orange-500:hover {
          background: linear-gradient(135deg, #eab308, #fde047) !important;
          color: #422006 !important;
        }

        .gold-theme .border-orange-300,
        .gold-theme .border-orange-300\/40,
        .gold-theme .border-orange-400\/30,
        .gold-theme .border-orange-400\/40,
        .gold-theme .border-orange-400\/80,
        .gold-theme .border-orange-500\/30 {
          border-color: rgba(253, 224, 71, 0.62) !important;
        }

        .gold-theme .shadow-orange-500\/20,
        .gold-theme .shadow-orange-950\/20,
        .gold-theme .shadow-orange-950\/30,
        .gold-theme .shadow-orange-950\/40,
        .gold-theme .shadow-orange-950\/50 {
          box-shadow: 0 18px 45px rgba(234, 179, 8, 0.22) !important;
        }

        .gold-theme input,
        .gold-theme textarea,
        .gold-theme select {
          border-color: rgba(253, 224, 71, 0.32) !important;
          color: #fff7c2 !important;
        }

        .gold-theme input::placeholder,
        .gold-theme textarea::placeholder {
          color: rgba(254, 240, 138, 0.5) !important;
        }

        .gold-theme-bg {
          background:
            radial-gradient(circle at 18% 14%, rgba(255, 235, 120, 0.34), transparent 25%),
            radial-gradient(circle at 84% 12%, rgba(255, 210, 45, 0.26), transparent 24%),
            radial-gradient(circle at 50% 78%, rgba(234, 179, 8, 0.2), transparent 36%),
            linear-gradient(180deg, rgba(122, 82, 5, 0.98), rgba(54, 34, 3, 0.99) 52%, rgba(22, 14, 4, 0.99));
        }

        .gold-money {
          height: 24px;
          width: 42px;
          transform: rotate(-10deg);
          animation-name: money-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          box-shadow: 0 0 18px rgba(250, 204, 21, 0.36);
        }

        @keyframes money-fall {
          0% { transform: translate3d(0, -8vh, 0) rotate(-18deg); opacity: 0; }
          10% { opacity: 0.95; }
          45% { transform: translate3d(24px, 48vh, 0) rotate(18deg); }
          100% { transform: translate3d(-18px, 122vh, 0) rotate(380deg); opacity: 0; }
        }

        .gold-thief {
          position: relative;
          height: 56px;
          width: 56px;
          transition: transform 0.16s ease-out, opacity 0.18s ease-out;
          filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.35));
        }

        .gold-thief-under-taskbar {
          transform-origin: top center;
        }

        .gold-thief-head {
          position: absolute;
          left: 15px;
          top: 0;
          height: 22px;
          width: 22px;
          border-radius: 9999px;
          background: #facc15;
          border: 2px solid rgba(255, 247, 194, 0.7);
        }

        .gold-thief-mask {
          position: absolute;
          left: 2px;
          top: 8px;
          height: 7px;
          width: 18px;
          border-radius: 9999px;
          background: #111827;
        }

        .gold-thief-eye {
          position: absolute;
          top: 10px;
          height: 2px;
          width: 2px;
          border-radius: 9999px;
          background: #fef3c7;
          z-index: 2;
        }

        .gold-thief-eye.eye-left { left: 7px; }
        .gold-thief-eye.eye-right { right: 7px; }

        .gold-thief-body {
          position: absolute;
          left: 13px;
          top: 24px;
          height: 25px;
          width: 27px;
          border-radius: 14px 14px 18px 18px;
          background: repeating-linear-gradient(90deg, #111827 0 8px, #fef3c7 8px 14px);
          border: 2px solid rgba(255, 247, 194, 0.42);
        }

        .gold-thief-bag {
          position: absolute;
          right: -17px;
          top: 3px;
          height: 20px;
          width: 19px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px 9999px 9999px 6px;
          background: #78350f;
          color: #fde68a;
          font-size: 9px;
          font-weight: 1000;
          transform: rotate(12deg);
        }

        .gold-thief-leg {
          position: absolute;
          top: 48px;
          height: 15px;
          width: 5px;
          border-radius: 9999px;
          background: #111827;
          transform-origin: top center;
          animation: thief-legs 0.45s ease-in-out infinite;
        }

        .gold-thief-leg.leg-left { left: 19px; }
        .gold-thief-leg.leg-right { left: 32px; animation-delay: 0.22s; }

        @keyframes thief-legs {
          0%, 100% { transform: rotate(25deg); }
          50% { transform: rotate(-25deg); }
        }

        @keyframes ember-rise {
          0% {
            transform: translate3d(0, 0, 0) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.95;
          }
          100% {
            transform: translate3d(16px, -110vh, 0) scale(0.35);
            opacity: 0;
          }
        }

        .gold-ember {
          animation-name: ember-rise;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          box-shadow: 0 0 14px rgba(255, 190, 80, 0.65);
        }

        .valentine-theme {
          color: #ffe4ef;
        }

        .valentine-theme .text-white,
        .valentine-theme .text-zinc-100,
        .valentine-theme .text-zinc-200 { color: #ffe4ef !important; }
        .valentine-theme .text-zinc-300,
        .valentine-theme .text-zinc-400,
        .valentine-theme .text-zinc-500 { color: rgba(255, 205, 225, 0.78) !important; }
        .valentine-theme .text-orange-100,
        .valentine-theme .text-orange-200,
        .valentine-theme .text-orange-300,
        .valentine-theme .text-orange-400,
        .valentine-theme .text-orange-500 { color: #f9a8d4 !important; }
        .valentine-theme .bg-orange-500,
        .valentine-theme .hover\:bg-orange-600:hover,
        .valentine-theme .hover\:bg-orange-500:hover { background: linear-gradient(135deg, #db2777, #fb7185) !important; color: #fff1f2 !important; }
        .valentine-theme .bg-orange-400\/10,
        .valentine-theme .bg-orange-500\/10,
        .valentine-theme .bg-orange-500\/15,
        .valentine-theme .bg-orange-500\/20,
        .valentine-theme .bg-orange-500\/25 { background-color: rgba(244, 114, 182, 0.18) !important; }
        .valentine-theme .border-orange-300,
        .valentine-theme .border-orange-400\/30,
        .valentine-theme .border-orange-400\/40,
        .valentine-theme .border-orange-500\/30 { border-color: rgba(249, 168, 212, 0.55) !important; }
        .valentine-theme-bg { background: radial-gradient(circle at 20% 15%, rgba(251,113,133,.24), transparent 25%), radial-gradient(circle at 80% 20%, rgba(244,114,182,.2), transparent 28%), linear-gradient(180deg, #4c0519, #170711); }
        .valentine-heart { color: rgba(255, 182, 213, 0.82); font-size: 22px; animation: valentine-fall linear infinite; text-shadow: 0 0 16px rgba(255, 120, 180, 0.45); }
        @keyframes valentine-fall { 0% { transform: translateY(-12vh) rotate(0deg); opacity: 0; } 10% { opacity: .9; } 100% { transform: translateY(120vh) rotate(360deg); opacity: 0; } }

        .japan-theme {
          background: #030303 !important;
          color: #f9c2cc;
          font-family: Impact, Haettenschweiler, "Arial Narrow Bold", "Trebuchet MS", system-ui, sans-serif;
          letter-spacing: 0.025em;
        }

        .japan-theme .text-white,
        .japan-theme .text-zinc-100,
        .japan-theme .text-zinc-200 {
          color: #f9c2cc !important;
          text-shadow: 0 0 14px rgba(185, 28, 28, 0.22);
        }

        .japan-theme .text-zinc-300,
        .japan-theme .text-zinc-400,
        .japan-theme .text-zinc-500 {
          color: #ef9ca8 !important;
        }

        .japan-theme .bg-zinc-950,
        .japan-theme .bg-zinc-900,
        .japan-theme .bg-zinc-950\/70,
        .japan-theme .bg-zinc-950\/72,
        .japan-theme .bg-zinc-950\/80,
        .japan-theme .bg-zinc-950\/84,
        .japan-theme .bg-zinc-950\/90,
        .japan-theme .bg-zinc-950\/92,
        .japan-theme .bg-zinc-900\/70,
        .japan-theme .bg-zinc-900\/80,
        .japan-theme .bg-zinc-900\/85 {
          background-color: rgba(6, 6, 6, 0.88) !important;
          backdrop-filter: blur(16px);
        }

        .japan-theme .sticky.bg-zinc-950\/90,
        .japan-theme .bg-black,
        .japan-theme .bg-black\/70,
        .japan-theme .bg-black\/78 {
          background-color: rgba(3, 3, 3, 0.94) !important;
        }

        .japan-theme .hover\:bg-zinc-800:hover {
          background-color: rgba(55, 8, 12, 0.96) !important;
        }

        .japan-theme .border-zinc-800,
        .japan-theme .border-zinc-700 {
          border-color: rgba(185, 28, 28, 0.38) !important;
        }

        .japan-theme .text-orange-100,
        .japan-theme .text-orange-200,
        .japan-theme .text-orange-300,
        .japan-theme .text-orange-400,
        .japan-theme .text-orange-500 {
          color: #b91c1c !important;
        }

        .japan-theme .bg-orange-400\/10,
        .japan-theme .bg-orange-400\/15,
        .japan-theme .bg-orange-400\/20,
        .japan-theme .bg-orange-500\/10,
        .japan-theme .bg-orange-500\/15,
        .japan-theme .bg-orange-500\/20,
        .japan-theme .bg-orange-500\/25 {
          background-color: rgba(185, 28, 28, 0.18) !important;
        }

        .japan-theme .bg-orange-500,
        .japan-theme .hover\:bg-orange-600:hover,
        .japan-theme .hover\:bg-orange-500:hover {
          background: linear-gradient(135deg, #7f1d1d, #b91c1c, #ef4444) !important;
          color: #ffe4e6 !important;
        }

        .japan-theme .border-orange-300,
        .japan-theme .border-orange-300\/40,
        .japan-theme .border-orange-400\/30,
        .japan-theme .border-orange-400\/40,
        .japan-theme .border-orange-400\/80,
        .japan-theme .border-orange-500\/30 {
          border-color: rgba(185, 28, 28, 0.7) !important;
        }

        .japan-theme input,
        .japan-theme textarea,
        .japan-theme select {
          background-color: rgba(18, 5, 7, 0.96) !important;
          border-color: rgba(185, 28, 28, 0.46) !important;
          color: #f9c2cc !important;
        }

        .japan-theme input::placeholder,
        .japan-theme textarea::placeholder {
          color: rgba(249, 194, 204, 0.58) !important;
        }

        .japan-theme .shadow-orange-500\/20,
        .japan-theme .shadow-orange-950\/20,
        .japan-theme .shadow-orange-950\/30,
        .japan-theme .shadow-orange-950\/40,
        .japan-theme .shadow-orange-950\/50 {
          box-shadow: 0 20px 55px rgba(185, 28, 28, 0.22) !important;
        }

        .japan-theme h1,
        .japan-theme h2,
        .japan-theme h3,
        .japan-theme .font-black {
          letter-spacing: 0.045em;
        }

        .japan-theme-bg {
          background: #000000;
        }

        .japan-red-sun,
        .japan-wave-lines,
        .japan-vertical-text,
        .japan-fuji,
        .japan-pagoda,
        .japan-cherry-branch,
        .japan-blossom {
          display: none !important;
        }

        .japan-leaf {
          width: 12px;
          height: 8px;
          border-radius: 60% 40% 60% 40%;
          background: linear-gradient(135deg, #b91c1c, #ef4444);
          animation: japan-leaf-fall linear infinite;
          box-shadow: 0 0 10px rgba(185, 28, 28, 0.42);
        }

        @keyframes japan-leaf-fall {
          0% { transform: translate3d(0, -20px, 0) rotate(0deg); opacity: 0; }
          8% { opacity: 1; }
          100% { transform: translate3d(180px, 100vh, 0) rotate(520deg); opacity: 0.9; }
        }

        .japan-supra-run {
          position: absolute;
          left: 0;
          top: 0;
          transition: transform 0.08s linear, opacity 0.18s ease-out;
        }

        .japan-supra-burnout .japan-supra-wheel {
          animation: japan-wheel-spin 0.18s linear infinite;
        }

        .japan-supra-jumping {
          transition: transform 0.2s ease-out, opacity 0.18s ease-out;
        }

        .japan-smoke-pack {
          position: absolute;
          left: -24px;
          top: 8px;
          z-index: -1;
        }

        .japan-smoke {
          position: absolute;
          display: block;
          height: 22px;
          width: 22px;
          border-radius: 9999px;
          background: rgba(180, 180, 180, 0.86);
          filter: blur(2.5px);
          animation: japan-smoke-puff 0.9s ease-out infinite;
        }

        .japan-smoke.smoke-one { left: 0; top: 4px; animation-delay: 0s; }
        .japan-smoke.smoke-two { left: -14px; top: 13px; height: 28px; width: 28px; animation-delay: 0.15s; }
        .japan-smoke.smoke-three { left: -30px; top: 1px; height: 18px; width: 18px; animation-delay: 0.32s; }
        .japan-smoke.smoke-four { left: -42px; top: 18px; height: 34px; width: 34px; animation-delay: 0.48s; }

        @keyframes japan-smoke-puff {
          0% { transform: translate3d(0, 0, 0) scale(0.4); opacity: 0; }
          18% { opacity: 0.92; }
          100% { transform: translate3d(-48px, -12px, 0) scale(1.9); opacity: 0; }
        }

        @keyframes japan-wheel-spin {
          to { transform: rotate(360deg); }
        }

        .japan-supra-hanger {
          transform: scaleX(0.405) scaleY(0.27);
          transform-origin: top center;
        }

        .japan-supra {
          position: relative;
          width: 210px;
          height: 38px;
          border-radius: 22px 58px 10px 12px;
          background: linear-gradient(180deg, #ffb15f 0%, #ff7a18 34%, #f97316 56%, #b63a0a 100%);
          box-shadow: 0 10px 18px rgba(249, 115, 22, 0.28), inset 0 -5px 10px rgba(0, 0, 0, 0.24);
        }

        .japan-supra-roof {
          position: absolute;
          left: 64px;
          top: -20px;
          width: 88px;
          height: 28px;
          border-radius: 32px 40px 7px 7px;
          background: linear-gradient(180deg, #ffbd74 0%, #f97316 100%);
          clip-path: polygon(10% 100%, 30% 8%, 82% 12%, 100% 100%);
        }

        .japan-supra-window {
          position: absolute;
          top: -15px;
          height: 17px;
          background: linear-gradient(180deg, #e0f2fe, #64748b 78%);
          border: 2px solid rgba(255, 255, 255, 0.38);
          transform: skewX(-17deg);
        }

        .japan-supra-window.front { left: 106px; width: 34px; border-radius: 5px 12px 4px 3px; }
        .japan-supra-window.rear { left: 72px; width: 29px; border-radius: 13px 5px 3px 3px; }

        .japan-supra::before {
          content: "";
          position: absolute;
          right: 10px;
          top: 8px;
          height: 10px;
          width: 46px;
          border-radius: 999px;
          background: rgba(255, 247, 237, 0.25);
          transform: skewX(-20deg);
        }

        .japan-supra-door-line {
          position: absolute;
          left: 94px;
          top: 7px;
          height: 26px;
          width: 2px;
          background: rgba(124, 45, 18, 0.55);
          transform: skewX(-10deg);
        }

        .japan-supra-graphic {
          position: absolute;
          left: 66px;
          top: 14px;
          width: 88px;
          height: 10px;
          border-top: 3px solid rgba(248, 250, 252, 0.75);
          border-bottom: 2px solid rgba(30, 41, 59, 0.7);
          transform: skewX(-18deg);
        }

        .japan-supra-green-splash {
          display: none;
        }

        .japan-supra-light {
          position: absolute;
          top: 16px;
          width: 11px;
          height: 6px;
          border-radius: 4px;
        }

        .japan-supra-light.front {
          right: 6px;
          background: #fff7ed;
          box-shadow: 0 0 10px rgba(255, 247, 237, 0.76);
        }

        .japan-supra-light.rear {
          left: 8px;
          background: #7f1d1d;
          box-shadow: 0 0 10px rgba(127, 29, 29, 0.58);
        }

        .japan-supra-wheel {
          position: absolute;
          bottom: -10px;
          width: 30px;
          height: 30px;
          border-radius: 999px;
          background: #111827;
          border: 4px solid #e5e7eb;
          box-shadow: inset 0 0 0 4px #4b5563;
        }

        .japan-supra-wheel::after {
          content: "";
          position: absolute;
          inset: 5px;
          border-radius: 999px;
          background: conic-gradient(from 0deg, #f8fafc 0 12%, #6b7280 12% 20%, #f8fafc 20% 32%, #6b7280 32% 40%, #f8fafc 40% 52%, #6b7280 52% 60%, #f8fafc 60% 72%, #6b7280 72% 80%, #f8fafc 80% 92%, #6b7280 92% 100%);
        }

        .japan-supra-wheel.wheel-front { right: 24px; }
        .japan-supra-wheel.wheel-rear { left: 28px; }

        .japan-supra-wing {
          position: absolute;
          left: -10px;
          top: -29px;
          width: 66px;
          height: 9px;
          border-radius: 3px;
          background: #111827;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.45);
          transform: skewX(-14deg);
        }

        .japan-supra-wing::before,
        .japan-supra-wing::after {
          content: "";
          position: absolute;
          bottom: -18px;
          width: 5px;
          height: 19px;
          background: #e5e7eb;
        }

        .japan-supra-wing::before { left: 12px; }
        .japan-supra-wing::after { right: 12px; }

        .japan-supra-skirt {
          position: absolute;
          left: 22px;
          right: 12px;
          bottom: 3px;
          height: 5px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.3);
        }

        @keyframes japan-supra-drive {
          0% { transform: translateX(-180px); opacity: 0; }
          5% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 220px)); opacity: 0; }
        }

        .cyber-gameboy-clock {
          position: relative;
          display: inline-block;
          height: 58px;
          width: 82px;
          border-radius: 12px 12px 18px 12px;
          border: 3px solid rgba(16, 185, 129, 0.85);
          background: linear-gradient(180deg, #064e3b, #022c22 64%, #020617);
          box-shadow: 0 0 18px rgba(52, 211, 153, 0.32), inset 0 0 0 2px rgba(209, 250, 229, 0.08);
          animation: cyber-gameboy-glow 1.8s ease-in-out infinite;
        }

        .cyber-gameboy-screen {
          position: absolute;
          left: 10px;
          top: 8px;
          height: 28px;
          width: 50px;
          border-radius: 6px;
          border: 2px solid rgba(6, 78, 59, 0.9);
          background: linear-gradient(180deg, #bbf7d0, #4ade80);
          box-shadow: inset 0 0 8px rgba(2, 44, 34, 0.45), 0 0 10px rgba(74, 222, 128, 0.45);
          overflow: hidden;
        }

        .cyber-gameboy-screen::after {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, rgba(2, 44, 34, 0.18) 0 1px, transparent 1px 4px);
          opacity: 0.55;
        }

        .cyber-gameboy-label {
          position: absolute;
          left: 4px;
          top: 2px;
          z-index: 1;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 5px;
          font-weight: 1000;
          letter-spacing: 0.08em;
          color: #064e3b;
        }

        .cyber-gameboy-time {
          position: absolute;
          left: 4px;
          top: 11px;
          z-index: 1;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 11px;
          font-weight: 1000;
          letter-spacing: -0.04em;
          color: #022c22;
        }

        .cyber-gameboy-speaker {
          position: absolute;
          right: 9px;
          top: 10px;
          height: 24px;
          width: 10px;
          background: repeating-linear-gradient(90deg, rgba(209, 250, 229, 0.34) 0 2px, transparent 2px 4px);
          border-radius: 999px;
          transform: rotate(-12deg);
        }

        .cyber-gameboy-dpad {
          position: absolute;
          left: 12px;
          bottom: 9px;
          height: 14px;
          width: 14px;
        }

        .cyber-gameboy-dpad span:first-child,
        .cyber-gameboy-dpad span:last-child {
          position: absolute;
          border-radius: 3px;
          background: #020617;
          box-shadow: 0 0 6px rgba(52, 211, 153, 0.35);
        }

        .cyber-gameboy-dpad span:first-child {
          left: 5px;
          top: 0;
          height: 14px;
          width: 4px;
        }

        .cyber-gameboy-dpad span:last-child {
          left: 0;
          top: 5px;
          height: 4px;
          width: 14px;
        }

        .cyber-gameboy-buttons {
          position: absolute;
          right: 10px;
          bottom: 11px;
          display: flex;
          gap: 5px;
          transform: rotate(-18deg);
        }

        .cyber-gameboy-buttons span {
          height: 8px;
          width: 8px;
          border-radius: 999px;
          background: #34d399;
          box-shadow: 0 0 8px rgba(52, 211, 153, 0.75);
        }

        @keyframes cyber-gameboy-glow {
          0%, 100% { transform: translateY(0); filter: brightness(1); }
          50% { transform: translateY(-1px); filter: brightness(1.14); }
        }

        .cyber-theme { color: #d1fae5; }
        .cyber-theme .text-white,
        .cyber-theme .text-zinc-100,
        .cyber-theme .text-zinc-200 { color: #d1fae5 !important; }
        .cyber-theme .text-zinc-300,
        .cyber-theme .text-zinc-400,
        .cyber-theme .text-zinc-500 { color: rgba(167, 243, 208, 0.75) !important; }
        .cyber-theme .text-orange-100,
        .cyber-theme .text-orange-200,
        .cyber-theme .text-orange-300,
        .cyber-theme .text-orange-400,
        .cyber-theme .text-orange-500 { color: #6ee7b7 !important; }
        .cyber-theme .bg-orange-500,
        .cyber-theme .hover\:bg-orange-600:hover,
        .cyber-theme .hover\:bg-orange-500:hover { background: linear-gradient(135deg, #059669, #34d399) !important; color: #022c22 !important; }
        .cyber-theme-bg { background: radial-gradient(circle at 50% 20%, rgba(16,185,129,.18), transparent 30%), linear-gradient(180deg, #011b13, #020617); }
        .cyber-grid { background-image: linear-gradient(rgba(52,211,153,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,.1) 1px, transparent 1px); background-size: 46px 46px; }
        .cyber-code { animation: cyber-rain linear infinite; text-shadow: 0 0 12px rgba(52,211,153,.55); }
        @keyframes cyber-rain { 0% { transform: translateY(-20vh); opacity: 0; } 10% { opacity: .9; } 100% { transform: translateY(130vh); opacity: 0; } }

        .arctic-theme { color: #eff6ff; }
        .arctic-theme .text-white,
        .arctic-theme .text-zinc-100,
        .arctic-theme .text-zinc-200 { color: #eff6ff !important; }
        .arctic-theme .text-zinc-300,
        .arctic-theme .text-zinc-400,
        .arctic-theme .text-zinc-500 { color: rgba(219, 234, 254, 0.76) !important; }
        .arctic-theme .text-orange-100,
        .arctic-theme .text-orange-200,
        .arctic-theme .text-orange-300,
        .arctic-theme .text-orange-400,
        .arctic-theme .text-orange-500 { color: #bae6fd !important; }
        .arctic-theme .bg-orange-500,
        .arctic-theme .hover\:bg-orange-600:hover,
        .arctic-theme .hover\:bg-orange-500:hover { background: linear-gradient(135deg, #0ea5e9, #e0f2fe) !important; color: #082f49 !important; }
        .arctic-theme-bg { background: radial-gradient(circle at 20% 18%, rgba(186,230,253,.28), transparent 25%), linear-gradient(180deg, #082f49, #020617); }
        .arctic-snow { animation: arctic-snow linear infinite; filter: drop-shadow(0 0 8px rgba(255,255,255,.55)); }
        @keyframes arctic-snow { 0% { transform: translateY(-12vh); opacity: 0; } 12% { opacity: .9; } 100% { transform: translateY(120vh) translateX(22px); opacity: 0; } }

        .volcano-theme { color: #fee2e2; }
        .volcano-theme .text-white,
        .volcano-theme .text-zinc-100,
        .volcano-theme .text-zinc-200 { color: #fee2e2 !important; }
        .volcano-theme .text-zinc-300,
        .volcano-theme .text-zinc-400,
        .volcano-theme .text-zinc-500 { color: rgba(254, 202, 202, 0.78) !important; }
        .volcano-theme .text-orange-100,
        .volcano-theme .text-orange-200,
        .volcano-theme .text-orange-300,
        .volcano-theme .text-orange-400,
        .volcano-theme .text-orange-500 { color: #fb7185 !important; }
        .volcano-theme .bg-orange-500,
        .volcano-theme .hover\:bg-orange-600:hover,
        .volcano-theme .hover\:bg-orange-500:hover { background: linear-gradient(135deg, #dc2626, #fb923c) !important; color: #fff7ed !important; }
        .volcano-theme-bg { background: radial-gradient(circle at 50% 80%, rgba(239,68,68,.32), transparent 34%), linear-gradient(180deg, #2b0505, #09090b); }
        .volcano-mountain { clip-path: polygon(50% 0, 100% 100%, 0 100%); background: linear-gradient(180deg, #7f1d1d, #111827); }
        .volcano-spark { animation: volcano-spark linear infinite; box-shadow: 0 0 14px rgba(251, 146, 60, .75); }
        @keyframes volcano-spark { 0% { transform: translateY(0) scale(0.7); opacity: 0; } 12% { opacity: 1; } 100% { transform: translateY(-92vh) translateX(28px) scale(0.25); opacity: 0; } }

        .volcano-eruption-core {
          height: 70px;
          width: 70px;
          margin-left: -35px;
          margin-top: -35px;
          border-radius: 9999px;
          background: radial-gradient(circle, #fff7ed 0%, #fb923c 32%, #dc2626 62%, transparent 72%);
          box-shadow: 0 0 0 rgba(251, 146, 60, 0);
          animation: volcano-centre-eruption 60s ease-out infinite;
        }

        .volcano-eruption-shockwave {
          height: 42px;
          width: 42px;
          margin-left: -21px;
          margin-top: -21px;
          border-radius: 9999px;
          border: 2px solid rgba(251, 146, 60, 0.9);
          animation: volcano-shockwave 60s ease-out infinite;
        }

        .volcano-eruption-particle {
          background: radial-gradient(circle, #fff7ed 0%, #fb923c 38%, #dc2626 78%);
          box-shadow: 0 0 26px rgba(251, 146, 60, 0.95), 0 0 54px rgba(220, 38, 38, 0.58);
          opacity: 0;
          animation: volcano-eruption-particle 60s cubic-bezier(.12,.78,.18,1) infinite;
          animation-delay: var(--eruption-delay);
        }

        @keyframes volcano-centre-eruption {
          0% { transform: scale(1); opacity: 1; box-shadow: 0 0 60px rgba(251, 146, 60, 0.95), 0 0 140px rgba(220, 38, 38, 0.52); }
          3% { transform: scale(3.6); opacity: 0.58; box-shadow: 0 0 140px rgba(251, 146, 60, 0.85), 0 0 260px rgba(220, 38, 38, 0.55); }
          5%, 92%, 100% { transform: scale(0.1); opacity: 0; box-shadow: 0 0 0 rgba(251, 146, 60, 0); }
          93% { transform: scale(1); opacity: 1; box-shadow: 0 0 60px rgba(251, 146, 60, 0.95), 0 0 140px rgba(220, 38, 38, 0.52); }
          96% { transform: scale(3.6); opacity: 0.58; box-shadow: 0 0 140px rgba(251, 146, 60, 0.85), 0 0 260px rgba(220, 38, 38, 0.55); }
          98% { transform: scale(0.15); opacity: 0; }
        }

        @keyframes volcano-shockwave {
          0% { transform: scale(1); opacity: 0.9; }
          4% { transform: scale(38); opacity: 0; }
          5%, 92%, 100% { transform: scale(0.2); opacity: 0; }
          93% { transform: scale(1); opacity: 0.9; }
          97% { transform: scale(38); opacity: 0; }
        }

        @keyframes volcano-eruption-particle {
          0% { transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(1); opacity: 1; }
          4% { transform: translate(-50%, -50%) translate3d(var(--eruption-x), var(--eruption-y), 0) scale(0.95); opacity: 0.95; }
          6%, 92%, 100% { transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(0.4); opacity: 0; }
          93% { transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(1); opacity: 1; }
          97% { transform: translate(-50%, -50%) translate3d(var(--eruption-x), var(--eruption-y), 0) scale(0.95); opacity: 0.95; }
          99% { transform: translate(-50%, -50%) translate3d(calc(var(--eruption-x) * 1.32), calc(var(--eruption-y) * 1.32), 0) scale(0.15); opacity: 0; }
        }

        .god-theme {
          background: #f8f3e8 !important;
          color: #6b4f34;
        }

        .god-theme .bg-zinc-950,
        .god-theme .bg-zinc-900,
        .god-theme .bg-zinc-950\/70,
        .god-theme .bg-zinc-950\/80,
        .god-theme .bg-zinc-900\/80,
        .god-theme .bg-zinc-900\/85,
        .god-theme .bg-black,
        .god-theme .bg-black\/70,
        .god-theme .bg-black\/78 {
          background-color: rgba(249, 244, 232, 0.9) !important;
          backdrop-filter: blur(14px);
        }

        .god-theme .text-white,
        .god-theme .text-zinc-100,
        .god-theme .text-zinc-200 {
          color: #6b4f34 !important;
        }

        .god-theme .text-zinc-300,
        .god-theme .text-zinc-400,
        .god-theme .text-zinc-500 {
          color: rgba(107, 79, 52, 0.74) !important;
        }

        .god-theme .text-orange-100,
        .god-theme .text-orange-200,
        .god-theme .text-orange-300,
        .god-theme .text-orange-400,
        .god-theme .text-orange-500 {
          color: #8bb7d8 !important;
        }

        .god-theme .bg-orange-500,
        .god-theme .hover\:bg-orange-600:hover,
        .god-theme .hover\:bg-orange-500:hover {
          background: linear-gradient(135deg, #d9ccb8, #8bb7d8) !important;
          color: #4e3823 !important;
        }

        .god-theme .bg-orange-400\/10,
        .god-theme .bg-orange-500\/10,
        .god-theme .bg-orange-500\/15,
        .god-theme .bg-orange-500\/20,
        .god-theme .bg-orange-500\/25 {
          background-color: rgba(139, 183, 216, 0.16) !important;
        }

        .god-theme .border-orange-300,
        .god-theme .border-orange-300\/40,
        .god-theme .border-orange-400\/30,
        .god-theme .border-orange-400\/40,
        .god-theme .border-orange-400\/80,
        .god-theme .border-orange-500\/30,
        .god-theme .border-zinc-700,
        .god-theme .border-zinc-800 {
          border-color: rgba(107, 79, 52, 0.22) !important;
        }

        .god-theme input,
        .god-theme textarea,
        .god-theme select {
          background-color: rgba(255, 251, 243, 0.95) !important;
          color: #6b4f34 !important;
          border-color: rgba(107, 79, 52, 0.2) !important;
        }

        .god-theme input::placeholder,
        .god-theme textarea::placeholder {
          color: rgba(107, 79, 52, 0.48) !important;
        }

        .god-theme .shadow-orange-500\/20,
        .god-theme .shadow-orange-950\/20,
        .god-theme .shadow-orange-950\/30,
        .god-theme .shadow-orange-950\/40,
        .god-theme .shadow-orange-950\/50 {
          box-shadow: 0 18px 44px rgba(107, 79, 52, 0.12) !important;
        }

        .god-theme-bg {
          background:
            radial-gradient(circle at 50% 16%, rgba(255, 252, 244, 0.85), transparent 16%),
            radial-gradient(circle at 50% 28%, rgba(139, 183, 216, 0.18), transparent 34%),
            linear-gradient(180deg, #fffdf8 0%, #f8f3e8 52%, #efe5d3 100%);
        }

        .god-sun-wrap {
          position: relative;
          width: 150px;
          height: 150px;
          animation: god-sun-spin 26s linear infinite;
        }

        .god-sun-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 82px;
          height: 82px;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background: radial-gradient(circle, #fffdf8 0%, #f3ead8 48%, #d9ccb8 100%);
          box-shadow: 0 0 40px rgba(255, 252, 244, 0.9), 0 0 90px rgba(217, 204, 184, 0.65);
        }

        .god-rotating-ray {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 8px;
          height: 72px;
          margin-left: -4px;
          margin-top: -72px;
          transform-origin: center 72px;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(217,204,184,0.15));
          animation: god-ray-float 5.2s ease-in-out infinite;
        }

        .god-rotating-ray:nth-child(odd) {
          height: 82px;
          margin-top: -82px;
          transform-origin: center 82px;
          background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(139,183,216,0.12));
        }

        @keyframes god-ray-float {
          0%, 100% { opacity: 0.45; filter: blur(0px); }
          50% { opacity: 0.9; filter: blur(0.5px); }
        }

        @keyframes god-sun-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .god-dove {
          position: absolute;
          left: -16%;
          width: 54px;
          height: 28px;
          animation: god-dove-fly linear infinite;
          opacity: 0;
        }

        .god-dove-body {
          position: absolute;
          left: 20px;
          top: 10px;
          width: 18px;
          height: 10px;
          border-radius: 999px;
          background: #fffdf8;
          box-shadow: 0 0 10px rgba(255,255,255,0.45);
        }

        .god-dove-wing {
          position: absolute;
          top: 4px;
          width: 22px;
          height: 12px;
          border-radius: 100% 100% 20% 20%;
          background: linear-gradient(180deg, #ffffff, #dbeafe);
          animation: god-wing-flap 1s ease-in-out infinite;
        }

        .god-dove-wing.left {
          left: 4px;
          transform-origin: right center;
        }

        .god-dove-wing.right {
          right: 4px;
          transform-origin: left center;
        }

        @keyframes god-wing-flap {
          0%, 100% { transform: rotate(10deg) translateY(0); }
          50% { transform: rotate(-18deg) translateY(-4px); }
        }

        @keyframes god-dove-fly {
          0% { transform: translateX(0) translateY(0) scale(0.88); opacity: 0; }
          6% { opacity: 0.95; }
          50% { transform: translateX(60vw) translateY(-18px) scale(1); opacity: 0.95; }
          94% { opacity: 0.95; }
          100% { transform: translateX(124vw) translateY(8px) scale(0.92); opacity: 0; }
        }

        .cherry-clean-sky {
          background:
            linear-gradient(
              180deg,
              rgba(120, 210, 255, 0.78) 0%,
              rgba(165, 225, 255, 0.58) 34%,
              rgba(255, 223, 238, 0.26) 68%,
              rgba(23, 16, 29, 0.84) 100%
            );
        }

        .cherry-clean-overlay {
          background:
            radial-gradient(circle at 18% 18%, rgba(255, 210, 235, 0.28), transparent 24%),
            radial-gradient(circle at 82% 10%, rgba(255, 255, 255, 0.18), transparent 18%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(18, 12, 24, 0.42));
        }

        .cherry-bush-blob {
          background: radial-gradient(circle at 35% 30%, rgba(255,245,250,0.95) 0%, rgba(255,193,224,0.88) 34%, rgba(244,143,191,0.72) 62%, rgba(215,104,164,0.42) 100%);
        }

        .cherry-blossom-dot {
          background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95) 0%, rgba(255,221,236,0.92) 38%, rgba(255,177,211,0.9) 72%, rgba(255,140,188,0.72) 100%);
          box-shadow: 0 0 12px rgba(255, 190, 220, 0.4);
        }

        .cherry-ground-fade {
          background: linear-gradient(180deg, rgba(150,215,255,0.10), rgba(255,206,228,0.10) 44%, rgba(10,10,18,0.40) 100%);
        }

        .cherry-soft-cloud {
          animation-name: cloud-drift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-duration: 24s;
        }

        .cherry-theme .text-zinc-400 {
          color: rgba(255, 238, 246, 0.84) !important;
        }

        .cherry-theme .text-zinc-500 {
          color: rgba(255, 220, 234, 0.68) !important;
        }

        .cherry-theme .text-orange-200,
        .cherry-theme .text-orange-300,
        .cherry-theme .text-orange-400 {
          color: #ffd3e7 !important;
        }

        .cherry-theme .bg-zinc-900 {
          background-color: rgba(17, 17, 24, 0.78) !important;
          backdrop-filter: blur(14px);
        }

        .cherry-theme .bg-zinc-950 {
          background-color: rgba(10, 10, 16, 0.84) !important;
          backdrop-filter: blur(14px);
        }

        .cherry-theme .border-zinc-800 {
          border-color: rgba(255, 208, 229, 0.14) !important;
        }

        .cherry-theme .bg-orange-500,
        .cherry-theme .hover\\:bg-orange-600:hover,
        .cherry-theme .hover\\:bg-orange-500:hover {
          background: linear-gradient(135deg, #ff5fa7, #ff8cc4) !important;
        }

        .cherry-theme .border-orange-400\\/40,
        .cherry-theme .border-orange-500\\/30,
        .cherry-theme .border-orange-300,
        .cherry-theme .border-orange-400\\/80 {
          border-color: rgba(255, 180, 214, 0.54) !important;
        }

        .cherry-theme .shadow-orange-500\\/20,
        .cherry-theme .shadow-orange-950\\/40 {
          box-shadow: 0 0 24px rgba(255, 125, 180, 0.16) !important;
        }

        @keyframes cloud-drift {
          0% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(22px);
          }
          100% {
            transform: translateX(0px);
          }
        }

        @keyframes petal-fall {
          0% {
            transform: translate3d(-12vw, -14vh, 0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.92;
          }
          42% {
            transform: translate3d(18vw, 32vh, 0) rotate(180deg) scale(1.02);
            opacity: 0.82;
          }
          76% {
            transform: translate3d(40vw, 74vh, 0) rotate(340deg) scale(0.96);
            opacity: 0.56;
          }
          100% {
            transform: translate3d(62vw, 116vh, 0) rotate(520deg) scale(0.92);
            opacity: 0;
          }
        }

        .cherry-petal {
          border-radius: 60% 40% 70% 30% / 45% 55% 45% 55%;
          background: linear-gradient(
            180deg,
            rgba(255, 247, 251, 0.98),
            rgba(255, 185, 220, 0.92)
          );
          box-shadow: 0 0 10px rgba(255, 205, 226, 0.28);
          animation-name: petal-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }


        .taskbar-solid {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          filter: none !important;
          transform: translateZ(0);
          isolation: isolate;
        }

        .taskbar-solid * {
          filter: none !important;
          text-shadow: none;
        }

      `}</style>

      <div className="relative z-10">
      <div className="taskbar-solid sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950 px-4 py-3 shadow-lg">
        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
          <button onClick={() => setView("home")} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${view === "home" ? activeTheme.button + " text-white" : "border border-zinc-800 bg-zinc-900 text-zinc-300"}`}><Home className="h-4 w-4" /> Home</button>
          <button onClick={() => setSubjectsOpen((prev) => !prev)} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${subjectsOpen ? activeTheme.button + " text-white" : "border border-zinc-800 bg-zinc-900 text-zinc-300"}`}>
            Subjects: <span className="text-white">{selectedSubject.title}</span> <ChevronDown className={`h-4 w-4 transition ${subjectsOpen ? "rotate-180" : ""}`} />
          </button>
          <button onClick={() => setView("general")} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${view === "general" ? activeTheme.button + " text-white" : "border border-zinc-800 bg-zinc-900 text-zinc-300"}`}><LibraryBig className="h-4 w-4" /> General</button>
          <button onClick={goToStages} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${view === "stages" || view === "topic" ? activeTheme.button + " text-white" : "border border-zinc-800 bg-zinc-900 text-zinc-300"}`}><Hammer className="h-4 w-4" /> Stages</button>
          <button onClick={startDailyTest} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${view === "daily" ? activeTheme.button + " text-white" : "border border-zinc-800 bg-zinc-900 text-zinc-300"}`}><Shuffle className="h-4 w-4" /> Daily</button>
          <button onClick={() => setView("themes")} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${view === "themes" ? activeTheme.button + " text-white" : "border border-zinc-800 bg-zinc-900 text-zinc-300"}`}><Palette className="h-4 w-4" /> Themes</button>
          <button onClick={() => setView("settings")} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${view === "settings" ? activeTheme.button + " text-white" : "border border-zinc-800 bg-zinc-900 text-zinc-300"}`}><Settings className="h-4 w-4" /> Settings</button>
          <select
            value={selectedSection}
            onChange={(event) => setSelectedSection(event.target.value)}
            className="inline-flex shrink-0 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-black text-zinc-200 outline-none focus:border-orange-400"
          >
            {subjectSections.map((section) => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
          {subjectSuperTestReady && (
            <button onClick={openSuperTest} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-black ${view === "superTest" ? activeTheme.button + " text-white" : "border border-orange-400/40 bg-orange-500/15 text-orange-200 hover:bg-orange-500/25"}`}>
              <Trophy className="h-4 w-4" /> Super Test
            </button>
          )}
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => {
                setUsernameInput(username || "");
                setShowSavePrompt(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-bold text-zinc-400 hover:bg-zinc-800"
            >
              {saveEnabled ? `${username || "Student"}'s Forge` : "Not saving"}
            </button>
            <button
              onClick={() => {
                if (view === "settings") {
                  setThemeUnlockCodeOpen(true);
                  setThemeUnlockCode("");
                  setThemeUnlockError("");
                }
              }}
              className="rounded-full border border-zinc-800 bg-zinc-950/60 px-2 py-1 text-[8px] font-black uppercase tracking-[0.06em] text-zinc-500 hover:border-orange-400/40 hover:text-orange-200"
              title={view === "settings" ? "Open creator code" : "Creator mark"}
            >
              made by tbam
            </button>
          </div>
          </div>

          {subjectsOpen && (
            <div className="absolute left-20 top-14 z-50 w-72 rounded-3xl border border-orange-400/30 bg-zinc-950 p-3 shadow-2xl shadow-black/60">
              <div className="mb-2 px-3 py-2">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-300">Choose Subject</p>
                <p className="mt-1 text-sm text-zinc-500">Dashboard content changes to the selected subject.</p>
              </div>
              {visibleSubjects.map((subject) => {
                const Icon = subject.icon;
                const subjectUnlocked = subject.topics.filter((topic) => unlocked[topic.id]).length;
                const isSelected = selectedSubject.id === subject.id;
                return (
                  <button key={subject.id} onClick={() => switchSubject(subject)} className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${isSelected ? activeTheme.soft + " " + activeTheme.accent : "text-zinc-300 hover:bg-zinc-900"}`}>
                    <div className={`rounded-xl p-2 ${isSelected ? activeTheme.soft : "bg-zinc-900"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-black text-white">{subject.title}</p>
                      <p className="text-xs text-zinc-500">{subjectUnlocked}/{subject.topics.length} stages unlocked</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <section className="grid gap-5 md:grid-cols-[1.3fr_0.7fr] md:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-200">
              {view === "stages" ? (
              <span className="inline-flex items-center gap-3">
                {activeThemeId === "cyber" ? (
                  <span className="cyber-gameboy-clock">
                    <span className="cyber-gameboy-speaker" />
                    <span className="cyber-gameboy-screen">
                      <span className="cyber-gameboy-label">REVISION OS</span>
                      <span className="cyber-gameboy-time">{formattedRevisionTime}</span>
                    </span>
                    <span className="cyber-gameboy-dpad">
                      <span />
                      <span />
                    </span>
                    <span className="cyber-gameboy-buttons">
                      <span />
                      <span />
                    </span>
                  </span>
                ) : (
                  <span className="mini-alarm-clock">
                    <span className="mini-alarm-bell left" />
                    <span className="mini-alarm-bell right" />
                    <span className="mini-alarm-face">
                      <span className="mini-alarm-hand hour" />
                      <span className="mini-alarm-hand minute" />
                    </span>
                  </span>
                )}
                <span className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-orange-200/80">Revision clock</span>
                  <span className="text-base font-black text-white">{formattedRevisionTime}</span>
                </span>
              </span>
            ) : (
              <><Flame className="h-4 w-4" /> 100% to move on</>
            )}
            </div>
            <h1 className="text-4xl font-black tracking-tight md:text-7xl">
              Iron Forge <span className="text-orange-400">Method</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg md:leading-8">
              Pick a subject, open a stage, test yourself, and unlock the next stage only when you score full marks.
              {view === "stages" && ` You are revising now — break alarm triggers every ${workMinutes} minutes for a ${breakMinutes} minute break.`}
            </p>
          </div>

          <div className={`rounded-3xl border border-zinc-800 ${activeTheme.panel} p-5 shadow-2xl shadow-orange-950/20`}> 
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-orange-300">Progress</p>
                <h2 className="mt-2 text-2xl font-black text-white">{unlockedCount}/{allTopics.length}</h2>
                <p className="mt-2 text-sm text-zinc-400">Total stages unlocked.</p>
              </div>
              <ProgressRing value={totalProgress} label="Total" />
            </div>
          </div>
        </section>

        {view === "home" && (
          <section className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {(() => {
                const subject = selectedSubject;
                const Icon = subject.icon;
                const subjectUnlocked = subject.topics.filter((topic) => unlocked[topic.id]).length;
                const recall = Math.round((subjectUnlocked / subject.topics.length) * 100);
                return (
                  <button
                    key={subject.id}
                    onClick={goToStages}
                    className={`group min-h-[190px] rounded-3xl border-2 border-orange-300 bg-orange-500/20 p-5 text-left shadow-xl shadow-orange-500/20 transition active:scale-[0.99]`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl border border-orange-300/50 bg-orange-400/25 p-4 text-orange-200 shadow-md shadow-orange-500/20">
                          <Icon className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.28em] text-orange-200">Selected Subject</p>
                  <div
                    className="mt-4 max-w-sm"
                    onClick={(event) => event.stopPropagation()}
                    onMouseDown={(event) => event.stopPropagation()}
                  >
                    <label className="mb-2 block text-xs font-black uppercase tracking-[0.24em] text-pink-100/90">Section</label>
                    <select
                      value={selectedSection}
                      onClick={(event) => event.stopPropagation()}
                      onMouseDown={(event) => event.stopPropagation()}
                      onChange={(event) => {
                        event.stopPropagation();
                        setSelectedSection(event.target.value);
                      }}
                      className="w-full rounded-2xl border border-pink-200/30 bg-zinc-950/70 px-4 py-3 text-sm font-black text-white outline-none backdrop-blur-md focus:border-pink-200"
                    >
                      {subjectSections.map((section) => (
                        <option key={section} value={section}>{section}</option>
                      ))}
                    </select>
                  </div>
                          <h2 className="mt-1 text-2xl font-black text-white">{subject.title}</h2>
                          <p className="mt-1 max-w-xs text-sm leading-6 text-zinc-400">{subject.description}</p>
                          <p className="mt-3 text-sm font-black text-orange-200">{subjectUnlocked}/{subject.topics.length} stages unlocked</p>
                        </div>
                      </div>
                      <ProgressRing value={recall} label="Recall" />
                    </div>
                  </button>
                );
              })()}

              <div className="min-h-[190px] rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Palette className="h-6 w-6 text-orange-400" />
                      <h3 className="text-2xl font-black text-white">Unlocked Themes</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">Themes earned by forging stages with 100%.</p>
                  </div>
                  <button onClick={() => setView("themes")} className="rounded-2xl border border-orange-400/40 px-4 py-2 text-sm font-black text-orange-200 hover:bg-orange-400/10">View -</button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {themes.filter((theme) => isThemeUnlocked(theme)).map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setActiveThemeId(theme.id)}
                      className={`rounded-2xl border px-3 py-2 text-sm font-black transition ${activeTheme.id === theme.id ? theme.border + " " + theme.soft + " " + theme.accent : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-800"}`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>

                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Next unlock: {themes.find((theme) => !isThemeUnlocked(theme))?.name || "All themes unlocked"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <button onClick={startDailyTest} className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:bg-zinc-800 active:scale-[0.99]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Shuffle className="h-6 w-6 text-orange-400" />
                      <h3 className="text-2xl font-black text-white">Daily Test</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">Keep your recall sharp with a new mixed test for the selected subject.</p>
                    <div className={`mt-4 inline-flex rounded-2xl px-4 py-2 text-sm font-black text-white ${activeTheme.button}`}>Start Daily Test</div>
                  </div>
                  <div className={`flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full ${activeTheme.soft} ${activeTheme.accent}`}>
                    <Shuffle className="h-8 w-8" />
                    <span className="mt-1 text-xl font-black">8</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Questions</span>
                  </div>
                </div>
              </button>

              <button onClick={() => setView("general")} className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:bg-zinc-800 active:scale-[0.99]">
                <div className="relative z-10">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-orange-400" />
                    <h3 className="text-2xl font-black text-white">General Knowledge Hub</h3>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">Browse notes, key concepts and explanations across the whole subject before you test.</p>
                  <div className="mt-4 inline-flex rounded-2xl border border-orange-400/40 px-4 py-2 text-sm font-black text-orange-200">Explore Notes -</div>
                </div>
                <div className="absolute -right-8 bottom-0 hidden h-36 w-36 rotate-12 rounded-3xl border border-orange-400/20 bg-orange-400/10 md:block" />
              </button>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-white">Year 10 EOYs</h3>
                  <p className="mt-1 text-sm text-zinc-400">Focused learning. One stage at a time.</p>
                </div>
                <button onClick={goToStages} className="rounded-2xl border border-orange-400/40 px-4 py-2 text-sm font-black text-orange-200 hover:bg-orange-400/10">View All Stages -</button>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {selectedSubject.topics.slice(0, 6).map((topic, index) => {
                  const isLocked = !unlocked[topic.id];
                  return (
                    <button key={topic.id} onClick={() => openTopic(topic)} className={`rounded-2xl border p-4 text-left transition active:scale-[0.99] ${isLocked ? "border-zinc-800 bg-zinc-950 opacity-60" : activeTheme.border + " " + activeTheme.soft}`}>
                      <div className="flex items-center justify-between gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${isLocked ? "border-zinc-700 text-zinc-500" : activeTheme.border + " " + activeTheme.accent}`}>{index + 1}</div>
                        {isLocked ? <Lock className="h-4 w-4 text-zinc-500" /> : <ShieldCheck className="h-4 w-4 text-orange-300" />}
                      </div>
                      <p className="mt-3 text-xs font-bold uppercase tracking-widest text-orange-300">{topic.level}</p>
                      <h4 className="mt-1 text-base font-black text-white">{topic.title}</h4>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {view === "general" && (
          <section className="mt-6">
            <GeneralHub selectedSubject={selectedSubject} sections={sectionGeneralContent} />
          </section>
        )}

        {view === "themes" && (
          <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2"><Palette className="h-6 w-6 text-orange-400" /><h2 className="text-3xl font-black text-white">Themes and Achievements</h2></div>
                <p className="mt-2 text-sm text-zinc-400">Every 3 stages forged in a subject unlocks a new theme. Current best subject streak: {maxForgedInAnySubject} stages.</p>
              </div>
              <ProgressRing value={Math.min(100, Math.round((maxForgedInAnySubject / 12) * 100))} label="Themes" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {themes.map((theme) => (
                <AchievementCard key={theme.id} theme={theme} unlocked={isThemeUnlocked(theme)} selected={activeTheme.id === theme.id} onSelect={setActiveThemeId} />
              ))}
            </div>
          </section>
        )}

        {(view === "stages" || view === "topic" || view === "daily") && <section className="mt-6 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className={`${view !== "stages" ? "hidden lg:block" : "block"} space-y-4`}>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">{selectedSubject.title} Recall</h2>
                  <p className="mt-1 text-xs font-bold text-orange-300">{subjectUnlockedCount}/3 towards next theme checkpoint</p>
                  <p className="mt-1 text-sm text-zinc-400">Based on unlocked stages and recent test score.</p>
                </div>
                <ProgressRing value={recallPercentage} label="Recall" />
              </div>
            </div>

            <button onClick={startDailyTest} className="w-full rounded-3xl border border-orange-400/40 bg-orange-400/10 p-5 text-left transition hover:bg-orange-400/15 active:scale-[0.99]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-orange-300">Daily Test</p>
                  <h3 className="mt-1 text-xl font-black text-white">Random {selectedSubject.title} recall</h3>
                  <p className="mt-2 text-sm text-zinc-400">8 mixed questions from this subject.</p>
                </div>
                <Shuffle className="h-6 w-6 text-orange-300" />
              </div>
            </button>

            <h2 className="flex items-center gap-2 text-2xl font-black text-white"><Hammer className="h-6 w-6 text-orange-400" /> {selectedSubject.title} Stages</h2>

            {sectionTopics.map((topic) => {
              const isLocked = !unlocked[topic.id];
              const isSelected = selectedTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => openTopic(topic)}
                  className={`w-full rounded-3xl border p-5 text-left transition active:scale-[0.99] ${
                    isSelected ? "border-orange-400 bg-orange-400/10" : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                  } ${isLocked ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-orange-300">{topic.level}</p>
                      <h3 className="mt-1 text-lg font-black text-white md:text-xl">{topic.title}</h3>
                      <p className="mt-2 text-sm text-zinc-500">{isLocked ? "Locked — forge the stage before it" : "Tap to open test"}</p>
                    </div>
                    {isLocked ? <Lock className="h-5 w-5 text-zinc-500" /> : <ShieldCheck className="h-5 w-5 text-orange-400" />}
                  </div>
                </button>
              );
            })}
          </aside>

          <main className={`${view === "stages" ? "hidden lg:block" : "block"}`}>
            {view === "topic" && (
              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2"><BookOpen className="h-6 w-6 text-orange-400" /><h2 className="text-2xl font-black text-white">Stage</h2></div>
                    <div className="flex rounded-2xl border border-zinc-800 bg-zinc-950 p-1">
                      <button onClick={() => setStageTab("notes")} className={`rounded-xl px-3 py-2 text-sm font-bold ${stageTab === "notes" ? "bg-orange-500 text-white" : "text-zinc-400"}`}>Notes</button>
                      <button onClick={() => setStageTab("test")} className={`rounded-xl px-3 py-2 text-sm font-bold ${stageTab === "test" ? "bg-orange-500 text-white" : "text-zinc-400"}`}>Test</button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-zinc-500">{selectedTopic.title}</p>

                  {stageTab === "notes" ? (
                    <div className="mt-5 space-y-3">
                      {selectedTopic.notes.map((note, index) => (
                        <div key={index} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-300">
                          <span className="mr-2 font-black text-orange-400">{index + 1}.</span>{note}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-300">
                      Test mode opens first on phones. Read the notes only if you get stuck.
                    </div>
                  )}
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 md:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2"><Timer className="h-6 w-6 text-orange-400" /><h2 className="text-2xl font-black text-white">Test</h2></div>
                    <ProgressRing value={submitted ? score : 0} label="Score" />
                  </div>

                  <QuizBlock questions={selectedTopic.questions} answers={answers} setAnswers={setAnswers} submitted={submitted} />

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button onClick={submitQuiz} className={`rounded-2xl px-5 py-3 font-bold text-white active:scale-[0.99] ${activeTheme.button}`}>Strike the Anvil</button>
                    <button onClick={resetQuiz} className="inline-flex items-center rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 font-bold text-zinc-100 hover:bg-zinc-800 active:scale-[0.99]"><RotateCcw className="mr-2 h-4 w-4" /> Retry</button>
                  </div>

                  {submitted && !passed && <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-semibold text-red-200">Not forged yet. You need 100%. Re-read the notes and retry.</div>}
                  {passed && <div className="mt-4 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm font-semibold text-green-200"><div className="flex items-center gap-2"><Trophy className="h-5 w-5" /> Stage forged. Next stage unlocked.</div></div>}
                </div>
              </div>
            )}

            {view === "daily" && (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2"><Shuffle className="h-6 w-6 text-orange-400" /><h2 className="text-2xl font-black text-white">Daily {selectedSubject.title} Test</h2></div>
                    <p className="mt-2 text-sm text-zinc-400">A mixed recall test from across the whole subject.</p>
                  </div>
                  <ProgressRing value={dailySubmitted ? dailyScore : recallPercentage} label={dailySubmitted ? "Score" : "Recall"} />
                </div>

                <QuizBlock questions={dailyQuestions} answers={dailyAnswers} setAnswers={setDailyAnswers} submitted={dailySubmitted} />

                <div className="mt-5 flex flex-wrap gap-3">
                  <button onClick={() => setDailySubmitted(true)} className={`rounded-2xl px-5 py-3 font-bold text-white active:scale-[0.99] ${activeTheme.button}`}>Mark Daily Test</button>
                  <button onClick={startDailyTest} className="inline-flex items-center rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 font-bold text-zinc-100 hover:bg-zinc-800 active:scale-[0.99]"><RotateCcw className="mr-2 h-4 w-4" /> Reset</button>
                </div>

                {dailySubmitted && <div className="mt-4 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4 text-sm font-semibold text-orange-100">Daily recall score: {dailyScore}%. Keep pushing it towards 100%.</div>}
              </div>
            )}
          </main>
        </section>}

        {view === "superTest" && (
          <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-orange-400/30 bg-zinc-900/85 p-6 shadow-2xl shadow-orange-950/30">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.32em] text-orange-300">Final Forge</p>
                  <h2 className="mt-2 text-4xl font-black text-white">{selectedSubject.title} Super Test</h2>
                  <p className="mt-2 max-w-2xl text-zinc-400">
                    This is the written-answer test for the whole subject. Write your answers properly, then submit to compare them with the suggested answers.
                  </p>
                </div>
                <button onClick={() => setView("stages")} className="rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-3 font-bold text-zinc-200 hover:bg-zinc-800">
                  Back to stages
                </button>
              </div>

              <div className="mt-8 space-y-5">
                {superTestQuestions.map((question, index) => (
                  <div key={`super-${index}`} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-300">Question {index + 1}</p>
                      <p className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-bold text-zinc-400">{question.topicTitle}</p>
                    </div>
                    <h3 className="mt-3 text-xl font-black text-white">{question.q}</h3>
                    <textarea
                      value={superTestAnswers[index] || ""}
                      onChange={(event) => setSuperTestAnswers({ ...superTestAnswers, [index]: event.target.value })}
                      disabled={superTestSubmitted}
                      placeholder="Write your answer here..."
                      className="mt-4 min-h-28 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-400 disabled:opacity-70"
                    />
                    {superTestSubmitted && (
                      <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                        <p className="text-xs font-black uppercase tracking-widest text-emerald-300">Suggested answer</p>
                        <p className="mt-1 font-bold text-emerald-100">{question.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
                {!superTestSubmitted ? (
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-white">Ready to submit?</h3>
                      <p className="mt-1 text-sm text-zinc-400">After submitting, you will see the suggested answers and the reset-progress option.</p>
                    </div>
                    <button onClick={() => setSuperTestSubmitted(true)} className="rounded-2xl bg-orange-500 px-6 py-3 font-black text-white hover:bg-orange-600">
                      Submit super test
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-white">Subject completed.</h3>
                      <p className="mt-1 text-sm text-zinc-400">You can now reset this subject and re-forge it from the beginning.</p>
                    </div>
                    <button onClick={resetSelectedSubjectProgress} className="rounded-2xl border border-red-400/40 bg-red-500/15 px-6 py-3 font-black text-red-100 hover:bg-red-500/25">
                      Reset {selectedSubject.title} progress
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {view === "settings" && (
          <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/20">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.32em] text-orange-300">Settings</p>
                  <h2 className="mt-2 text-4xl font-black text-white">Forge Settings</h2>
                  <p className="mt-2 max-w-2xl text-zinc-400">Change your revision timer and progress saving settings.</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Current session</p>
                  <p className="mt-1 text-2xl font-black text-white">{formattedRevisionTime}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
                  <div className="flex items-center gap-3">
                    <Timer className="h-6 w-6 text-orange-300" />
                    <h3 className="text-2xl font-black text-white">Revision timer</h3>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">On the Stages page, the top badge becomes a live revision clock. When it reaches your work time, the break alarm appears.</p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-widest text-orange-300">Work minutes</span>
                      <input type="number" min="1" max="180" value={workMinutes} onChange={(event) => setWorkMinutes(Math.max(1, Number(event.target.value) || 30))} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-400" />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-widest text-orange-300">Break minutes</span>
                      <input type="number" min="1" max="60" value={breakMinutes} onChange={(event) => setBreakMinutes(Math.max(1, Number(event.target.value) || 5))} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-400" />
                    </label>
                  </div>

                  <button onClick={() => { setRevisionSeconds(0); setLastBreakMarker(0); setBreakAlarm(false); unlockThemeAction("revisionClockReset"); }} className="mt-5 rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 font-bold text-zinc-200 hover:bg-zinc-800">
                    Reset revision clock
                  </button>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-orange-300" />
                    <h3 className="text-2xl font-black text-white">Progress saving</h3>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{saveEnabled ? `This device is saving progress as ${username || "Student"}.` : "Progress is not currently being saved on this device."}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button onClick={() => setShowSavePrompt(true)} className="rounded-2xl bg-orange-500 px-5 py-3 font-black text-white hover:bg-orange-600">
                      {saveEnabled ? "Change username" : "Start saving"}
                    </button>
                    <button onClick={() => { setSaveEnabled(false); setUsername(""); localStorage.removeItem(STORAGE_KEY); }} className="rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 font-bold text-zinc-300 hover:bg-zinc-800">
                      Stop saving on this device
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 lg:col-span-2">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <ListChecks className="h-6 w-6 text-orange-300" />
                        <h3 className="text-2xl font-black text-white">Taskbar subject slots</h3>
                      </div>
                      <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                        All subjects now show in the taskbar menu. These old slots are kept here only so previous saved settings do not break the app.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubjectSlots(Array(9).fill(""))}
                      className="rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-bold text-zinc-300 hover:bg-zinc-800"
                    >
                      Clear slots
                    </button>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {subjectSlots.map((slotSubjectId, index) => (
                      <label key={`slot-${index}`} className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                        <span className="text-xs font-black uppercase tracking-widest text-orange-300">Slot {index + 1}</span>
                        <select
                          value={slotSubjectId}
                          onChange={(event) => {
                            const nextSlots = [...subjectSlots];
                            nextSlots[index] = event.target.value;
                            setSubjectSlots(nextSlots);
                            if (event.target.value) setSelectedSubjectId(event.target.value);
                          }}
                          className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-400"
                        >
                          <option value="">Empty</option>
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>{subject.title}</option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      </div>
    </div>
  );
}

