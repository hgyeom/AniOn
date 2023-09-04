// import { MyProfilePoint } from './MyPage.styles';
import React, { useState } from 'react';
import { Database } from '../types/supabase';
import { styled } from 'styled-components';
import * as modalStore from '../store/modalStore';
import { useAtomValue, useSetAtom } from 'jotai';
import * as userStore from '../store/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchAwards,
  fetchMyAwards,
  purchase,
  purchaseRes,
} from '../api/items';
// type ReadAwards = Database['public']['Tables']['items']['Row'];

const ShopAwardList = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const user = useAtomValue(userStore.user);
  const isModalOpened = useSetAtom(modalStore.isModalOpened);
  const setModalContents = useSetAtom(modalStore.modalContents);
  const setAwardfModalContents = useSetAtom(modalStore.awardModalContent);
  const itemsPerPage = 16;

  // 상점에 판매중인 칭호 불러오기
  const awardsQueryOptions = {
    queryKey: ['awards'],
    queryFn: () => fetchAwards(),
    refetchOnWindowFocus: false,
  };
  const { data: awards, isLoading } = useQuery(awardsQueryOptions);

  // 보유중인 칭호 불러오기
  const myAwardsQueryOptions = {
    queryKey: ['myAwards'],
    queryFn: () => fetchMyAwards(user!.id),
    refetchOnWindowFocus: false,
    staleTime: 60 * 60,
    enabled: !!user,
  };

  const { data: myAwards } = useQuery(myAwardsQueryOptions);
  // 구매 후 invalidate를 위한 mutation

  // 구매 여부 판단을 위한 배열
  const purchasedItemIds = myAwards?.map((item) => item.item_id) || [];

  return (
    <GridContainer>
      <GridContainer>
        {isLoading && !awards
          ? [
              ...Array(16).map((_, index) => (
                <div>
                  <AwardName></AwardName>
                  <ShopMenu>
                    <AwardPrice>포인트</AwardPrice>
                    <BuyButton>구매하기</BuyButton>
                  </ShopMenu>
                </div>
              )),
            ]
          : awards
              ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((item, index) => {
                return (
                  <div key={item.id}>
                    <AwardName>{item.name}</AwardName>
                    <ShopMenu>
                      <AwardPrice>{item.price}포인트</AwardPrice>
                      <BuyButton
                        onClick={() => {
                          setModalContents('award');
                          setAwardfModalContents({
                            id: item.id,
                            index: index,
                            title: item.name,
                            price: item.price,
                          });
                          isModalOpened(true);
                        }}
                        disabled={purchasedItemIds?.includes(item.id) || !user}
                      >
                        구매하기
                      </BuyButton>
                    </ShopMenu>
                  </div>
                );
              })}
      </GridContainer>
    </GridContainer>
  );
};

export default ShopAwardList;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 10px;
  padding: 10px;
`;

// const Container = styled.div`
//   width: 280px;

//   margin-top: 40px;
// `;

export const AwardName = styled.div`
  background-color: #efefef;
  padding: 8px;
  border-radius: 999px;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.3px;
  display: flex;
  height: 48px;
  width: 210px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  margin: 10px;
`;

export const AwardPrice = styled.div`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.24px;
  margin-top: 20px;
  width: 100px;
  height: 32px;
`;

export const BuyButton = styled.button`
  border-radius: 6px;
  border: 1px solid #c88fff;
  background-color: white;
  width: 70px;
  height: 26px;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    background-color: #c88fff;
    color: white;
  }

  &:disabled:hover {
    background-color: white;
    color: #cccccc;
    cursor: not-allowed;
  }
`;

export const ShopMenu = styled.div`
  display: flex;
  width: 220px;
  height: 32px;
  padding: 0px 8px;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
