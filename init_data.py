from datetime import datetime, timedelta
from database import db, Lesson, Homework

def init_test_data():
    # Создаем тестовые уроки
    lessons = [
        Lesson(
            id=1,
            title="Present Simple - Основы",
            description="Изучите базовое время английского языка",
            content="""Present Simple используется для:
• Регулярных действий
• Фактов и общих истин
• Расписаний и графиков

Примеры:
I work every day.
The sun rises in the east.
The train leaves at 9 AM.""",
            audio_url="https://example.com/audio/present-simple.mp3",
            level=1,
            order=1
        ),
        Lesson(
            id=2,
            title="Present Simple - Отрицания и вопросы",
            description="Научитесь задавать вопросы и строить отрицания в Present Simple",
            content="""Отрицания:
I don't work on weekends.
She doesn't speak French.

Вопросы:
Do you like coffee?
Does he play tennis?""",
            audio_url="https://example.com/audio/present-simple-questions.mp3",
            level=1,
            order=2
        ),
        Lesson(
            id=3,
            title="Past Simple - Основы",
            description="Изучите прошедшее простое время",
            content="""Past Simple используется для:
• Завершенных действий в прошлом
• Последовательности событий
• Фактов из прошлого

Примеры:
I visited Paris last year.
She worked at the bank for 5 years.
They moved to London in 2020.""",
            audio_url="https://example.com/audio/past-simple.mp3",
            level=2,
            order=1
        )
    ]

    # Добавляем уроки в базу данных
    for lesson in lessons:
        db.lessons[lesson.id] = lesson

    # Создаем тестовые домашние задания
    homework = [
        Homework(
            id=1,
            lesson_id=1,
            title="Упражнение 1: Present Simple",
            description="Напишите 5 предложений о своих ежедневных действиях в Present Simple.",
            deadline=datetime.now() + timedelta(days=7),
            type="text"
        ),
        Homework(
            id=2,
            lesson_id=1,
            title="Упражнение 2: Произношение",
            description="Запишите аудио, прочитав следующий текст: 'I wake up early every morning and start my day with a cup of coffee.'",
            deadline=datetime.now() + timedelta(days=7),
            type="voice"
        ),
        Homework(
            id=3,
            lesson_id=2,
            title="Упражнение 3: Вопросы",
            description="Составьте 5 вопросов в Present Simple и запишите их произношение.",
            deadline=datetime.now() + timedelta(days=5),
            type="voice"
        )
    ]

    # Добавляем домашние задания в базу данных
    for hw in homework:
        db.homework[hw.id] = hw

if __name__ == "__main__":
    init_test_data()
    print("Тестовые данные успешно добавлены в базу данных.") 