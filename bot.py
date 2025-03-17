import logging
import os
import json
from datetime import datetime
from dotenv import load_dotenv
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, CallbackQueryHandler, filters, ContextTypes
from database import db, User, Lesson, Homework, HomeworkSubmission

# Загружаем переменные окружения
load_dotenv()

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# Получаем токен бота из переменных окружения
TOKEN = os.getenv('BOT_TOKEN')

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /start"""
    user = update.effective_user
    db_user = db.get_user(user.id)
    
    if not db_user:
        db_user = db.create_user(
            user_id=user.id,
            username=user.username,
            first_name=user.first_name,
            last_name=user.last_name
        )
    
    await update.message.reply_text(
        f'Привет, {user.first_name}! Я бот для изучения английского языка. '
        'Используйте /help для просмотра доступных команд.'
    )

async def help(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /help"""
    help_text = """
Доступные команды:
/start - Начать работу с ботом
/help - Показать это сообщение
/lessons - Открыть уроки
/homework - Домашние задания
/profile - Ваш профиль
    """
    await update.message.reply_text(help_text)

async def lessons(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /lessons"""
    user = db.get_user(update.effective_user.id)
    if not user:
        await update.message.reply_text("Пожалуйста, сначала используйте команду /start")
        return

    lessons = db.get_lessons_by_level(user.level)
    if not lessons:
        await update.message.reply_text("На данный момент нет доступных уроков для вашего уровня.")
        return

    keyboard = []
    for lesson in lessons:
        keyboard.append([InlineKeyboardButton(
            f"Урок {lesson.order}: {lesson.title}",
            callback_data=f"lesson_{lesson.id}"
        )])

    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        f"Доступные уроки для уровня {user.level}:",
        reply_markup=reply_markup
    )

async def homework(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /homework"""
    user = db.get_user(update.effective_user.id)
    if not user:
        await update.message.reply_text("Пожалуйста, сначала используйте команду /start")
        return

    submissions = db.get_user_submissions(user.id)
    if not submissions:
        await update.message.reply_text("У вас пока нет домашних заданий.")
        return

    message = "Ваши домашние задания:\n\n"
    for submission in submissions:
        homework = db.get_homework(submission.homework_id)
        if homework:
            message += f"📝 {homework.title}\n"
            message += f"Статус: {'✅ Проверено' if submission.grade else '⏳ На проверке'}\n"
            if submission.grade:
                message += f"Оценка: {submission.grade}/5\n"
            if submission.feedback:
                message += f"Комментарий: {submission.feedback}\n"
            message += "\n"

    await update.message.reply_text(message)

async def profile(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /profile"""
    user = db.get_user(update.effective_user.id)
    if not user:
        await update.message.reply_text("Пожалуйста, сначала используйте команду /start")
        return

    profile_text = f"""
👤 Профиль пользователя:
Имя: {user.first_name} {user.last_name or ''}
Уровень: {user.level}
Опыт: {user.experience}
Выполнено уроков: {len(user.completed_lessons)}
Серия занятий: {user.streak} дней
    """
    await update.message.reply_text(profile_text)

async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик нажатий на кнопки"""
    query = update.callback_query
    await query.answer()

    if query.data.startswith("lesson_"):
        lesson_id = int(query.data.split("_")[1])
        lesson = db.get_lesson(lesson_id)
        if lesson:
            message = f"""
📚 {lesson.title}

{lesson.description}

{lesson.content}
            """
            if lesson.audio_url:
                message += f"\n🎧 Аудио: {lesson.audio_url}"
            
            await query.message.reply_text(message)

async def webapp_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик данных от веб-приложения"""
    try:
        data = json.loads(update.effective_message.web_app_data.data)
        user = db.get_user(update.effective_user.id)
        
        if not user:
            await update.message.reply_text("Ошибка: пользователь не найден")
            return

        action = data.get('action')
        
        if action == 'submit_homework':
            homework_id = data.get('homework_id')
            content = data.get('content')
            type = data.get('type')
            
            if not all([homework_id, content, type]):
                await update.message.reply_text("Ошибка: не все данные предоставлены")
                return
                
            submission = db.submit_homework(homework_id, user.id, content, type)
            await update.message.reply_text(
                f"✅ Домашнее задание успешно отправлено!\n"
                f"ID: {submission.id}\n"
                f"Тип: {'Текст' if type == 'text' else 'Голосовое сообщение'}"
            )
            
        elif action == 'complete_lesson':
            lesson_id = data.get('lesson_id')
            if not lesson_id:
                await update.message.reply_text("Ошибка: ID урока не указан")
                return
                
            if lesson_id not in user.completed_lessons:
                user.completed_lessons.append(lesson_id)
                user.experience += 100  # Начисляем опыт за выполнение урока
                
                # Проверяем, нужно ли повысить уровень
                if user.experience >= user.level * 1000:
                    user.level += 1
                    await update.message.reply_text(
                        f"🎉 Поздравляем! Вы достигли уровня {user.level}!"
                    )
                
                await update.message.reply_text(
                    f"✅ Урок успешно завершен!\n"
                    f"Получено опыта: 100"
                )
            else:
                await update.message.reply_text("Этот урок уже был завершен")
                
        else:
            await update.message.reply_text("Неизвестное действие")
            
    except json.JSONDecodeError:
        await update.message.reply_text("Ошибка: неверный формат данных")
    except Exception as e:
        logging.error(f"Ошибка при обработке данных от веб-приложения: {e}")
        await update.message.reply_text("Произошла ошибка при обработке данных")

def main():
    """Запуск бота"""
    if not TOKEN:
        logging.error("Не найден токен бота. Проверьте файл .env")
        return

    # Создаем приложение
    application = Application.builder().token(TOKEN).build()

    # Добавляем обработчики команд
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help))
    application.add_handler(CommandHandler("lessons", lessons))
    application.add_handler(CommandHandler("homework", homework))
    application.add_handler(CommandHandler("profile", profile))
    
    # Обработчик нажатий на кнопки
    application.add_handler(CallbackQueryHandler(button_callback))
    
    # Обработчик данных от веб-приложения
    application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, webapp_data))

    # Запускаем бота
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main() 