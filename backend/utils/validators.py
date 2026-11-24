import re
from typing import List, Optional
from pydantic import BaseModel, Field, field_validator, ConfigDict

EMAIL_REGEX = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'

class MessageCreateSchema(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    sender_name: str = Field(..., min_length=2, max_length=100, description="Sender name")
    sender_email: str = Field(..., max_length=150, description="Sender email")
    message_body: str = Field(..., min_length=5, max_length=3000, description="Message body")
    honeypot: Optional[str] = Field(default=None, alias="_gotcha", description="Anti-spam honeypot")

    @field_validator('sender_email')
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        if not re.match(EMAIL_REGEX, v):
            raise ValueError("Invalid email format")
        return v.lower()

    @field_validator('sender_name')
    @classmethod
    def sanitize_name(cls, v: str) -> str:
        sanitized = re.sub(r'<[^>]*>', '', v)
        if not sanitized.strip():
            raise ValueError("Name cannot be empty or contain only HTML tags")
        return sanitized.strip()

    @field_validator('message_body')
    @classmethod
    def sanitize_message(cls, v: str) -> str:
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
            raise ValueError("Invalid slug format")
        return clean_slug


class ResumeItemSchema(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    category: str = Field(..., description="Resume item category")
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
            raise ValueError(f"Invalid category. Allowed options: {', '.join(allowed)}")
        return v.lower()


class ProfileSchema(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    full_name: str = Field(..., min_length=2, max_length=100)
    role: str = Field(..., min_length=2, max_length=150)
    bio_text: str = Field(..., min_length=5, max_length=2000)
    resume_url: Optional[str] = Field(default="")
    avatar_url: Optional[str] = Field(default="")


# Human-friendly field name mapping for clean UI error messages
FIELD_NAMES = {
    'sender_name': 'Name',
    'sender_email': 'Email',
    'message_body': 'Message',
    'title': 'Title',
    'slug': 'Slug',
    'short_description': 'Short description',
    'content': 'Content',
    'tech_stack': 'Tech stack',
    'image_url': 'Image URL',
    'github_url': 'GitHub URL',
    'live_url': 'Live URL',
    'category': 'Category',
    'organization': 'Organization',
    'period': 'Period',
    'badge_label': 'Badge label',
    'badge_color': 'Badge color',
    'full_name': 'Full name',
    'role': 'Role',
    'bio_text': 'Bio',
    'resume_url': 'Resume URL',
    'avatar_url': 'Avatar URL'
}

def validate_payload(schema_cls, data: dict):
    """
    Validates a dictionary against a Pydantic schema class.
    Returns clean, natural, user-friendly error messages without technical jargon.
    """
    try:
        instance = schema_cls.model_validate(data)
        cleaned = instance.model_dump()
        cleaned.pop('honeypot', None)
        return cleaned, None
    except Exception as e:
        if hasattr(e, 'errors'):
            err = e.errors()[0]
            raw_field = str(err.get('loc', [''])[0]) if err.get('loc') else ''
            field_name = FIELD_NAMES.get(raw_field, raw_field.replace('_', ' ').capitalize())
            err_type = err.get('type', '')
            ctx = err.get('ctx', {})
            msg = err.get('msg', 'Invalid data format')

            # 1. Custom validation messages from @field_validator
            if err_type == 'value_error' or msg.startswith('Value error, '):
                return None, msg.replace('Value error, ', '').strip()

            # 2. Missing required field
            if err_type == 'missing':
                return None, f"{field_name} is required."

            # 3. String too short
            if err_type == 'string_too_short':
                min_len = ctx.get('min_length', '')
                return None, f"{field_name} must be at least {min_len} characters long."

            # 4. String too long
            if err_type == 'string_too_long':
                max_len = ctx.get('max_length', '')
                return None, f"{field_name} cannot exceed {max_len} characters."

            # Fallback
            if field_name:
                return None, f"{field_name}: {msg}"
            return None, msg

        return None, str(e)
