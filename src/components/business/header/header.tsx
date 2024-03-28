import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Select, type SelectItem } from '@/components/shared/select';

import './style.scss';

export const Header = () => {
  const { t, i18n } = useTranslation('header');

  const items: SelectItem[] = useMemo(() => {
    return [
      { value: 'en', label: t('en') },
      { value: 'ru', label: t('ru') },
    ];
  }, [t]);

  return (
    <header className={'header'} data-testid={'header'}>
      <span className={'header__title'}>{t('app_name')} 🤪</span>
      <Select
        className={'header__select'}
        label={t('select_label')}
        items={items}
        onChange={event => i18n.changeLanguage(event.target.value as string)}
        value={i18n.language}
      />
    </header>
  );
};
