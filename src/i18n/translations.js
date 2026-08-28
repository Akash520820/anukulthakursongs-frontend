// UI chrome translations — real translation (actual words), not
// transliteration. "গান" becomes "Songs"/"गीत", not a phonetic rendering.
//
// This covers static site text only (nav labels, headings, buttons, empty
// states). Admin-entered content (song lyrics, scripture paragraphs) is
// transliterated on the backend instead — see server src/utils/transliterate.js
// — since that content needs to stay chantable/singable, not translated.
//
// Usage: const { t } = useLanguage(); t("nav.songs")

export const translations = {
  // ---- Navbar ----
  "nav.home": { bn: "হোম", hi: "होम", en: "Home" },
  "nav.songs": { bn: "গান", hi: "गीत", en: "Songs" },
  "nav.prayerTimes": { bn: "প্রার্থনার সময়", hi: "प्रार्थना का समय", en: "Prayer Times" },
  "nav.prayers": { bn: "প্রার্থনা", hi: "प्रार्थना", en: "Prayers" },
  "nav.scriptures": { bn: "গ্রন্থ", hi: "ग्रंथ", en: "Scriptures" },
  "nav.login": { bn: "লগইন", hi: "लॉगिन", en: "Login" },
  "nav.myAccount": { bn: "আমার অ্যাকাউন্ট", hi: "मेरा खाता", en: "My Account" },
  "nav.admin": { bn: "অ্যাডমিন", hi: "व्यवस्थापक", en: "Admin" },
  "nav.brand": { bn: "অনুকূল ঠাকুর", hi: "अनुकूल ठाकुर", en: "Anukul Thakur" },

  // ---- Footer ----
  "footer.tagline": {
    bn: "সত্যানুসরণ ও সেবার পথে — প্রার্থনা, গান ও গ্রন্থের একটি সংকলন।",
    hi: "सत्यानुसरण और सेवा के मार्ग पर — प्रार्थना, गीत और ग्रंथ का एक संकलन।",
    en: "On the path of truth-following and service — a collection of prayers, songs, and scripture."
  },
  "footer.explore": { bn: "অন্বেষণ করুন", hi: "खोजें", en: "Explore" },
  "footer.contact": { bn: "যোগাযোগ", hi: "संपर्क करें", en: "Contact" },
  "footer.rights": { bn: "সর্বস্বত্ব সংরক্ষিত।", hi: "सर्वाधिकार सुरक्षित।", en: "All rights reserved." },

  // ---- Hero (Home) ----
  "hero.tag": { bn: "সত্যানুসরণ ও সেবার পথ", hi: "सत्यानुसरण और सेवा का मार्ग", en: "The Path of Truth-Following and Service" },
  "hero.titlePrefix": { bn: "শ্রীশ্রীঠাকুর অনুকূলচন্দ্রের", hi: "श्रीश्रीठाकुर अनुकूलचन्द्र के", en: "Sri Sri Thakur Anukulchandra's" },
  "hero.titleHighlight": { bn: "বাণী, প্রার্থনা ও গান", hi: "वाणी, प्रार्थना और गीत", en: "Words, Prayers, and Songs" },
  "hero.description": {
    bn: "প্রাতঃ ও সান্ধ্যকালীন প্রার্থনা, ভক্তিমূলক গান এবং সত্যানুসরণ ও নারীর নীতি গ্রন্থ থেকে বাছাই করা অনুচ্ছেদ — একত্রে, এক জায়গায়।",
    hi: "प्रातः और सान्ध्यकालीन प्रार्थना, भक्तिमूलक गीत, और सत्यानुसरण व नारीर नीति ग्रंथ से चुने हुए अनुच्छेद — सब एक साथ, एक ही जगह।",
    en: "Morning and evening prayers, devotional songs, and selected passages from the Satyanusaran and Narir Niti scriptures — all together, in one place."
  },
  "hero.ctaPrayers": { bn: "প্রার্থনার গান", hi: "प्रार्थना के गीत", en: "Prayer Songs" },
  "hero.ctaSongs": { bn: "গান দেখুন", hi: "गीत देखें", en: "View Songs" },

  // ---- Home / Explore section ----
  "home.exploreTitle": { bn: "অন্বেষণ করুন", hi: "खोजें", en: "Explore" },
  "home.exploreSubtitle": {
    bn: "গান, প্রার্থনা এবং গ্রন্থ — সবকিছু একটি জায়গায় সাজানো।",
    hi: "गीत, प्रार्थना और ग्रंथ — सब कुछ एक ही जगह व्यवस्थित।",
    en: "Songs, prayers, and scripture — all organized in one place."
  },
  "home.cardSongsTitle": { bn: "ভক্তিমূলক গান", hi: "भक्तिमूलक गीत", en: "Devotional Songs" },
  "home.cardSongsDesc": {
    bn: "বিভিন্ন ক্যাটাগরি অনুযায়ী সাজানো গানের সংকলন, একাধিক ভাষায়।",
    hi: "विभिन्न श्रेणियों के अनुसार व्यवस्थित गीतों का संकलन, कई भाषाओं में।",
    en: "A collection of songs organized by category, in multiple languages."
  },
  "home.cardPrayersTitle": { bn: "প্রাতঃ ও সান্ধ্য প্রার্থনা", hi: "प्रातः और सान्ध्य प्रार्थना", en: "Morning and Evening Prayers" },
  "home.cardPrayersDesc": {
    bn: "প্রতিদিনের প্রার্থনার নির্ধারিত সময় ও গানের ক্রম।",
    hi: "प्रतिदिन की प्रार्थना का निर्धारित समय और गीतों का क्रम।",
    en: "The daily prayer schedule and the order of songs sung."
  },
  "home.cardScripturesTitle": { bn: "সত্যানুসরণ ও নারীর নীতি", hi: "सत्यानुसरण और नारीर नीति", en: "Satyanusaran and Narir Niti" },
  "home.cardScripturesDesc": {
    bn: "শ্রীশ্রীঠাকুরের মূল গ্রন্থ থেকে অনুচ্ছেদ ভিত্তিক পাঠ।",
    hi: "श्रीश्रीठाकुर के मूल ग्रंथ से अनुच्छेद आधारित पाठ।",
    en: "Passage-by-passage readings from Sri Sri Thakur's original scriptures."
  },
  "home.cardStoriesTitle": { bn: "কাহিনী", hi: "कहानियाँ", en: "Stories" },
  "home.cardStoriesDesc": {
    bn: "বিভিন্ন দেবতার লীলা ও ঘটনার কাহিনী, ছবিসহ।",
    hi: "विभिन्न देवताओं की लीला और घटनाओं की कहानियाँ, चित्रों सहित।",
    en: "Stories of different deities' pastimes and incidents, with images."
  },

  // ---- Songs page ----
  "songs.title": { bn: "গান", hi: "गीत", en: "Songs" },
  "songs.subtitle": {
    bn: "ক্যাটাগরি অনুযায়ী বাছাই করুন অথবা সবগুলো দেখুন।",
    hi: "श्रेणी के अनुसार चुनें या सभी देखें।",
    en: "Filter by category, or browse all songs."
  },
  "songs.allCategories": { bn: "সব ক্যাটাগরি", hi: "सभी श्रेणियाँ", en: "All Categories" },
  "songs.loadError": { bn: "গান লোড করা যায়নি।", hi: "गीत लोड नहीं हो सके।", en: "Couldn't load songs." },
  "songs.empty": { bn: "কোনো গান পাওয়া যায়নি।", hi: "कोई गीत नहीं मिला।", en: "No songs found." },
  "songs.backToList": { bn: "গান তালিকায় ফিরুন", hi: "गीत सूची पर वापस जाएँ", en: "Back to Song List" },
  "songs.notFound": { bn: "গানটি পাওয়া যায়নি।", hi: "यह गीत नहीं मिला।", en: "This song couldn't be found." },
  "songs.noLyricsInLanguage": { bn: "এই ভাষায় লিরিক্স নেই।", hi: "इस भाषा में गीत उपलब्ध नहीं है।", en: "Lyrics aren't available in this language." },

  // ---- Prayer Songs page ----
  "prayerSongs.title": { bn: "প্রার্থনার গান", hi: "प्रार्थना के गीत", en: "Prayer Songs" },
  "prayerSongs.subtitle": {
    bn: "প্রাতঃ ও সান্ধ্যকালীন প্রার্থনায় গাওয়া গানসমূহ, ক্রম অনুযায়ী।",
    hi: "प्रातः और सान्ध्यकालीन प्रार्थना में गाए जाने वाले गीत, क्रम अनुसार।",
    en: "The songs sung in morning and evening prayer, in order."
  },
  "prayerSongs.morning": { bn: "প্রাতঃকালীন", hi: "प्रातःकालीन", en: "Morning" },
  "prayerSongs.evening": { bn: "সান্ধ্যকালীন", hi: "सान्ध्यकालीन", en: "Evening" },
  "prayerSongs.notAddedYet": {
    bn: "প্রার্থনা এখনো যোগ করা হয়নি।",
    hi: "प्रार्थना अभी तक जोड़ी नहीं गई है।",
    en: "This prayer hasn't been added yet."
  },

  // ---- Prayer Times page ----
  "prayerTimes.title": { bn: "প্রার্থনার সময়", hi: "प्रार्थना का समय", en: "Prayer Times" },
  "prayerTimes.subtitle": {
    bn: "মাস অনুযায়ী প্রাতঃ ও সান্ধ্যকালীন প্রার্থনার সময়সূচি।",
    hi: "महीने के अनुसार प्रातः और सान्ध्यकालीन प्रार्थना की समय-सूची।",
    en: "The monthly schedule for morning and evening prayer times."
  },
  "prayerTimes.month": { bn: "মাস", hi: "महीना", en: "Month" },
  "prayerTimes.morning": { bn: "প্রাতঃকাল", hi: "प्रातःकाल", en: "Morning" },
  "prayerTimes.evening": { bn: "সন্ধ্যাকাল", hi: "सन्ध्याकाल", en: "Evening" },
  "prayerTimes.loadError": { bn: "প্রার্থনার সময় লোড করা যায়নি।", hi: "प्रार्थना का समय लोड नहीं हो सका।", en: "Couldn't load prayer times." },
  "prayerTimes.empty": { bn: "এখনো কোনো সময় নির্ধারণ করা হয়নি।", hi: "अभी तक कोई समय निर्धारित नहीं किया गया है।", en: "No prayer times have been set yet." },

  // ---- Scriptures page ----
  "scriptures.title": { bn: "গ্রন্থ", hi: "ग्रंथ", en: "Scriptures" },
  "scriptures.subtitle": {
    bn: "শ্রীশ্রীঠাকুর অনুকূলচন্দ্রের মূল গ্রন্থ থেকে অনুচ্ছেদ।",
    hi: "श्रीश्रीठाकुर अनुकूलचन्द्र के मूल ग्रंथ से अनुच्छेद।",
    en: "Passages from Sri Sri Thakur Anukulchandra's original scriptures."
  },
  "scriptures.satyanusaran": { bn: "সত্যানুসরণ", hi: "सत्यानुसरण", en: "Satyanusaran" },
  "scriptures.narirNiti": { bn: "নারীর নীতি", hi: "नारीर नीति", en: "Narir Niti" },
  "scriptures.loadError": { bn: "অনুচ্ছেদ লোড করা যায়নি।", hi: "अनुच्छेद लोड नहीं हो सके।", en: "Couldn't load passages." },
  "scriptures.empty": {
    bn: "এই গ্রন্থে এখনো কোনো অনুচ্ছেদ যোগ করা হয়নি।",
    hi: "इस ग्रंथ में अभी तक कोई अनुच्छेद नहीं जोड़ा गया है।",
    en: "No passages have been added to this scripture yet."
  },
  "scriptures.noContentInLanguage": {
    bn: "এই ভাষায় এই অনুচ্ছেদ নেই।",
    hi: "यह अनुच्छेद इस भाषा में उपलब्ध नहीं है।",
    en: "This passage isn't available in this language."
  },

  // ---- Common ----
  "common.loading": { bn: "লোড হচ্ছে...", hi: "लोड हो रहा है...", en: "Loading..." },
  "common.save": { bn: "সংরক্ষণ করুন", hi: "सहेजें", en: "Save" },

  // ---- Login / Register ----
  "auth.login": { bn: "লগইন", hi: "लॉगिन", en: "Login" },
  "auth.email": { bn: "ইমেইল", hi: "ईमेल", en: "Email" },
  "auth.password": { bn: "পাসওয়ার্ড", hi: "पासवर्ड", en: "Password" },
  "auth.loggingIn": { bn: "লগইন হচ্ছে...", hi: "लॉगिन हो रहा है...", en: "Logging in..." },
  "auth.loginButton": { bn: "লগইন করুন", hi: "लॉगिन करें", en: "Log In" },
  "auth.loginFailed": { bn: "লগইন ব্যর্থ হয়েছে।", hi: "लॉगिन विफल रहा।", en: "Login failed." },
  "auth.noAccount": { bn: "অ্যাকাউন্ট নেই?", hi: "खाता नहीं है?", en: "Don't have an account?" },
  "auth.registerLink": { bn: "রেজিস্ট্রেশন করুন", hi: "रजिस्टर करें", en: "Register" },
  "auth.register": { bn: "রেজিস্ট্রেশন", hi: "पंजीकरण", en: "Register" },
  "auth.avatarRequired": { bn: "প্রোফাইল ছবি আবশ্যক।", hi: "प्रोफ़ाइल तस्वीर आवश्यक है।", en: "A profile photo is required." },
  "auth.otpSent": { bn: "আপনার ইমেইলে একটি ভেরিফিকেশন কোড পাঠানো হয়েছে।", hi: "आपके ईमेल पर एक सत्यापन कोड भेजा गया है।", en: "A verification code has been sent to your email." },
  "auth.registerFailed": { bn: "রেজিস্ট্রেশন ব্যর্থ হয়েছে।", hi: "पंजीकरण विफल रहा।", en: "Registration failed." },
  "auth.otpFailed": { bn: "ওটিপি যাচাই ব্যর্থ হয়েছে।", hi: "OTP सत्यापन विफल रहा।", en: "OTP verification failed." },
  "auth.otpResent": { bn: "নতুন কোড পাঠানো হয়েছে।", hi: "नया कोड भेज दिया गया है।", en: "A new code has been sent." },
  "auth.otpResendFailed": { bn: "কোড পুনরায় পাঠানো যায়নি।", hi: "कोड दोबारा नहीं भेजा जा सका।", en: "Couldn't resend the code." },
  "auth.username": { bn: "ইউজারনেম", hi: "उपयोगकर्ता नाम", en: "Username" },
  "auth.fullName": { bn: "পূর্ণ নাম", hi: "पूरा नाम", en: "Full Name" },
  "auth.profilePhoto": { bn: "প্রোফাইল ছবি", hi: "प्रोफ़ाइल तस्वीर", en: "Profile Photo" },
  "auth.uploadingNotice": {
    bn: "ছবি আপলোড ও ইমেইল পাঠানো হচ্ছে — এতে কিছুক্ষণ সময় লাগতে পারে, পাতাটি বন্ধ করবেন না।",
    hi: "तस्वीर अपलोड और ईमेल भेजा जा रहा है — इसमें कुछ समय लग सकता है, पेज बंद न करें।",
    en: "Uploading photo and sending email — this may take a moment, please don't close the page."
  },
  "auth.processing": { bn: "প্রসেসিং হচ্ছে...", hi: "प्रक्रिया जारी है...", en: "Processing..." },
  "auth.registerButton": { bn: "রেজিস্ট্রেশন করুন", hi: "पंजीकरण करें", en: "Register" },
  "auth.alreadyHaveAccount": { bn: "ইতিমধ্যে অ্যাকাউন্ট আছে?", hi: "पहले से खाता है?", en: "Already have an account?" },
  "auth.enterCodeSentTo": { bn: "-এ পাঠানো ৬ সংখ্যার কোডটি দিন।", hi: "पर भेजा गया 6-अंकों का कोड दर्ज करें।", en: "Enter the 6-digit code sent to" },
  "auth.verificationCode": { bn: "ভেরিফিকেশন কোড", hi: "सत्यापन कोड", en: "Verification Code" },
  "auth.verifying": { bn: "যাচাই হচ্ছে...", hi: "सत्यापित हो रहा है...", en: "Verifying..." },
  "auth.verifyButton": { bn: "যাচাই করুন", hi: "सत्यापित करें", en: "Verify" },
  "auth.resendCode": { bn: "কোড আবার পাঠান", hi: "कोड फिर से भेजें", en: "Resend Code" },

  // ---- Stories ----
  "nav.stories": { bn: "কাহিনী", hi: "कहानियाँ", en: "Stories" },
  "stories.title": { bn: "কাহিনী", hi: "कहानियाँ", en: "Stories" },
  "stories.subtitle": {
    bn: "বিভিন্ন দেবতার লীলা ও ঘটনার কাহিনী, ছবিসহ।",
    hi: "विभिन्न देवताओं की लीला और घटनाओं की कहानियाँ, चित्रों सहित।",
    en: "Stories of different deities' pastimes and incidents, with images."
  },
  "stories.allDeities": { bn: "সব দেবতা", hi: "सभी देवता", en: "All Deities" },
  "stories.loadError": { bn: "কাহিনী লোড করা যায়নি।", hi: "कहानियाँ लोड नहीं हो सकीं।", en: "Couldn't load stories." },
  "stories.empty": { bn: "কোনো কাহিনী পাওয়া যায়নি।", hi: "कोई कहानी नहीं मिली।", en: "No stories found." },
  "stories.backToList": { bn: "কাহিনী তালিকায় ফিরুন", hi: "कहानी सूची पर वापस जाएँ", en: "Back to Story List" },
  "stories.notFound": { bn: "কাহিনীটি পাওয়া যায়নি।", hi: "यह कहानी नहीं मिली।", en: "This story couldn't be found." },
  "stories.noContentInLanguage": {
    bn: "এই ভাষায় এই কাহিনী নেই।",
    hi: "यह कहानी इस भाषा में उपलब्ध नहीं है।",
    en: "This story isn't available in this language."
  },

  // ---- Stories admin ----
  "admin.stories": { bn: "কাহিনী", hi: "कहानियाँ", en: "Stories" },
  "admin.storiesDeity": { bn: "দেবতা", hi: "देवता", en: "Deity" },
  "admin.storiesTitleBengali": { bn: "শিরোনাম (বাংলা) — খালি রাখলে auto-fill হবে", hi: "शीर्षक (बंगाली) — खाली छोड़ने पर auto-fill हो जाएगा", en: "Title (Bengali) — leave blank to auto-fill" },
  "admin.storiesTitleHindi": { bn: "শিরোনাম (হিন্দি)", hi: "शीर्षक (हिन्दी)", en: "Title (Hindi)" },
  "admin.storiesTitleEnglish": { bn: "শিরোনাম (ইংরেজি)", hi: "शीर्षक (अंग्रेज़ी)", en: "Title (English)" },
  "admin.storiesContentBengali": { bn: "কাহিনী (বাংলা) — খালি রাখলে auto-fill হবে", hi: "कहानी (बंगाली) — खाली छोड़ने पर auto-fill हो जाएगा", en: "Story (Bengali) — leave blank to auto-fill" },
  "admin.storiesContentHindi": { bn: "কাহিনী (হিন্দি)", hi: "कहानी (हिन्दी)", en: "Story (Hindi)" },
  "admin.storiesContentEnglish": { bn: "কাহিনী (ইংরেজি)", hi: "कहानी (अंग्रेज़ी)", en: "Story (English)" },
  "admin.storiesImages": { bn: "ছবি (একাধিক যোগ করা যাবে)", hi: "चित्र (एक से अधिक जोड़े जा सकते हैं)", en: "Images (multiple allowed)" },
  "admin.storiesAddImages": { bn: "নতুন ছবি যোগ করুন", hi: "नए चित्र जोड़ें", en: "Add More Images" },
  "admin.storiesRemoveImage": { bn: "মুছুন", hi: "हटाएँ", en: "Remove" },
  "admin.storiesCreate": { bn: "নতুন কাহিনী যোগ করুন", hi: "नई कहानी जोड़ें", en: "Add New Story" },
  "admin.storiesEdit": { bn: "কাহিনী সম্পাদনা", hi: "कहानी संपादित करें", en: "Edit Story" },
  "admin.storiesSaveFailed": { bn: "সংরক্ষণ ব্যর্থ হয়েছে।", hi: "सहेजना विफल रहा।", en: "Save failed." },
  "admin.storiesDeleteConfirm": { bn: "আপনি কি নিশ্চিত মুছে ফেলতে চান?", hi: "क्या आप वाकई हटाना चाहते हैं?", en: "Are you sure you want to delete this?" },
  "admin.storiesDeleteFailed": { bn: "মুছে ফেলা যায়নি।", hi: "हटाया नहीं जा सका।", en: "Couldn't delete." },
  "admin.storiesAtLeastOneImage": { bn: "কমপক্ষে একটি ছবি আবশ্যক।", hi: "कम से कम एक चित्र आवश्यक है।", en: "At least one image is required." }
};
