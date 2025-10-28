# Language Translation Tool - CodeAlpha AI Internship

## Project Overview
A powerful and intuitive language translation application that supports 20+ languages. Built with React and integrated with translation APIs for real-time text translation.

## Features
- 🌍 **20+ Languages** - Support for major world languages
- 🔄 **Instant Translation** - Real-time translation using API
- 🔊 **Text-to-Speech** - Listen to both source and translated text
- 📋 **Copy to Clipboard** - Quick copy functionality
- 💾 **Download Translation** - Save translations as text files
- ↔️ **Language Swap** - Quickly swap source and target languages
- 📊 **Character Counter** - Track text length (max 5000 chars)
- ⚡ **Quick Translations** - Pre-defined common phrases

## Supported Languages
English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, Bengali, Turkish, Vietnamese, Thai, Polish, Dutch, Swedish, Indonesian

## Technologies Used
- **React** - Frontend framework
- **MyMemory Translation API** - Translation service (free, no API key required)
- **Web Speech API** - Text-to-speech functionality
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling

## Installation & Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/CodeAlpha_Language_Translator.git
cd CodeAlpha_Language_Translator

# Install dependencies
npm install react react-dom lucide-react

# Run the application
npm start
```

## How to Use

1. **Select Languages**: Choose source and target languages from dropdowns
2. **Enter Text**: Type or paste text in the input area (max 5000 characters)
3. **Translate**: Click the "Translate" button
4. **Additional Options**:
   - 🔊 Listen to text using text-to-speech
   - 📋 Copy translation to clipboard
   - 💾 Download translation as .txt file
   - ↔️ Swap languages instantly

## API Integration

This project uses the **MyMemory Translation API**:
- **Endpoint**: `https://api.mymemory.translated.net/get`
- **Method**: GET
- **No API Key Required** (Free tier: 1000 requests/day)
- **Parameters**: 
  - `q` - Text to translate
  - `langpair` - Language pair (e.g., en|es)

### Example API Call
```javascript
const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=en|es`;
const response = await fetch(url);
const data = await response.json();
const translation = data.responseData.translatedText;
```

## Project Structure
```
CodeAlpha_Language_Translator/
│
├── src/
│   ├── App.jsx              # Main translator component
│   ├── index.js             # Entry point
│   └── translator.py        # Python alternative
│
├── README.md                # Documentation
├── package.json             # Dependencies
├── requirements.txt         # Python dependencies
└── screenshots/             # App screenshots
```

## Alternative: Python Version

For a command-line version, use the Python script:
```bash
pip install requests
python translator.py
```

## Features Breakdown

### 1. Translation
- Uses REST API to fetch translations
- Supports 20+ language pairs
- Real-time translation with loading indicator

### 2. Text-to-Speech
- Browser-based Web Speech API
- Automatic language detection
- Works for both source and target text

### 3. User Interface
- Modern, responsive design
- Gradient backgrounds and animations
- Error handling with user-friendly messages
- Character counter with 5000 char limit

### 4. Additional Features
- Copy to clipboard with visual feedback
- Download translations as .txt files
- Quick translation templates
- Language swap functionality

## Limitations & Notes

- **API Limit**: Free tier limited to 1000 requests/day
- **Text Length**: Maximum 5000 characters per translation
- **Internet Required**: Needs active internet connection
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## Future Enhancements
- [ ] Add Google Translate API option
- [ ] Implement translation history
- [ ] Add file upload for document translation
- [ ] Support for multiple simultaneous translations
- [ ] Offline translation using local models
- [ ] Voice input for hands-free translation



## Author
**Nabiha Tasnim Orchi**  
CodeAlpha AI Internship - Task 1

