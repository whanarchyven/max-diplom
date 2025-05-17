import Image from 'next/image';
import { getDictionary } from '../dictionaries';

export default async function AboutPage({
  params,
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(params.lang as 'en' | 'ru');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{dict.about.title}</h1>

      <div className="mb-12">
        <Image
          src="/modern-cancer-lab.png"
          width={800}
          height={400}
          alt="Cancer Research Institute"
          className="w-full rounded-lg shadow-md mb-6"
        />
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{dict.about.mission.title}</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {dict.about.mission.description}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{dict.about.research.title}</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {dict.about.research.description}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">
              {params.lang === 'en'
                ? 'Basic Research'
                : 'Фундаментальные исследования'}
            </h3>
            <p className="text-gray-700">
              {params.lang === 'en'
                ? 'Understanding the fundamental biology of cancer cells and the mechanisms that drive their growth and spread.'
                : 'Понимание фундаментальной биологии раковых клеток и механизмов, которые стимулируют их рост и распространение.'}
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">
              {params.lang === 'en'
                ? 'Translational Research'
                : 'Трансляционные исследования'}
            </h3>
            <p className="text-gray-700">
              {params.lang === 'en'
                ? 'Bridging laboratory discoveries with clinical applications to develop new diagnostic tools and treatments.'
                : 'Связь лабораторных открытий с клиническими приложениями для разработки новых диагностических инструментов и методов лечения.'}
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">
              {params.lang === 'en'
                ? 'Clinical Research'
                : 'Клинические исследования'}
            </h3>
            <p className="text-gray-700">
              {params.lang === 'en'
                ? 'Conducting clinical trials to test new therapies and improve existing treatment protocols.'
                : 'Проведение клинических испытаний для тестирования новых методов лечения и улучшения существующих протоколов лечения.'}
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">
              {params.lang === 'en'
                ? 'Population Studies'
                : 'Популяционные исследования'}
            </h3>
            <p className="text-gray-700">
              {params.lang === 'en'
                ? 'Analyzing cancer patterns in populations to identify risk factors and develop prevention strategies.'
                : 'Анализ закономерностей рака в популяциях для выявления факторов риска и разработки стратегий профилактики.'}
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">{dict.about.team.title}</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          {dict.about.team.description}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Team members would be dynamically loaded in a real application */}
          <div className="text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
              <Image
                src="/male-scientist-headshot.png"
                width={128}
                height={128}
                alt="Dr. Alexander Smith"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold">
              {params.lang === 'en'
                ? 'Dr. Alexander Smith'
                : 'Др. Александр Смит'}
            </h3>
            <p className="text-gray-600 text-sm">
              {params.lang === 'en' ? 'Director' : 'Директор'}
            </p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
              <Image
                src="/female-scientist-headshot.png"
                width={128}
                height={128}
                alt="Dr. Elena Petrova"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold">
              {params.lang === 'en' ? 'Dr. Elena Petrova' : 'Др. Елена Петрова'}
            </h3>
            <p className="text-gray-600 text-sm">
              {params.lang === 'en'
                ? 'Head of Research'
                : 'Руководитель исследований'}
            </p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
              <Image
                src="/male-doctor-headshot.png"
                width={128}
                height={128}
                alt="Dr. Michael Chen"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold">
              {params.lang === 'en' ? 'Dr. Michael Chen' : 'Др. Михаил Чен'}
            </h3>
            <p className="text-gray-600 text-sm">
              {params.lang === 'en'
                ? 'Clinical Director'
                : 'Клинический директор'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
