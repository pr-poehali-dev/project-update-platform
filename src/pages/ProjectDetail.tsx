import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Project {
  id: number;
  title: string;
  building: 'ПР' | 'ПК' | 'АВ' | 'БС' | 'М';
  difficulty: 1 | 2 | 3 | 4 | 5;
  spotsLeft: number;
  totalSpots: number;
  category: string;
  specialty: string[];
  course: number[];
  hasInternship: boolean;
  partner: string;
  professor: string;
  description: string;
  requirements: string[];
  benefits: string[];
  schedule: string;
  duration: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: 'Разработка мобильного приложения для студентов',
    building: 'ПР',
    difficulty: 4,
    spotsLeft: 3,
    totalSpots: 10,
    category: 'IT',
    specialty: ['Программная инженерия', 'Информатика'],
    course: [2, 3, 4],
    hasInternship: true,
    partner: 'Яндекс',
    professor: 'Иванов Сергей Петрович',
    description: 'Создание кроссплатформенного мобильного приложения для улучшения студенческой жизни. Вы получите опыт работы с React Native, TypeScript и современными подходами к разработке мобильных приложений. Проект включает разработку архитектуры, UI/UX дизайн и интеграцию с backend системами.',
    requirements: [
      'Базовые знания JavaScript/TypeScript',
      'Понимание основ разработки мобильных приложений',
      'Готовность работать в команде',
      'Минимум 10 часов в неделю'
    ],
    benefits: [
      'Реальный опыт работы с технологиями Яндекса',
      'Возможность стажировки в компании после проекта',
      'Менторство от ведущих разработчиков',
      'Проект в портфолио с миллионами пользователей',
      'Сертификат о прохождении проекта',
      'Приоритет при трудоустройстве в Яндекс'
    ],
    schedule: 'Вторник и четверг, 18:00-20:00',
    duration: '1 семестр (4 месяца)'
  },
  {
    id: 2,
    title: 'Исследование нейронных сетей в медицине',
    building: 'АВ',
    difficulty: 5,
    spotsLeft: 2,
    totalSpots: 6,
    category: 'AI/ML',
    specialty: ['Прикладная математика', 'Информатика', 'Биоинформатика'],
    course: [3, 4, 5],
    hasInternship: true,
    partner: 'Сбер',
    professor: 'Смирнова Анна Викторовна',
    description: 'Разработка алгоритмов машинного обучения для диагностики заболеваний по медицинским изображениям. Проект нацелен на создание AI-системы, способной помогать врачам в ранней диагностике. Работа с реальными медицинскими данными и современными архитектурами нейронных сетей.',
    requirements: [
      'Знание Python и библиотек ML (PyTorch/TensorFlow)',
      'Понимание основ машинного обучения',
      'Базовые знания математического анализа и линейной алгебры',
      'Опыт работы с данными приветствуется'
    ],
    benefits: [
      'Работа с реальными медицинскими данными',
      'Публикация результатов в научных журналах',
      'Стажировка в исследовательском центре Сбера',
      'Участие в конференциях по AI',
      'Доступ к вычислительным мощностям Сбера',
      'Возможность защиты магистерской диссертации по результатам проекта'
    ],
    schedule: 'Среда, 16:00-19:00',
    duration: '2 семестра (8 месяцев)'
  },
];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = mockProjects.find(p => p.id === Number(id)) || mockProjects[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="bg-gradient-to-r from-primary via-accent to-secondary text-white py-8 px-6">
        <div className="container mx-auto max-w-5xl">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => navigate('/')}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к каталогу
          </Button>
          <h1 className="text-4xl font-heading font-bold">{project.title}</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <h2 className="text-2xl font-heading font-bold">О проекте</h2>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-foreground/90">{project.description}</p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                  <Icon name="Sparkles" size={24} className="text-primary" />
                  Что ты получишь?
                </h2>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {project.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Icon name="CheckCircle" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <h2 className="text-2xl font-heading font-bold">Требования</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Icon name="Dot" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-base">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-4 animate-scale-in">
              <CardHeader className="bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={20}
                        className={i < project.difficulty ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {project.category}
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-heading font-bold text-primary mb-1">
                    {project.spotsLeft}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    свободных мест из {project.totalSpots}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg font-semibold"
                  disabled={project.spotsLeft === 0}
                >
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Записаться на проект
                </Button>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Icon name="Building2" size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Партнёр</div>
                      <div className="text-muted-foreground">{project.partner}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Icon name="User" size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Преподаватель</div>
                      <div className="text-muted-foreground">{project.professor}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Icon name="MapPin" size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Корпус</div>
                      <Badge variant="outline">{project.building}</Badge>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Icon name="Calendar" size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Расписание</div>
                      <div className="text-muted-foreground">{project.schedule}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Icon name="Clock" size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Длительность</div>
                      <div className="text-muted-foreground">{project.duration}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Icon name="GraduationCap" size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Специальности</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.specialty.map((spec, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Icon name="BookOpen" size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Курсы</div>
                      <div className="flex gap-1 mt-1">
                        {project.course.map((c, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {c} курс
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {project.hasInternship && (
                    <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                      <Icon name="Briefcase" size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-green-900">Есть стажировка</div>
                        <div className="text-xs text-green-700">
                          Возможность трудоустройства в {project.partner}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary to-accent text-white animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="text-3xl">🚀</div>
                  <h3 className="font-heading font-bold text-xl">Не упусти шанс!</h3>
                  <p className="text-sm opacity-90">
                    Только {project.spotsLeft} {project.spotsLeft === 1 ? 'место' : 'места'} осталось. 
                    Присоединяйся к команде и начни строить карьеру уже сейчас!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
