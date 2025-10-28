# CodeAlpha_FAQ_Chatbot

# FAQ Chatbot - CodeAlpha AI Internship

## Project Overview
An intelligent FAQ chatbot built using Natural Language Processing (NLP) techniques. The chatbot uses cosine similarity to match user questions with the most relevant FAQ answers.

## Features
- 🤖 Interactive chat interface
- 🧠 NLP-based question matching using cosine similarity
- 📊 Confidence score display
- 💬 10+ pre-loaded FAQs about tech support
- 📋 Copy-to-clipboard functionality
- 🔄 Reset conversation option
- 💡 Suggested questions for easy start

## Technologies Used
- **React** - Frontend framework
- **Lucide React** - Icons
- **Tailwind CSS** - Styling
- **NLP Techniques**:
  - Tokenization
  - Stop word removal
  - TF vectorization
  - Cosine similarity matching

## How It Works

1. **Text Preprocessing**: User input is tokenized and cleaned
2. **Stop Word Removal**: Common words are filtered out
3. **Vectorization**: Text is converted to numerical vectors
4. **Similarity Matching**: Cosine similarity calculates the best match
5. **Response**: The most relevant FAQ answer is displayed

## Installation & Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/CodeAlpha_FAQ_Chatbot.git
cd CodeAlpha_FAQ_Chatbot

# Install dependencies
npm install react lucide-react

# Run the application
npm start
```

## Usage
1. Type your question in the input field
2. Press Enter or click Send
3. The bot will respond with the most relevant answer
4. Confidence score shows matching accuracy
5. Use suggested questions to get started

## NLP Implementation

### Tokenization
```javascript
const tokenize = (text) => {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
};
```

### Cosine Similarity Formula
```
similarity = (A · B) / (||A|| * ||B||)
```

## Project Structure
```
CodeAlpha_FAQ_Chatbot/
│
├── src/
│   ├── App.jsx          # Main chatbot component
│   └── index.js         # Entry point
│
├── README.md            # Project documentation
├── package.json         # Dependencies
└── demo.png            # Screenshot
```



## Future Enhancements
- Add more FAQ categories
- Implement machine learning model training
- Add voice input/output
- Multi-language support
- Database integration

## Author
**Nabiha Tasnim Orchi**
CodeAlpha AI Internship - Task 2

