// Seed data structure
const categories = [
    { name: 'Mood', description: 'Emotional State' },
    { name: 'Hustle', description: 'Motivation & Growth' },
    { name: 'Relationship', description: 'Connection' },
    { name: 'Occasion', description: 'Situational' },
    { name: 'Deep', description: 'Philosophy & Wisdom' },
    { name: 'Source', description: 'Pop Culture' }
];

const subcategories = [
    // Mood
    { category: 'Mood', name: 'Melancholy', tags: ['Sadness', 'Grief', 'Heartbreak', 'Loneliness'] },
    { category: 'Mood', name: 'Uplifting', tags: ['Happiness', 'Gratitude', 'Hope', 'Joy'] },
    { category: 'Mood', name: 'Intense', tags: ['Anger', 'Passion', 'Jealousy', 'Courage'] },
    { category: 'Mood', name: 'Calm', tags: ['Peace', 'Patience', 'Mindfulness', 'Anxiety Relief'] },

    // Hustle
    { category: 'Hustle', name: 'Success & Business', tags: ['Entrepreneurship', 'Wealth', 'Leadership', 'Career'] },
    { category: 'Hustle', name: 'Self-Improvement', tags: ['Discipline', 'Habits', 'Confidence', 'Hard Work'] },
    { category: 'Hustle', name: 'Resilience', tags: ['Failure', 'Overcoming Obstacles', 'Strength', 'Never Give Up'] },
    { category: 'Hustle', name: 'Fitness & Health', tags: ['Gym Motivation', 'Sports', 'Wellness'] },

    // Relationship
    { category: 'Relationship', name: 'Romance', tags: ['Love', 'Marriage', 'Dating', 'Soulmates', 'Long Distance'] },
    { category: 'Relationship', name: 'Platonic', tags: ['Friendship', 'Best Friends', 'Loyalty', 'Teamwork'] },
    { category: 'Relationship', name: 'Family', tags: ['Motherhood', 'Fatherhood', 'Parenting', 'Siblings'] },
    { category: 'Relationship', name: 'Social', tags: ['Society', 'Humanity', 'Trust', 'Betrayal'] },

    // Occasion
    { category: 'Occasion', name: 'Milestones', tags: ['Birthday', 'Anniversary', 'Wedding', 'Graduation', 'Retirement'] },
    { category: 'Occasion', name: 'Daily', tags: ['Good Morning', 'Good Night', 'Monday Motivation', 'Friday Vibes'] },
    { category: 'Occasion', name: 'Seasonal', tags: ['New Year', 'Christmas', 'Valentine’s Day', 'Summer', 'Winter'] },

    // Deep
    { category: 'Deep', name: 'Life Lessons', tags: ['Experience', 'Time', 'Truth', 'Reality'] },
    { category: 'Deep', name: 'Philosophy', tags: ['Stoicism', 'Existentialism', 'Zen', 'Ethics'] },
    { category: 'Deep', name: 'Spiritual', tags: ['Faith', 'God', 'Universe', 'Karma', 'Destiny'] },
    { category: 'Deep', name: 'Nature', tags: ['Environment', 'Universe', 'Animals', 'Flowers'] },

    // Source
    { category: 'Source', name: 'Media', tags: ['Movie Lines', 'Song Lyrics', 'Anime Quotes', 'TV Show Catchphrases'] },
    { category: 'Source', name: 'Literature', tags: ['Poetry', 'Classic Novels', 'Proverbs', 'Folklore'] },
    { category: 'Source', name: 'Humor', tags: ['Sarcasm', 'Witty', 'Funny', 'Satire'] }
];

const quotes = [
    // Mood - Melancholy
    { text: "Tears are words the heart can't express.", author: "Unknown", subcategory: "Melancholy" },
    { text: "Grief is the price we pay for love.", author: "Queen Elizabeth II", subcategory: "Melancholy" },

    // Mood - Uplifting
    { text: "Happiness depends upon ourselves.", author: "Aristotle", subcategory: "Uplifting" },
    { text: "The best way to predict the future is to create it.", author: "Abraham Lincoln", subcategory: "Uplifting" },

    // Mood - Intense
    { text: "Courage is not the absence of fear, but the triumph over it.", author: "Nelson Mandela", subcategory: "Intense" },
    { text: "Passion is energy. Feel the power that comes from focusing on what excites you.", author: "Oprah Winfrey", subcategory: "Intense" },

    // Mood - Calm
    { text: "Peace comes from within. Do not seek it without.", author: "Buddha", subcategory: "Calm" },
    { text: "Patience is bitter, but its fruit is sweet.", author: "Aristotle", subcategory: "Calm" },

    // Hustle - Success & Business
    { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", author: "Winston S. Churchill", subcategory: "Success & Business" },
    { text: "Business opportunities are like buses, there's always another one coming.", author: "Richard Branson", subcategory: "Success & Business" },

    // Hustle - Self-Improvement
    { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", subcategory: "Self-Improvement" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", subcategory: "Self-Improvement" },

    // Hustle - Resilience
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", subcategory: "Resilience" },
    { text: "Fall seven times, stand up eight.", author: "Japanese Proverb", subcategory: "Resilience" },

    // Hustle - Fitness & Health
    { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn", subcategory: "Fitness & Health" },
    { text: "Health is not valued till sickness comes.", author: "Thomas Fuller", subcategory: "Fitness & Health" },

    // Relationship - Romance
    { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle", subcategory: "Romance" },
    { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn", subcategory: "Romance" },

    // Relationship - Platonic
    { text: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard", subcategory: "Platonic" },
    { text: "Friendship is the only cement that will ever hold the world together.", author: "Woodrow Wilson", subcategory: "Platonic" },

    // Relationship - Family
    { text: "Family is not an important thing. It's everything.", author: "Michael J. Fox", subcategory: "Family" },
    { text: "The love of a family is life's greatest blessing.", author: "Unknown", subcategory: "Family" },

    // Relationship - Social
    { text: "We rise by lifting others.", author: "Robert Ingersoll", subcategory: "Social" },
    { text: "Trust takes years to build, seconds to break, and forever to repair.", author: "Unknown", subcategory: "Social" },

    // Occasion - Milestones
    { text: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon", subcategory: "Milestones" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", subcategory: "Milestones" },

    // Occasion - Daily
    { text: "Write it on your heart that every day is the best day in the year.", author: "Ralph Waldo Emerson", subcategory: "Daily" },
    { text: "Each morning we are born again. What we do today is what matters most.", author: "Buddha", subcategory: "Daily" },

    // Occasion - Seasonal
    { text: "Winter is the time for comfort, for good food and warmth.", author: "Edith Sitwell", subcategory: "Seasonal" },
    { text: "Live in the sunshine, swim the sea, drink the wild air.", author: "Ralph Waldo Emerson", subcategory: "Seasonal" },

    // Deep - Life Lessons
    { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost", subcategory: "Life Lessons" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", subcategory: "Life Lessons" },

    // Deep - Philosophy
    { text: "The unexamined life is not worth living.", author: "Socrates", subcategory: "Philosophy" },
    { text: "I think, therefore I am.", author: "René Descartes", subcategory: "Philosophy" },

    // Deep - Spiritual
    { text: "We are not human beings having a spiritual experience. We are spiritual beings having a human experience.", author: "Pierre Teilhard de Chardin", subcategory: "Spiritual" },
    { text: "What you seek is seeking you.", author: "Rumi", subcategory: "Spiritual" },

    // Deep - Nature
    { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu", subcategory: "Nature" },
    { text: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein", subcategory: "Nature" },

    // Source - Media
    { text: "May the Force be with you.", author: "Star Wars", subcategory: "Media" },
    { text: "Just keep swimming.", author: "Dory (Finding Nemo)", subcategory: "Media" },

    // Source - Literature
    { text: "All that glitters is not gold.", author: "William Shakespeare", subcategory: "Literature" },
    { text: "It was the best of times, it was the worst of times.", author: "Charles Dickens", subcategory: "Literature" },

    // Source - Humor
    { text: "I'm not afraid of death; I just don't want to be there when it happens.", author: "Woody Allen", subcategory: "Humor" },
    { text: "Common sense is not so common.", author: "Voltaire", subcategory: "Humor" }
];

module.exports = { categories, subcategories, quotes };
