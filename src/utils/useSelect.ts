import React, { useState, useCallback, useMemo } from 'react';
import { normalize, schema } from 'normalizr';

interface ISelectEty {
  value: string,
  label: string
}

const useSelect = <T, V extends keyof T>(initOptions: T[], label: V, value: V) => {
  // const [options, setOptions] = useState<T[]>(nor);
  const [selectedEntity, setSelectedEntity] = useState<ISelectEty>();
  const [selected, setSelected] = useState<T>();

  const mapToSelectEty = useCallback((option: T):ISelectEty => {
    return {
      value: String(option[value] || ''),
      label: String(option[label] || '')
    }
  }, [value, label])

  const options = useMemo(() => {
    return initOptions.map(mapToSelectEty)
  }, [initOptions, mapToSelectEty])

  const optionSchema = new schema.Entity<T>('options', {}, { idAttribute: String(value) });

  const optionListSchema = [optionSchema];

  const normalizedOptions = useMemo(() => {
    return normalize(initOptions, optionListSchema).entities.options
  }, [initOptions])


  const changeSelected = useCallback((id: string) => {
    if (normalizedOptions) {
      const newSelected = normalizedOptions[id]
      const selectEty = mapToSelectEty(newSelected);
      setSelectedEntity(selectEty)
      setSelected(newSelected)
    }
  }, [mapToSelectEty, normalizedOptions])

  return { options, selected, selectedEntity, changeSelected }
};

export default useSelect;
