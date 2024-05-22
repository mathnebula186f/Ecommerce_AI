# Ecommerce Chatbot

## Introduction
The Ecommerce Chatbot is designed to enhance the user experience on e-commerce platforms by providing automated support through natural language processing (NLP). The chatbot is built using a combination of Python for the NLP model, Node.js for the backend, React.js for the frontend, and MongoDB for the database.

## Architecture
The project architecture consists of three main components:
1. **Frontend**: Implemented using React.js
2. **Backend**: Implemented using Node.js and MongoDB
3. **NLP Model**: Implemented using Python and Flask

## Frameworks Used
- **Frontend**: React.js
- **Backend**: Node.js, MongoDB
- **NLP Model**: Python, Flask

## Steps to Create the Bot

### 1. Tokenization
Breaking down the user input into individual words or tokens.

### 2. Stemming
Reducing words to their root form.

### 3. Creation of Bag of Words and Classification into Patterns
Transforming the tokenized and stemmed words into a numerical representation for pattern recognition.

### 4. Creating Training Data (`intents.json`)
Defining various intents and responses for the chatbot to learn from.

### 5. Training Model Using ANN
Training an Artificial Neural Network (ANN) model on the prepared data.

### 6. Chat API Implementation Using Flask
Creating a Flask API to serve the trained model.

### 7. Frontend Implementation Using React.js
Building the user interface for the chatbot.

### 8. Backend Implementation Using Node and MongoDB
Setting up the backend to handle user requests and store data.

## Challenges Faced
- Defining comprehensive intents in `intents.json` was challenging.
- While familiar with the MERN stack, integrating the Python-based NLP model with the Node.js backend required careful coordination.

## Deployment Links
- **Frontend (React.js)**: [Ecommerce AI Client](https://ecommerce-ai-client.vercel.app/)
- **Python Backend**: [E-Commerce Chatbot API](https://e-commerce-chatbot.onrender.com)
- **GitHub Repository**: [mathnebula186f/Ecommerce_AI](https://github.com/mathnebula186f/Ecommerce_AI)

## How to Start the Project

### Frontend
1. Navigate to the client directory:
    ```sh
    cd client
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Run the development server:
    ```sh
    npm run dev
    ```

### Backend
1. Navigate to the api directory:
    ```sh
    cd api
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the server:
    ```sh
    node index.js
    ```

### Python API
1. Navigate to the chatbot_api directory:
    ```sh
    cd chatbot_api
    ```
2. Start the Flask app:
    ```sh
    python app.py
    ```

## Conclusion
The Ecommerce Chatbot project integrates various technologies to create an intelligent assistant for e-commerce platforms. The combination of React.js, Node.js, MongoDB, and Python ensures a robust and scalable solution. Despite the challenges, the project demonstrates the effective use of NLP in enhancing user interactions.

Feel free to explore the deployed applications and the code repository for more details.
