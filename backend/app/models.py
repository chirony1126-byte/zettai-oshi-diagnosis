from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class DiagnosisSession(Base):
    __tablename__ = "diagnosis_sessions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now
    )

    first_member: Mapped[str] = mapped_column(String)
    second_member: Mapped[str] = mapped_column(String)
    third_member: Mapped[str] = mapped_column(String)

    answers = relationship(
        "DiagnosisAnswer",
        back_populates="session",
        cascade="all, delete-orphan"
    )

    feedback = relationship(
        "Feedback",
        back_populates="session",
        uselist=False,
        cascade="all, delete-orphan"
    )


class DiagnosisAnswer(Base):
    __tablename__ = "diagnosis_answers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    session_id: Mapped[int] = mapped_column(
        ForeignKey("diagnosis_sessions.id")
    )

    question_id: Mapped[int] = mapped_column(Integer)
    answer_id: Mapped[str] = mapped_column(String)

    session = relationship(
        "DiagnosisSession",
        back_populates="answers"
    )


class Feedback(Base):
    __tablename__ = "feedback"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    session_id: Mapped[int] = mapped_column(
        ForeignKey("diagnosis_sessions.id"),
        unique=True
    )

    reaction: Mapped[str] = mapped_column(String)
    interested_member: Mapped[str] = mapped_column(String)

    session = relationship(
        "DiagnosisSession",
        back_populates="feedback"
    )