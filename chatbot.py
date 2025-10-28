import re
import math
from collections import Counter

# FAQ Database
FAQ_DATABASE = [
    {
        "question": "How do I reset my password?",
        "answer": "To reset your password, click on 'Forgot Password' on the login page. Enter your email address, and we'll send you a password reset link.",
        "keywords": ["reset", "password", "forgot", "change", "login"]
    },
    {
        "question": "What are your business hours?",
        "answer": "Our business hours are Monday to Friday, 9:00 AM to 6:00 PM EST. We're closed on weekends and major holidays.",
        "keywords": ["hours", "time", "open", "closed", "schedule", "working"]
    },
    {
        "question": "How can I contact customer support?",
        "answer": "You can reach our customer support team via email at support@company.com, call us at 1-800-123-4567, or use the live chat feature.",
        "keywords": ["contact", "support", "help", "reach", "call", "email"]
    },
    {
        "question": "What payment methods do you accept?",
        "answer": "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and cryptocurrency payments.",
        "keywords": ["payment", "pay", "credit", "card", "paypal", "method"]
    },
    {
        "question": "How do I track my order?",
        "answer": "Once your order ships, you'll receive a tracking number via email. You can also log into your account and view order status.",
        "keywords": ["track", "order", "shipping", "delivery", "status"]
    }
]

STOP_WORDS = {'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 
              'with', 'to', 'for', 'of', 'as', 'by', 'that', 'this', 'it', 'from'}

def tokenize(text):
    """Tokenize and clean text"""
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)
    tokens = [word for word in text.split() if len(word) > 2]
    return tokens

def remove_stop_words(tokens):
    """Remove common stop words"""
    return [token for token in tokens if token not in STOP_WORDS]

def vectorize(tokens):
    """Convert tokens to frequency vector"""
    return Counter(tokens)

def cosine_similarity(vec1, vec2):
    """Calculate cosine similarity between two vectors"""
    intersection = set(vec1.keys()) & set(vec2.keys())
    numerator = sum([vec1[x] * vec2[x] for x in intersection])
    
    sum1 = sum([vec1[x]**2 for x in vec1.keys()])
    sum2 = sum([vec2[x]**2 for x in vec2.keys()])
    denominator = math.sqrt(sum1) * math.sqrt(sum2)
    
    if denominator == 0:
        return 0.0
    return numerator / denominator

def find_best_match(user_question):
    """Find the best matching FAQ using cosine similarity"""
    user_tokens = remove_stop_words(tokenize(user_question))
    user_vector = vectorize(user_tokens)
    
    best_match = None
    highest_similarity = 0
    
    for faq in FAQ_DATABASE:
        faq_text = faq['question'] + ' ' + ' '.join(faq['keywords'])
        faq_tokens = remove_stop_words(tokenize(faq_text))
        faq_vector = vectorize(faq_tokens)
        
        similarity = cosine_similarity(user_vector, faq_vector)
        
        if similarity > highest_similarity:
            highest_similarity = similarity
            best_match = faq
    
    threshold = 0.2
    if highest_similarity < threshold:
        return {
            'answer': "I'm sorry, I couldn't find an answer to your question. Please try rephrasing or contact our support team.",
            'confidence': highest_similarity,
            'found': False
        }
    
    return {
        'answer': best_match['answer'],
        'confidence': highest_similarity,
        'found': True
    }

def main():
    """Main chatbot loop"""
    print("=" * 60)
    print("FAQ CHATBOT - CodeAlpha AI Internship")
    print("=" * 60)
    print("Ask me anything! Type 'quit' to exit.\n")
    
    while True:
        user_input = input("You: ").strip()
        
        if user_input.lower() in ['quit', 'exit', 'bye']:
            print("Bot: Thank you for using the FAQ Chatbot. Goodbye!")
            break
        
        if not user_input:
            continue
        
        response = find_best_match(user_input)
        print(f"Bot: {response['answer']}")
        print(f"(Confidence: {response['confidence']:.2%})\n")

if __name__ == "__main__":
    main()
```

### 4. **requirements.txt** (for Python version)
```
# No external dependencies needed - uses only Python standard library
# Python 3.7 or higher required
```

### 5. **Project Documentation.txt**
```
FAQ CHATBOT - TECHNICAL DOCUMENTATION
CodeAlpha AI Internship - Task 2

=== NLP TECHNIQUES IMPLEMENTED ===

1. TOKENIZATION
   - Converts text into individual words (tokens)
   - Removes punctuation and special characters
   - Converts to lowercase for consistency
   - Filters out words shorter than 3 characters

2. STOP WORD REMOVAL
   - Removes common words (the, is, at, etc.)
   - Focuses on meaningful keywords
   - Improves matching accuracy

3. VECTORIZATION
   - Converts text to numerical representation
   - Uses Term Frequency (TF) approach
   - Creates word count dictionary

4. COSINE SIMILARITY
   - Measures similarity between question vectors
   - Formula: cos(θ) = (A·B) / (||A|| × ||B||)
   - Range: 0 (no similarity) to 1 (identical)
   - Threshold: 0.2 for valid matches

=== PROJECT FEATURES ===

✓ 10 pre-loaded FAQs covering common topics
✓ Real-time question matching
✓ Confidence score display
✓ User-friendly chat interface
✓ Copy-to-clipboard functionality
✓ Suggested questions
✓ Reset conversation option
✓ Responsive design

=== HOW TO RUN ===

Option 1: React Version (Web Interface)
1. Install Node.js
2. Run: npm install
3. Run: npm start
4. Open browser to localhost:3000

Option 2: Python Version (Terminal)
1. Install Python 3.7+
2. Run: python chatbot.py
3. Type questions in terminal

=== TESTING THE CHATBOT ===

Try these sample questions:
- "How do I reset my password?"
- "What are your business hours?"
- "Can I track my order?"
- "What payment methods do you accept?"
- "How do I contact support?"

=== CODE STRUCTURE ===

FAQ Database → User Input → Tokenization → Stop Word Removal 
→ Vectorization → Similarity Calculation → Best Match → Display Answer

