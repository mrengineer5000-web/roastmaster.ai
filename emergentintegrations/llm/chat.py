from dataclasses import dataclass
import base64
import mimetypes
from pathlib import Path
import requests


EMERGENT_BASE_URL = "https://integrations.emergentagent.com/llm/v1"


@dataclass
class FileContentWithMimeType:
    mime_type: str
    file_path: str


@dataclass
class UserMessage:
    text: str
    file_contents: list[FileContentWithMimeType] | None = None


class LlmChat:
    def __init__(self, api_key: str, session_id: str | None = None, system_message: str | None = None):
        self.api_key = api_key
        self.session_id = session_id
        self.system_message = system_message
        self.model = None

    def with_model(self, provider: str, model: str):
        # Emergent exposes an OpenAI-compatible gateway. Gemini models are namespaced.
        if provider == "gemini" and "/" not in model:
            self.model = f"gemini/{model}"
        else:
            self.model = model
        return self

    async def send_message(self, message: UserMessage) -> str:
        if not self.model:
            raise RuntimeError("Model is not configured")

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        payload = {
            "model": self.model,
            "messages": self._build_messages(message),
        }

        response = requests.post(
            f"{EMERGENT_BASE_URL}/chat/completions",
            headers=headers,
            json=payload,
            timeout=180,
        )
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]

    def _build_messages(self, message: UserMessage):
        messages = []
        if self.system_message:
            messages.append({"role": "system", "content": self.system_message})

        if message.file_contents:
            content = [{"type": "text", "text": message.text}]
            for item in message.file_contents:
                content.append(
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": self._to_data_url(item.file_path, item.mime_type),
                        },
                    }
                )
            messages.append({"role": "user", "content": content})
        else:
            messages.append({"role": "user", "content": message.text})
        return messages

    def _to_data_url(self, file_path: str, mime_type: str | None):
        path = Path(file_path)
        mime = mime_type or mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        encoded = base64.b64encode(path.read_bytes()).decode("ascii")
        return f"data:{mime};base64,{encoded}"
