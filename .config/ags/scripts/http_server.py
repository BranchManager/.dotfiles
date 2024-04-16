from flask import Flask, request
from multiprocessing.connection import Listener
#from your_module import create_stuff_documents_chain, create_retrieval_chain, HumanMessage

app = Flask(__name__)

# llm = ...  # Initialize llm
# qa_prompt = ...  # Initialize qa_prompt
# history_aware_retriever = ...  # Initialize history_aware_retriever

# question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
# rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)
# chat_history = []

@app.route('/ask', methods=['POST'])
def ask():
    question = request.json.get('question')
    if not question:
        return {'error': 'No question provided'}, 400

    return {'answer': 'Hello, world!'}
    # ai_msg_1 = rag_chain.invoke({"input": question, "chat_history": chat_history})
    # chat_history.extend([HumanMessage(content=question), ai_msg_1["answer"]])

    return {'answer': ai_msg_1["answer"]}

if __name__ == '__main__':
    app.run(port=6000)