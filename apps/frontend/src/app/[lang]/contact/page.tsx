import { getDictionary } from '../dictionaries';
import ContactForm from '../components/contact-form';
import { MapPin, Phone, Mail } from 'lucide-react';

export default async function ContactPage({
  params,
}: {
  params: { lang: string };
}) {
  const dictionary = await getDictionary(params.lang as 'en' | 'ru');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{dictionary.contact.title}</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <ContactForm
            dictionary={dictionary}
            lang={params.lang as 'en' | 'ru'}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-6">
            {params.lang === 'en'
              ? 'Contact Information'
              : 'Контактная информация'}
          </h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
              <div>
                <h3 className="font-medium">
                  {params.lang === 'en' ? 'Address' : 'Адрес'}
                </h3>
                <p className="text-gray-600 mt-1">
                  {dictionary.contact.address}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="w-5 h-5 text-blue-600 mt-1 mr-3" />
              <div>
                <h3 className="font-medium">
                  {params.lang === 'en' ? 'Phone' : 'Телефон'}
                </h3>
                <p className="text-gray-600 mt-1">{dictionary.contact.phone}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="w-5 h-5 text-blue-600 mt-1 mr-3" />
              <div>
                <h3 className="font-medium">
                  {params.lang === 'en' ? 'Email' : 'Электронная почта'}
                </h3>
                <p className="text-gray-600 mt-1">{dictionary.contact.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-3">
              {params.lang === 'en' ? 'Working Hours' : 'Часы работы'}
            </h3>
            <p className="text-gray-600">
              {params.lang === 'en'
                ? 'Monday - Friday: 9:00 AM - 5:00 PM'
                : 'Понедельник - Пятница: 9:00 - 17:00'}
            </p>
            <p className="text-gray-600">
              {params.lang === 'en'
                ? 'Saturday - Sunday: Closed'
                : 'Суббота - Воскресенье: Выходной'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
