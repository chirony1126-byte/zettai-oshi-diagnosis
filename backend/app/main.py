from typing import List

from fastapi.middleware.cors import CORSMiddleware

from fastapi import Depends, FastAPI
from pydantic import BaseModel
from sqlalchemy.orm import Session

from . import models
from .database import Base, engine, get_db


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="絶対少女 推し診断 API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- 受け取るデータの形 ----------

class AnswerCreate(BaseModel):
    question_id: int
    answer_id: str


class DiagnosisCreate(BaseModel):
    first_member: str
    second_member: str
    third_member: str
    answers: List[AnswerCreate]


# ---------- API ----------

@app.get("/")
def root():
    return {
        "message": "絶対少女 推し診断 API",
        "status": "ok",
        "database": "connected"
    }


@app.post("/diagnoses")
def create_diagnosis(
    diagnosis: DiagnosisCreate,
    db: Session = Depends(get_db)
):
    # 診断結果TOP3を保存
    session = models.DiagnosisSession(
        first_member=diagnosis.first_member,
        second_member=diagnosis.second_member,
        third_member=diagnosis.third_member
    )

    db.add(session)
    db.flush()

    # 10問の回答を保存
    for answer in diagnosis.answers:
        db_answer = models.DiagnosisAnswer(
            session_id=session.id,
            question_id=answer.question_id,
            answer_id=answer.answer_id
        )

        db.add(db_answer)

    db.commit()
    db.refresh(session)

    return {
        "status": "saved",
        "session_id": session.id,
        "result": {
            "first": session.first_member,
            "second": session.second_member,
            "third": session.third_member
        }
    }