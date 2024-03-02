import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { LINE_COLORS, TEXT_COLORS } from '../../../../lib/constants/colors';

interface SelectProps {
  label: string;
  options: string[];
  status?: 'default' | 'focus' | 'error';
  value: string;
  onSetValue: React.Dispatch<React.SetStateAction<string>>;
}

export default React.memo(function Select({
  label,
  options,
  // status,
  value,
  onSetValue,
}: SelectProps) {
  const [status, setStatus] = useState<'default' | 'focus' | 'error'>(
    'default',
  );

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const handleOptionClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    if (!e.currentTarget.textContent) return;

    onSetValue(e.currentTarget.textContent);

    setStatus('default');

    // setIsSelectOpen(false);
  };

  const handleSelectOpen = () => {
    // setIsSelectOpen((prev) => !prev);

    if (status === 'default') setStatus('focus');
    else setStatus('default');
  };

  useEffect(() => {
    onSetValue(value);
  }, []);

  return (
    <Container>
      <LabelAndIconContainerButton onClick={handleSelectOpen} status={status}>
        <Label className={value !== '' ? 'selected' : ''}>
          {value || label}
        </Label>
        <ArrowDownIcon status={status} />
      </LabelAndIconContainerButton>

      {status === 'focus' && (
        <Options status={status}>
          {options.map((option) => (
            <Option onClick={handleOptionClick} key={option}>
              {option}
            </Option>
          ))}
        </Options>
      )}
    </Container>
  );
});

interface StyledSelectProps {
  status: 'default' | 'focus' | 'error';
}

const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  align-self: center;
  cursor: pointer;
  z-index: 1;

  & * {
    letter-spacing: normal;
  }
`;

const LabelAndIconContainerButton = styled.button<StyledSelectProps>`
  display: block;
  width: 100%;
  height: 32px;
  line-height: 32px;
  color: ${(props) => TEXT_COLORS[props.status]};
  border: 1px solid ${(props) => LINE_COLORS[props.status]};
  letter-spacing: normal;
`;

const Label = styled.label`
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 10px;
  text-align: left;
  color: var(--color-gray300);

  &&.selected {
    color: var(--color-navy);
  }
`;

const Options = styled.ul<StyledSelectProps>`
  position: absolute;
  list-style: none;
  top: 32px;
  left: 0;
  width: 100%;
  overflow: hidden;
  padding: 0;
  background-color: var(--color-white);

  border: 1px solid var(--color-gray100);
  border: 1px solid ${(props) => LINE_COLORS[props.status]};
  border-top: 0;
`;

const Option = styled.li`
  padding: 9px 10px;
  transition: background-color 0.2s ease-in;
  height: 32px;
  border-bottom: 1px solid var(--color-gray100);
  color: var(--color-gray300);
  letter-spacing: normal;
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--color-gray100);
    color: var(--color-gray300);
  }
`;

const ArrowDownIcon = styled(IoIosArrowDown)<StyledSelectProps>`
  position: absolute;
  top: 9px;
  right: 10px;
  font-size: 14px;
  color: var(--color-gray200);
  transform: ${(props) =>
    props.status === 'focus' ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform ease 300ms;

  &.open {
    transform: rotate(180deg);
  }
`;
