import { body, validationResult } from 'express-validator';
import { sendContactEmail } from '../services/emailService.js';

export const contactRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Имя обязательно')
    .isLength({ min: 2, max: 100 }).withMessage('Имя должно быть от 2 до 100 символов'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email обязателен')
    .isEmail().withMessage('Некорректный email')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Телефон обязателен')
    .matches(/^[\d\s\-\+\(\)]{10,20}$/).withMessage('Некорректный номер телефона'),
  
  body('comment')
    .trim()
    .notEmpty().withMessage('Комментарий обязателен')
    .isLength({ min: 10, max: 1000 }).withMessage('Комментарий должен быть от 10 до 1000 символов')
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

export const contactController = async (req, res) => {
  try {
    const { name, email, phone, comment } = req.body;

    await sendContactEmail({ name, email, phone, comment });

    res.status(200).json({
      success: true,
      message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при отправке формы. Пожалуйста, попробуйте позже.'
    });
  }
};
