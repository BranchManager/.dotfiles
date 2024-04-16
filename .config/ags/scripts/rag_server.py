import sys
import os
from langchain_community.document_loaders import DirectoryLoader
from langchain.document_loaders import TextLoader
from langchain_openai import ChatOpenAI
from langchain_chroma import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain import hub
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.messages import HumanMessage
from langchain.chains import create_history_aware_retriever
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage

#from langchain_core.runnables import RunnableParallel

from multiprocessing.connection import Listener


address = ('localhost', 6000)     # family is deduced to be 'AF_INET'
listener = Listener(address, authkey=b'secret password')
#conn = listener.accept()

print('connection accepted from', listener.last_accepted)

#query = sys.argv[1]
#from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.25)
#model="gpt-3.5-turbo-0125"
ACCESS_TOKEN = os.environ.get("OPENAI_API_KEY")
# print(ACCESS_TOKEN)
# loader = GithubFileLoader(
#     repo="hyprwm/hyprland-wiki",  # the repo name
#     access_token=ACCESS_TOKEN,
#     github_api_url="https://api.github.com",
#     file_filter=lambda file_path: file_path.endswith(
#         ".md"
#     ),  # load all markdowns files.
# )

loader = DirectoryLoader("/home/branchmanager/utls/hyprland-wiki/pages/",glob="**/*.md")
print('here')
docs = loader.load()


text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(docs)
vectorstore = Chroma.from_documents(documents=splits, embedding=OpenAIEmbeddings())

# Retrieve and generate using the relevant snippets of the blog.
retriever = vectorstore.as_retriever()


contextualize_q_system_prompt = """Given a chat history and the latest user question \
which might reference context in the chat history, formulate a standalone question \
which can be understood without the chat history. Do NOT answer the question, \
just reformulate it if needed and otherwise return it as is."""
contextualize_q_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", contextualize_q_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)
history_aware_retriever = create_history_aware_retriever(
    llm, retriever, contextualize_q_prompt
)

qa_system_prompt = """You are an assistant for question-answering related to Programming, art, and game developement on Fedora Linux \
Use the following pieces of retrieved context to answer the question. \
If you don't know the answer, say that you don't know and Go read the manual. \
Give detailed answers\

{context}"""
qa_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", qa_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)


question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

#This is test in progress code to list sources
# rag_chain_with_source = RunnableParallel(
#     {"context": retriever, "question": RunnablePassthrough()}
# ).assign(answer=rag_chain)
#may need to remove this

chat_history = []



while True:  # Outer loop to keep the server running
    conn = listener.accept()
    break1 = False
    print('connection accepted from', listener.last_accepted)
    while True:  # Inner loop to handle each connection
        try:
            msg = conn.recv()
            # do something with msg
            print(msg)
            if msg == 'close':
                conn.close()
                break1 = True
                break
            
            question = msg
            ai_msg_1 = rag_chain.invoke({"input": question, "chat_history": chat_history})
            #use below line to test with sources
            #as_msg_1 = rag_chain_with_source.invoke({"input": question, "chat_history": chat_history})
            print(ai_msg_1["answer"])

            conn.send(ai_msg_1["answer"])

            chat_history.extend([HumanMessage(content=question), ai_msg_1["answer"]])
            print(type(HumanMessage(content=question)))
            print("chat_history: ", chat_history)

        except EOFError:
            print("Connection closed by the client")

            break
    if break1:
        break
listener.close()

# while True:
#     user_input = input("Ask me anything: ")
#     if user_input == "exit":
#         break
#     else:
#         question = user_input
#         ai_msg_1 = rag_chain.invoke({"input": question, "chat_history": chat_history})
#         print(ai_msg_1["answer"])
#         chat_history.extend([HumanMessage(content=question), ai_msg_1["answer"]])













"""OLD CODE"""
# prompt = hub.pull("rlm/rag-prompt")

# def format_docs(docs):
#     return "\n\n".join(doc.page_content for doc in docs)


# rag_chain = (
#     {"context": retriever | format_docs, "question": RunnablePassthrough()}
#     | prompt
#     | llm
#     | StrOutputParser()
# )

# test = rag_chain.invoke("What is the fibonacci sequence?")
# print(test)
# cleanup
print(ai_msg_1)
vectorstore.delete_collection()