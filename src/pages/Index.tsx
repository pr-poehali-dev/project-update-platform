import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Project {
  id: number;
  title: string;
  building: 'ПР' | 'ПК' | 'АВ' | 'БС' | 'М';
  difficulty: 1 | 2 | 3 | 4 | 5;
  spotsLeft: number;
  category: string;
  specialty: string;
  course: number;
  hasInternship: boolean;
  partner: string;
}

const mockProjects: Project[] = [
  { id: 1, title: 'Разработка мобильного приложения для студентов', building: 'ПР', difficulty: 4, spotsLeft: 3, category: 'IT', specialty: 'Программная инженерия', course: 3, hasInternship: true, partner: 'Яндекс' },
  { id: 2, title: 'Исследование нейронных сетей в медицине', building: 'АВ', difficulty: 5, spotsLeft: 2, category: 'AI/ML', specialty: 'Прикладная математика', course: 4, hasInternship: true, partner: 'Сбер' },
  { id: 3, title: 'Дизайн-система для корпоративного сайта', building: 'ПК', difficulty: 2, spotsLeft: 5, category: 'Дизайн', specialty: 'Дизайн', course: 2, hasInternship: false, partner: 'ВТБ' },
  { id: 4, title: 'Анализ больших данных в финтехе', building: 'БС', difficulty: 4, spotsLeft: 0, category: 'Data Science', specialty: 'Прикладная математика', course: 3, hasInternship: true, partner: 'Тинькофф' },
  { id: 5, title: 'Разработка веб-платформы для образования', building: 'М', difficulty: 3, spotsLeft: 4, category: 'IT', specialty: 'Программная инженерия', course: 2, hasInternship: true, partner: 'Skyeng' },
  { id: 6, title: 'Создание чат-бота для поддержки клиентов', building: 'ПР', difficulty: 3, spotsLeft: 6, category: 'IT', specialty: 'Программная инженерия', course: 2, hasInternship: false, partner: 'Ozon' },
  { id: 7, title: 'Разработка IoT-решений для умного дома', building: 'АВ', difficulty: 5, spotsLeft: 2, category: 'IoT', specialty: 'Информатика', course: 4, hasInternship: true, partner: 'Яндекс' },
  { id: 8, title: 'Маркетинговая стратегия для стартапа', building: 'ПК', difficulty: 2, spotsLeft: 8, category: 'Маркетинг', specialty: 'Менеджмент', course: 1, hasInternship: false, partner: 'Сбер' },
];

const partners = ['Яндекс', 'Сбер', 'ВТБ', 'Тинькофф', 'Skyeng', 'Ozon'];

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    specialties: [] as string[],
    courses: [] as number[],
    difficulties: [] as number[],
    buildings: [] as string[],
    hasInternship: false,
  });
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

  const categories = Array.from(new Set(mockProjects.map(p => p.category)));
  const specialties = Array.from(new Set(mockProjects.map(p => p.specialty)));
  const courses = Array.from(new Set(mockProjects.map(p => p.course))).sort();
  const difficulties = [1, 2, 3, 4, 5];
  const buildings = ['ПР', 'ПК', 'АВ', 'БС', 'М'];

  const handleFilterChange = (type: keyof typeof filters, value: any) => {
    setFilters(prev => {
      if (type === 'hasInternship') {
        return { ...prev, [type]: value };
      }
      const currentArray = prev[type] as any[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [type]: newArray };
    });
  };

  const filteredProjects = useMemo(() => {
    let result = mockProjects;

    if (searchTerm) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }
    if (filters.specialties.length > 0) {
      result = result.filter(p => filters.specialties.includes(p.specialty));
    }
    if (filters.courses.length > 0) {
      result = result.filter(p => filters.courses.includes(p.course));
    }
    if (filters.difficulties.length > 0) {
      result = result.filter(p => filters.difficulties.includes(p.difficulty));
    }
    if (filters.buildings.length > 0) {
      result = result.filter(p => filters.buildings.includes(p.building));
    }
    if (filters.hasInternship) {
      result = result.filter(p => p.hasInternship);
    }

    if (selectedPartner) {
      result = result.filter(p => p.partner === selectedPartner);
    }

    if (sortBy === 'difficulty-asc') {
      result = [...result].sort((a, b) => a.difficulty - b.difficulty);
    } else if (sortBy === 'difficulty-desc') {
      result = [...result].sort((a, b) => b.difficulty - a.difficulty);
    } else if (sortBy === 'spots') {
      result = [...result].sort((a, b) => b.spotsLeft - a.spotsLeft);
    }

    return result;
  }, [mockProjects, searchTerm, filters, selectedPartner, sortBy]);

  const availableProjects = mockProjects.filter(p => p.spotsLeft > 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="bg-gradient-to-r from-primary via-accent to-secondary text-white py-12 px-6 animate-fade-in">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-5xl font-heading font-bold mb-4">Проектная деятельность</h1>
          <p className="text-xl opacity-90 mb-6">
            Получи реальный опыт, найди стажировку и пополни портфолио, работая с ведущими компаниями! 🚀
          </p>
          <div className="flex gap-8 text-lg">
            <div className="flex items-center gap-2">
              <Icon name="Briefcase" size={24} />
              <span className="font-semibold">{mockProjects.length}</span> проектов
            </div>
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" size={24} />
              <span className="font-semibold">{availableProjects}</span> доступно
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        <div className="flex gap-8">
          <aside className="w-80 flex-shrink-0">
            <Card className="sticky top-4 animate-slide-in-right">
              <CardHeader>
                <h2 className="text-xl font-heading font-bold">Фильтры</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Тематика</Label>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <div key={cat} className="flex items-center gap-2">
                        <Checkbox
                          id={`cat-${cat}`}
                          checked={filters.categories.includes(cat)}
                          onCheckedChange={() => handleFilterChange('categories', cat)}
                        />
                        <label htmlFor={`cat-${cat}`} className="text-sm cursor-pointer">{cat}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Специальность</Label>
                  <div className="space-y-2">
                    {specialties.map(spec => (
                      <div key={spec} className="flex items-center gap-2">
                        <Checkbox
                          id={`spec-${spec}`}
                          checked={filters.specialties.includes(spec)}
                          onCheckedChange={() => handleFilterChange('specialties', spec)}
                        />
                        <label htmlFor={`spec-${spec}`} className="text-sm cursor-pointer">{spec}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Курс</Label>
                  <div className="space-y-2">
                    {courses.map(course => (
                      <div key={course} className="flex items-center gap-2">
                        <Checkbox
                          id={`course-${course}`}
                          checked={filters.courses.includes(course)}
                          onCheckedChange={() => handleFilterChange('courses', course)}
                        />
                        <label htmlFor={`course-${course}`} className="text-sm cursor-pointer">{course} курс</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Сложность</Label>
                  <div className="space-y-2">
                    {difficulties.map(diff => (
                      <div key={diff} className="flex items-center gap-2">
                        <Checkbox
                          id={`diff-${diff}`}
                          checked={filters.difficulties.includes(diff)}
                          onCheckedChange={() => handleFilterChange('difficulties', diff)}
                        />
                        <label htmlFor={`diff-${diff}`} className="text-sm cursor-pointer flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={14}
                              className={i < diff ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Корпус</Label>
                  <div className="space-y-2">
                    {buildings.map(building => (
                      <div key={building} className="flex items-center gap-2">
                        <Checkbox
                          id={`building-${building}`}
                          checked={filters.buildings.includes(building)}
                          onCheckedChange={() => handleFilterChange('buildings', building)}
                        />
                        <label htmlFor={`building-${building}`} className="text-sm cursor-pointer">{building}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t">
                  <Checkbox
                    id="internship"
                    checked={filters.hasInternship}
                    onCheckedChange={(checked) => handleFilterChange('hasInternship', checked)}
                  />
                  <label htmlFor="internship" className="text-sm cursor-pointer font-medium">Только со стажировкой</label>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Поиск проектов..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">По умолчанию</SelectItem>
                  <SelectItem value="difficulty-asc">Сложность: по возрастанию</SelectItem>
                  <SelectItem value="difficulty-desc">Сложность: по убыванию</SelectItem>
                  <SelectItem value="spots">Больше мест</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 mb-12">
              {filteredProjects.map((project, idx) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-heading font-semibold mb-2">{project.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{project.category}</Badge>
                          <Badge variant="outline">{project.building}</Badge>
                          {project.hasInternship && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              <Icon name="Briefcase" size={12} className="mr-1" />
                              Стажировка
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-0.5 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={16}
                              className={i < project.difficulty ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <div className={`text-sm font-semibold ${project.spotsLeft > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {project.spotsLeft > 0 ? `${project.spotsLeft} мест` : 'Мест нет'}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Icon name="GraduationCap" size={16} />
                        <span>{project.specialty}, {project.course} курс</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Building2" size={16} />
                        <span>Партнёр: {project.partner}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      <Icon name="Info" size={16} className="mr-2" />
                      Подробнее
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      disabled={project.spotsLeft === 0}
                    >
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      Записаться
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 pt-12 border-t">
              <h2 className="text-3xl font-heading font-bold mb-6 text-center">Наши партнёры</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {partners.map(partner => {
                  const projectCount = mockProjects.filter(p => p.partner === partner).length;
                  const isSelected = selectedPartner === partner;
                  return (
                    <Card 
                      key={partner}
                      className={`cursor-pointer hover:shadow-md transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedPartner(isSelected ? null : partner)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl mb-2">🏢</div>
                        <h3 className="font-semibold mb-1">{partner}</h3>
                        <p className="text-xs text-muted-foreground">{projectCount} проектов</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              {selectedPartner && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
                  <p className="text-sm">
                    Показаны проекты от партнёра <span className="font-semibold">{selectedPartner}</span>
                    <Button 
                      variant="link" 
                      size="sm"
                      onClick={() => setSelectedPartner(null)}
                      className="ml-2"
                    >
                      Сбросить
                    </Button>
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;