import React, { useEffect, useMemo, useState } from "react";
import { Flame, Hammer, Lock, ShieldCheck, RotateCcw, Trophy, BookOpen, Timer, Dumbbell, Microscope, Shuffle, ArrowLeft, Home, Palette, Medal, LibraryBig, ListChecks, ChevronDown, Check, X, Cpu, Settings } from "lucide-react";

const subjects = [
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

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 ocean-theme-sky" />
      <div className="absolute inset-x-0 bottom-0 h-[46%] ocean-theme-water" />
      <div className="absolute inset-x-0 top-[48%] h-px bg-cyan-100/25" />
      <div className="absolute left-[8%] top-[18%] h-52 w-52 rounded-full bg-cyan-300/12 blur-3xl" />
      <div className="absolute right-[12%] top-[14%] h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />
      <div className="absolute bottom-[14%] left-[-8%] h-32 w-[120%] rounded-[100%] border-t border-cyan-200/18" />
      <div className="absolute bottom-[20%] left-[-12%] h-24 w-[130%] rounded-[100%] border-t border-sky-200/12" />

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

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 royal-theme-bg" />
      <div className="absolute left-[12%] top-[12%] h-72 w-72 rounded-full bg-purple-400/16 blur-3xl" />
      <div className="absolute right-[10%] top-[18%] h-80 w-80 rounded-full bg-fuchsia-400/12 blur-3xl" />
      <div className="absolute bottom-[-12%] left-[30%] h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />
      <div className="absolute left-[4%] top-[18%] h-[70%] w-px bg-gradient-to-b from-transparent via-purple-200/20 to-transparent" />
      <div className="absolute right-[8%] top-[12%] h-[76%] w-px bg-gradient-to-b from-transparent via-fuchsia-200/16 to-transparent" />

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

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 gold-theme-bg" />
      <div className="absolute left-[10%] top-[16%] h-72 w-72 rounded-full bg-amber-400/12 blur-3xl" />
      <div className="absolute right-[12%] top-[12%] h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl" />
      <div className="absolute bottom-[-16%] left-[18%] h-[26rem] w-[64%] rounded-[100%] bg-amber-500/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-[26%] h-px bg-amber-200/18" />
      <div className="absolute inset-x-0 bottom-[24%] h-px bg-yellow-200/10" />

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

function ThemeBackground({ activeThemeId }) {
  if (activeThemeId === "cherry") return <CherryBlossomBackground />;
  if (activeThemeId === "ocean") return <OceanThemeBackground />;
  if (activeThemeId === "royal") return <RoyalThemeBackground />;
  if (activeThemeId === "gold") return <GoldThemeBackground />;
  return null;
}

function AchievementCard({ theme, unlocked, onSelect, selected }) {
  return (
    <button
      onClick={() => unlocked && onSelect(theme.id)}
      className={`rounded-3xl border p-5 text-left transition active:scale-[0.99] ${selected ? theme.border + " " + theme.soft : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"} ${!unlocked ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-sm font-bold uppercase tracking-widest ${unlocked ? theme.accent : "text-zinc-500"}`}>{unlocked ? "Unlocked" : `Unlock at ${theme.unlockAt} stages`}</p>
          <h3 className="mt-1 text-xl font-black text-white">{theme.name}</h3>
          <p className="mt-2 text-sm text-zinc-400">{theme.description}</p>
        </div>
        {unlocked ? <Medal className={`h-6 w-6 ${theme.accent}`} /> : <Lock className="h-6 w-6 text-zinc-500" />}
      </div>
    </button>
  );
}

function GeneralHub({ selectedSubject }) {
  const sections = generalContent[selectedSubject.id] || [];
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
  "dt-cam": true
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
  const [workMinutes, setWorkMinutes] = useState(savedProgress?.workMinutes || 30);
  const [breakMinutes, setBreakMinutes] = useState(savedProgress?.breakMinutes || 5);
  const [revisionSeconds, setRevisionSeconds] = useState(savedProgress?.revisionSeconds || 0);
  const [breakAlarm, setBreakAlarm] = useState(false);
  const [lastBreakMarker, setLastBreakMarker] = useState(savedProgress?.lastBreakMarker || 0);
  const [subjectSlots, setSubjectSlots] = useState(savedProgress?.subjectSlots || Array(9).fill(""));

  const [selectedSubjectId, setSelectedSubjectId] = useState(savedProgress?.selectedSubjectId || subjects[0].id);
  const visibleSubjects = useMemo(() => {
    const pickedIds = subjectSlots.filter(Boolean);
    if (pickedIds.length === 0) return subjects;
    return subjects.filter((subject) => pickedIds.includes(subject.id));
  }, [subjectSlots]);

  const selectedSubject = visibleSubjects.find((subject) => subject.id === selectedSubjectId) || visibleSubjects[0] || subjects[0];
  const [selectedTopicId, setSelectedTopicId] = useState(savedProgress?.selectedTopicId || subjects[0].topics[0].id);
  const selectedTopic = selectedSubject.topics.find((topic) => topic.id === selectedTopicId) || selectedSubject.topics[0];

  const [view, setView] = useState("home");
  const [stageTab, setStageTab] = useState("test");
  const [activeThemeId, setActiveThemeId] = useState(savedProgress?.activeThemeId || "forge");
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [dailyAnswers, setDailyAnswers] = useState({});
  const [dailySubmitted, setDailySubmitted] = useState(false);
  const [unlocked, setUnlocked] = useState({ ...defaultUnlockedStages, ...(savedProgress?.unlocked || {}) });

  const allTopics = subjects.flatMap((subject) => subject.topics);
  const dailyQuestions = useMemo(() => getDailyQuestions(selectedSubject, 8), [selectedSubject]);

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
      subjectSlots
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [saveEnabled, username, selectedSubjectId, selectedTopicId, activeThemeId, unlocked, workMinutes, breakMinutes, revisionSeconds, lastBreakMarker, subjectSlots]);

  const score = useMemo(() => {
    const correct = selectedTopic.questions.filter((item, index) => answers[index] === item.answer).length;
    return Math.round((correct / selectedTopic.questions.length) * 100);
  }, [answers, selectedTopic]);

  const dailyScore = useMemo(() => {
    const correct = dailyQuestions.filter((item, index) => dailyAnswers[index] === item.answer).length;
    return dailyQuestions.length ? Math.round((correct / dailyQuestions.length) * 100) : 0;
  }, [dailyAnswers, dailyQuestions]);

  const subjectTopicIndex = selectedSubject.topics.findIndex((topic) => topic.id === selectedTopic.id);
  const nextTopic = selectedSubject.topics[subjectTopicIndex + 1];
  const passed = submitted && score === 100;
  const unlockedCount = allTopics.filter((topic) => unlocked[topic.id]).length;
  const totalProgress = Math.round((unlockedCount / allTopics.length) * 100);
  const subjectUnlockedCount = selectedSubject.topics.filter((topic) => unlocked[topic.id]).length;
  const maxForgedInAnySubject = Math.max(...visibleSubjects.map((subject) => subject.topics.filter((topic) => unlocked[topic.id]).length));
  const activeTheme = themes.find((theme) => theme.id === activeThemeId && maxForgedInAnySubject >= theme.unlockAt) || themes[0];

  const recallPercentage = useMemo(() => {
    const unlockedInSubject = selectedSubject.topics.filter((topic) => unlocked[topic.id]).length;
    const unlockScore = Math.round((unlockedInSubject / selectedSubject.topics.length) * 100);
    if (dailySubmitted) return Math.round((unlockScore + dailyScore) / 2);
    if (submitted) return Math.round((unlockScore + score) / 2);
    return unlockScore;
  }, [selectedSubject, unlocked, dailySubmitted, dailyScore, submitted, score]);

  function changeSubject(subject) {
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
  }

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
  }

  function startDailyTest() {
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
      subjectSlots
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    setUsername(cleanName);
    setSaveEnabled(true);
    setShowSavePrompt(false);
  }

  function skipSavingProgress() {
    setSaveEnabled(false);
    setShowSavePrompt(false);
  }

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${activeTheme.bg} text-zinc-100 ${
        activeThemeId === "cherry" ? "cherry-theme" : ""
      }`}
    >
      <ThemeBackground activeThemeId={activeThemeId} />
      {activeThemeId === "cherry" && <CherryPetalsOverlay />}
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
              ×
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
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.65);
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

        .royal-theme-bg {
          background:
            radial-gradient(circle at 20% 12%, rgba(185, 120, 255, 0.20), transparent 24%),
            radial-gradient(circle at 82% 18%, rgba(255, 110, 210, 0.14), transparent 22%),
            linear-gradient(180deg, rgba(35, 18, 60, 0.96), rgba(13, 10, 26, 0.98));
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

        .gold-theme-bg {
          background:
            radial-gradient(circle at 18% 14%, rgba(255, 190, 80, 0.17), transparent 24%),
            radial-gradient(circle at 84% 12%, rgba(255, 230, 130, 0.12), transparent 22%),
            linear-gradient(180deg, rgba(38, 27, 12, 0.98), rgba(14, 11, 9, 0.98));
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
      `}</style>

      <div className="relative z-10">
      <div className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/90 px-4 py-3 backdrop-blur">
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
          <button
            onClick={() => {
              setUsernameInput(username || "");
              setShowSavePrompt(true);
            }}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-bold text-zinc-400 hover:bg-zinc-800"
          >
            {saveEnabled ? `${username || "Student"}'s Forge` : "Not saving"}
          </button>
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
                <span className="mini-alarm-clock">
                  <span className="mini-alarm-bell left" />
                  <span className="mini-alarm-bell right" />
                  <span className="mini-alarm-face">
                    <span className="mini-alarm-hand hour" />
                    <span className="mini-alarm-hand minute" />
                  </span>
                </span>
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
                          <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-200">Selected Subject</p>
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
                  <button onClick={() => setView("themes")} className="rounded-2xl border border-orange-400/40 px-4 py-2 text-sm font-black text-orange-200 hover:bg-orange-400/10">View →</button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {themes.filter((theme) => maxForgedInAnySubject >= theme.unlockAt).map((theme) => (
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
                  Next unlock: {themes.find((theme) => maxForgedInAnySubject < theme.unlockAt)?.name || "All themes unlocked"}
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
                  <div className="mt-4 inline-flex rounded-2xl border border-orange-400/40 px-4 py-2 text-sm font-black text-orange-200">Explore Notes →</div>
                </div>
                <div className="absolute -right-8 bottom-0 hidden h-36 w-36 rotate-12 rounded-3xl border border-orange-400/20 bg-orange-400/10 md:block" />
              </button>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-white">Stage Preview</h3>
                  <p className="mt-1 text-sm text-zinc-400">Focused learning. One stage at a time.</p>
                </div>
                <button onClick={goToStages} className="rounded-2xl border border-orange-400/40 px-4 py-2 text-sm font-black text-orange-200 hover:bg-orange-400/10">View All Stages →</button>
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
            <GeneralHub selectedSubject={selectedSubject} />
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
                <AchievementCard key={theme.id} theme={theme} unlocked={maxForgedInAnySubject >= theme.unlockAt} selected={activeTheme.id === theme.id} onSelect={setActiveThemeId} />
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

            {selectedSubject.topics.map((topic) => {
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

                  <button onClick={() => { setRevisionSeconds(0); setLastBreakMarker(0); setBreakAlarm(false); }} className="mt-5 rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 font-bold text-zinc-200 hover:bg-zinc-800">
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
                        Pick up to 9 subjects to show in the taskbar. Empty slots do not show. If all slots are empty, every subject shows.
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
                            <option key={subject.id} value={subject.id}>{subject.label}</option>
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
