import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { CATEGORIES } from '../../lib/constants/categories';
import {
  categoryAtom,
  categoryErrorMessageAtom,
} from '../../store/adminProductUploadAtom';
import Select from '../@common/atoms/Select/Select';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';

export default React.memo(function CategorySelect() {
  const [category, setCategory] = useAtom(categoryAtom);
  const [categoryErrorMessage, setCategoryErrorMessage] = useAtom(
    categoryErrorMessageAtom,
  );

  useEffect(() => {
    if (category && category !== '') {
      setCategoryErrorMessage('');
    }
  }, [category]);

  return (
    <FormFieldContainer label="CATEGORY" errorMessage={categoryErrorMessage}>
      <Select
        label="카테고리를 선택하세요"
        options={CATEGORIES.filter((category) => category !== 'All')}
        value={category}
        onSetValue={setCategory}
        status="default"
      />
    </FormFieldContainer>
  );
});
