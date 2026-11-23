import re
from typing import List, Optional
from pydantic import BaseModel, Field, field_validator, ConfigDict

EMAIL_REGEX = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'

class MessageCreateSchema(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    sender_name: str = Field(..., min_length=2, max_length=100, description="Nama pengirim")
    sender_email: str = Field(..., max_length=150, description="Email pengirim")
    message_body: str = Field(..., min_length=5, max_length=3000, description="Isi pesan")
    honeypot: Optional[str] = Field(default=None, alias="_gotcha", description="Honeypot anti-spam")

    @field_validator('sender_email')
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        if not re.match(EMAIL_REGEX, v):
            raise ValueError("Format email tidak valid")
        return v.lower()

    @field_validator('sender_name')
    @classmethod
    def sanitize_name(cls, v: str) -> str:
        sanitized = re.sub(r'<[^>]*>', '', v)
        if not sanitized.strip():
            raise ValueError("Nama tidak boleh kosong atau hanya berisi tag HTML")
        return sanitized.strip()

    @field_validator('message_body')
    @classmethod
    def sanitize_message(cls, v: str) -> str:
        # Hapus tag script berbahaya
        sanitized = re.sub(r'<script.*?>.*?</script>', '', v, flags=re.IGNORECASE)
        return sanitized.strip()


class ProjectSchema(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    title: str = Field(..., min_length=2, max_length=200)
    slug: str = Field(..., min_length=2, max_length=200)
    short_description: Optional[str] = Field(default="", max_length=500)
    content: Optional[str] = Field(default="")
    tech_stack: Optional[List[str]] = Field(default_factory=list)
    image_url: Optional[str] = Field(default="")
    github_url: Optional[str] = Field(default="")
    live_url: Optional[str] = Field(default="")
    is_published: Optional[bool] = Field(default=False)

    @field_validator('slug')
    @classmethod
    def validate_slug(cls, v: str) -> str:
        clean_slug = re.sub(r'[^a-zA-Z0-9_-]', '-', v.lower()).strip('-')
        if not clean_slug:
            raise ValueError("Slug tidak valid")
        return clean_slug


class ResumeItemSchema(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    category: str = Field(..., description="Kategori riwayat")
    title: str = Field(..., min_length=2, max_length=150)
    organization: str = Field(..., min_length=1, max_length=150)
    period: str = Field(..., min_length=1, max_length=80)
    description: Optional[str] = Field(default="")
    badge_label: Optional[str] = Field(default="")
    badge_color: Optional[str] = Field(default="blue")

    @field_validator('category')
    @classmethod
    def validate_category(cls, v: str) -> str:
        allowed = {'works', 'work', 'education', 'certifications', 'certification', 'certificate', 'organization'}
        if v.lower() not in allowed:
            raise ValueError(f"Kategori tidak valid. Pilihan: {', '.join(allowed)}")
        return v.lower()


class ProfileSchema(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    full_name: str = Field(..., min_length=2, max_length=100)
    role: str = Field(..., min_length=2, max_length=150)
    bio_text: str = Field(..., min_length=5, max_length=2000)
    resume_url: Optional[str] = Field(default="")
    avatar_url: Optional[str] = Field(default="")


def validate_payload(schema_cls, data: dict):
    """
    Helper untuk memvalidasi dictionary terhadap Pydantic schema.
    Returns: (cleaned_dict, error_message_or_None)
    """
    try:
        instance = schema_cls.model_validate(data)
        cleaned = instance.model_dump()
        cleaned.pop('honeypot', None)
        return cleaned, None
    except Exception as e:
        if hasattr(e, 'errors'):
            errs = e.errors()
            field = ".".join(str(loc) for loc in errs[0].get('loc', []))
            msg = errs[0].get('msg', 'Format data tidak valid')
            # Bersihkan prefix bawaan pydantic seperti 'Value error, '
            if msg.startswith('Value error, '):
                msg = msg.replace('Value error, ', '')
            return None, f"Validasi gagal pada '{field}': {msg}"
        return None, str(e)
