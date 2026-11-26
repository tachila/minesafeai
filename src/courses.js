const dedent = (text) => text.trim().replace(/^[ \t]+/gm, "");

const courses = [
  {
    id: "introduction-to-mine-safety",
    title: "Introduction to Mine Safety",
    category: "Safety Fundamentals",
    description:
      "Understand basic safety principles, responsibilities and procedures used in mining environments.",
    duration: "2 hours",
    level: "Beginner",
    audience: ["applicant", "miner"],
    icon: "",
    lessons: [
      {
        id: "intro-understanding-mine-safety",
        title: "Understanding Mine Safety",
        duration: "20 minutes",
        type: "reading",
        content: dedent(`
          Mine safety involves the practices and procedures used to protect workers, visitors and the surrounding environment.

          Mining environments can contain hazards such as falling objects, moving machinery, dust, noise and unstable ground.

          Every person entering a mining environment must understand the importance of following safety instructions, site inductions and statutory mine regulations.
        `),
      },
      {
        id: "intro-common-mining-hazards",
        title: "Common Mining Hazards",
        duration: "25 minutes",
        type: "reading",
        content: dedent(`
          Mining hazards can include:

          1. Physical hazards such as noise, heat and vibration.
          2. Chemical hazards such as harmful dust, fumes and gases.
          3. Mechanical hazards from moving machinery and heavy vehicles.
          4. Environmental hazards such as poor ventilation and low visibility.
          5. Ground hazards such as unstable rock formations and loose walls.

          Always report hazards to the appropriate supervisor before continuing work.
        `),
      },
      {
        id: "intro-safety-responsibilities",
        title: "Safety Responsibilities",
        duration: "20 minutes",
        type: "reading",
        content: dedent(`
          Everyone has a role in maintaining a safe mining environment.

          Workers should follow safety procedures, use required PPE, report hazards promptly and attend all scheduled safety training.

          Supervisors should communicate safety requirements clearly, provide appropriate supervision, ensure safe work systems and address reported risks without delay.
        `),
      },
      {
        id: "intro-recognising-unsafe-situations",
        title: "Recognising Unsafe Situations",
        duration: "25 minutes",
        type: "scenario",
        content: dedent(`
          SCENARIO

          Imagine you notice a damaged electrical cable lying across a damp walkway in your working area.

          SAFE ACTION

          Do not touch the cable or attempt an unauthorised repair. Keep a safe distance, warn nearby co-workers if safe to do so, barricade or mark the area if permitted, and report it immediately to the responsible supervisor or electrical team.
        `),
      },
      {
        id: "intro-assessment",
        title: "Introduction Assessment",
        duration: "30 minutes",
        type: "assessment",
        content: "Test your understanding of the lessons in this course.",
        quiz: [
          {
            question: "What is the primary goal of mine safety procedures?",
            options: [
              "To speed up daily production targets",
              "To protect workers, visitors and the surrounding environment",
              "To reduce the need for supervision",
              "To replace site inductions for experienced workers",
            ],
            correctIndex: 1,
            explanation:
              "Mine safety practices exist to protect every person on site as well as the surrounding environment.",
          },
          {
            question:
              "You spot a damaged electrical cable in a working area. What should you do first?",
            options: [
              "Wrap it with tape and resume work",
              "Move it out of the walkway with gloved hands",
              "Keep a safe distance, warn others if safe and report it immediately",
              "Wait until the end of the shift to log it",
            ],
            correctIndex: 2,
            explanation:
              "Never touch damaged electrical equipment or attempt unauthorised repairs. Isolate yourself from danger, warn others and report it immediately.",
          },
          {
            question:
              "Which hazard category includes unstable rock formations?",
            options: [
              "Chemical hazards",
              "Ground hazards",
              "Mechanical hazards",
              "Ergonomic hazards",
            ],
            correctIndex: 1,
            explanation:
              "Unstable rock, loose hanging walls and weak slopes are classified as ground hazards.",
          },
        ],
      },
    ],
  },

  {
    id: "personal-protective-equipment",
    title: "Personal Protective Equipment (PPE)",
    category: "Workplace Safety",
    description:
      "Learn about protective equipment, its purpose, inspection and correct use.",
    duration: "1.5 hours",
    level: "Beginner",
    audience: ["applicant", "miner"],
    icon: "",
    lessons: [
      {
        id: "ppe-purpose-and-role",
        title: "The Purpose of PPE in Mining",
        duration: "15 minutes",
        type: "reading",
        content: dedent(`
          Personal Protective Equipment (PPE) is clothing or gear designed to reduce a worker's exposure to workplace hazards.

          PPE is the last line of defence—it does not eliminate a hazard, so it must always be combined with engineering controls and safe work procedures.

          Wearing the right PPE correctly can prevent serious head, eye, hearing, respiratory and foot injuries.
        `),
      },
      {
        id: "ppe-types-and-selection",
        title: "Standard Mining PPE and Their Uses",
        duration: "20 minutes",
        type: "reading",
        content: dedent(`
          Mandatory and task-specific PPE on mine sites typically includes:

          1. Hard hat (safety helmet): Protects against falling objects and overhead impacts.
          2. Safety glasses or goggles: Shield eyes from dust, flying particles and chemical splashes.
          3. High-visibility clothing: Ensures operators of heavy machinery can see you clearly.
          4. Steel-toe safety boots: Protect feet from crushing loads, punctures and slips.
          5. Hearing protection (earplugs or earmuffs): Prevents permanent noise-induced hearing loss.
          6. Respiratory protection (dust masks or respirators): Protects lungs against silica dust and hazardous fumes.
          7. Task-specific gloves: Guard hands against cuts, abrasions, burns or chemical contact.
        `),
      },
      {
        id: "ppe-inspection-and-care",
        title: "Inspecting, Fitting and Maintaining PPE",
        duration: "20 minutes",
        type: "reading",
        content: dedent(`
          Damaged or poorly fitted PPE fails when you need it most.

          Before every shift, check your gear for cracks, worn straps, scratched lenses, torn seams or clogged respirator filters.

          Clean and store PPE according to manufacturer guidelines. Never modify safety gear, and immediately report and replace any defective equipment before starting work.
        `),
      },
      {
        id: "ppe-damaged-gear-scenario",
        title: "Handling Damaged PPE Before a Shift",
        duration: "15 minutes",
        type: "scenario",
        content: dedent(`
          SCENARIO

          During your pre-shift inspection, you notice a deep crack across the shell of your hard hat and a frayed chin strap. Your team is about to board the transport to the work area.

          SAFE ACTION

          Do not wear the damaged helmet or enter the work zone without proper head protection. Inform your supervisor immediately, remove the damaged hard hat from service and obtain an approved replacement before starting your shift.
        `),
      },
      {
        id: "ppe-assessment",
        title: "PPE Assessment",
        duration: "20 minutes",
        type: "assessment",
        content:
          "Test your understanding of selecting, inspecting and using PPE.",
        quiz: [
          {
            question: "What is the role of PPE in workplace safety?",
            options: [
              "It eliminates all hazards so other safety rules are optional",
              "It acts as a last line of defence against residual workplace hazards",
              "It is only required during emergencies",
              "It is only mandatory for new applicants",
            ],
            correctIndex: 1,
            explanation:
              "PPE does not remove the hazard itself; it protects the wearer as the final barrier alongside other controls.",
          },
          {
            question:
              "What should you do if you discover a crack in your safety helmet before a shift?",
            options: [
              "Cover the crack with electrical tape for the day",
              "Use it carefully until the end of the week",
              "Remove it from service and request an approved replacement before starting work",
              "Swap it with a visitor's helmet",
            ],
            correctIndex: 2,
            explanation:
              "A cracked helmet loses its impact-absorbing integrity and must be replaced immediately.",
          },
          {
            question: "When should you inspect your PPE?",
            options: [
              "Before every shift and before each use",
              "Only once a month during audits",
              "Only after an accident occurs",
              "Only when a supervisor asks",
            ],
            correctIndex: 0,
            explanation:
              "Routine pre-shift and pre-use inspections catch wear or damage before you are exposed to hazards.",
          },
        ],
      },
    ],
  },

  {
    id: "hazard-identification",
    title: "Hazard Identification and Risk Assessment",
    category: "Risk Management",
    description:
      "Recognise workplace hazards and understand basic risk assessment and reporting.",
    duration: "2 hours",
    level: "Beginner",
    audience: ["applicant", "miner"],
    
    lessons: [
      {
        id: "hazard-vs-risk",
        title: "Hazards vs. Risks",
        duration: "20 minutes",
        type: "reading",
        content: dedent(`
          Understanding the difference between a hazard and a risk is essential for effective prevention.

          A hazard is anything with the potential to cause harm—such as a wet floor, exposed wiring, toxic gas or loose rock.

          A risk is the likelihood that a hazard will actually cause harm combined with how severe that harm could be. Assessing both likelihood and severity helps teams prioritise the most urgent dangers first.
        `),
      },
      {
        id: "hazard-hierarchy-of-controls",
        title: "The Hierarchy of Controls",
        duration: "25 minutes",
        type: "reading",
        content: dedent(`
          Once a hazard is identified, controls are applied from most effective to least effective:

          1. Elimination: Physically remove the hazard completely.
          2. Substitution: Replace a hazardous material or process with a safer one.
          3. Engineering Controls: Isolate people from the hazard (e.g., ventilation, machine guards, barriers).
          4. Administrative Controls: Change how people work (e.g., training, permits, signage, job rotation).
          5. PPE: Protect the worker with personal protective equipment.

          Always aim for the highest practical level of control before relying on PPE alone.
        `),
      },
      {
        id: "hazard-pre-task-assessment",
        title: "Pre-Task Risk Assessments and Reporting",
        duration: "25 minutes",
        type: "reading",
        content: dedent(`
          Before beginning any task, take five minutes to scan your work area (often called a Take 5 or SLAM check):

          1. Stop and step back to look at the task and surroundings.
          2. Identify potential hazards overhead, underfoot and nearby.
          3. Assess whether existing controls make the job safe.
          4. Make the area safe or escalate to your supervisor if risks remain uncontrolled.

          If conditions change mid-shift—such as sudden rain, poor lighting or new equipment arriving—stop and reassess immediately.
        `),
      },
      {
        id: "hazard-uncontrolled-risk-scenario",
        title: "Assessing a Changing Work Environment",
        duration: "25 minutes",
        type: "scenario",
        content: dedent(`
          SCENARIO

          You are assigned to clear drainage channels near a haul road. Halfway through the job, heavy rain reduces visibility and haul trucks begin splashing mud close to your work area.

          SAFE ACTION

          Stop work immediately because conditions have changed. Move to a safe location well clear of traffic, reassess the risk and notify your supervisor. Do not resume work until visibility improves and proper barriers or traffic controls are established.
        `),
      },
      {
        id: "hazard-assessment",
        title: "Hazard Identification Assessment",
        duration: "25 minutes",
        type: "assessment",
        content:
          "Test your understanding of hazard identification, risk evaluation and control measures.",
        quiz: [
          {
            question: "What is the difference between a hazard and a risk?",
            options: [
              "They mean the exact same thing",
              "A hazard is a source of potential harm, while risk is the likelihood and severity of that harm occurring",
              "A risk only applies to machinery, while hazards apply to weather",
              "Hazards cannot be controlled, while risks can",
            ],
            correctIndex: 1,
            explanation:
              "A hazard is the source of danger; risk measures how likely harm is and how serious it would be.",
          },
          {
            question:
              "Which control measure is the MOST effective in the Hierarchy of Controls?",
            options: [
              "Elimination",
              "Personal Protective Equipment (PPE)",
              "Warning signs",
              "Job rotation",
            ],
            correctIndex: 0,
            explanation:
              "Elimination removes the hazard entirely, making it the most reliable form of protection.",
          },
          {
            question: "What is the main purpose of a pre-task risk assessment?",
            options: [
              "To create paperwork after an incident",
              "To assign blame if something goes wrong",
              "To identify hazards and put controls in place before work begins",
              "To avoid asking supervisors for help",
            ],
            correctIndex: 2,
            explanation:
              "Pre-task risk assessments help workers spot and control hazards proactively before starting a job.",
          },
        ],
      },
    ],
  },

  {
    id: "emergency-response",
    title: "Emergency Response and Mine Evacuation",
    category: "Emergency Training",
    description:
      "Understand emergency alerts, evacuation procedures and emergency communication.",
    duration: "2.5 hours",
    level: "Intermediate",
    audience: ["applicant", "miner"],
   
    lessons: [
      {
        id: "emergency-types-and-alerts",
        title: "Mine Emergencies and Warning Signals",
        duration: "30 minutes",
        type: "reading",
        content: dedent(`
          Mine emergencies can include fires, gas leaks, flooding, ground falls, power failures or severe medical incidents.

          Sites use distinct alarm systems to alert personnel quickly—such as sirens, flashing beacons, stench gas (mercaptan) in underground mines and radio broadcasts.

          Every worker must know the specific alarm tones, emergency radio channels and emergency contact numbers for their site from day one.
        `),
      },
      {
        id: "emergency-evacuation-and-refuge",
        title: "Evacuation Routes, Assembly Points and Refuge Bays",
        duration: "30 minutes",
        type: "reading",
        content: dedent(`
          Always know both your primary and secondary escape routes before starting work in any area.

          When an evacuation order is given:
          1. Shut down or make equipment safe only if it can be done immediately without delaying your escape.
          2. Follow illuminated escape signage and lifelines without running or panicking.
          3. In underground emergencies where smoke or gas blocks the exit, don your self-rescuer and proceed to the nearest refuge chamber.
          4. Report directly to your designated muster or assembly point for an official headcount.
        `),
      },
      {
        id: "emergency-communication-protocols",
        title: "Emergency Communication and Roll Call",
        duration: "30 minutes",
        type: "reading",
        content: dedent(`
          Clear, calm communication saves lives during an emergency.

          When reporting an emergency by radio or phone, state:
          1. Your name and exact location.
          2. The nature of the emergency (fire, injury, gas, entrapment).
          3. The number of people affected and any immediate dangers.

          Keep emergency radio channels clear for rescue coordinators. Never leave an assembly point or re-enter an evacuated zone until the Emergency Controller issues an official all-clear.
        `),
      },
      {
        id: "emergency-smoke-evacuation-scenario",
        title: "Responding to Smoke in an Escape Way",
        duration: "30 minutes",
        type: "scenario",
        content: dedent(`
          SCENARIO

          An evacuation alarm sounds in your section and you smell smoke along the primary exit corridor. Visibility is dropping rapidly.

          SAFE ACTION

          Do not walk blindly into dense smoke. Activate your self-rescuer if underground, alert control via emergency radio with your exact location, and move calmly along the secondary escape route or into the nearest designated refuge bay. Follow emergency coordinator instructions and wait for rescue confirmation.
        `),
      },
      {
        id: "emergency-assessment",
        title: "Emergency Response Assessment",
        duration: "30 minutes",
        type: "assessment",
        content:
          "Test your understanding of emergency alerts, evacuation steps and communication.",
        quiz: [
          {
            question:
              "What should you do when an evacuation alarm sounds in your work area?",
            options: [
              "Finish your current task first so nothing is left incomplete",
              "Stop work safely, follow marked escape routes and proceed to the designated assembly point or refuge bay",
              "Wait for a co-worker to verify whether it is a drill",
              "Gather all your tools and personal belongings before leaving",
            ],
            correctIndex: 1,
            explanation:
              "Treat every alarm as real. Stop work safely and evacuate immediately along approved routes.",
          },
          {
            question:
              "Why is a headcount at the assembly point critical during an evacuation?",
            options: [
              "To record overtime hours",
              "To decide who will clean up the area",
              "To confirm all personnel are accounted for and alert rescue teams if anyone is missing",
              "To check whether equipment was shut down",
            ],
            correctIndex: 2,
            explanation:
              "Accurate headcounts ensure emergency responders know immediately if someone is trapped or unaccounted for.",
          },
          {
            question:
              "What should you do if smoke blocks your primary escape route?",
            options: [
              "Run quickly through the smoke holding your breath",
              "Use the designated secondary escape route or proceed to the nearest refuge chamber as trained",
              "Hide behind nearby machinery",
              "Turn off your radio to save battery",
            ],
            correctIndex: 1,
            explanation:
              "Never enter heavy smoke unnecessarily. Use your secondary exit or refuge chamber and follow site emergency procedures.",
          },
        ],
      },
    ],
  },

  {
    id: "machinery-equipment-safety",
    title: "Machinery and Equipment Safety",
    category: "Operational Safety",
    description:
      "Understand common machinery hazards, exclusion zones and safe work practices.",
    duration: "2 hours",
    level: "Intermediate",
    audience: ["miner"],
    
    lessons: [
      {
        id: "machinery-common-hazards",
        title: "Mechanical Hazards and Machine Guarding",
        duration: "25 minutes",
        type: "reading",
        content: dedent(`
          Mining equipment involves extreme forces, rotating shafts, conveyor pinch points, hydraulic pressure and stored energy.

          Machine guards, emergency stop lanyards and interlocks exist to keep body parts and loose clothing away from moving components.

          Never remove, bypass or tamper with a guard while equipment is operating. Keep hair tied back, avoid loose garments or jewellery, and report missing or damaged guards immediately.
        `),
      },
      {
        id: "machinery-exclusion-zones",
        title: "Mobile Equipment and Exclusion Zones",
        duration: "25 minutes",
        type: "reading",
        content: dedent(`
          Haul trucks, loaders, excavators and drills have large blind spots where an operator cannot see a pedestrian or light vehicle.

          Respect established exclusion zones around all operating heavy machinery.

          Before approaching any mobile machine:
          1. Stay outside its swing radius and travel path.
          2. Establish positive two-way radio communication or direct eye contact with the operator.
          3. Wait until the operator lowers attachments, applies brakes and signals that it is safe to approach.
        `),
      },
      {
        id: "machinery-loto-basics",
        title: "Lockout/Tagout (LOTO) and Pre-Start Checks",
        duration: "20 minutes",
        type: "reading",
        content: dedent(`
          Unexpected equipment startup during cleaning, clearing blockages or maintenance is a leading cause of severe mining injuries.

          Lockout/Tagout (LOTO) ensures all energy sources—electrical, hydraulic, pneumatic and gravitational—are isolated, locked with personal locks, tagged and verified as zero-energy before work begins.

          Operators must also complete a documented pre-start inspection before using any machine and tag out faulty equipment immediately.
        `),
      },
      {
        id: "machinery-conveyor-jam-scenario",
        title: "Dealing with a Jammed Conveyor",
        duration: "25 minutes",
        type: "scenario",
        content: dedent(`
          SCENARIO

          A rock becomes wedged near the roller of a running conveyor belt, slowing material flow. A colleague suggests poking it loose with a metal bar while the belt keeps running to save time.

          SAFE ACTION

          Stop your colleague immediately. Never reach near or insert tools into moving conveyor parts. Shut down the conveyor using standard stop controls, follow full Lockout/Tagout (LOTO) isolation and zero-energy verification procedures, and only clear the blockage once authorised and confirmed isolated.
        `),
      },
      {
        id: "machinery-assessment",
        title: "Machinery Safety Assessment",
        duration: "25 minutes",
        type: "assessment",
        content:
          "Test your understanding of machine guards, exclusion zones and Lockout/Tagout.",
        quiz: [
          {
            question: "What is the main purpose of Lockout/Tagout (LOTO)?",
            options: [
              "To isolate energy sources and prevent unexpected startup during maintenance or repair",
              "To reserve a machine for the next shift",
              "To track fuel consumption on mobile equipment",
              "To speed up routine cleaning while machines run",
            ],
            correctIndex: 0,
            explanation:
              "LOTO locks out all energy sources and verifies zero energy so equipment cannot start accidentally while someone is working on it.",
          },
          {
            question:
              "How should a pedestrian safely approach an operating haul truck or loader?",
            options: [
              "Walk briskly behind the vehicle where the engine is quieter",
              "Wave from the side and step closer immediately",
              "Stay outside the exclusion zone until you make eye contact and receive positive communication from the operator",
              "Assume the operator can see your high-visibility vest",
            ],
            correctIndex: 2,
            explanation:
              "Never assume an operator sees you. Stay clear until positive communication is established and the machine is made safe.",
          },
          {
            question:
              "What should you do if you find a missing guard on a piece of equipment?",
            options: [
              "Operate the machine carefully until maintenance arrives",
              "Do not operate the machine and report the defect to a supervisor immediately",
              "Place a cone next to it and keep running the shift",
              "Build a temporary cover out of cardboard",
            ],
            correctIndex: 1,
            explanation:
              "Equipment with missing or damaged guards is unsafe to operate and must be tagged out and reported immediately.",
          },
        ],
      },
    ],
  },

  {
    id: "underground-open-pit-hazards",
    title: "Underground and Open-Pit Mining Hazards",
    category: "Mining Operations",
    description:
      "Explore common underground and open-pit mining hazards and preventive measures.",
    duration: "2.5 hours",
    level: "Intermediate",
    audience: ["applicant", "miner"],
    
    lessons: [
      {
        id: "mining-underground-hazards",
        title: "Underground Ground Control and Rockfalls",
        duration: "30 minutes",
        type: "reading",
        content: dedent(`
          Underground excavations disturb natural rock stresses, making ground falls one of the most serious mining hazards.

          Ground support systems—such as rock bolts, wire mesh, shotcrete and timber or steel sets—stabilise roofs and sidewalls.

          Key rules:
          1. Never walk or work under unsupported ground.
          2. Check for loose rock, cracking sounds or flaking surfaces before starting work.
          3. Only trained and authorised personnel may carry out barring down (scaling) using proper tools and footing.
        `),
      },
      {
        id: "mining-ventilation-and-gases",
        title: "Ventilation, Dust and Hazardous Gases",
        duration: "30 minutes",
        type: "reading",
        content: dedent(`
          Underground atmospheres can quickly become hazardous due to oxygen deficiency, carbon monoxide, methane, nitrogen oxides or high silica dust levels.

          Mechanical ventilation fans, ducts and ventilation doors maintain fresh airflow and dilute contaminants.

          Never block ventilation ducts, leave ventilation doors propped open or enter poorly ventilated headings without verified gas monitoring clearance.
        `),
      },
      {
        id: "mining-open-pit-hazards",
        title: "Open-Pit Slopes, Benches and Haul Roads",
        duration: "30 minutes",
        type: "reading",
        content: dedent(`
          Open-pit mines present distinct geotechnical and operational hazards:

          1. Slope and highwall instability: Watch for tension cracks along bench crests, rock spalling or sudden water seepage.
          2. Bench edges: Respect windrows (safety berms) and keep a safe distance from drop-offs.
          3. Haul roads: Obey speed limits, right-of-way rules (loaded heavy trucks have priority) and dust-control procedures.
          4. Weather impacts: Heavy rain can weaken pit walls and make haul roads extremely slippery.
        `),
      },
      {
        id: "mining-slope-crack-scenario",
        title: "Spotting Ground Instability in an Open Pit",
        duration: "30 minutes",
        type: "scenario",
        content: dedent(`
          SCENARIO

          While working on a lower bench in an open pit after overnight rain, you notice fresh cracks forming along the upper crest and small stones trickling down the highwall face.

          SAFE ACTION

          Treat continuous rock trickle and fresh tension cracks as early warning signs of a potential slope failure. Evacuate yourself and nearby workers away from the base of the highwall immediately, warn approaching equipment via radio and report the exact bench location to your supervisor and geotechnical team.
        `),
      },
      {
        id: "mining-assessment",
        title: "Underground and Open-Pit Assessment",
        duration: "30 minutes",
        type: "assessment",
        content:
          "Test your understanding of ground stability, ventilation and open-pit controls.",
        quiz: [
          {
            question:
              "What is the primary purpose of underground mine ventilation?",
            options: [
              "To keep machinery dry",
              "To supply fresh breathable air and dilute or remove hazardous gases and dust",
              "To increase lighting underground",
              "To reduce rock bolt installation",
            ],
            correctIndex: 1,
            explanation:
              "Ventilation delivers breathable oxygen and removes toxic gases, diesel fumes, heat and respirable dust.",
          },
          {
            question:
              "Which observation is a warning sign of slope instability in an open-pit mine?",
            options: [
              "Freshly graded haul roads",
              "Properly maintained safety berms",
              "Tension cracks along the crest, loose rock falls or unexpected water seepage",
              "Clear dry weather",
            ],
            correctIndex: 2,
            explanation:
              "Cracks, rock trickle and seepage often precede bench or highwall failures and must be reported immediately.",
          },
          {
            question:
              "What is the rule regarding entering an unsupported underground heading?",
            options: [
              "Never enter; keep out of unsupported ground and report it immediately",
              "Enter briefly only if you wear a hard hat",
              "Enter if you carry a bright cap lamp",
              "Enter only when walking quickly",
            ],
            correctIndex: 0,
            explanation:
              "Unsupported ground can collapse without warning; no worker may enter beyond installed ground support.",
          },
        ],
      },
    ],
  },

  {
    id: "first-aid-incident-reporting",
    title: "First Aid and Incident Reporting",
    category: "Emergency Training",
    description:
      "Learn basic emergency awareness, incident reporting and when to seek qualified assistance.",
    duration: "2 hours",
    level: "Beginner",
    audience: ["applicant", "miner"],
    
    lessons: [
      {
        id: "when-to-use-first-aid",
        title: "When to Use First Aid",
        duration: "25 minutes",
        type: "reading",
        content: dedent(`
          WHAT IS FIRST AID?

          First aid is the initial assistance provided to someone who is injured or suddenly becomes ill. It is intended to help the person until appropriate medical assistance becomes available.

          WHEN SHOULD FIRST AID BE USED?

          First aid may be needed when a worker experiences an injury or sudden illness at the workplace. Examples include minor cuts, minor burns, sprains or sudden illness.

          It may also be the initial response to a serious workplace emergency. However, serious or life-threatening conditions require immediate activation of the mine's emergency response procedure and appropriate medical assistance.

          RECOGNISING AN EMERGENCY

          A situation may require urgent medical assistance when someone is unconscious, experiencing severe difficulty breathing, bleeding heavily or showing signs of a serious injury.

          Do not delay activating the emergency response procedure while trying to manage a serious incident alone.

          WHO SHOULD PROVIDE FIRST AID?

          First aid should be provided by someone with appropriate training and within the limits of their competence.

          If you are not trained to provide the required assistance, contact the designated workplace first aider or emergency response team.

          IMPORTANT SAFETY POINT

          Never put yourself or other workers in danger while attempting to assist an injured person. Follow your mine's approved first aid and emergency response procedures.

          KEY TAKEAWAY

          First aid provides initial assistance, but it does not replace professional medical treatment or the mine's emergency response system.
        `),
      },
      {
        id: "first-aid-scene-safety",
        title: "Scene Safety and Initial Response Steps",
        duration: "25 minutes",
        type: "reading",
        content: dedent(`
          Before approaching an injured person, always check the scene for ongoing hazards such as moving vehicles, falling rock, live electricity or toxic gas.

          Follow a structured approach:
          1. Assess Danger: Ensure the area is safe for you, bystanders and the casualty.
          2. Check Response: Gently speak to the person to see if they are alert and responsive.
          3. Call for Help: Alert the designated first aider, supervisor or emergency medical team immediately.
          4. Support Within Your Training: Reassure the casualty, keep them still if a spinal or head injury is suspected, and hand over clearly to medical responders when they arrive.
        `),
      },
      {
        id: "first-aid-incident-near-miss-reporting",
        title: "Incident and Near-Miss Reporting",
        duration: "25 minutes",
        type: "reading",
        content: dedent(`
          Every workplace injury, equipment damage event and near miss must be reported promptly through the mine's reporting system.

          A near miss is an unplanned event that did not cause injury or damage—but had the potential to do so (for example, a tool falling close to a worker).

          Reporting near misses is not about blame. It allows safety teams to investigate root causes and fix hazards before someone is seriously hurt. Preserve the scene of serious incidents so investigators can determine exactly what happened.
        `),
      },
      {
        id: "first-aid-injury-scenario",
        title: "Responding to a Co-Worker's Fall",
        duration: "20 minutes",
        type: "scenario",
        content: dedent(`
          SCENARIO

          A co-worker slips on wet steps near a workshop, strikes their head and does not respond when you call their name.

          SAFE ACTION

          Check the area for slip or electrical hazards before approaching. Do not try to lift or move the worker unless there is an immediate life-threatening danger. Activate the mine's emergency response procedure immediately, call the designated first aider, keep the area clear and stay with the casualty until trained medical responders take over. Afterwards, submit an accurate incident report.
        `),
      },
      {
        id: "first-aid-assessment",
        title: "First Aid and Incident Reporting Assessment",
        duration: "25 minutes",
        type: "assessment",
        content:
          "Test your understanding of first aid principles, emergency escalation and incident reporting.",
        quiz: [
          {
            question: "What is the main purpose of first aid?",
            options: [
              "To replace professional medical treatment",
              "To provide initial assistance until appropriate medical help is available",
              "To allow workers to diagnose illnesses",
              "To avoid reporting workplace injuries",
            ],
            correctIndex: 1,
            explanation:
              "First aid provides initial assistance while appropriate medical help is arranged or becomes available.",
          },
          {
            question:
              "A worker is unconscious after an incident. What should happen?",
            options: [
              "Wait and see whether the worker wakes up",
              "Move the worker immediately without assessing the danger",
              "Activate the mine's emergency response procedure and obtain urgent medical assistance",
              "Leave the worker and continue working",
            ],
            correctIndex: 2,
            explanation:
              "Unconsciousness is a serious warning sign. Activate the emergency response procedure and obtain urgent medical help. Assistance should only be provided within the responder's training.",
          },
          {
            question:
              "What should a worker do if an injured person needs assistance beyond their training?",
            options: [
              "Attempt the procedure anyway",
              "Contact a trained first aider or emergency response team",
              "Ignore the situation",
              "Ask an untrained colleague to take over",
            ],
            correctIndex: 1,
            explanation:
              "First aid must be provided within the responder's competence. Obtain help from appropriately trained personnel.",
          },
          {
            question: "Why is it important to report near-miss incidents?",
            options: [
              "Only to fill out monthly paperwork",
              "To punish workers who make mistakes",
              "They reveal hazards so corrective actions can prevent serious injuries later",
              "Near misses only need to be reported if equipment breaks",
            ],
            correctIndex: 2,
            explanation:
              "Near misses highlight hidden hazards early, enabling teams to prevent future accidents.",
          },
        ],
      },
    ],
  },

  {
    id: "environmental-safety",
    title: "Environmental Safety and Mine Housekeeping",
    category: "Environmental Safety",
    description:
      "Understand workplace cleanliness, waste management and environmental awareness.",
    duration: "1.5 hours",
    level: "Beginner",
    audience: ["applicant", "miner"],
    icon: "🌱",
    lessons: [
      {
        id: "env-mine-housekeeping",
        title: "Good Housekeeping in Mining Workplaces",
        duration: "15 minutes",
        type: "reading",
        content: dedent(`
          Good housekeeping is a core foundation of safe operations—not just tidiness.

          Cluttered walkways, trailing hoses, oily floors and piled scrap material cause slips, trips, falls and fire hazards.

          Keep emergency exits, fire extinguishers, eyewash stations and electrical panels completely clear at all times. Clean as you go and leave every work area safe for the incoming shift.
        `),
      },
      {
        id: "env-waste-and-spills",
        title: "Waste Segregation and Spill Prevention",
        duration: "20 minutes",
        type: "reading",
        content: dedent(`
          Mining operations generate general waste, recyclables and hazardous waste such as used oil, grease, batteries, chemical containers and oil-soaked rags.

          Always place waste into clearly labelled, colour-coded bins so hazardous materials never contaminate soil or local water sources.

          Store fuels and chemicals inside secondary containment (bunded areas) and know where the nearest spill kit is located in your work zone.
        `),
      },
      {
        id: "env-dust-water-protection",
        title: "Dust Control and Protecting Local Ecosystems",
        duration: "20 minutes",
        type: "reading",
        content: dedent(`
          Responsible mining protects both workers and neighbouring communities.

          Dust suppression systems (such as water sprays on haul roads and crushers) protect air quality and lung health. Proper drainage and sediment traps prevent mine runoff from polluting streams and groundwater.

          Report leaking pipes, overflowing sumps, uncontrolled dust or chemical spills immediately so environmental teams can act quickly.
        `),
      },
      {
        id: "env-oil-spill-scenario",
        title: "Responding to a Hydraulic Oil Leak",
        duration: "15 minutes",
        type: "scenario",
        content: dedent(`
          SCENARIO

          While walking past a maintenance bay, you notice hydraulic oil leaking from a parked machine and flowing towards an open stormwater drain.

          SAFE ACTION

          Prevent the oil from entering the drain. If safe and trained to do so, wear appropriate PPE and place absorbent socks from the nearby spill kit around the drain to contain the flow. Never wash oil down a drain with water. Report the leak and spill immediately to your supervisor and environmental team for proper cleanup and disposal.
        `),
      },
      {
        id: "env-assessment",
        title: "Environmental Safety Assessment",
        duration: "20 minutes",
        type: "assessment",
        content:
          "Test your understanding of housekeeping, waste segregation and spill response.",
        quiz: [
          {
            question:
              "What is the main safety goal of good housekeeping on a mine site?",
            options: [
              "To prevent slips, trips, fires and blocked access to emergency equipment",
              "To prepare only for external inspections",
              "To keep tools hidden out of sight",
              "To reduce the need for PPE",
            ],
            correctIndex: 0,
            explanation:
              "Clean, orderly work areas prevent common injuries and ensure rapid access to emergency gear.",
          },
          {
            question:
              "What is the correct response to a small fuel or oil spill on site?",
            options: [
              "Wash it into the nearest stormwater drain with a hose",
              "Contain the spill using an approved spill kit if safe and trained, then report it immediately",
              "Cover it with loose soil and leave it",
              "Wait for it to evaporate",
            ],
            correctIndex: 1,
            explanation:
              "Spills must be contained with approved absorbents and reported so contaminated material is disposed of safely.",
          },
          {
            question: "How should workplace waste be disposed of on a mine?",
            options: [
              "Placed together in whichever bin is closest",
              "Burned in open areas away from buildings",
              "Segregated into clearly labelled containers for general, recyclable and hazardous waste",
              "Buried beneath waste rock dumps",
            ],
            correctIndex: 2,
            explanation:
              "Proper waste segregation stops hazardous substances from contaminating the environment.",
          },
        ],
      },
    ],
  },

  {
    id: "working-at-heights-confined-spaces",
    title: "Working at Heights and Confined Spaces",
    category: "Specialised Safety",
    description:
      "Recognise risks associated with heights and confined spaces and understand the importance of authorised procedures.",
    duration: "2 hours",
    level: "Intermediate",
    audience: ["miner"],
    
    lessons: [
      {
        id: "heights-risks-and-controls",
        title: "Working at Heights: Hazards and Fall Protection",
        duration: "25 minutes",
        type: "reading",
        content: dedent(`
          Working at heights involves any task where a person could fall from one level to another—such as on scaffolding, elevated platforms, ladders, plant structures or near open excavations.

          Before working at heights:
          1. Use collective fall prevention (handrails, approved scaffolding or elevated work platforms) whenever possible.
          2. If fall arrest gear is required, wear a properly fitted, inspected full-body harness clipped to a certified anchor point.
          3. Secure tools with lanyards and barricade drop zones below to protect people from falling objects.
        `),
      },
      {
        id: "confined-spaces-hazards",
        title: "Recognising Confined Spaces and Their Dangers",
        duration: "25 minutes",
        type: "reading",
        content: dedent(`
          A confined space is an enclosed or partially enclosed area not designed for continuous human occupancy and having limited entry or exit—such as storage tanks, silos, sumps, chutes, hoppers and ventilation ducts.

          Confined spaces can contain invisible, fast-acting hazards:
          1. Oxygen deficiency or enrichment.
          2. Toxic or flammable gases and vapours.
          3. Engulfment by loose ore, slurry or water.
          4. Restricted movement and extreme heat.
        `),
      },
      {
        id: "confined-spaces-permits-rescue",
        title: "Entry Permits, Gas Testing and Rescue Readiness",
        duration: "25 minutes",
        type: "reading",
        content: dedent(`
          No worker may enter a confined space without formal authorisation and specialised training.

          Mandatory controls before entry include:
          1. A signed Confined Space Entry Permit.
          2. Isolation of all pipes, chutes and power sources (LOTO).
          3. Atmospheric gas testing before entry and continuous monitoring inside.
          4. A dedicated, trained standby attendant stationed outside at all times with communication gear.
          5. A verified emergency rescue plan and rescue equipment ready on site.
        `),
      },
      {
        id: "confined-space-collapse-scenario",
        title: "Emergency Inside a Confined Space",
        duration: "20 minutes",
        type: "scenario",
        content: dedent(`
          SCENARIO

          While working near an open storage tank, you look inside and see a colleague lying motionless on the floor. There is no visible injury, and no entry permit is posted.

          SAFE ACTION

          Never rush inside to pull them out—many confined space fatalities happen to would-be rescuers overcome by the exact same toxic or oxygen-deficient atmosphere. Raise the alarm immediately, call the emergency rescue team, keep others from entering and wait for trained responders equipped with breathing apparatus.
        `),
      },
      {
        id: "heights-confined-assessment",
        title: "Heights and Confined Spaces Assessment",
        duration: "25 minutes",
        type: "assessment",
        content:
          "Test your understanding of fall protection, confined space permits and emergency rules.",
        quiz: [
          {
            question: "What is required BEFORE entering a confined space?",
            options: [
              "A torch and a pair of gloves",
              "An authorised entry permit, atmospheric testing and a trained standby attendant",
              "Verbal permission from a colleague",
              "Opening the hatch for two minutes",
            ],
            correctIndex: 1,
            explanation:
              "Confined space entry requires formal permitting, isolation, atmospheric testing, a standby person and a rescue plan.",
          },
          {
            question:
              "When fall arrest equipment is required for working at heights, where must your lanyard be anchored?",
            options: [
              "To any nearby water pipe or cable tray",
              "To a loose scaffold plank",
              "To an approved, certified anchor point rated for fall arrest",
              "To your co-worker's belt",
            ],
            correctIndex: 2,
            explanation:
              "Only certified anchor points are engineered to withstand the force of a fall.",
          },
          {
            question:
              "You see a co-worker collapse inside a confined space. What should you do?",
            options: [
              "Do not enter without rescue gear; raise the alarm and activate the confined space rescue team",
              "Hold your breath and climb in immediately",
              "Lower an untrained colleague down on a rope",
              "Pour water inside to wake them up",
            ],
            correctIndex: 0,
            explanation:
              "Unplanned rescues often claim additional lives from invisible atmospheric hazards. Always activate trained rescue personnel.",
          },
        ],
      },
    ],
  },

  {
    id: "explosives-blasting-awareness",
    title: "Explosives and Blasting Safety Awareness",
    category: "Specialised Safety",
    description:
      "Understand blasting-area warning signs, restricted zones and the importance of following authorised instructions.",
    duration: "1.5 hours",
    level: "Intermediate",
    audience: ["miner"],
    
    lessons: [
      {
        id: "blasting-authorisation-and-hazards",
        title: "Explosives Hazards and Strict Authorisation",
        duration: "20 minutes",
        type: "reading",
        content: dedent(`
          Explosives are essential for breaking rock in mining, but they carry extreme risks including flyrock, airblast, toxic blasting fumes, vibration and unplanned detonation.

          Only certified, licensed and site-authorised blasting personnel may transport, store, handle or connect explosives and detonators.

          General workers must never touch explosives, detonators, shock tubes or blasting accessories. Keep flames, smoking materials and unauthorised radio transmitters well away from blasting areas and magazines.
        `),
      },
      {
        id: "blasting-zones-and-signals",
        title: "Blast Exclusion Zones, Sentries and Warning Signals",
        duration: "20 minutes",
        type: "reading",
        content: dedent(`
          Before any blast takes place, the blasting team establishes a clearly marked blast exclusion zone using red warning signs, cones, barricades and trained blast sentries.

          Follow these strict rules:
          1. Never cross a blast barricade or ignore a blast sentry's instructions.
          2. Learn your site's pre-blast warning sirens and radio announcements.
          3. Clear the exclusion zone promptly and move to the designated safe shelter or distance.
          4. Remain in the safe area until the Blaster-in-Charge announces the official all-clear and blast fumes have cleared.
        `),
      },
      {
        id: "blasting-misfires-post-blast",
        title: "Post-Blast Safety and Misfire Awareness",
        duration: "15 minutes",
        type: "reading",
        content: dedent(`
          After detonation, the blast area remains hazardous due to toxic fumes, unstable rock faces and the possibility of a misfire (unexploded charges or detonators).

          No worker may re-enter a blasted area until the Blaster-in-Charge has inspected the site, checked ventilation or fume clearance and officially declared it safe.

          If you ever spot unexploded cartridges, loose blasting wire or a suspected misfire during loading or excavation, stop immediately—never drill into, dig around or handle it.
        `),
      },
      {
        id: "blasting-misfire-scenario",
        title: "Discovering a Suspected Misfire",
        duration: "15 minutes",
        type: "scenario",
        content: dedent(`
          SCENARIO

          During post-blast mucking operations, you notice intact shock tube leads and what appears to be an unexploded booster lying in the broken rock pile.

          SAFE ACTION

          Stop all equipment and work in the area immediately. Do not touch, pull or disturb the material. Withdraw to a safe distance, prevent anyone else from approaching and report the exact location immediately to your supervisor and the Blaster-in-Charge so authorised specialists can manage the misfire safely.
        `),
      },
      {
        id: "blasting-assessment",
        title: "Explosives and Blasting Awareness Assessment",
        duration: "20 minutes",
        type: "assessment",
        content:
          "Test your understanding of blast exclusion zones, warning signals and misfire safety.",
        quiz: [
          {
            question:
              "Who is permitted to handle, load or connect explosives on a mine site?",
            options: [
              "Any experienced miner during a busy shift",
              "Equipment operators working near the blast bench",
              "Only trained, certified and authorised blasting personnel",
              "Anyone wearing high-visibility PPE",
            ],
            correctIndex: 2,
            explanation:
              "Handling explosives is strictly restricted by law and site rules to certified, authorised blasters.",
          },
          {
            question:
              "What must you do when a pre-blast warning siren sounds in your area?",
            options: [
              "Park behind a nearby rock pile to watch the blast",
              "Clear the blast exclusion zone immediately and move to the designated safe area until the all-clear is given",
              "Finish loading your truck before leaving",
              "Walk past the sentry if you are quick",
            ],
            correctIndex: 1,
            explanation:
              "Flyrock and blast fumes can travel far; everyone must evacuate to the approved safe zone until the official all-clear.",
          },
          {
            question:
              "What should you do if you discover a suspected misfire or unexploded material?",
            options: [
              "Keep clear, secure the area from a safe distance and notify the Blaster-in-Charge immediately",
              "Pull the wires gently to check if it is live",
              "Scoop it aside carefully with a shovel",
              "Continue working around it and report it at shift handover",
            ],
            correctIndex: 0,
            explanation:
              "Misfires can detonate unexpectedly if disturbed. Stop work, isolate the area and alert authorised blasting personnel immediately.",
          },
        ],
      },
    ],
  },
];

export default courses;