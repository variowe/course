from dataclasses import dataclass
from typing import List, Dict, Optional
from datetime import datetime

@dataclass
class User:
    id: int
    username: str
    first_name: str
    last_name: Optional[str]
    level: int = 1
    experience: int = 0
    completed_lessons: List[int] = None
    streak: int = 0
    last_activity: datetime = None

@dataclass
class Lesson:
    id: int
    title: str
    description: str
    content: str
    audio_url: Optional[str]
    level: int
    order: int

@dataclass
class Homework:
    id: int
    lesson_id: int
    title: str
    description: str
    deadline: datetime
    type: str  # 'text' или 'voice'

@dataclass
class HomeworkSubmission:
    id: int
    homework_id: int
    user_id: int
    content: str  # текст или URL аудио
    type: str
    submitted_at: datetime
    grade: Optional[int] = None
    feedback: Optional[str] = None

class Database:
    def __init__(self):
        self.users: Dict[int, User] = {}
        self.lessons: Dict[int, Lesson] = {}
        self.homework: Dict[int, Homework] = {}
        self.submissions: Dict[int, List[HomeworkSubmission]] = {}

    def get_user(self, user_id: int) -> Optional[User]:
        return self.users.get(user_id)

    def create_user(self, user_id: int, username: str, first_name: str, last_name: Optional[str] = None) -> User:
        user = User(
            id=user_id,
            username=username,
            first_name=first_name,
            last_name=last_name,
            completed_lessons=[]
        )
        self.users[user_id] = user
        return user

    def get_lesson(self, lesson_id: int) -> Optional[Lesson]:
        return self.lessons.get(lesson_id)

    def get_lessons_by_level(self, level: int) -> List[Lesson]:
        return [lesson for lesson in self.lessons.values() if lesson.level == level]

    def get_homework(self, homework_id: int) -> Optional[Homework]:
        return self.homework.get(homework_id)

    def get_homework_by_lesson(self, lesson_id: int) -> List[Homework]:
        return [hw for hw in self.homework.values() if hw.lesson_id == lesson_id]

    def submit_homework(self, homework_id: int, user_id: int, content: str, type: str) -> HomeworkSubmission:
        submission = HomeworkSubmission(
            id=len(self.submissions.get(homework_id, [])) + 1,
            homework_id=homework_id,
            user_id=user_id,
            content=content,
            type=type,
            submitted_at=datetime.now()
        )
        
        if homework_id not in self.submissions:
            self.submissions[homework_id] = []
        self.submissions[homework_id].append(submission)
        return submission

    def get_user_submissions(self, user_id: int) -> List[HomeworkSubmission]:
        all_submissions = []
        for submissions in self.submissions.values():
            all_submissions.extend([s for s in submissions if s.user_id == user_id])
        return all_submissions

# Создаем глобальный экземпляр базы данных
db = Database() 