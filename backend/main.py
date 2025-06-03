from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os

USE_OPENAI = os.getenv("USE_OPENAI", "true").lower() == "true"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
MODEL_NAME = os.getenv("HF_MODEL", "gpt2")

if USE_OPENAI:
    import openai
    openai.api_key = OPENAI_API_KEY
else:
    from transformers import AutoTokenizer, AutoModelForCausalLM
    import torch
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

class PromptRequest(BaseModel):
    prompt: str
    mode: str = "free"
    session_id: str = "default"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

chat_memory = {}

PROMPT_TEMPLATES = {
    "scenario": "Generate a tactical battle scenario in JSON format based on the following input:\n{prompt}",
    "suggestion": "Suggest a tactical move for this unit in the game state:\n{prompt}",
    "narrative": "Write a mission summary narrative based on this final game state:\n{prompt}",
    "free": "{prompt}"
}

@app.post("/generate")
async def generate_text(request: PromptRequest):
    prompt = request.prompt
    mode = request.mode or "free"
    session_id = request.session_id or "default"

    formatted_prompt = PROMPT_TEMPLATES.get(mode, "{prompt}").format(prompt=prompt)
    history = chat_memory.get(session_id, [])
    chat_memory[session_id] = history[-5:]

    if USE_OPENAI:
        messages = history + [{"role": "user", "content": formatted_prompt}]
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=messages
        )
        answer = response.choices[0].message.content
        chat_memory[session_id].append({"role": "user", "content": formatted_prompt})
        chat_memory[session_id].append({"role": "assistant", "content": answer})
        return { "response": answer }
    else:
        input_ids = tokenizer.encode(formatted_prompt, return_tensors="pt")
        with torch.no_grad():
            output = model.generate(input_ids, max_new_tokens=150, do_sample=True)
        result = tokenizer.decode(output[0], skip_special_tokens=True)
        return { "response": result[len(prompt):].strip() }
