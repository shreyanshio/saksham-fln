import { Question } from '@/lib/types'
import { localStore, STORAGE_KEYS } from '@/lib/storage'
import { FLN_DIAGNOSTIC_QUESTIONS } from '@/lib/fln-scoring-engine'

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-guj-01',
    skillId: 'guj-matra',
    skillName: 'Gujarati Matra & Phonics (માત્રા અને મૂળાક્ષર ઓળખ)',
    prerequisiteSkillIds: ['guj-vyanjan'],
    gradeRange: 'Class 2-3',
    locale: 'gu',
    difficulty: 'Foundation',
    type: 'multiple_choice',
    prompt: "આ ચિત્રમાં 'તારા' (Stars) છે. 'તારા' શબ્દમાં કઈ માત્રા આવે છે?",
    promptGu: "આ ચિત્રમાં 'તારા' (Stars) છે. 'તારા' શબ્દમાં કઈ માત્રા આવે છે?",
    promptEn: "The picture shows 'તારા' (Stars). Which matra is used in the word 'તારા'?",
    promptHi: "इस चित्र में 'तारा' (Stars) है। 'तारा' शब्द में कौन सी मात्रा आती है?",
    options: [
      { id: 'opt-1a', labelGu: "કાનો 'ા' (ત + ા + ર + ા = તારા)", labelEn: "Kāno 'ā' vowel marker (Correct)", labelHi: "आ की मात्रा 'ા' (त + ा + र + ा = तारा) (सही)", isCorrect: true },
      { id: 'opt-1b', labelGu: "હ્રસ્વ ઇ 'િ' (તિરા)", labelEn: "Short 'i'", labelHi: "छोटी इ की मात्रा 'િ' (तिरा)", isCorrect: false, misconceptionDiagnosis: "Confused 'aa' with 'i'." },
      { id: 'opt-1c', labelGu: "દીર્ઘ ઉ 'ૂ' (તૂરુ)", labelEn: "Long 'u'", labelHi: "बड़ी ऊ की मात्रा 'ૂ' (तूरु)", isCorrect: false, misconceptionDiagnosis: "Vowel symbol confusion." },
      { id: 'opt-1d', labelGu: "એક માત્ર 'ે' (તેરે)", labelEn: "Top matra 'e'", labelHi: "एक मात्र 'ે' (तेरे)", isCorrect: false, misconceptionDiagnosis: "Top stroke confusion." },
    ],
    correctAnswer: 'opt-1a',
    explanation: "'તારા' શબ્દમાં ત અને ર બંને અક્ષરો સાથે કાનો 'ા' જોડાયેલો છે.",
    reviewStatus: 'Published',
  },
  {
    id: 'q-guj-02',
    skillId: 'guj-comprehension',
    skillName: 'Gujarati Sentence Comprehension (સરળ વાક્ય સમજ)',
    prerequisiteSkillIds: ['guj-matra', 'guj-word-decoding'],
    gradeRange: 'Class 3',
    locale: 'gu',
    difficulty: 'Developing',
    type: 'multiple_choice',
    prompt: "વાંચો: 'મીના બાગમાં ફૂલ ચૂંટે છે.' મીના ક્યાં ફૂલ ચૂંટે છે?",
    promptGu: "વાંચો: 'મીના બાગમાં ફૂલ ચૂંટે છે.' મીના ક્યાં ફૂલ ચૂંટે છે?",
    promptEn: "Read: 'Meena plucks flowers in the garden.' Where does Meena pluck flowers?",
    promptHi: "पढ़ें: 'मीना बाग में फूल चुनती है।' मीना कहाँ फूल चुनती है?",
    options: [
      { id: 'opt-2a', labelGu: 'બાગમાં (In the garden)', labelEn: 'In the garden (Correct retrieval)', labelHi: 'बाग में (In the garden - सही)', isCorrect: true },
      { id: 'opt-2b', labelGu: 'શાળામાં (In school)', labelEn: 'In school', labelHi: 'स्कूल में (In school)', isCorrect: false, misconceptionDiagnosis: "Relying on school vocabulary guess." },
      { id: 'opt-2c', labelGu: 'ઘરમાં (At home)', labelEn: 'At home', labelHi: 'घर में (At home)', isCorrect: false, misconceptionDiagnosis: "Contextual guess without decoding text." },
      { id: 'opt-2d', labelGu: 'નદીએ (By the river)', labelEn: 'By the river', labelHi: 'नदी किनारे (By the river)', isCorrect: false, misconceptionDiagnosis: "Unrelated guess." },
    ],
    correctAnswer: 'opt-2a',
    explanation: "વાક્યમાં સ્પષ્ટ લખ્યું છે કે 'મીના બાગમાં ફૂલ ચૂંટે છે', એટલે સ્થળ 'બાગમાં' છે.",
    reviewStatus: 'Published',
  },
  {
    id: 'q-num-01',
    skillId: 'num-bundling',
    skillName: 'Tens Bundling & Unit Representation (દસ-દસના જૂથ અને એકમ)',
    prerequisiteSkillIds: ['num-counting-20'],
    gradeRange: 'Class 2-3',
    locale: 'gu',
    difficulty: 'Foundation',
    type: 'picture_selection',
    prompt: 'દસ સળીઓની ૩ ભારી (૩ દસકા) અને ૪ છૂટી સળીઓ ભેગી કરીએ તો કુલ કેટલી સંખ્યા બને?',
    promptGu: 'દસ સળીઓની ૩ ભારી (૩ દસકા) અને ૪ છૂટી સળીઓ ભેગી કરીએ તો કુલ કેટલી સંખ્યા બને?',
    promptEn: 'If we combine 3 bundles of 10 straws (3 tens) and 4 single loose straws, what is the total number?',
    promptHi: '१० तीलियों के ३ बंडल (३ दहाई) और ४ खुली तीलियाँ (४ इकाई) मिलाकर कुल कितनी संख्या बनती है?',
    options: [
      { id: 'opt-3a', labelGu: '૩૪ (34: ૩ દસકા અને ૪ એકમ)', labelEn: '34 (3 tens and 4 units - Correct)', labelHi: '३४ (34: ३ दहाई और ४ इकाई - सही)', isCorrect: true },
      { id: 'opt-3b', labelGu: '૪૩ (૪ દસકા અને ૩ એકમ)', labelEn: '43 (Positional inversion: wrote units in tens column)', labelHi: '४३ (43: स्थान उलटफेर)', isCorrect: false, misconceptionDiagnosis: "Positional Reversal: Inverted tens and ones." },
      { id: 'opt-3c', labelGu: '૭ (૩ + ૪)', labelEn: '7 (Added face values 3 + 4, ignoring the ten-bundles)', labelHi: '७ (7: बंडल को नज़रअंदाज़ कर ३ + ४ जोड़ा)', isCorrect: false, misconceptionDiagnosis: "Additive misconception." },
      { id: 'opt-3d', labelGu: '૩૪૦ (સ્થાન મૂલ્ય ભ્રમ)', labelEn: '340 (Juxtaposed digits with trailing zero)', labelHi: '३४० (340: शून्य लगाने का भ्रम)', isCorrect: false, misconceptionDiagnosis: "Symbolic overgeneralization." },
    ],
    correctAnswer: 'opt-3a',
    explanation: '૩ દસકા = ૩૦, અને ૪ એકમ = ૪. ૩૦ + ૪ = ૩૪.',
    reviewStatus: 'Published',
  },
  {
    id: 'q-num-02',
    skillId: 'num-decomposition',
    skillName: 'Place Value Decomposition (સંખ્યાનું સ્થાન આધારિત વિસ્તરણ)',
    prerequisiteSkillIds: ['num-bundling'],
    gradeRange: 'Class 3',
    locale: 'gu',
    difficulty: 'Developing',
    type: 'multiple_choice',
    prompt: "સંખ્યા ૪૭ (47) નું સાચું વિસ્તરણ કયું છે?",
    promptGu: "સંખ્યા ૪૭ (47) નું સાચું વિસ્તરણ કયું છે?",
    promptEn: "Which is the correct expanded form of the number 47?",
    promptHi: "संख्या ४७ (47) का सही विस्तारित रूप कौन सा है?",
    options: [
      { id: 'opt-4a', labelGu: '૪૦ + ૭ (40 + 7)', labelEn: '40 + 7 (Tens value 40 and units value 7 - Correct)', labelHi: '४० + ७ (40 + 7 - सही विस्तार)', isCorrect: true },
      { id: 'opt-4b', labelGu: '૪ + ૭ (4 + 7)', labelEn: '4 + 7 (Face value error)', labelHi: '४ + ७ (4 + 7 - अंकित मान)', isCorrect: false, misconceptionDiagnosis: "Face-value error: digit 4 taken as 4 instead of 40." },
      { id: 'opt-4c', labelGu: '૪૦૦ + ૭ (400 + 7)', labelEn: '400 + 7 (Confused hundred with ten)', labelHi: '४०० + ७ (400 + 7 - सैकड़े का भ्रम)', isCorrect: false, misconceptionDiagnosis: "Place scale confusion." },
      { id: 'opt-4d', labelGu: '૪૭ + ૧૦ (47 + 10)', labelEn: '47 + 10 (Additive addition confusion)', labelHi: '४૭ + १० (47 + 10 - संक्रियात्मक भ्रम)', isCorrect: false, misconceptionDiagnosis: "Operational confusion." },
    ],
    correctAnswer: 'opt-4a',
    explanation: "૪૭ માં ૪ દશકના સ્થાને છે, તેથી ૪૦ + ૭ = ૪૭.",
    reviewStatus: 'Published',
  },
  {
    id: 'q-num-03',
    skillId: 'num-regrouping',
    skillName: 'Regrouping & Decade Transitions (વદ્દીવાળા સરવાળાની પૂર્વતૈયારી)',
    prerequisiteSkillIds: ['num-decomposition'],
    gradeRange: 'Class 3',
    locale: 'gu',
    difficulty: 'Grade Level',
    type: 'multiple_choice',
    prompt: 'આરવ પાસે ૧૮ કાંકરા છે. તેમાંથી ૧૦-૧૦ ના કેટલા જૂથ બને અને કેટલા છૂટા વધે?',
    promptGu: 'આરવ પાસે ૧૮ કાંકરા છે. તેમાંથી ૧૦-૧૦ ના કેટલા જૂથ બને અને કેટલા છૂટા વધે?',
    promptEn: 'Aarav has 18 pebbles. How many bundles of 10 can he form, and how many loose pebbles remain?',
    promptHi: 'आरव के पास १८ कंकड़ हैं। इनमें से १०-१० के कितने समूह बनेंगे और कितने कंकड़ खुले बचेंगे?',
    options: [
      { id: 'opt-5a', labelGu: '૧ જૂથ (૧ દશક) અને ૮ છૂટા (1 bundle of 10, 8 loose)', labelEn: '1 bundle of 10 and 8 loose (Correct regrouping)', labelHi: '१ समूह (१ दहाई) और ८ खुले (सही उत्तर)', isCorrect: true },
      { id: 'opt-5b', labelGu: '૨ જૂથ અને ૨ છૂટા (2 bundles of 10, 2 loose)', labelEn: '2 bundles and 2 loose', labelHi: '२ समूह और २ खुले', isCorrect: false, misconceptionDiagnosis: "Rounding overestimation." },
      { id: 'opt-5c', labelGu: '૮ જૂથ અને ૧ છૂટો (8 bundles, 1 loose)', labelEn: '8 bundles and 1 loose', labelHi: '८ समूह और १ खुला', isCorrect: false, misconceptionDiagnosis: "Grouping reversal." },
      { id: 'opt-5d', labelGu: 'એક પણ જૂથ ન બને (Cannot make any bundle)', labelEn: 'Cannot make any bundle', labelHi: 'एक भी समूह नहीं बनेगा', isCorrect: false, misconceptionDiagnosis: "Benchmark failure." },
    ],
    correctAnswer: 'opt-5a',
    explanation: '૧૮ એટલે ૧૦ + ૮. ૧૦ કાંકરાની ૧ ભારી (૧ દશક) બને અને ૮ કાંકરા છૂટા રહે.',
    reviewStatus: 'Published',
  },
]

export const questionBankService = {
  getQuestions: (filter?: {
    skillId?: string
    subjectId?: string
    difficulty?: string
    reviewStatus?: string
    search?: string
  }): Question[] => {
    let list = localStore.get<Question[]>(STORAGE_KEYS.QUESTIONS, INITIAL_QUESTIONS)

    return list.filter((q) => {
      if (filter?.skillId && q.skillId !== filter.skillId) return false
      if (filter?.difficulty && filter.difficulty !== 'All' && q.difficulty !== filter.difficulty) return false
      if (filter?.reviewStatus && filter.reviewStatus !== 'All' && q.reviewStatus !== filter.reviewStatus) return false
      if (filter?.search) {
        const term = filter.search.toLowerCase().trim()
        const matchPrompt =
          q.prompt.toLowerCase().includes(term) ||
          q.promptGu.toLowerCase().includes(term) ||
          (q.promptHi && q.promptHi.toLowerCase().includes(term))
        const matchSkill = q.skillName.toLowerCase().includes(term)
        if (!matchPrompt && !matchSkill) return false
      }
      return true
    })
  },

  getQuestionById: (id: string): Question | undefined => {
    const list = questionBankService.getQuestions()
    return list.find((q) => q.id === id)
  },

  saveQuestion: (question: Question): void => {
    const list = questionBankService.getQuestions()
    const index = list.findIndex((q) => q.id === question.id)
    let nextList: Question[]
    if (index >= 0) {
      nextList = [...list]
      nextList[index] = question
    } else {
      nextList = [question, ...list]
    }
    localStore.set(STORAGE_KEYS.QUESTIONS, nextList)
  },

  updateReviewStatus: (id: string, reviewStatus: Question['reviewStatus']): void => {
    const list = questionBankService.getQuestions()
    const nextList = list.map((q) => (q.id === id ? { ...q, reviewStatus } : q))
    localStore.set(STORAGE_KEYS.QUESTIONS, nextList)
  },
}
