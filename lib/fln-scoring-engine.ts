'use client'

export interface FLNQuestion {
  id: string
  skillId: string
  skillName: string
  skillCategory: 'literacy' | 'numeracy'
  stageLabel: string
  questionGu: string
  questionEn: string
  questionHi?: string
  visualType: 'stars' | 'garden' | 'bundles' | 'decomposition' | 'pebbles'
  visualStimulus: {
    badge: string
    titleGu: string
    titleEn: string
    titleHi?: string
    detail: string
  }
  audioTranscriptGu: string
  audioTranscriptEn: string
  audioTranscriptHi?: string
  options: Array<{
    id: string
    labelGu: string
    labelEn: string
    labelHi?: string
    isCorrect: boolean
    misconceptionDiagnosis?: string
  }>
}

export const FLN_DIAGNOSTIC_QUESTIONS: FLNQuestion[] = [
  {
    id: 'q1',
    skillId: 'guj-matra',
    skillName: 'Gujarati Matra & Phonics (માત્રા અને મૂળાક્ષર ઓળખ)',
    skillCategory: 'literacy',
    stageLabel: 'પ્રશ્ન ૧ / ૫ · Question 1 of 5',
    questionGu: "આ ચિત્રમાં 'તારા' (Stars) છે. 'તારા' શબ્દમાં કઈ માત્રા આવે છે?",
    questionEn: "The picture shows 'તારા' (Stars). Which matra is used in the word 'તારા'?",
    questionHi: "इस चित्र में 'तारा' (Stars) है। 'तारा' शब्द में कौन सी मात्रा आती है?",
    visualType: 'stars',
    visualStimulus: {
      badge: '⭐⭐',
      titleGu: 'ત + ા + ર + ા = તારા',
      titleEn: 'Word Construction: Ta + aa + Ra + aa',
      titleHi: 'त + ा + र + ा = तारा',
      detail: 'કાના (ા) ની માત્રા ઓળખ · Matra Discrimination',
    },
    audioTranscriptGu:
      "આ ચિત્રમાં તારા છે. તારા શબ્દમાં કઈ માત્રા આવે છે? વિકલ્પો સાંભળો: કાનો 'ા', હ્રસ્વ ઇ 'િ', દીર્ઘ ઉ 'ૂ', કે એક માત્ર 'ે'.",
    audioTranscriptEn:
      "The picture shows 'Tara' (Stars). Which matra is used in 'Tara'? Options: Kano 'aa', Short 'i', Long 'u', or Ek matra 'e'.",
    audioTranscriptHi:
      "इस चित्र में तारा है। तारा शब्द में कौन सी मात्रा आती है? विकल्प सुनें: आ की मात्रा 'ा', छोटी इ 'ि', बड़ी ऊ 'ू', या ए की मात्रा 'े'।",
    options: [
      {
        id: 'opt-1a',
        labelGu: "કાનો 'ા' (ત + ા + ર + ા = તારા)",
        labelEn: "Kāno 'ā' vowel marker (Correct)",
        labelHi: "आ की मात्रा 'ा' (त + ा + र + ा = तारा) (सही)",
        isCorrect: true,
      },
      {
        id: 'opt-1b',
        labelGu: "હ્રસ્વ ઇ 'િ' (તિરા)",
        labelEn: "Hrasva 'i' (Child confused 'aa' with 'i')",
        labelHi: "छोटी इ की मात्रा 'િ' (तिरा - स्वर भ्रम)",
        isCorrect: false,
        misconceptionDiagnosis:
          "Child confused the open Kāno ('ā') sound with the preceding vowel sign ('i'). Prerequisite gap in phonemic vowel length discrimination.",
      },
      {
        id: 'opt-1c',
        labelGu: "દીર્ઘ ઉ 'ૂ' (તૂરુ)",
        labelEn: "Dirgha 'u' vowel sign",
        labelHi: "बड़ी ऊ की मात्रा 'ૂ' (तूरु - स्वर भ्रम)",
        isCorrect: false,
        misconceptionDiagnosis:
          "Child randomly guessed a rounded vowel sign ('u'). Suggests unfamiliarity with Gujarati primary vowel symbols.",
      },
      {
        id: 'opt-1d',
        labelGu: "એક માત્ર 'ે' (તેરે)",
        labelEn: "Ek matra 'e'",
        labelHi: "एक मात्र 'ે' (तेरे - मात्रा भ्रम)",
        isCorrect: false,
        misconceptionDiagnosis:
          "Child selected the top matra ('e') instead of the vertical stroke Kāno ('ā'). Visual symbol confusion.",
      },
    ],
  },
  {
    id: 'q2',
    skillId: 'guj-comprehension',
    skillName: 'Gujarati Sentence Comprehension (સરળ વાક્ય સમજ)',
    skillCategory: 'literacy',
    stageLabel: 'પ્રશ્ન ૨ / ૫ · Question 2 of 5',
    questionGu: "વાંચો: 'મીના બાગમાં ફૂલ ચૂંટે છે.' મીના ક્યાં ફૂલ ચૂંટે છે?",
    questionEn: "Read: 'Meena plucks flowers in the garden.' Where does Meena pluck flowers?",
    questionHi: "पढ़ें: 'मीना बाग में फूल चुनती है।' मीना कहाँ फूल चुनती है?",
    visualType: 'garden',
    visualStimulus: {
      badge: '🌸 🏡',
      titleGu: 'મીના બાગમાં ફૂલ ચૂંટે છે.',
      titleEn: 'Short Decodable Sentence',
      titleHi: 'मीना बाग में फूल चुनती है।',
      detail: 'સરળ વાક્ય અર્થગ્રહણ · Contextual Comprehension',
    },
    audioTranscriptGu:
      "વાંચો: મીના બાગમાં ફૂલ ચૂંટે છે. મીના ક્યાં ફૂલ ચૂંટે છે? વિકલ્પો સાંભળો: બાગમાં, શાળામાં, ઘરમાં, કે નદીએ.",
    audioTranscriptEn:
      "Read: Meena plucks flowers in the garden. Where does Meena pluck flowers? Options: In the garden, in school, at home, or by the river.",
    audioTranscriptHi:
      "पढ़ें: मीना बाग में फूल चुनती है। मीना कहाँ फूल चुनती है? विकल्प सुनें: बाग में, स्कूल में, घर में, या नदी किनारे।",
    options: [
      {
        id: 'opt-2a',
        labelGu: 'બાગમાં (In the garden)',
        labelEn: 'In the garden (Correct contextual retrieval)',
        labelHi: 'बाग में (In the garden - सही उत्तर)',
        isCorrect: true,
      },
      {
        id: 'opt-2b',
        labelGu: 'શાળામાં (In school)',
        labelEn: 'In school (Unrelated environment guess)',
        labelHi: 'स्कूल में (In school - शब्द अनुमान)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Child relied on familiar school vocabulary rather than extracting the location word 'બાગમાં' from the text.",
      },
      {
        id: 'opt-2c',
        labelGu: 'ઘરમાં (At home)',
        labelEn: 'At home (Contextual guess)',
        labelHi: 'घर में (At home - अनुमान)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Child did not retain the locational noun across the 5-word sentence; indicates working memory load during sentence decoding.",
      },
      {
        id: 'opt-2d',
        labelGu: 'નદીએ (By the river)',
        labelEn: 'By the river (Phonetic guess)',
        labelHi: 'नदी किनारे (By the river - असंबद्ध अनुमान)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Child made an unguided visual guess without reading the sentence.",
      },
    ],
  },
  {
    id: 'q3',
    skillId: 'num-bundling',
    skillName: 'Place Value & Bundling (દસ અને એકમનું જૂથ નિર્માણ)',
    skillCategory: 'numeracy',
    stageLabel: 'પ્રશ્ન ૩ / ૫ · Question 3 of 5',
    questionGu: 'ચિત્રમાં ૩ દસની સળીઓની ભારી (૩ દસકા) અને ૪ છૂટી સળીઓ છે. કુલ કેટલી સળીઓ થાય?',
    questionEn:
      'The picture shows 3 bundles of 10 sticks (3 tens) and 4 loose sticks (4 units). How many sticks altogether?',
    questionHi: 'चित्र में १० तीलियों के ३ बंडल (३ दहाई) और ४ खुली तीलियाँ (४ इकाई) हैं। कुल कितनी तीलियाँ हुईं?',
    visualType: 'bundles',
    visualStimulus: {
      badge: '🥢🥢🥢 | | | |',
      titleGu: '૩ દસકા (૩૦) + ૪ એકમ (૪)',
      titleEn: '3 Bundles of Ten (30) + 4 Loose Sticks (4)',
      titleHi: '३ दहाई (३०) + ४ इकाई (४)',
      detail: 'દસ અને એકમનું સ્થાન મૂલ્ય · Concrete Bundling to Abstract Number',
    },
    audioTranscriptGu:
      'ચિત્રમાં ત્રણ દસની ભારી અને ચાર છૂટી સળીઓ છે. કુલ કેટલી સળીઓ થાય? વિકલ્પો: ચોત્રીસ ૩૪, ત્રેતાળીસ ૪૩, સાત ૭, કે ત્રણસો ચાલીસ ૩૪૦.',
    audioTranscriptEn:
      'The picture shows 3 bundles of ten and 4 loose sticks. How many sticks in total? Options: 34, 43, 7, or 340.',
    audioTranscriptHi:
      'चित्र में दस के तीन बंडल और चार खुली तीलियाँ हैं। कुल कितनी तीलियाँ हुईं? विकल्प: चौंतीस ३४, तैंतालीस ४३, सात ७, या तीन सौ चालीस ३४०।',
    options: [
      {
        id: 'opt-3a',
        labelGu: '૩૪ (34: ૩ દસકા અને ૪ એકમ)',
        labelEn: '34 (3 tens and 4 units - Correct)',
        labelHi: '३४ (34: ३ दहाई और ४ इकाई - सही उत्तर)',
        isCorrect: true,
      },
      {
        id: 'opt-3b',
        labelGu: '૪૩ (43: ૪ દસકા અને ૩ એકમ)',
        labelEn: '43 (Positional inversion: wrote units in tens column)',
        labelHi: '४३ (43: स्थान उलटफेर - दहाई व इकाई की उलझन)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Positional Reversal: Child accurately recognized the quantities 3 and 4, but inverted the tens and ones place value order, writing 43 instead of 34.",
      },
      {
        id: 'opt-3c',
        labelGu: '૭ (7: ૩ + ૪)',
        labelEn: '7 (Added face values 3 + 4, ignoring the ten-bundles)',
        labelHi: '७ (7: बंडल को नज़रअंदाज़ कर ३ + ४ जोड़ दिया)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Additive Misconception: Child added 3 + 4 = 7 directly, failing to recognize each bundle as representing 10 discrete units.",
      },
      {
        id: 'opt-3d',
        labelGu: '૩૪૦ (340: સ્થાન મૂલ્ય ભ્રમ)',
        labelEn: '340 (Juxtaposed digits with trailing zero)',
        labelHi: '३४० (340: दहाई के साथ शून्य लगाने का भ्रम)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Symbolic Overgeneralization: Child associated 'tens' with adding a zero, resulting in 340.",
      },
    ],
  },
  {
    id: 'q4',
    skillId: 'num-decomposition',
    skillName: 'Number Decomposition & Expanded Form (સંખ્યા વિસ્તરણ)',
    skillCategory: 'numeracy',
    stageLabel: 'પ્રશ્ન ૪ / ૫ · Question 4 of 5',
    questionGu: 'સંખ્યા ૪૭ (47) નું સાચું વિસ્તરણ કયું છે?',
    questionEn: 'Which is the correct expanded form of the number 47?',
    questionHi: 'संख्या ४७ (47) का सही विस्तारित रूप कौन सा है?',
    visualType: 'decomposition',
    visualStimulus: {
      badge: '🔢 [ ૪૭ ]',
      titleGu: '૪૭ = [ ? ] + [ ? ]',
      titleEn: 'Tens Value + Units Value',
      titleHi: '४७ = [ ? ] + [ ? ]',
      detail: 'દશકનું મૂલ્ય (૪૦) અને એકમનું મૂલ્ય (૭) · Expanded Notation',
    },
    audioTranscriptGu:
      'સંખ્યા સુડતાલીસ ૪૭ નું સાચું વિસ્તરણ કયું છે? વિકલ્પો સાંભળો: ચાલીસ વત્તા સાત, ચાર વત્તા સાત, ચારસો વત્તા સાત, કે સુડતાલીસ વત્તા દસ.',
    audioTranscriptEn:
      'Which is the correct expansion of 47? Options: 40 + 7, 4 + 7, 400 + 7, or 47 + 10.',
    audioTranscriptHi:
      'संख्या सैंतालीस ४७ का सही विस्तार कौन सा है? विकल्प सुनें: चालीस जमा सात, चार जमा सात, चार सौ जमा सात, या सैंतालीस जमा दस।',
    options: [
      {
        id: 'opt-4a',
        labelGu: '૪૦ + ૭ (40 + 7)',
        labelEn: '40 + 7 (Tens value 40 and units value 7 - Correct)',
        labelHi: '४० + ७ (40 + 7 - सही विस्तार)',
        isCorrect: true,
      },
      {
        id: 'opt-4b',
        labelGu: '૪ + ૭ (4 + 7)',
        labelEn: '4 + 7 (Face-value error: digit 4 taken as 4 instead of 40)',
        labelHi: '४ + ७ (4 + 7 - स्थानीय मान की जगह अंकित मान)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Face-Value Error: Child treated the tens digit '4' as having a value of 4 rather than 40. Prerequisite gap in understanding decade base values.",
      },
      {
        id: 'opt-4c',
        labelGu: '૪૦૦ + ૭ (400 + 7)',
        labelEn: '400 + 7 (Confused hundred place with ten place)',
        labelHi: '४०० + ७ (400 + 7 - सैकड़े का भ्रम)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Place Scale Confusion: Child mistakenly scaled the tens digit to hundreds.",
      },
      {
        id: 'opt-4d',
        labelGu: '૪૭ + ૧૦ (47 + 10)',
        labelEn: '47 + 10 (Additive addition confusion)',
        labelHi: '४७ + १० (47 + 10 - संक्रियात्मक भ्रम)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Operational Confusion: Child confused number expansion with adding ten.",
      },
    ],
  },
  {
    id: 'q5',
    skillId: 'num-regrouping',
    skillName: 'Regrouping Intuition (દસકો અને જૂથ રૂપાંતર પૂર્વતૈયારી)',
    skillCategory: 'numeracy',
    stageLabel: 'પ્રશ્ન ૫ / ૫ · Question 5 of 5',
    questionGu: 'આરવ પાસે ૧૮ કાંકરા છે. તેમાંથી ૧૦-૧૦ ના કેટલા જૂથ બને અને કેટલા છૂટા વધે?',
    questionEn:
      'Aarav has 18 pebbles. How many bundles of 10 can he form, and how many loose pebbles remain?',
    questionHi: 'आरव के पास १८ कंकड़ हैं। इनमें से १०-१० के कितने समूह बनेंगे और कितने कंकड़ खुले बचेंगे?',
    visualType: 'pebbles',
    visualStimulus: {
      badge: '⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪ + ⚪⚪⚪⚪⚪⚪⚪⚪',
      titleGu: '૧૮ કાંકરા = ૧ જૂથ (૧૦) + ૮ છૂટા',
      titleEn: '18 Pebbles = 1 Group of 10 + 8 Loose',
      titleHi: '१८ कंकड़ = १ समूह (१०) + ८ खुले',
      detail: 'દસ એકમ = ૧ દશક (૧૦) · Concrete Grouping Prerequisite for Regrouping',
    },
    audioTranscriptGu:
      'આરવ પાસે અઢાર કાંકરા છે. તેમાંથી દસ દસના કેટલા જૂથ બને અને કેટલા છૂટા વધે? વિકલ્પો: એક જૂથ અને આઠ છૂટા, બે જૂથ અને બે છૂટા, કે આઠ જૂથ અને એક છૂટો.',
    audioTranscriptEn:
      'Aarav has 18 pebbles. How many groups of 10 can he make, and how many loose ones remain? Options: 1 group and 8 loose, 2 groups and 2 loose, or 8 groups and 1 loose.',
    audioTranscriptHi:
      'आरव के पास अठारह कंकड़ हैं। इनमें से दस-दस के कितने समूह बनेंगे और कितने कंकड़ खुले बचेंगे? विकल्प: १ समूह और ८ खुले, २ समूह और २ खुले, या ८ समूह और १ खुला।',
    options: [
      {
        id: 'opt-5a',
        labelGu: '૧ જૂથ (૧ દશક) અને ૮ છૂટા (1 bundle of 10, 8 loose)',
        labelEn: '1 bundle of 10 and 8 loose (Correct regrouping)',
        labelHi: '१ समूह (१ दहाई) और ८ खुले (सही उत्तर)',
        isCorrect: true,
      },
      {
        id: 'opt-5b',
        labelGu: '૨ જૂથ અને ૨ છૂટા (2 bundles of 10, 2 loose)',
        labelEn: '2 bundles and 2 loose (Over-counting ten bundles)',
        labelHi: '२ समूह और २ खुले (अति-अनुमान)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Rounding Overestimation: Child overestimated the number of full tens contained in 18, anticipating 20.",
      },
      {
        id: 'opt-5c',
        labelGu: '૮ જૂથ અને ૧ છૂટો (8 bundles, 1 loose)',
        labelEn: '8 bundles and 1 loose (Inverted units and tens grouping)',
        labelHi: '८ समूह और १ खुला (समूह और खुले का उलटफेर)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Grouping Reversal: Child swapped the quotient and remainder, treating loose items as groups.",
      },
      {
        id: 'opt-5d',
        labelGu: 'એક પણ જૂથ ન બને (Cannot make any bundle)',
        labelEn: 'Cannot make any bundle (Underestimating 18 > 10)',
        labelHi: 'एक भी समूह नहीं बनेगा (दहाई सीमा न पहचानना)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Benchmark Failure: Child failed to recognize that 18 exceeds the threshold of 10.",
      },
    ],
  },
]

export interface SkillResult {
  skillId: string
  skillName: string
  skillCategory: 'literacy' | 'numeracy'
  questionsCount: number
  attemptedCount: number
  correctCount: number
  scorePercent: number
  coveragePercent?: number
  status: 'Mastered' | 'Emerging' | 'Probable Gap' | 'Insufficient Evidence'
  statusBadge: string
  isProbableGap: boolean
  isInsufficientEvidence: boolean
  explanation: string
  recommendation: string
}

export interface RecommendationEvidence {
  questionId: string
  questionText: string
  skillName: string
  chosenOptionLabel: string
  targetOptionLabel: string
  isCorrect: boolean
  isAttempted: boolean
  misconceptionDiagnosis: string
  pedagogicalEvidence: string
}

export interface RecommendedActivity {
  id: string
  dayNumber: number
  title: string
  titleGu: string
  duration: string
  focusSkill: string
  description: string
  materialsNeeded: string
  teacherScript: string
  status: 'ready' | 'locked' | 'completed'
}

export interface DiagnosticEvaluationResult {
  overallScore: number
  accuracyPercent: number
  evidenceCoveragePercent: number
  totalQuestions: number
  attemptedQuestionsCount: number
  correctAnswersCount: number
  skills: SkillResult[]
  evidences: RecommendationEvidence[]
  learningSequence: string[]
  recommendedActivities: RecommendedActivity[]
  probableGapsCount: number
  insufficientEvidenceCount: number
  validatedGapsCount: number
  pedagogicalSummary: string
  clearNextStep: {
    title: string
    actionText: string
    dueText: string
    activityId: string
  }
}

/**
 * Pure explainable scoring engine.
 * Takes submitted answers and deterministically produces skill breakdown,
 * evidence trails, learning sequence, and daily activities.
 * Clearly separates 'Insufficient Evidence' (unattempted questions)
 * from 'Probable Gap' (demonstrated need for practice based on errors).
 */
export function evaluateFLNDiagnostic(
  answers: Record<string, string>,
  teacherObservations: string = ''
): DiagnosticEvaluationResult {
  const totalQuestions = FLN_DIAGNOSTIC_QUESTIONS.length
  let correctCount = 0
  let attemptedCount = 0
  const evidences: RecommendationEvidence[] = []

  // Group questions by skill
  const skillMap: Record<
    string,
    {
      skillName: string
      category: 'literacy' | 'numeracy'
      questions: FLNQuestion[]
      attempted: number
      correct: number
    }
  > = {}

  FLN_DIAGNOSTIC_QUESTIONS.forEach((q) => {
    if (!skillMap[q.skillId]) {
      skillMap[q.skillId] = {
        skillName: q.skillName,
        category: q.skillCategory,
        questions: [],
        attempted: 0,
        correct: 0,
      }
    }
    skillMap[q.skillId].questions.push(q)

    const chosenOptionId = answers[q.id]
    const isAttempted = Boolean(chosenOptionId && chosenOptionId.trim() !== '')
    const chosenOption = isAttempted ? q.options.find((opt) => opt.id === chosenOptionId) : undefined
    const targetOption = q.options.find((opt) => opt.isCorrect)!

    const isCorrect = chosenOption ? chosenOption.isCorrect : false
    if (isAttempted) {
      attemptedCount += 1
      skillMap[q.skillId].attempted += 1
    }
    if (isCorrect) {
      correctCount += 1
      skillMap[q.skillId].correct += 1
    }

    evidences.push({
      questionId: q.id,
      questionText: `${q.questionGu} (${q.questionEn})`,
      skillName: q.skillName,
      chosenOptionLabel: isAttempted && chosenOption
        ? `${chosenOption.labelGu} - ${chosenOption.labelEn}`
        : 'Unattempted (No response submitted)',
      targetOptionLabel: `${targetOption.labelGu} - ${targetOption.labelEn}`,
      isCorrect,
      isAttempted,
      misconceptionDiagnosis: !isAttempted
        ? 'Insufficient Evidence: Question unattempted. Cannot deduce misconception without observational sample.'
        : isCorrect
        ? 'Correct answer demonstrated: Solid conceptual grasp of this micro-competency.'
        : chosenOption?.misconceptionDiagnosis ||
          'Incorrect response indicates demonstrated need for prerequisite foundational support.',
      pedagogicalEvidence: !isAttempted
        ? 'Item was skipped/unattempted. Requires brief 1-on-1 teacher oral verification.'
        : isCorrect
        ? 'Learner accurately identified target concept without positional or symbolic errors.'
        : `Learner selected '${chosenOption?.labelGu || 'None'}' instead of '${targetOption.labelGu}'. Misconception: ${
            chosenOption?.misconceptionDiagnosis || 'Incomplete prerequisite mental model.'
          }`,
    })
  })

  const accuracyPercent = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0
  const evidenceCoveragePercent = totalQuestions > 0 ? Math.round((attemptedCount / totalQuestions) * 100) : 0
  const overallScore = accuracyPercent

  // Compute skill-level results
  const skills: SkillResult[] = Object.entries(skillMap).map(([sId, data]) => {
    const qCount = data.questions.length
    const sAttempted = data.attempted
    const sCorrect = data.correct
    const sPercent = sAttempted > 0 ? Math.round((sCorrect / sAttempted) * 100) : 0
    const sCoverage = qCount > 0 ? Math.round((sAttempted / qCount) * 100) : 0

    let status: SkillResult['status'] = 'Mastered'
    let statusBadge = 'Demonstrated Mastery'
    let isProbableGap = false
    let isInsufficientEvidence = false
    let explanation = 'Student reliably applied this micro-skill in the screening check.'
    let recommendation = 'Maintain automaticity through occasional small-group games.'

    if (sAttempted === 0) {
      status = 'Insufficient Evidence'
      statusBadge = 'Insufficient Evidence (Unattempted)'
      isInsufficientEvidence = true
      isProbableGap = false
      explanation = 'No answers were recorded for this skill check. Insufficient diagnostic evidence to infer gap or mastery.'
      recommendation = 'Administer brief 2-minute oral check during foundational period to gather observation data.'
    } else if (sPercent < 50) {
      status = 'Probable Gap'
      statusBadge = 'Demonstrated Need for Practice (Probable Gap)'
      isProbableGap = true
      explanation =
        'Response pattern indicates a demonstrated need for prerequisite practice. Single-assessment screening signal; requires teacher classroom confirmation.'
      recommendation =
        'Target with tactile classroom manipulatives (10-15 mins/day) before introducing symbolic worksheets.'
    } else if (sPercent < 100) {
      status = 'Emerging'
      statusBadge = 'Emerging (Reinforcement Recommended)'
      explanation = 'Partial competence shown. Learner occasionally hesitates with abstract representations.'
      recommendation = 'Provide 2-3 guided peer partner practice exercises.'
    }

    return {
      skillId: sId,
      skillName: data.skillName,
      skillCategory: data.category,
      questionsCount: qCount,
      attemptedCount: sAttempted,
      correctCount: sCorrect,
      scorePercent: sPercent,
      coveragePercent: sCoverage,
      status,
      statusBadge,
      isProbableGap,
      isInsufficientEvidence,
      explanation,
      recommendation,
    }
  })

  const probableGapsCount = skills.filter((s) => s.isProbableGap).length
  const insufficientEvidenceCount = skills.filter((s) => s.isInsufficientEvidence).length

  // Handle completely unattempted assessment
  if (attemptedCount === 0) {
    const unattemptedActivity: RecommendedActivity = {
      id: 'act-oral-baseline',
      dayNumber: 1,
      title: 'Foundational Baseline Screening Check (1-on-1)',
      titleGu: 'પાયાનું નિદાન મૂલ્યાંકન (૧-ઓન-૧ મૌખિક ચકાસણી)',
      duration: '5 mins',
      focusSkill: 'Oral Foundational Assessment',
      description:
        'Conduct a 5-minute 1-on-1 oral check using concrete counters and picture flashcards to establish baseline literacy and numeracy competencies.',
      materialsNeeded: 'FLN flashcard set and counting counters.',
      teacherScript: 'વિદ્યાર્થી સાથે શાંતિથી બેસો અને ચિત્ર તથા સંખ્યા કાર્ડ બતાવી મૌખિક પ્રશ્નો પૂછો.',
      status: 'ready',
    }

    return {
      overallScore: 0,
      accuracyPercent: 0,
      evidenceCoveragePercent: 0,
      totalQuestions,
      attemptedQuestionsCount: 0,
      correctAnswersCount: 0,
      skills,
      evidences,
      learningSequence: ['Step 1: Administer 1-on-1 oral screening check to establish baseline evidence'],
      recommendedActivities: [unattemptedActivity],
      probableGapsCount: 0,
      insufficientEvidenceCount: skills.length,
      validatedGapsCount: 0,
      pedagogicalSummary:
        'Assessment submitted with 0 attempted questions (0% evidence coverage). Insufficient diagnostic evidence to deduce learning gaps. Schedule a brief 1-on-1 oral check with the student.',
      clearNextStep: {
        title: 'Conduct 1-on-1 Oral Baseline Screening',
        actionText: 'Start Oral Screening',
        dueText: 'Immediate priority for foundational baseline',
        activityId: unattemptedActivity.id,
      },
    }
  }

  // Build logical recommended learning sequence based on observed gaps
  const learningSequence: string[] = []
  const recommendedActivities: RecommendedActivity[] = []

  let dayTracker = 1

  // 1. Check Gujarati Matra
  const matraSkill = skills.find((s) => s.skillId === 'guj-matra')
  if (matraSkill && matraSkill.isProbableGap) {
    learningSequence.push('Step 1: Phonics & Matra Tactile Flashcards (ગુજરાતી માત્રા ઓળખ પૂર્વતૈયારી)')
    recommendedActivities.push({
      id: `act-gen-${dayTracker}`,
      dayNumber: dayTracker++,
      title: 'Gujarati Matra Sound Sorting: Kāno (ા) and Hrasva (િ)',
      titleGu: 'માત્રા કાર્ડ વર્ગીકરણ: કાનો અને હ્રસ્વ ઇ',
      duration: '10 mins',
      focusSkill: 'Gujarati Matra Discrimination',
      description: 'Sort 8 picture cards into baskets marked with Kāno (ા) and Hrasva (િ). Speak each word aloud.',
      materialsNeeded: '8 illustrated picture flashcards (તારા, માળા, ચિત્ર, દિન) and 2 sorting trays.',
      teacherScript:
        "પૂછો: 'તારા' બોલતી વખતે મોં ખૂલે છે? કઈ માત્રા આવશે? સુંદર, કાનો 'ા' વાળા ખાનામાં મૂકો.",
      status: 'ready',
    })
  }

  // 2. Check Gujarati Comprehension
  const compSkill = skills.find((s) => s.skillId === 'guj-comprehension')
  if (compSkill && compSkill.isProbableGap) {
    learningSequence.push('Step 2: Shared Sentence Whisper-Reading (વાક્ય અર્થગ્રહણ)')
    recommendedActivities.push({
      id: `act-gen-${dayTracker}`,
      dayNumber: dayTracker++,
      title: 'Sentence Picture-Match: Who and Where',
      titleGu: 'વાક્ય અને ચિત્ર જોડ: કોણ અને ક્યાં?',
      duration: '12 mins',
      focusSkill: 'Gujarati Sentence Context',
      description: 'Read 3 simple 5-word decodable sentences with a peer partner and match each sentence to its picture.',
      materialsNeeded: 'Laminated sentence strips and 3 contextual scene cards.',
      teacherScript: "વાક્ય વાંચ્યા પછી પૂછો: 'મીના ક્યાં છે?' વાક્યમાં 'બાગમાં' શબ્દ નીચે આંગળી મૂકવા કહો.",
      status: dayTracker === 2 ? 'ready' : 'locked',
    })
  }

  // 3. Check Place Value Bundling
  const bundleSkill = skills.find((s) => s.skillId === 'num-bundling')
  if (bundleSkill && bundleSkill.isProbableGap) {
    learningSequence.push('Step 3: Concrete Bundling with Straws & Rubber Bands (દસની ભારી બનાવવી)')
    recommendedActivities.push({
      id: `act-gen-${dayTracker}`,
      dayNumber: dayTracker++,
      title: 'Pencil & Straw Bundles: Grouping 10s and 1s',
      titleGu: 'સળી અને રબરબેન્ડ: દસ દસની ભારી અને છૂટી સળીઓ',
      duration: '12 mins',
      focusSkill: 'Place Value Bundling (Prerequisite for Regrouping)',
      description: 'Use physical bundles of 10 straws and single loose straws to physically build numbers 21 to 49.',
      materialsNeeded: '40 drinking straws, 5 rubber bands, and a dual-column sorting board.',
      teacherScript:
        "આરવને ૩૪ બનાવવા કહો. પૂછો: 'દસ દસની કેટલી ભારી જોઈશે? છૂટી કેટલી જોઈશે?' સ્થાન કિંમત બોર્ડ પર ગોઠવડાવો.",
      status: dayTracker === 2 || dayTracker === 1 ? 'ready' : 'locked',
    })
  }

  // 4. Check Number Decomposition
  const decompSkill = skills.find((s) => s.skillId === 'num-decomposition')
  if (decompSkill && decompSkill.isProbableGap) {
    learningSequence.push('Step 4: Dual-Column Tens Mat & Expanded Form Cards (૪૦ + ૭ = ૪૭)')
    recommendedActivities.push({
      id: `act-gen-${dayTracker}`,
      dayNumber: dayTracker++,
      title: 'Expanded Decade Cards Puzzle (૪૦ + ૭ = ૪૭)',
      titleGu: 'વિસ્તરણ કાર્ડ રમત: ૪૦ અને ૭ ભેગા કરો',
      duration: '15 mins',
      focusSkill: 'Number Decomposition & Decade Base Value',
      description: 'Overlay tens cards (10, 20, 30, 40) with unit cards (1-9) to see how 40 + 7 forms 47 without hiding the 40.',
      materialsNeeded: 'Montessori-style arrow place value cards (10-90, 1-9).',
      teacherScript:
        "૪૦ નું કાર્ડ બતાવો. તેના પર ૭ નું કાર્ડ મૂકો. ૪૭ બન્યા! ૭ હટાવીને પૂછો: 'આ ૪ નું મૂલ્ય કેટલું છે? ૪ કે ૪૦?'",
      status: 'locked',
    })
  }

  // 5. Check Regrouping Intuition
  const regroupSkill = skills.find((s) => s.skillId === 'num-regrouping')
  if (regroupSkill && regroupSkill.isProbableGap) {
    learningSequence.push('Step 5: Decade Leap Pebble Exchange (૧૦ એકમ = ૧ દશક રૂપાંતર)')
    recommendedActivities.push({
      id: `act-gen-${dayTracker}`,
      dayNumber: dayTracker++,
      title: 'Decade Leap Partner Game: Pebble Exchange',
      titleGu: 'દસકો કૂદકો: ૧૦ કાંકરા બદલીને ૧ ભારી મેળવો',
      duration: '10 mins',
      focusSkill: 'Concrete Regrouping Intuition',
      description: 'Roll dice, collect counters; as soon as counter count reaches 10, exchange them for 1 colored token.',
      materialsNeeded: '20 counters, 5 gold tokens (representing tens), 1 dice.',
      teacherScript: "જેવા ૧૦ કાંકરા થાય એટલે 'દસકો!' બોલીને ૧ પીળી ટોકન મેળવો. હાથમાં કેટલા છૂટા વધ્યા તે ગણો.",
      status: 'locked',
    })
  }

  // Fallback if student mastered everything
  if (learningSequence.length === 0) {
    learningSequence.push('Step 1: Foundational Automaticity Maintenance (દ્રઢીકરણ અને આગળનું પગથિયું)')
    learningSequence.push('Step 2: 3-Digit Number Exploration & Short Paragraph Reading')
    recommendedActivities.push({
      id: 'act-gen-mastery',
      dayNumber: 1,
      title: 'Advanced Number Sequences & Paragraph Reading',
      titleGu: '૩-અંકી સંખ્યા અને ટૂંકી વાર્તા વાચન',
      duration: '15 mins',
      focusSkill: 'Class 3 Extension',
      description: 'Explore 3-digit benchmarks on an open number line and read a 4-sentence folktale independently.',
      materialsNeeded: 'Open number line strip and Class 3 supplementary reader.',
      teacherScript: 'સંખ્યા રેખા પર ૧૦૦ થી ૧૫૦ વચ્ચે અંદાજ લગાવો અને વાર્તા મોટેથી વાંચો.',
      status: 'ready',
    })
  }

  // Pedagogical summary text
  const pedagogicalSummary =
    probableGapsCount > 0
      ? `Screening check completed. Identified ${probableGapsCount} probable learning gap(s) centered on ${skills
          .filter((s) => s.isProbableGap)
          .map((s) => s.skillName.split('(')[0].trim())
          .join(
            ' and '
          )}. Note: This is an initial screening indicator, not a definitive diagnosis. Conduct tactile verification in small-group time.`
      : `Screening check completed with high baseline competence (${overallScore}%). Student demonstrates solid foundational mastery in both Gujarati phonics and place value basics.`

  // First recommended activity as next action
  const firstActivity = recommendedActivities[0]

  return {
    overallScore,
    accuracyPercent,
    evidenceCoveragePercent,
    totalQuestions,
    attemptedQuestionsCount: attemptedCount,
    correctAnswersCount: correctCount,
    skills,
    evidences,
    learningSequence,
    recommendedActivities,
    probableGapsCount,
    insufficientEvidenceCount,
    validatedGapsCount: 0,
    pedagogicalSummary,
    clearNextStep: {
      title: `Start Day 1 Practice: ${firstActivity.title}`,
      actionText: 'Begin Guided Classroom Activity',
      dueText: 'Scheduled for morning foundational circle',
      activityId: firstActivity.id,
    },
  }
}
