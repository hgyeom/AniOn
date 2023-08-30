import styled from 'styled-components';

interface Props {
  $isSelected: boolean;
}

export const S = {
  CategorySection: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 1126px;
    gap: 12px;
    row-gap: 12px;
  `,

  CategoryDiv: styled.div<Props>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    font-size: 12px;
    height: 17px;
    padding: 4px 12px;
    border: 1px solid;
    border-color: ${(props) => (props.$isSelected ? '#FF96DB' : '#F4F4F4')};
    /* color: ${(props) => (props.$isSelected ? 'white' : 'black')}; */
    background-color: ${(props) => (props.$isSelected ? '#FFEBF7' : '#F4F4F4')};
    cursor: pointer;
    &:hover {
      background-color: #dbdbdb;
      color: black;
    }
  `,
};
