# CodeAlpha AI Internship - Tasks 2 & 3

## Project Overview
This project implements two AI tasks for the CodeAlpha internship program:
- **Task 2**: FAQ Chatbot with NLP-based question matching
- **Task 3**: AI Music Generator with pattern-based composition

## Features

### Task 2: FAQ Chatbot
- Natural Language Processing for question understanding
- Cosine similarity-based intent matching
- 10+ comprehensive FAQs about CodeAlpha internship
- Real-time chat interface with typing indicators
- Preprocessed text tokenization and keyword extraction

### Task 3: Music Generation
- AI-driven music sequence generation
- Multiple music styles (Classical, Jazz)
- Adjustable sequence length (20-100 notes)
- Real-time audio playback using Web Audio API
- Export functionality for generated sequences
- Visual note preview

## Technologies Used
- React.js (Frontend framework)
- Lucide React (Icons)
- Web Audio API (Music playback)
- NLP techniques (Text preprocessing, cosine similarity)
- Tailwind CSS (Styling)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/CodeAlpha_ChatbotFAQs_MusicGeneration.git
cd CodeAlpha_ChatbotFAQs_MusicGeneration
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### FAQ Chatbot
1. Click on the "FAQ Chatbot" tab
2. Type your question in the input field
3. Press Enter or click Send
4. The bot will respond with the most relevant answer

### Music Generator
1. Click on the "Music Generator" tab
2. Select a music style (Classical or Jazz)
3. Adjust the sequence length using the slider
4. Click "Generate Music Sequence"
5. Click "Play Music" to hear the generated composition
6. Click "Download Sequence" to save the data

## Technical Implementation

### NLP Processing (Chatbot)
- Text preprocessing: Lowercasing, punctuation removal, tokenization
- Keyword extraction from user queries
- Cosine similarity calculation for intent matching
- Threshold-based response selection

### Music Generation Algorithm
- Pattern-based note selection from predefined scales
- Randomized duration assignment (quarter, half, whole notes)
- Frequency mapping using standard musical notation
- Web Audio API synthesis with sine waves
- Envelope shaping for natural sound

## Project Structure Details

- `src/App.js` - Main React component with both tasks
- `src/index.js` - React DOM rendering
- `src/index.css` - Global styles and Tailwind imports
- `public/index.html` - HTML template



## Author
Nabiha Tasnim Orchi 
CodeAlpha AI Internship  


## License
This project is created for educational purposes as part of the CodeAlpha internship program.

## Contact
- **CodeAlpha Website**: www.codealpha.tech
- **Email**: services@codealpha.tech
- **WhatsApp**: +91 8052293611── App.js