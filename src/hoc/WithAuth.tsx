import React, { FC, useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { useAtom } from 'jotai';
import * as userStore from '../store/userStore';
/**
 *
 * @param Component 컴포넌트
 * @param option true:로그인해야함, false:로그인안해야함, null:상관없음
 * @param adminRoute 어드민페이지(아직은 사용안할듯)
 * @returns 컴포넌트리턴
 */
const WithAuth = (
  Component: React.ComponentType,
  option: boolean | null,
  adminRoute: boolean | null = null,
) => {
  const [__, writeUser] = useAtom(userStore.writeUser);
  async function authCheck() {
    const result = await writeUser();
    // if (option === true && (result === false || result == null)) {
    //   alert('접근하실수 없습니다');
    //   window.history.pushState(null, '', '/');
    // } else if (option === null) {
    //   return;
    // } else if (option === false && result) {
    //   alert('잘못된 경로입니다.');
    //   window.history.pushState(null, '', '/');
    // }
  }
  useEffect(() => {
    if (option !== undefined && Component) authCheck();
  }, []);
  return <Component />;
};

export default WithAuth;